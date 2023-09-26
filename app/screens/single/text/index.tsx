import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ToastAndroid, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClickOutside } from "react-native-click-outside";
import SelectLanguageBottomSheet from "./../../../components/select-language";
import { SingleTextHeader } from "./header";
import { SingleTextContent } from "./content";
import { AssetModal } from "./text-modal";
import { ScreenGradient } from "../../../components/screen-gradient";
import { CommentCard } from "../../../components/comment-card";
import { BuyBottom } from "../components/buy-button";
import { VirtualizedList } from "../../../components/virtualized-list";
import { RenderIf } from "../../../components/render-if";
import { MetaDataType } from "../components/item-metadata";
import { SingleItemFiles } from "../components/files";
import { FocusedStatusBar } from "../../../components/focused-statusbar";
import { ModalBottomSheet } from "../../../components/bottom-sheet-modal";
import { RenderIfWithoutLoading } from "../../../components/render-if-without-loading";
import { ReportModal } from "../components/report-modal";
import { tokenContext } from "../../../context/token";
import { userContext } from "../../../context/user";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import { ifUserIsOwner } from "../../../utils/if-user-is-owner";
import { retriveToken } from "../../../utils/retrive-token";
import {
  convertTextToAudioHandler,
  convertTextToImageHandler,
  getTextDetailApiHandler,
  translateTextApiHandler,
} from "../service";
import { ComponentNavigationProps } from "../../../types/component-navigation-props";
import type { Text as TextType } from "../../../types/text";
import {
  ICON_SHARE_YOUTUBE,
  ICON_SINGLE_CONVERT_TO_AUDIO,
  ICON_SINGLE_CONVERT_TO_IMAGE,
  ICON_SINGLE_EDIT,
  ICON_SINGLE_TRANSLATE,
  ICON_TEXT_TO_TEXT,
} from "../../../constaints/icons";
import {
  TEXT_THUMBNAIL_PLACEHOLDER,
  __TEXT_THUMBNAIL_PLACEHOLDER_PNG,
} from "../../../constaints/images";
import { EDIT_SCREEN } from "../../../constaints/consts";
import { PaddingContainer } from "../../../styles/grid";
import { Toolbar } from "../components/toolbar";
import { YoutubeShare } from "../components/youtube-share";
import { useYoutubeShareMutation } from "../../../services/asset.service";
import { Toaster } from "../../../utils/toaster";
import { TextToTextConvert } from "../components/text-to-text-convert";
import { useConvertTextToTextMutation } from "../../../services/single-text.service";
import { SingleAssetFooter } from "../components/footer";

const _toaster = new Toaster();
const _textToTextConver = new TextToTextConvert();
const _youtubeShare = new YoutubeShare();

export function SingleTextScreen({
  navigation,
  route,
}: ComponentNavigationProps) {
  const { id } = route.params;

  const [data, setData] = useState<TextType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState<boolean>(null);
  const [token, setToken] = useState(null);
  const [isSubscriber, setIsSubscriber] = useState<boolean>(null);

  const [openReportModal, setOpenReportModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);

  const [currentUserId, setCurrentUserId] = useState<number>(null);

  const [selectedLanguage, setSelectedLanguage] = useState("");

  const isFocused = useIsFocused();
  const selectLanguageRef = useRef(null);
  const youtubeShareRef = useRef(null);

  const textToTextRef = useRef(null);

  const youtubeShareWrapperRef = useClickOutside<View>(() => {
    youtubeShareRef?.current?.close();
  });

  const textToTextWrapperRef = useClickOutside<View>(() => {
    textToTextRef?.current?.close();
  });

  const [
    _shareYoutubeApiFunction,
    { isLoading: isYoutubeShareLoading, isFetching: isYoutubeShareFetching },
  ] = useYoutubeShareMutation();
  
  const [
    _convertTextToTextApiFunction,
    {
      isLoading: _convertTextToTextIsLoading,
      isFetching: _convertTextToTextIsFetching,
    },
  ] = useConvertTextToTextMutation();

  _youtubeShare.config({
    modalRef: youtubeShareRef,
    modalWrapperRef: youtubeShareWrapperRef,
    token: token,
    shareYoutubeApiFunction: _shareYoutubeApiFunction,
    assetId: data?.asset_id,
    isLoading: isYoutubeShareLoading || isYoutubeShareFetching,
  });

  _textToTextConver.config({
    ref: textToTextRef,
    innerRef: textToTextWrapperRef,
    _apiFunction: _convertTextToTextApiFunction,
    isLoading: _convertTextToTextIsLoading || _convertTextToTextIsFetching,
    token,
    assetId: data?.id,
  });

  const ref = useClickOutside<View>(() => {
    setOpenReportModal(false);
  });

  const innerSelectLanguageBottomSheet = useClickOutside<View>(() => {
    selectLanguageRef?.current.close();
  });

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  useEffect(() => {
    getData();
  }, [isFocused]);

  useEffect(() => {
    _translateTextHandler();
  }, [selectedLanguage]);

  const getData = async () => {
    startLoad();

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

    const { isError, res, errorRes } = await getTextDetailApiHandler(
      token,
      shouldSearchByAssetId,
      route.params?.saech__asset_id ? route.params?.saech__asset_id : id
    );

    if (isError) {
      return;
    }

    const assetData = res.data;

    const currentUserId = userCtx.getUser();

    setCurrentUserId(currentUserId.id);

    const isUserOwner = ifUserIsOwner(
      assetData?.asset?.user?.id,
      currentUserId.id
    );

    setIsOwner(isUserOwner);

    // User cant be subscriber if is owner
    if (isUserOwner) {
      setIsSubscriber(false);
    }
    if (!isUserOwner) {
      const fileUrl = assetData?.asset?.file?.url;

      // is user subscriber
      if (fileUrl) {
        setIsSubscriber(true);
      } else {
        setIsSubscriber(false);
      }
    }

    setData(assetData);
    stopLoad();
  };

  const _translateTextHandler = async () => {
    if (!selectedLanguage) {
      return;
    }
    const token = await retriveToken(tokenCtx);
    if (!token) {
      return;
    }

    const itemId = await data?.id;

    const body: any = {
      text: itemId,
      target_language: selectedLanguage,
      language: selectedLanguage,
    };

    const { isError, isSuccess, errorRes, res } = await translateTextApiHandler(
      token,
      data?.id,
      body
    );

    if (isSuccess) {
      _toaster.show("Translate text requested successfully");
    }
    if (isError) {
      _toaster.show("Translate text requested faliled");
    }

    selectLanguageRef?.current?.close();
  };

  const _showTextModalHandler = () => {
    setShowTextModal(true);
  };

  const _hideTextModalHandler = () => {
    setShowTextModal(false);
  };

  const _openReportModalHandler = () => {
    setOpenReportModal(true);
  };

  const _closeReportModalHandler = () => {
    setOpenReportModal(false);
  };

  const stopLoad = () => {
    setIsLoading(false);
  };

  const startLoad = () => {
    setIsLoading(true);
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  const thumnailImageUri =
    data?.asset?.thumbnails["852x480"] || TEXT_THUMBNAIL_PLACEHOLDER;

  const price: number = data?.asset?.price || null;
  const assetUser = data?.asset?.user;

  const _convertTextToImageHandler = async () => {
    const token = await retriveToken(tokenCtx);
    if (!token) {
      return;
    }

    const itemId = await data?.id;

    const body: any = {
      text: itemId,
      size: "512x512",
    };

    const { isError, isSuccess, errorRes, res } =
      await convertTextToImageHandler(token, data?.id, body);

    if (isSuccess) {
      _toaster.show("Convert text to image requested successfully");
    }
    if (isError) {
      _toaster.show("Convert text to image requested faliled");
    }
  };

  const _convertTextToAudioHandler = async () => {
    const token = await retriveToken(tokenCtx);
    if (!token) {
      return;
    }

    const itemId = await data?.id;

    const body: any = {
      text: itemId,
      language: "en",
    };

    const { isError, isSuccess, errorRes, res } =
      await convertTextToAudioHandler(token, data?.id, body);

    if (isSuccess) {
      _toaster.show("Convert text to audio requested successfully");
    }
    if (isError) {
      _toaster.show("Convert text to audio requested faliled");
    }
  };

  const openAddCardAlertHandler = () => {
    selectLanguageRef.current?.open();
  };

  const isLoadedAndDataExists = !isLoading && data?.id ? true : false;

  const fileUrl = data?.asset?.file?.url;

  const hasAssetFile =
    isLoadedAndDataExists && data?.asset?.file ? true : false;

  const shouldShowTextModal = fileUrl && showTextModal ? true : false;

  const metaDataList: MetaDataType[] =
    [
      {
        id: 1,
        key: "Suffix",
        value: "TXT",
      },
      {
        id: 2,
        key: "Type",
        value: "text",
      },
    ] || [];

  const navigateToEditScreen = () => {
    navigation.navigate(EDIT_SCREEN, {
      id: data?.id,
      assetType: "text",
    });
  };

  const shareToYoutubeHandler = () => {
    _youtubeShare.openModal();
  };

  const openTextToTextConvertModal = () => {
    _textToTextConver.openModal();
  };

  const isDisableEditIcon =
    data?.asset?.user?.id === currentUserId ? false : true;

  const hasEditPermission =
    data?.asset?.forkability_status === 2 ? true : false;

  const TOOLBAR_OPTIONS = [
    {
      id: 6,
      func: openTextToTextConvertModal,
      icon: <ICON_TEXT_TO_TEXT width={24} height={24} />,
      isDisable: !hasEditPermission,
    },
    {
      id: 5,
      func: shareToYoutubeHandler,
      icon: <ICON_SHARE_YOUTUBE width={24} height={24} />,
      isDisable: isOwner? false: true,
    },
    {
      id: 1,
      func: _convertTextToImageHandler,
      icon: <ICON_SINGLE_CONVERT_TO_IMAGE width={24} height={24} />,
      isDisable: !hasEditPermission,
    },
    {
      id: 2,
      func: openAddCardAlertHandler,
      icon: <ICON_SINGLE_TRANSLATE width={24} height={24} />,
      isDisable: !hasEditPermission,
    },
    {
      id: 3,
      func: _convertTextToAudioHandler,
      icon: <ICON_SINGLE_CONVERT_TO_AUDIO width={24} height={24} />,
      isDisable: !hasEditPermission,
    },
    {
      id: 4,
      func: navigateToEditScreen,
      icon: <ICON_SINGLE_EDIT width={24} height={24} />,
      isDisable: isDisableEditIcon,
    },
  ];

  const textFiles = data?.asset?.file
    ? [
        {
          id: 1,
          chapterName: data?.asset?.file.details?.name,
          duration: "",
        },
      ]
    : null;

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const youtubeShareTemplate = _youtubeShare.template();
  const textToTextTranslateTemplate = _textToTextConver.template();
  const accountId: number = userCtx.getUser().id;

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <FocusedStatusBar />
        <ScreenGradient>
          <VirtualizedList>
            <RenderIf condition={isLoading}>
              <RenderIfWithoutLoading condition={isLoadedAndDataExists}>
                <SingleTextHeader
                  goBackHandler={goBackHandler}
                  thumnailImageUri={thumnailImageUri}
                  contentName={data?.name || ""}
                  isOwner={isOwner}
                  asset_username={assetUser?.username || ""}
                  user_image_url={assetUser?.image_url || ""}
                  openReportModalHandler={_openReportModalHandler}
                  toolbar_options={TOOLBAR_OPTIONS}
                  hasPermission={isOwner || isSubscriber}
                />
                <RenderIfWithoutLoading condition={isOwner || isSubscriber}>
                  <PaddingContainer>
                    <Toolbar toolbarList={TOOLBAR_OPTIONS} />
                  </PaddingContainer>
                </RenderIfWithoutLoading>
                <SingleTextContent
                  description={data?.description}
                  metaDataList={metaDataList}
                  showTextModalHandler={_showTextModalHandler}
                  isOwner={isOwner}
                  isSubscriber={isSubscriber}
                />
                <RenderIfWithoutLoading condition={hasAssetFile}>
                  <SingleItemFiles data={textFiles} />
                </RenderIfWithoutLoading>
                <CommentCard assetId={data?.id} />
              </RenderIfWithoutLoading>
            </RenderIf>
          </VirtualizedList>
          <RenderIfWithoutLoading condition={isLoadedAndDataExists}>
            <BuyBottom
              isLoading={isLoading}
              price={price}
              thumbnail={thumnailImageUri}
              title={data?.name || ""}
              assetId={data?.asset_id || data?.id}
              isSubscriber={isSubscriber}
              isOwner={isOwner}
            />
          </RenderIfWithoutLoading>
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
          <RenderIfWithoutLoading condition={shouldShowTextModal}>
            <AssetModal
              hideTextModalHandler={_hideTextModalHandler}
              fileUrl={fileUrl}
              title={data?.name || ""}
            />
          </RenderIfWithoutLoading>
          {data?.asset_id && openReportModal ? (
            <View
              ref={ref}
              style={{
                position: "absolute",
                zIndex: 40000,
                top: 200,
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
      {textToTextTranslateTemplate}
    </>
  );
}
