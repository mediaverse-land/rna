import { useEffect, useContext, useState, useRef } from "react";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClickOutside } from "react-native-click-outside";
import { ScreenGradient } from "../../../components/screen-gradient";
import { Box } from "../../../components/box";
import { CommentCard } from "../../../components/comment-card";
import { SingleImageHeader } from "./header";
import { SingleImageContent } from "./content";
import { BuyBottom } from "../components/buy-button";
import { VirtualizedList } from "../../../components/virtualized-list";
import { tokenContext } from "../../../context/token";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import { RenderIf } from "../../../components/render-if";
import { MetaDataType } from "../components/item-metadata";
import { userContext } from "../../../context/user";
import { ifUserIsOwner } from "../../../utils/if-user-is-owner";
import { SingleItemFiles } from "../components/files";
import { AssetLargeImage } from "./large-image";
import { FocusedStatusBar } from "../../../components/focused-statusbar";
import { RenderIfWithoutLoading } from "../../../components/render-if-without-loading";
import { ReportModal } from "../components/report-modal";
import { getImageDetailApiHandler } from "../service";
import { Image } from "../../../types/image";
import { EDIT_SCREEN } from "../../../constaints/consts";
import { IMAGE_THUMBNAIL_PLACEHOLDER } from "../../../constaints/images";
import { singleImageStyles } from "./styles";
import { SingleAssetFooter } from "../components/footer";
import { PaddingContainer } from "../../../styles/grid";
import { Toolbar } from "../components/toolbar";
import { ICON_SHARE_YOUTUBE } from "../../../constaints/icons";
import { YoutubeShare } from "../components/youtube-share";
import { useYoutubeShareMutation } from "../../../services/asset.service";

const _youtubeShare = new YoutubeShare();

export function SingleImageScreen({ navigation, route }: any) {
  const { id } = route.params;

  const [isOwner, setIsOwner] = useState<boolean>(null);
  const [isSubscriber, setIsSubscriber] = useState<boolean>(null);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Image>(null);

  const [token, setToken] = useState<string>(null);

  const [openReportModal, setOpenReportModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number>(null);

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  const isFocuses = useIsFocused();

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

  useEffect(() => {
    if (isFocuses) {
      getData();
    }
  }, [isFocuses]);

  // ReportModalRef, close while clicked outside
  const ref = useClickOutside<View>(() => {
    setOpenReportModal(false);
  });

  const getData = async () => {
    setIsLoading(true);
    const _token = await tokenCtx.getToken();

    if (_token === null) {
      setIsLoading(false);

      return;
    }

    const formattedToken = tokenStringResolver(_token);

    setToken(formattedToken);

    await getSingleData(formattedToken);

    setIsLoading(false);
  };

  const getSingleData = async (token: string) => {
    setIsLoading(true);

    const shouldSearchByAssetId = route.params?.saech__asset_id ? true : false;

    const { isError, res } = await getImageDetailApiHandler(
      token,
      shouldSearchByAssetId,
      route.params?.saech__asset_id ? route.params?.saech__asset_id : id
    );

    if (isError) {
      setIsLoading(false);
      return;
    }

    const assetData = res.data;

    // is user owner
    const currentUserId = userCtx.getUser();
    setCurrentUserId(currentUserId.id);
    const isUserOwner = ifUserIsOwner(
      assetData?.asset?.user?.id,
      currentUserId.id
    );

    const fileUrl = assetData?.file?.url || assetData?.asset?.file?.url;

    setIsOwner(isUserOwner);

    // is user subscriber
    if (fileUrl) {
      setIsSubscriber(true);
    } else {
      setIsSubscriber(false);
    }

    setData(assetData);

    setIsLoading(false);

    setIsLoading(false);
  };

  const _showLargeImagePressHandler = () => {
    const currentUserPermission = hasPermission;

    if (!currentUserPermission) {
      return;
    }

    setShowLargeImage(true);
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  const _hideLargeImageHandler = () => {
    setShowLargeImage(false);
  };

  const _openReportModalHandler = () => {
    setOpenReportModal(true);
  };

  const _closeReportModalHandler = () => {
    setOpenReportModal(false);
  };

  const thumnailImageUri =
    data?.asset?.thumbnails?.["390x218"] || IMAGE_THUMBNAIL_PLACEHOLDER;

  const price = data?.asset?.price || null;
  const file = data?.asset?.file;

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
        value: "Clip",
      },
      {
        id: 3,
        key: "Lanuage",
        value: "En",
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

  const hasPermission = isOwner || isSubscriber;
  const isDataExists = data?.id ? true : false;
  const isLoadedAndDataExists = !isLoading && data?.id ? true : false;

  const navigateToEditScreen = () => {
    const isDisableEditIcon =
      data?.asset?.user?.id === currentUserId ? false : true;

    if (isDisableEditIcon) {
      return;
    }
    navigation.navigate(EDIT_SCREEN, {
      id: data?.id,
      assetType: "image",
    });
  };


  const shareToYoutubeHandler = () => {
    _youtubeShare.openModal();
  };

  const TOOLBAR_OPTIONS = [
    {
      id: 5,
      func: shareToYoutubeHandler,
      icon: <ICON_SHARE_YOUTUBE width={24} height={24} />,
      isDisable: isOwner ? false : true,
    },
  ];

  const accountId: number = userCtx.getUser().id;

  const youtubeShareTemplate = _youtubeShare.template();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <ScreenGradient>
        <VirtualizedList>
          <RenderIf condition={isLoading}>
            <Box width="100%" position="relative" zIndex={20}>
              <RenderIfWithoutLoading condition={isDataExists}>
                <SingleImageHeader
                  goBackHandler={goBackHandler}
                  thumnailImageUri={thumnailImageUri}
                  contentName={data?.name || ""}
                  isOwner={isOwner}
                  isSubscriber={isSubscriber}
                  showLargeImagePressHandler={_showLargeImagePressHandler}
                  openReportModalHandler={_openReportModalHandler}
                  toolbarOptions={TOOLBAR_OPTIONS}
                  hasPermission={hasPermission}
                />
                <SingleImageContent
                  description={data?.description}
                  metaDataList={metaDataList}
                  username={data?.asset?.user?.username}
                  userProfileUri={data?.asset?.user?.image_url}
                />
                <RenderIfWithoutLoading condition={file ? true : false}>
                  <SingleItemFiles data={textFiles} />
                </RenderIfWithoutLoading>
                <CommentCard assetId={data?.id} />
              </RenderIfWithoutLoading>
            </Box>
          </RenderIf>
        </VirtualizedList>
        <RenderIfWithoutLoading condition={isLoadedAndDataExists}>
          <BuyBottom
            isLoading={isLoading}
            price={price}
            thumbnail={thumnailImageUri}
            title={data?.name}
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
      </ScreenGradient>
      <RenderIfWithoutLoading condition={showLargeImage}>
        <AssetLargeImage
          hasFile={file?.url ? true : false}
          showLargeImage={showLargeImage}
          hideLargeImageHandler={_hideLargeImageHandler}
          fileUrl={file?.url}
        />
      </RenderIfWithoutLoading>
      {data?.asset_id && openReportModal ? (
        <View ref={ref} style={singleImageStyles.reportModalStyles}>
          <ReportModal
            assetId={data?.asset_id}
            reportModalCloseHandler={_closeReportModalHandler}
          />
        </View>
      ) : null}
      {youtubeShareTemplate}
    </SafeAreaView>
  );
}
