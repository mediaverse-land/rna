import { useState, useEffect, useContext, useRef, useMemo } from "react";
import { ToastAndroid, View } from "react-native";
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
import { retriveToken } from "../../../utils/retrive-token";
import { Toolbar } from "../components/toolbar";
import {
  ICON_SHARE_YOUTUBE,
  ICON_SINGLE_CONVERT_TO_IMAGE,
  ICON_SINGLE_CONVERT_TO_TEXT,
  ICON_SINGLE_EDIT,
} from "../../../constaints/icons";
import { PaddingContainer } from "../../../styles/grid";
import { AUDIO_THUMBNAIL_PLACEHOLDER } from "../../../constaints/images";
import { EDIT_SCREEN } from "../../../constaints/consts";
import { ModalBottomSheet } from "../../../components/bottom-sheet-modal";
import SelectLanguageBottomSheet from "./../../../components/select-language";
import { SingleAssetFooter } from "../components/footer";
import { useYoutubeShareMutation } from "../../../services/asset.service";
import { YoutubeShare } from "../components/youtube-share";
import { BackButtonRedirector } from "../utils/back-button-redirector";

const _backButtonRedirector = new BackButtonRedirector();
const _youtubeShare = new YoutubeShare();

export function SingleSoundScreen({ navigation, route }: any) {
  const { id, ORIGIN } = route.params;

  const [openReportModal, setOpenReportModal] = useState(false);
  const [data, setData] = useState<Sound>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState<boolean>(null);
  const [isSubscriber, setIsSubscriber] = useState<boolean>(null);
  const [sound, setSound] = useState<any>();
  const [soundUri, setSoundUri] = useState<string>(null);
  const [file, setFile] = useState<any>(null);

  const [token, setToken] = useState<string>(null);

  const [currentUserId, setCurrentUserId] = useState<number>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const selectLanguageRef = useRef(null);

  const isFocused = useIsFocused();

  // ReportModalRef
  // close while clicked outside
  const ref = useClickOutside<View>(() => {
    setOpenReportModal(false);
  });

  const innerSelectLanguageBottomSheet = useClickOutside<View>(() => {
    selectLanguageRef?.current.close();
  });

  const youtubeShareRef = useRef(null);

  const youtubeShareWrapperRef = useClickOutside<View>(() => {
    youtubeShareRef?.current?.close();
  });

  const [
    _shareYoutubeApiFunction,
    { isLoading: isYoutubeShareLoading, isFetching: isYoutubeShareFetching },
  ] = useYoutubeShareMutation();

  _youtubeShare.config({
    modalRef: youtubeShareRef,
    modalWrapperRef: youtubeShareWrapperRef,
    token: token,
    shareYoutubeApiFunction: _shareYoutubeApiFunction,
    assetId: data?.asset_id,
    isLoading: isYoutubeShareLoading || isYoutubeShareFetching,
  });

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  useEffect(() => {
    _backButtonRedirector.addListener(ORIGIN, navigation);

    if (!isFocused) {
      return _backButtonRedirector.cleanup(navigation);
    }
  }, []);


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

  useEffect(() => {
    _translateAudio();
  }, [selectedLanguage]);

  const getData = async () => {
    setIsLoading(true);

    const token = await tokenCtx.getToken();
    if (token === null) {
      setIsLoading(false);
      return;
    }

    const formattedToken = tokenStringResolver(token);
    setToken(formattedToken);

    await getSingleData(formattedToken);
    setIsLoading(false);
  };

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
      return;
    }

    const itemId = await data?.id;

    const body: any = {
      audio: itemId,
    };

    const { isError, isSuccess } =
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

  const _translateAudio = async () => {
    // setIsTranslateLoading(true);
    if (!selectedLanguage) {
      return;
    }

    const token = await retriveToken(tokenCtx);
    if (!token) {
      return;
    }

    const itemId = await data?.id;

    const body: any = {
      audio: itemId,
      language: selectLanguageRef,
    };

    const { isError, isSuccess } = await translateAudioHandler(
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
    selectLanguageRef?.current?.close();
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  const openTranslateModalHandler = () => {
    selectLanguageRef?.current?.open();
  };

  const thumnailImageUri =
    data?.asset?.thumbnails["336x366"] || AUDIO_THUMBNAIL_PLACEHOLDER;
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

  const navigateToEditScreen = () => {
    navigation.navigate(EDIT_SCREEN, {
      id: data?.id,
      assetType: "sound",
    });
  };

  const isDisableEditIcon =
    data?.asset?.user?.id === currentUserId ? false : true;

  const hasEditPermission =
    data?.asset?.forkability_status === 2 ? true : false;

    
  const shareToYoutubeHandler = () => {
    _youtubeShare.openModal();
  };


  const toolbarOptions = [
    {
      id: 5,
      func: shareToYoutubeHandler,
      icon: <ICON_SHARE_YOUTUBE width={24} height={24} />,
      isDisable: isOwner ? false : true,
    },
    {
      id: 2,
      func: _convertAudioToText,
      icon: <ICON_SINGLE_CONVERT_TO_IMAGE width={23} height={23} />,
      isDisable: !hasEditPermission,
    },
    {
      id: 3,
      func: openTranslateModalHandler,
      // func: _translateAudio,
      icon: <ICON_SINGLE_CONVERT_TO_TEXT width={24} height={24} />,
      isDisable: !hasEditPermission,
    },
    {
      id: 1,
      func: navigateToEditScreen,
      // icon: <ICON_TEXT_WHITE />,
      icon: <ICON_SINGLE_EDIT width={25} height={25} />,
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
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const accountId: number = userCtx.getUser().id;

  const youtubeShareTemplate = _youtubeShare.template();


  return (
    <>
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
          <RenderIfWithoutLoading condition={isOwner}>
            <SingleAssetFooter
              fileName={data?.name}
              editorHandler={navigateToEditScreen}
              asset_Id={data?.asset_id}
              parent_Id={accountId}
              tokenCtx={tokenCtx}
              token={token}
            />
          </RenderIfWithoutLoading>
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
      <ModalBottomSheet ref={selectLanguageRef} snapPoints={snapPoints}>
        <View
          ref={innerSelectLanguageBottomSheet}
          style={{
            marginBottom: 200,
            flex: 1,
            height: 1000,
          }}
        >
          <SelectLanguageBottomSheet
            isFocused={isFocused}
            setSelectedLanguage={setSelectedLanguage}
          />
        </View>
      </ModalBottomSheet>
      {youtubeShareTemplate}
    </>
  );
}
