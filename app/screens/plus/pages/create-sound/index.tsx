import { useState, useEffect, useContext } from "react";
import { Button, ToastAndroid } from "react-native";
import { Box } from "../../../../components/box";
import { UseNavigationType } from "../../../../types/use-navigation";
import { BottomTabBar } from "../../component/bottom-tab-bar";
import { CreateContentHeader } from "../../component/header";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ScreenGradient } from "../../../../components/screen-gradient";
import { PaddingContainer } from "../../../../styles/grid";
import { windowSize } from "../../../../utils/window-size";
import { ICON_WARNING } from "../../../../constaints/icons";
import { Text } from "../../../../components/text";
import { theme } from "../../../../constaints/theme";
import { Audio } from "expo-av";
import { CREATE_SOUND } from "../../constaints";
import { RecordingController } from "../../../../controllers/recording.controller";
import { FileSystemController } from "../../../../controllers/file-system.controller";
import axios from "axios";
import { ApiHandler } from "../../../../utils/api-handler";
import { SubmitForm } from "./submit-form";
import { tokenContext } from "../../../../context/token";
import { userContext } from "../../../../context/user";
import { tokenStringResolver } from "../../../../utils/token-string-resolver";
import { useCreateSingleSoundMutation } from "../../../../services/single-sound.service";
import { Toaster } from "../../../../utils/toaster";
import { REDIRECTED_FROM_CREATE_ASSET, SINGLE_SOUND_SCREEN } from "../../../../constaints/consts";
import { Logger } from "../../../../utils/logger";

const WINDOW_HEIGHT = windowSize().height;
const PLACE_HODLDER_HEIGHT = Math.floor(WINDOW_HEIGHT) - 100;
const PLACEHOLDER_TEXT_COLOR = theme.color.light.ADD_CARD_COLOR;
const PLACEHOLDER_TEXT_WHILE_IS_RECORDING_COLOR = theme.color.light.WHITE;
const PLACEHOLDER_TEXT_FONT_SIZE = 16;
const PLACEHOLDER_TEXT_LIE_HEIGHT = 16;

const _recordingController = new RecordingController();
const _fileSystemController = new FileSystemController();

const _api = new ApiHandler();
const _toast = new Toaster();
const _logger = new Logger();

export const CreateSoundScreen = () => {
  const [recording, setRecording] = useState<Audio.Recording>(null);
  const [lastRecording, setLastRecording] = useState<Audio.Recording>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createNewAsset, response] = useCreateSingleSoundMutation();

  const navigation = useNavigation<UseNavigationType>();
  const isFocused = useIsFocused();

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  useEffect(() => {
    if (recording) {
      setLastRecording(recording);
    }
  }, [recording]);

  useEffect(() => {
    const setup = async() => {
      
    }
    setup();
  }, [recording?.getStatusAsync()]);
  _logger.log(recording?.getStatusAsync());

  useEffect(() => {
    if (!isFocused) {
      setRecording(null);
      setLastRecording(null);
    }
  }, [isFocused]);

  const createService = async (
    token: string,
    asset_id: number,
    f: any,
    setIsLoading: (args: boolean) => void,
    id: number
  ) => {
    let data = new FormData();

    data.append("asset", asset_id.toString());
    data.append("file", f);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://api.mediaverse.land/v2/files`,
      headers: {
        authority: "api.mediaverse.land",
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        authorization: `Bearer ${token}`,
        origin: "https://assets.mediaverse.land",
        referer: "https://assets.mediaverse.land/",
        "X-App": "_ReactNative",
        "sec-ch-ua":
          '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        ToastAndroid.show("Item created successfully", 3000);
        setIsLoading(false);
        navigation?.navigate(SINGLE_SOUND_SCREEN, {
          id,
          asset_id: id,
          ORIGIN: REDIRECTED_FROM_CREATE_ASSET
        });
      })
      .catch((error) => {
        ToastAndroid.show("Item creation failed", 3000);
        _logger.log(JSON.stringify(error));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    _askForPermission();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setRecording(null);
      setLastRecording(null);
    }
  }, [isFocused]);

  const _submitButtonHandler = () => {
    if (!recording) {
      _startRecording();
      return;
    }
    _stopRecording();
  };

  const _askForPermission = async () => {
    await _recordingController.askForPermission();
  };

  async function _startRecording() {
    await _recordingController.startRecording(setRecording);
  }

  async function _stopRecording() {
    await _recordingController.stopRecording(recording, setRecording);
  }

  const upload = async (token: string, asset_id: number, id: number) => {
    const storedSoundUri = await _recordingController.getStoredSound();

    if (!storedSoundUri) {
      return;
    }
    setIsLoading(true);

    const audio_base64 = await _fileSystemController.convertFileToBase64(
      storedSoundUri
    );

    await createService(
      token,
      asset_id,
      `data:audio/mpeg;base64,${audio_base64}`,
      setIsLoading,
      id
    );
    setIsLoading(false);
  };

  const _createImageRequest = async ({
    name,
    plan,
    price,
    description,
    subscription_period,
    forkability_status
  }: any) => {

    const token = await retriveToken();
    const userId = await retriveUserId();

    const options = {
      token,
      body: {
        name,
        user: userId,
        plan,
        price,
        description,
        type: 3,
        forkability_status : forkability_status ? 2: 1
      },
    };

    let newBody: any = {
      ...options.body,
    };

    if (subscription_period) {
      newBody.subscription_period = subscription_period;
    }

    const newOption = {
      token: options.token,
      body: newBody,
    };

    createNewAsset(newOption)
      .then(async (res: any) => {
        _logger.log(forkability_status)
        const asset_id = res?.data?.asset_id;
        if (!asset_id) {
          setIsLoading(false);
          _logger.logErro("no asset_id");
          _toast.show("Something went wrong, try again");

          return;
        }

        await upload(token, asset_id, res?.data?.id);
      })
      .catch((err: any) => {
        setIsLoading(false);
        _logger.logErro(err);
      });

    setIsLoading(true);
  };

  const retriveToken = async (): Promise<null | string> => {
    const token = await tokenCtx.getToken();

    if (token === null) {
      return null;
    }

    const formattedToken = tokenStringResolver(token);
    return formattedToken;
  };

  const retriveUserId = async (): Promise<null | number> => {
    const { id } = await userCtx.getUser();

    if (!id) {
      return null;
    }
    return id;
  };

  const goBackHandler = () => {
    // console.log('lastRecording')
    if (!lastRecording) {
      navigation.goBack();
      return;
    }

    setLastRecording(null);
    setRecording(null);
  };

  return (
    <ScreenGradient>
      <Box paddingTop={24} width="100%" flex={1}>
        <PaddingContainer>
          <CreateContentHeader
            justBackButtonVisible={true}
            goBackHandler={goBackHandler}
          />
          <Placeholder isRecording={recording ? true : false} />
        </PaddingContainer>
      </Box>
      {isFocused ? (
        <BottomTabBar
          currentPage={CREATE_SOUND}
          navigation={navigation}
          submitButtonHandler={_submitButtonHandler}
        />
      ) : null}
      {lastRecording && !recording ? (
        <SubmitForm
          isLoading={isLoading}
          createAssetRequest={_createImageRequest}
        />
      ) : null}
    </ScreenGradient>
  );
};

const Placeholder = ({ isRecording }: { isRecording: boolean }) => {
  return (
    <Box
      width="100%"
      height={PLACE_HODLDER_HEIGHT}
      alignItems="center"
      justifyContent="center"
      marginTop={40}
    >
      {!isRecording ? (
        <Box justifyContent="center" alignItems="center">
          <ICON_WARNING />
        </Box>
      ) : null}
      <Box marginTop={24} justifyContent="center" alignItems="center">
        {isRecording ? (
          <>
            <Text
              color={PLACEHOLDER_TEXT_WHILE_IS_RECORDING_COLOR}
              fontSize={PLACEHOLDER_TEXT_FONT_SIZE}
              lineHeight={PLACEHOLDER_TEXT_LIE_HEIGHT}
            >
              Voice is recording.
            </Text>
            <Text
              color={PLACEHOLDER_TEXT_WHILE_IS_RECORDING_COLOR}
              fontSize={PLACEHOLDER_TEXT_FONT_SIZE}
              lineHeight={PLACEHOLDER_TEXT_LIE_HEIGHT}
            >
              To stop, press the button again
            </Text>
          </>
        ) : (
          <>
            <Text
              color={PLACEHOLDER_TEXT_COLOR}
              fontSize={PLACEHOLDER_TEXT_FONT_SIZE}
              lineHeight={PLACEHOLDER_TEXT_LIE_HEIGHT}
            >
              Press the button
            </Text>
            <Text
              color={PLACEHOLDER_TEXT_COLOR}
              fontSize={PLACEHOLDER_TEXT_FONT_SIZE}
              lineHeight={PLACEHOLDER_TEXT_LIE_HEIGHT}
            >
              for recording
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};
