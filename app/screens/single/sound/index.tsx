import { useState, useEffect, useContext } from "react";
import { Alert, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenGradient } from "../../../components/screen-gradient";
import { SingleSoundHeader } from "./header";
import { Box } from "../../../components/box";
import { SingleSoundContent } from "./content";
import { CommentCard } from "../../../components/comment-card";
import { BuyBottom } from "../components/buy-button";
import { FocusedStatusBar } from "../../../components/focused-statusbar";
import { tokenContext } from "../../../context/token";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import {
  convertAudioToImageHandler,
  getSoundDetailApiHandler,
  translateAudioHandler,
} from "../service";
import { MetaDataType } from "../components/item-metadata";
import { VirtualizedList } from "../../../components/virtualized-list";
import { RenderIf } from "../../../components/render-if";
import { userContext } from "../../../context/user";
import { ifUserIsOwner } from "../../../utils/if-user-is-owner";
import { Sound } from "../../../types/sound";
import { Audio } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import { SingleItemFiles } from "../components/files";
import MusicPlayer from "./player";
import { ReportModal } from "../components/report-modal";
import { useClickOutside } from "react-native-click-outside";
import { RenderIfWithoutLoading } from "../../../components/render-if-without-loading";
import { useGetSingleVideoDataQuery } from "../../../services/single-sound.service";
import { retriveToken } from "../../../utils/retrive-token";
import { Toolbar } from "../components/toolbar";
import {
  ICON_EDIT,
  ICON_EDIT_DARK,
  ICON_SOUND_WHITE,
  ICON_TEXT_WHITE,
} from "../../../constaints/icons";
import { PaddingContainer } from "../../../styles/grid";
import { Text } from "../../../components/text";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/form";
import { Button } from "../../../components/button";
import { AUDIO_THUMBNAIL_PLACEHOLDER } from "../../../constaints/images";
import { EDIT_SCREEN } from "../../../constaints/consts";

export function SingleSoundScreen({ navigation, route }: any) {
  const { control, register, handleSubmit } = useForm();
  const { id } = route.params;

  const [openReportModal, setOpenReportModal] = useState(false);
  const [data, setData] = useState<Sound>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState<boolean>(null);
  const [isSubscriber, setIsSubscriber] = useState<boolean>(null);
  const [sound, setSound] = useState<any>();
  const [soundUri, setSoundUri] = useState<string>(null);
  const [file, setFile] = useState<any>(null);

  const [currentUserId, setCurrentUserId] = useState<number>(null);

  const [translateModalOpen, setTranslateModalOpen] = useState(false);
  const [isTranslateLoading, setIsTranslateLoading] = useState(false);

  const isFocused = useIsFocused();
  // ReportModalRef
  // close while clicked outside
  const ref = useClickOutside<View>(() => {
    setOpenReportModal(false);
  });

  const translateModalRef = useClickOutside<View>(() => {
    setTranslateModalOpen(false);
  });

  // const {data, error, isLoading, isSuccess} = useGetSingleVideoDataQuery()

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  async function playSoundHandler() {
    if (isOwner === true || isSubscriber === true) {
      if (!soundUri) {
        return;
      }

      const { sound } = await Audio.Sound.createAsync({
        uri: soundUri,
      });

      setSound(sound);
      await sound.playAsync();
    }
  }

  async function stopSoundHandler() {
    if (sound) {
      await sound.stopAsync();
    }
  }

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound, soundUri]);

  const getData = async () => {
    setIsLoading(true);

    const token = await tokenCtx.getToken();
    if (token === null) {
      setIsLoading(false);
      return;
    }

    const formattedToken = tokenStringResolver(token);

    await getSingleData(formattedToken);
    setIsLoading(false);
  };
  console.log({ id: data?.id });

  const getSingleData = async (token: string) => {
    const shouldSearchByAssetId = route.params?.saech__asset_id ? true : false;

    const { isError, res } = await getSoundDetailApiHandler(
      token,
      shouldSearchByAssetId,
      route.params?.saech__asset_id ? route.params?.saech__asset_id : id
    );

    if (isError) {
      setIsLoading(false);
      return;
    }

    const { data } = res;
    const assetData = data;

    // is user owner
    const currentUserId = userCtx.getUser();
    setCurrentUserId(currentUserId?.id);
    const isUserOwner = ifUserIsOwner(
      assetData?.asset?.user?.id,
      currentUserId.id
    );

    const fileUrl = data?.file?.url || assetData?.asset?.file?.url;

    if (isUserOwner === true) {
      setSoundUri(fileUrl);
    }
    setIsOwner(isUserOwner);

    // is user subscriber
    if (fileUrl) {
      setSoundUri(fileUrl);
      setIsSubscriber(true);
    } else {
      setIsSubscriber(false);
    }

    setData(assetData);

    const file_id = data?.asset?.file;
    setFile(file_id);

    setIsLoading(false);
  };

  const _convertAudioToText = async () => {
    const token = await retriveToken(tokenCtx);
    if (!token) {
      console.log(`no token, func: _convertAudioToText`);
      return;
    }

    const itemId = await data?.id;

    const body: any = {
      audio: itemId,
    };

    const { isError, isSuccess, errorRes, res } =
      await convertAudioToImageHandler(token, data?.id, body);

    if (isSuccess) {
      ToastAndroid.show(
        "Convert asset to text requested successfully",
        ToastAndroid.LONG
      );
    }
    if (isError) {
      ToastAndroid.show(
        "Convert asset to text requested faliled",
        ToastAndroid.LONG
      );
    }
  };

  const _translateAudio = async (_formData: any) => {
    setIsTranslateLoading(true);
    const { language } = _formData;
    const token = await retriveToken(tokenCtx);
    if (!token) {
      console.log(`no token, func: _convertAudioToText`);
      return;
    }

    const itemId = await data?.id;

    const body: any = {
      audio: itemId,
      language,
    };

    const { isError, isSuccess, errorRes, res } = await translateAudioHandler(
      token,
      data?.id,
      body
    );

    if (isSuccess) {
      ToastAndroid.show(
        "Translate asset requested successfully",
        ToastAndroid.LONG
      );
    }
    if (isError) {
      ToastAndroid.show("Translate asset requested faliled", ToastAndroid.LONG);
    }
    setTranslateModalOpen(false);
    setIsTranslateLoading(false);
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  const openTranslateModalHandler = () => {
    setTranslateModalOpen(true);
  };

  console.log(data?.asset)

  const thumnailImageUri =
    data?.asset?.thumbnails["336x366"] ||
    AUDIO_THUMBNAIL_PLACEHOLDER;
  const price = data?.asset?.price || null;

  const metaDataList: MetaDataType[] =
    [
      {
        id: 1,
        key: "Suffix",
        value: data?.asset?.thumbnail?.extension,
      },
      {
        id: 2,
        key: "Type",
        value: "Music",
      },
      {
        id: 3,
        key: "Lanuage",
        value: "en",
      },
    ] || [];

  const textFiles = file
    ? [
        {
          id: 1,
          chapterName: file?.details?.name,
          duration: "",
        },
      ]
    : null;

  // const eligible_for_audio_extraction =
  //   data?.asset?.eligible_for_audio_extraction;
  // const eligible_for_image_extraction =
  //   data?.asset?.eligible_for_image_extraction;
  // const eligible_for_video_extraction =
  //   data?.asset?.eligible_for_video_extraction;

  const navigateToEditScreen = () => {
    navigation.navigate(EDIT_SCREEN, {
      id:data?.id,
      assetType: "sound",
    });
  };

  const isDisableEditIcon =
    data?.asset?.user?.id === currentUserId ? false : true;

    
    const hasEditPermission =
    data?.asset?.forkability_status === 2 ? true : false;
    console.log({forkability_status: data?.asset?.forkability_status})

  const toolbarOptions = [
    {
      id: 2,
      func: _convertAudioToText,
      icon: <ICON_SOUND_WHITE />,
      isDisable: !hasEditPermission,
    },
    {
      id: 3,
      func: openTranslateModalHandler,
      // func: _translateAudio,
      icon: <ICON_TEXT_WHITE />,
      isDisable: !hasEditPermission,
    },
    {
      id: 1,
      func: navigateToEditScreen,
      // icon: <ICON_TEXT_WHITE />,
      icon:<ICON_EDIT_DARK width={20} height={20} />,
      isDisable: isDisableEditIcon,
    },
  ];

  const _openReportModalHandler = () => {
    setOpenReportModal(true);
  };

  const _closeReportModalHandler = () => {
    setOpenReportModal(false);
  };

  const isDataExists = data?.id ? true : false;
  const isFileExists = data?.asset?.file?.url ? true : false;

  const hasPermission = isOwner || isSubscriber;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <ScreenGradient>
        <VirtualizedList>
          <RenderIf condition={isLoading}>
            <Box width="100%" position="relative" zIndex={20}>
              <RenderIfWithoutLoading condition={isDataExists}>
                <SingleSoundHeader
                  goBackHandler={goBackHandler}
                  thumnailImageUri={thumnailImageUri}
                  contentName={data?.name}
                  isOwner={isOwner}
                  isOwnerOrSubscriber={hasPermission}
                  playSoundHandler={playSoundHandler}
                  stopSoundHandler={stopSoundHandler}
                  username={data?.asset?.user?.username || ""}
                  userProfileUri={data?.asset?.user?.image_url || ""}
                  openReportModalHandler={_openReportModalHandler}
                />
                <RenderIfWithoutLoading condition={hasPermission}>
                  <PaddingContainer>
                    <Toolbar toolbarList={toolbarOptions} />
                  </PaddingContainer>
                </RenderIfWithoutLoading>
                <RenderIfWithoutLoading condition={isFileExists}>
                  <MusicPlayer url={file?.url} />
                </RenderIfWithoutLoading>
                <SingleSoundContent
                  description={data?.description}
                  metaDataList={metaDataList}
                />
                <RenderIfWithoutLoading condition={isFileExists}>
                  <SingleItemFiles data={textFiles} />
                </RenderIfWithoutLoading>
                <CommentCard assetId={data?.id} />
              </RenderIfWithoutLoading>
            </Box>
          </RenderIf>
        </VirtualizedList>
        {data ? (
          <BuyBottom
            isLoading={isLoading}
            price={price}
            thumbnail={thumnailImageUri}
            title={data.name}
            assetId={data.asset_id || data.id}
            isSubscriber={isSubscriber}
            isOwner={isOwner}
          />
        ) : null}
        {translateModalOpen ? (
          <View
            ref={translateModalRef}
            style={{
              position: "absolute",
              zIndex: 40000,
              top: 200,
              backgroundColor: "#0f172cab",
              width: "70%",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text color="#fff">Add translate target</Text>
            <Box marginTop={16} marginBottom={16}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <Input
                      placeholder={"fr"}
                      labelText={"language"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  );
                }}
                name={"language"}
              />
            </Box>
            <Button
              onpressHandler={handleSubmit(_translateAudio)}
              varient="primary"
              borderRadius={8}
              text="Submit"
              isLoading={isTranslateLoading}
            />
          </View>
        ) : null}
        {data?.asset_id && openReportModal ? (
          <View
            ref={ref}
            style={{
              position: "absolute",
              zIndex: 40000,
              top: 300,
              right: 20,
              backgroundColor: "#0f172cab",
              width: 250,
              height: 250,
            }}
          >
            <ReportModal
              assetId={data?.asset_id}
              reportModalCloseHandler={_closeReportModalHandler}
            />
          </View>
        ) : null}
      </ScreenGradient>
    </SafeAreaView>
  );
}