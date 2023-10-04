import React, { useState, useEffect, useContext, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { BottomTabBar } from "../../component/bottom-tab-bar";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { UseNavigationType } from "../../../../types/use-navigation";
import { CreateContentHeader } from "../../component/header";
import { Box } from "../../../../components/box";
import { RenderIfWithoutLoading } from "../../../../components/render-if-without-loading";
import { Camera } from "./camera";
import { useCreateSingleImageMutation } from "../../../../services/single-image.service";
import { tokenContext } from "../../../../context/token";
import { tokenStringResolver } from "../../../../utils/token-string-resolver";
import { SubmitForm } from "./submit-form";
import { userContext } from "../../../../context/user";
import { CREATE_IMAGE } from "../../constaints";
import { ScreenGradient } from "../../../../components/screen-gradient";
import { Toaster } from "../../../../utils/toaster";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { removeImage } from "../../../../slices/single-image.slice";
import { FileSystemController } from "../../../../controllers/file-system.controller";
import { uploadHandler } from "../../service";
import { useCreateSingleVideoMutation } from "../../../../services/single.video.service";
import {
  REDIRECTED_FROM_CREATE_ASSET,
  SINGLE_IMAGE_SCREEN,
  SINGLE_VIDEO_SCREEN,
} from "../../../../constaints/consts";
import { Logger } from "../../../../utils/logger";

type CapturedImage = {
  height: number;
  uri: string;
  base64: string;
  width: number;
};

export type CreateImageRequestBody = {
  name: string;
  plan: 1 | 2 | 3 | 4;
  price: number;
  description: string;
  subscription_period?:number,
  forkability_status: boolean
};

const _logger = new Logger();
const _toast = new Toaster();
const _fileSystemController = new FileSystemController();

export const CreateImageScreen = () => {
  const [capturedImage, setCapturedImage] = useState<CapturedImage>(null);
  const [capturedVideo, setSapturedVideo] = useState<CapturedImage>(null);
  const [capturedVideo_base64_address, _set_capturedVideo_base64_address] =
    useState<string>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Create image
  const [createNewImage, imageResponse] = useCreateSingleImageMutation();
  const [createNewVideo, videoresponse] = useCreateSingleVideoMutation();

  const { params } = useSelector((state: RootState) => state.plusSlice);

  const { latest_image_uri } = useSelector(
    (states: RootState) => states.imageSlice
  );

  const cameraRef = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);
  const navigation = useNavigation<UseNavigationType>();

  const isFocused = useIsFocused();

  useEffect(() => {
    showToastOfCapturingVideo();
    stopLoad();
  }, []);

  useEffect(() => {
    if(!isFocused){
      setCapturedImage(null)
      _set_capturedVideo_base64_address(null)
      setSapturedVideo(null)
    }
  }, [isFocused])

  useEffect(() => {
    if (latest_image_uri) {
      setCapturedImage({
        height: null,
        uri: null,
        base64: latest_image_uri,
        width: null,
      });
    }
  }, [latest_image_uri]);

  useEffect(() => {
    if (capturedVideo) {
      _stopVideoSubmitButtonHandler();
    }
  }, [capturedVideo]);

  const showToastOfCapturingVideo = () => {
    setTimeout(() => {
      _toast.show("Hold button to capture video");
    }, 1000);
  };

  useEffect(() => {
    if (!isFocused) {
      dispatch(removeImage());
    }
  }, [isFocused]);

  const _submitButtonHandler = async () => {
    const result = await cameraRef?.current?.snap();
    setCapturedImage(result);
  };

  const _createVideoSubmitButtonHandler = async () => {
    const result = await cameraRef?.current?.snapVideo();
    setSapturedVideo(result);
  };

  const _stopVideoSubmitButtonHandler = async () => {
    await cameraRef?.current?.stopVideo();
    const uri = capturedVideo?.uri;

    const result = await _fileSystemController.convertFileToBase64(uri);
    _set_capturedVideo_base64_address(result);
  };

  // const convertVideoToBased64 = async (capturedVideoUri: any) => {
  //   if (!capturedVideoUri) {
  //     _logger.log(`func: convertVideoToBased64, capturedVideo is empty`);
  //     return null;
  //   }
  //   const result = await _fileSystemController.convertFileToBase64(
  //     capturedVideoUri
  //   );
  //   return result;
  // };

  const _createImageRequest = async ({
    name,
    plan,
    price,
    description,
    subscription_period,
    forkability_status
  }: CreateImageRequestBody) => {
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
        forkability_status : forkability_status ? 2: 1,
        type: capturedVideo_base64_address ?4: 2,
      },
    };

    let newBody: any ={
      ...options.body,
    }

    if(subscription_period){
      newBody.subscription_period = subscription_period
    }

    const newOption = {
      token: options.token,
      body: newBody
    }

    startLoad();

    if (capturedVideo_base64_address) {
      await _createVideoHandler(newOption, token);
      return;
    }
    if (capturedImage?.base64) {
      await _createImageHandler(newOption, token);
      return;
    }
  };

  const _createVideoHandler = async (options: any, token: string) => {
    const CREATE_VIDEO_OPTIONS = {
      token: options.token,
      body: {
        ...options.body,
        type: 4,
        country: "fr",
        language: "fr",
        genre: "horror",
        imdb_score: 9.8,
        production_year: 1994,
        length: 2000,
        producers: ["Quentin Tarantino"],
        directors: ["Steven Spielberg"],
        actors: ["Marlon Brando"],
        contributors: ["mohammad alimardani"],
      },
    };
    createNewVideo(CREATE_VIDEO_OPTIONS)
      .then(async (res: any) => {
        const asset_id = res?.data?.asset_id;

        if (!asset_id || res?.error) {
          const errorMessage =
            res?.error?.data?.error || "Something went wrong, try again";
          stopLoad();
          _logger.log(errorMessage);
          _toast.show(errorMessage);
          return;
        }
        const id = res?.data?.id;

        const upload_res = await uploadHandler({
          token,
          asset_id,
          input: { base64: capturedVideo_base64_address },
          setIsLoading,
        });


        if (upload_res === "Ok" && id) {
          navigation?.navigate(SINGLE_VIDEO_SCREEN, {
            id,
            asset_id: id,
            ORIGIN: REDIRECTED_FROM_CREATE_ASSET
          });
        }
      })
      .catch((err: any) => {
        // console.log(`createNewVideo:${JSON.stringify(err)}`);
        stopLoad();
      });
  };

  const _createImageHandler = async (options: any, token: string) => {
    createNewImage(options)
      .then(async (res: any) => {
        const asset_id = res?.data?.asset_id;

        if (!asset_id) {
          const errorMessage =
            res?.error?.data?.error || "Something went wrong, try again";
          stopLoad();
          _logger.logErro(errorMessage);
          _toast.show(errorMessage);
          return;
        }

        const id = res?.data?.id;
        const upload_res = await uploadHandler({
          token,
          asset_id,
          input: capturedImage,
          setIsLoading,
        });


        if (upload_res === "Ok") {
          if (params?.IS_REDIRECTED_FROM_CREATE_SCREENSHOT) {
            navigation.goBack();
            return;
          }
          if (id) {
            navigation?.navigate(SINGLE_IMAGE_SCREEN, {
              id,
              asset_id: id,
              ORIGIN: REDIRECTED_FROM_CREATE_ASSET
            });
          }
        }
      })
      .catch((err: any) => {
        startLoad();
        // console.log(`createNewImage:${JSON.stringify(err)}`);
      });
  };

  const stopLoad = () => {
    setIsLoading(false);
  };

  const startLoad = () => {
    setIsLoading(true);
  };

  const goBackHandler = () => {
    if (capturedImage  || capturedVideo_base64_address) {
      setCapturedImage(null);
      _set_capturedVideo_base64_address(null);
      return;
    }
    navigation.goBack();
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
    return id || null;
  };

  return (
    <>
      <Box
        position="absolute"
        top={0}
        left={24}
        width="100%"
        paddingTop={24}
        zIndex={10000000}
      >
        <CreateContentHeader
          justBackButtonVisible={true}
          goBackHandler={goBackHandler}
        />
      </Box>
      <RenderIfWithoutLoading condition={isFocused}>
        <View style={styles.container}>
          <ScreenGradient>
            <Camera ref={cameraRef} />
            <BottomTabBar
              currentPage={CREATE_IMAGE}
              navigation={navigation}
              submitButtonHandler={_submitButtonHandler}
              longPressSubmitButtonHandler={_createVideoSubmitButtonHandler}
              longressOutSubmitButtonHandler={() =>
                _stopVideoSubmitButtonHandler()
              }
            />
          </ScreenGradient>
        </View>
      </RenderIfWithoutLoading>
      {capturedImage?.base64 || capturedVideo_base64_address ? (
        <SubmitForm
          isLoading={isLoading}
          createAssetRequest={_createImageRequest}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
});
