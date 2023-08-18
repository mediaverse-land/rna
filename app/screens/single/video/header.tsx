import { useEffect, useState, useRef, useContext } from "react";
import { Image, TouchableOpacity, BackHandler, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { SINGLE_VIDEO_COVER_IMAGE_GRADIENT } from "../../../constaints/images";
import { PaddingContainer } from "../../../styles/grid";
import { GoBackButton } from "../components/goback-button";
import { theme } from "../../../constaints/theme";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import ViewShot, { CaptureOptions } from "react-native-view-shot";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../../../slices/single-image.slice";
import { Toaster } from "../../../utils/toaster";
import { AppDispatch, RootState } from "../../../store";
import { UseNavigationType } from "../../../types/use-navigation";
import { setParam } from "../../../slices/plus.slice";
import { convertVideoToSoundHandler, recordVideoHandler } from "../service";
import { tokenContext } from "../../../context/token";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import { Toolbar } from "../components/toolbar";
import { StorageService } from "../../../services/storage.service";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
import {
  ICON_EDIT_DARK,
  ICON_SOUND_WHITE,
  ICON_TAKE_PHOTO,
  ICON_TEXT_WHITE,
  ICON_VIDEO_PLAY,
  ICON_VIDEO_WHITE,
} from "../../../constaints/icons";
import {
  EDIT_SCREEN,
  HAS_USER_SEEN_OWNER_VIDEO_TOUR,
} from "../../../constaints/consts";
import { RenderIfWithoutLoading } from "../../../components/render-if-without-loading";

type Props = {
  goBackHandler: () => void;
  openReportModalHandler: () => void;
  thumnailImageUri: string;
  contentName: string;
  isOwner?: boolean;
  videoRef?: any;
  isSubscriber: boolean;
  videoUri?: string;
  isFocused: boolean;
  asset_id: number;
  id: number;
  userId: number;
  forkability_status: boolean;
  isDisableEditIcon: boolean;

};

const thumbnailHeight = 264;

const toaster = new Toaster();

const VIDEO_TOUR_GUIDE =
  "Now that the fee has been paid, it's time to enjoy viewing the content!";
const TOOLBAR_GUIDE =
  "This is the starting point of the excitement, with a few buttons you can convert audio to text and create images from text and translate audio! And build your digital asset";
const REPORTE_GUIDE =
  "We will be happy if you see unethical, inappropriate, offensive .or... content in Mediaverse, help us by reporting it";

const CoachmarkWrapper: any = Coachmark;
const _storageService = new StorageService();
const VIDEO_OPTIONS: CaptureOptions = {
  format: "jpg",
  result: "base64",
};

export function SingleVideoHeader({
  goBackHandler,
  openReportModalHandler,
  thumnailImageUri,
  contentName,
  isOwner = false,
  isSubscriber,
  videoUri,
  isFocused,
  id,
  forkability_status,
  userId,
  isDisableEditIcon
}: Props) {
  const [isStarted, setIsStarted] = useState(false);

  // Start position of video
  const [initSeek, setInitSeek] = useState(null);

  const [isTourActive, setIsTourActive] = useState(false);

  // rotationStatus 1 = landscape and 3 = portrait
  const [rotationStatus, setRotationStatus] = useState<1 | 3>(3);

  const videoRef = useRef<Video>(null);
  
  const navigation = useNavigation<UseNavigationType>();
  const videoAreaRef = useRef<ViewShot>(null);

  const tokenCtx = useContext(tokenContext);
  const dispatch = useDispatch<AppDispatch>();

  const { params } = useSelector((state: RootState) => state.plusSlice);

  const video_position = params?.video_position || 0;

  function _deviceBackButtonClickHandler() {
    if (isTourActive) {
      return;
    }
    setInitSeek(0);
    setIsStarted(false);
    dispatch(
      setParam({
        video_position: 0,
      })
    );
    navigation?.goBack();
    return true;
  }

  const _pauseVideo = () => {
    videoRef?.current?.pauseAsync();
  };

  const _getCurrenMilSec = async () => {
    const position: AVPlaybackStatus | any =
      await videoRef?.current?.getStatusAsync();
    return (position?.positionMillis as number) || null;
  };

  useEffect(() => {
    if (!isFocused) {
      _pauseVideo();
    }
  }, [isFocused]);

  useEffect(() => {
    onFullscreenUpdate(rotationStatus);
  }, [rotationStatus]);

  useEffect(() => {
    setInitSeek(10000);
  }, []);

  // Device goback button press event
  useEffect(() => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      _deviceBackButtonClickHandler
    );
    const clearHandler = () => {
      return () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          _deviceBackButtonClickHandler
        );
      };
    };
    if (!isFocused) {
      return clearHandler();
    }
    return () => {
      return clearHandler();
    };
  }, [isFocused]);

  const _goBackHandler = () => {
    if (isTourActive) {
      return;
    }
    setInitSeek(0);
    setIsStarted(false);
    dispatch(
      setParam({
        video_position: 0,
      })
    );
    goBackHandler();
  };

  const _takeScreenShotHandler = async () => {
    if (isTourActive) {
      return;
    }
    if (!videoRef?.current) {
      toaster.show("Please run video first");
      return;
    }
    await _pauseVideo();

    const position = await _getCurrenMilSec();

    await videoAreaRef.current?.capture().then((uri) => {
      if (uri) {
        dispatch(addImage(uri));

        dispatch(
          setParam({
            video_position: position,
            IS_REDIRECTED_FROM_CREATE_SCREENSHOT: "true",
          })
        );

        toaster.show("Screenshot captured");
        navigation.navigate("Plus");
      }
    });
  };

  type RequestAPiHandler = {
    method: (...args: any) => any;
    successMessage?: string;
    errorMessage?: string;
  };

  const requestAPiHandler = async ({
    method,
    errorMessage,
    successMessage,
  }: RequestAPiHandler) => {
    const token = await retriveToken();
    if (!token) {
      console.log(
        "no_token in video-header, func:_convertVideoToSoundHandler "
      );
    }
    const { isSuccess, isError, errorRes } = await method(token, id);

    if (isSuccess && successMessage) {
      toaster.show(successMessage);
    }
    if (isError && errorMessage) {
      toaster.show(errorMessage);
    }
  };

  const _convertVideoToSoundHandler = async () => {
    await requestAPiHandler({
      method: convertVideoToSoundHandler,
      successMessage: "Video converted to audio successfully",
      errorMessage: "Video convert to audio failed",
    });
  };

  const _recordVideoHandler = async () => {
    await requestAPiHandler({
      method: recordVideoHandler,
      successMessage: "Video recorded successfully",
      errorMessage: "Video record failed",
    });
  };

  const retriveToken = async () => {
    const tk = await tokenCtx.getToken();
    if (tk === null) {
      console.log("no_token in video-header, func:retriveToken ");
      return null;
    }
    return await tokenStringResolver(tk);
  };

  const onFullscreenUpdate = async (_rotationStatus: 1 | 3) => {
    if (_rotationStatus === 1) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    if (_rotationStatus === 3) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

  const startVideo = () => {
    if (isTourActive) {
      return;
    }
    if (isSubscriber || isOwner) setIsStarted(true);
  };

  const navigateToEditScreen = () => {
    navigation.navigate(EDIT_SCREEN, {
      id: id,
      assetType: "video",
    });
  };

  // const isDisableEditIcon = id === userId ? false : true;

  const TOOLABR_OPTIONS = [
    {
      id: 1,
      func: _convertVideoToSoundHandler,
      icon: <ICON_SOUND_WHITE />,
      isDisable: !forkability_status,
    },
    {
      id: 2,
      func: _takeScreenShotHandler,
      icon: <ICON_TAKE_PHOTO />,
      isDisable: !forkability_status,
    },
    {
      id: 4,
      func: navigateToEditScreen,
      // icon: <ICON_TEXT_WHITE />,
      icon: <ICON_EDIT_DARK width={20} height={20} />,
      isDisable: isDisableEditIcon,
    },
  ];

  const hasPermission = isOwner || isSubscriber;

  const videoTourRef = useRef();
  const toolbarTourRef = useRef();
  const reportTourRef = useRef();

  /**
   * Checks if user has seen the tour before or not,
   * if has seen, return true else false
   * @returns {boolean}
   */
  const hasUserSeenTour = async () => {
    const hasUserSeen = await _storageService.get(
      HAS_USER_SEEN_OWNER_VIDEO_TOUR
    );
    return hasUserSeen ? true : false;
  };

  const setUserSeenTour = async () => {
    await _storageService.set(
      HAS_USER_SEEN_OWNER_VIDEO_TOUR,
      HAS_USER_SEEN_OWNER_VIDEO_TOUR
    );
  };

  const setupTour = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (
      videoTourRef?.current &&
      toolbarTourRef?.current &&
      reportTourRef?.current
    ) {
      setTimeout(() => {
        setIsTourActive(true);
        const composer = new CoachmarkComposer([
          videoTourRef,
          toolbarTourRef,
          reportTourRef,
        ]);
        composer.show().then(async () => {
          await setUserSeenTour();
          setIsTourActive(false);
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (!hasPermission) {
      return;
    }
    if (isFocused) {
      setupTour();
    }
  }, [videoTourRef, toolbarTourRef, isFocused, reportTourRef, hasPermission]);

  // Render video thumbnail element if exists
  const thumbnailImageElement = thumnailImageUri ? (
    <Image
      source={{ uri: thumnailImageUri }}
      style={styles.mainThumbnailStyles}
      resizeMode="cover"
    />
  ) : null;

  // Render thumbnail if user is not owner or subscriber
  const RENDER_THUMBNAIL_IF_USER_NOT_OWNER =
    !isSubscriber || !isOwner ? (
      <>
        {thumbnailCoverGradient}
        {thumnailImageUri ? (
          <Image
            source={{
              uri: thumnailImageUri,
              cache: "only-if-cached",
            }}
            style={styles.thumbnailStyles}
            resizeMode="cover"
          />
        ) : null}
      </>
    ) : null;

  // const RENDER_VIDEO_SECTION = (
  //   <RenderIfWithoutLoading
  //     id="render video if user is owner or subscriber"
  //     condition={isSubscriber || isOwner}
  //   >
  //     {!isStarted && thumnailImageUri ? (
  //       <>
  //         {thumbnailCoverGradient}
  //         {thumbnailImageElement}
  //       </>
  //     ) : (
  //       <ViewShot
  //         style={styles.viewShotStyles}
  //         ref={videoAreaRef}
  //         options={VIDEO_OPTIONS}
  //       >
  //         <Box id="video-player" width={"100%"} height={thumbnailHeight}>
  //           <RenderIfWithoutLoading condition={videoUri ? true : false}>
  //             <Video
  //               shouldPlay={true}
  //               source={{
  //                 uri: videoUri,
  //               }}
  //               posterSource={{
  //                 uri: thumnailImageUri,
  //               }}
  //               onFullscreenUpdate={(e) => {
  //                 const { fullscreenUpdate }: any = e;
  //                 setRotationStatus(fullscreenUpdate);
  //               }}
  //               ref={videoRef}
  //               style={styles.videoStyles}
  //               positionMillis={video_position}
  //               useNativeControls
  //               resizeMode={ResizeMode.CONTAIN}
  //               isLooping
  //             />
  //           </RenderIfWithoutLoading>
  //         </Box>
  //       </ViewShot>
  //     )}
  //   </RenderIfWithoutLoading>
  // );

  // const renderStartButtonIfVideoNotStarted = (
  //   <RenderIfWithoutLoading condition={!isStarted}>
  //     <Box position="absolute" zIndex={11} bottom={24} left={24}>
  //       <ICON_VIDEO_WHITE style={styles.iconVideoWhiteStyles} />
  //     </Box>
  //     <Box position="absolute" zIndex={11} left="47%" top="46%">
  //       {isOwner || isSubscriber ? (
  //         <TouchableOpacity activeOpacity={1} onPress={startVideo}>
  //           <ICON_VIDEO_PLAY style={styles.iconVideoPlayerStyles} />
  //         </TouchableOpacity>
  //       ) : null}
  //     </Box>
  //   </RenderIfWithoutLoading>
  // );

  // return (
  //   <Box position="relative" zIndex={20}>
  //     <Box>
  //       {/* Go back button */}
  //       <GoBackButton
  //         goBackHandler={_goBackHandler}
  //         hasBackground={true}
  //         isOwner={isOwner}
  //       />
  //       {/* Video and thumbnail section */}
  //       <CoachmarkWrapper
  //         allowBackgroundInteractions={false}
  //         ref={videoTourRef}
  //         message={VIDEO_TOUR_GUIDE}
  //       >
  //         <Box width="100%" height={thumbnailHeight}>
  //           {RENDER_VIDEO_SECTION}
  //           {RENDER_THUMBNAIL_IF_USER_NOT_OWNER}
  //         </Box>
  //       </CoachmarkWrapper>

  //       {renderStartButtonIfVideoNotStarted}
  //     </Box>
  //     {/* Title */}
  //     <Box>
  //       <PaddingContainer>
  //         {/* Render toolbar if user is owner or subscriber */}
  //         <RenderIfWithoutLoading condition={videoUri ? true : false}>
  //           <CoachmarkWrapper
  //             allowBackgroundInteractions={false}
  //             ref={toolbarTourRef}
  //             message={TOOLBAR_GUIDE}
  //           >
  //             <Toolbar toolbarList={TOOLABR_OPTIONS} />
  //           </CoachmarkWrapper>
  //         </RenderIfWithoutLoading>
  //         <Box direction="row" alignItems="center">
  //           {/* Content title */}
  //           <Box flex={1} marginTop={!videoUri ? 24 : 0}>
  //             <Text
  //               color={theme.color.light.WHITE}
  //               fontSize={20}
  //               lineHeight={20}
  //               fontWeight={600}
  //             >
  //               {contentName}
  //             </Text>
  //           </Box>
  //           <ReportSection
  //             openReportModalHandler={openReportModalHandler}
  //             reportTourRef={reportTourRef}
  //           />
  //         </Box>
  //       </PaddingContainer>
  //     </Box>
  //   </Box>
  // );
  return (
    <Box position="relative" zIndex={20}>
      <Box>
        <GoBackButton
          goBackHandler={_goBackHandler}
          hasBackground={true}
          isOwner={isOwner}
        />
        <CoachmarkWrapper
          allowBackgroundInteractions={false}
          ref={videoTourRef}
          message={VIDEO_TOUR_GUIDE}
        >
          <Box  width="100%" height={thumbnailHeight}>
            {isSubscriber || isOwner ? (
              <>
                {!isStarted && thumnailImageUri ? (
                  <>
                    {thumbnailCoverGradient}
                    {thumnailImageUri ? (
                      <Image
                        source={{ uri: thumnailImageUri }}
                        style={{
                          width: "100%",
                          height: thumbnailHeight,
                          borderBottomLeftRadius: 16,
                          borderBottomRightRadius: 16,
                        }}
                        resizeMode="cover"
                      />
                    ) : null}
                  </>
                ) : (
                  <ViewShot
                    style={{ flex: 1 }}
                    ref={videoAreaRef}
                    options={{
                      format: "jpg",
                      result: "base64",
                    }}
                  >
                    <Box
                      id="video-player"
                      width={"100%"}
                      height={thumbnailHeight}
                    >
                      {videoUri ? (
                        <Video
                          shouldPlay={true}
                          posterSource={{
                            uri: thumnailImageUri,
                          }}
                          ref={videoRef}
                          style={{
                            width: "100%",
                            height: thumbnailHeight,
                            backgroundColor: "black",
                          }}
                          positionMillis={video_position}
                          source={{
                            uri: videoUri,
                          }}
                          onFullscreenUpdate={(e) => {
                            const { fullscreenUpdate }: any = e;
                            setRotationStatus(fullscreenUpdate);
                          }}
                          useNativeControls
                          resizeMode={ResizeMode.CONTAIN}
                          isLooping
                        />
                      ) : null}
                    </Box>
                  </ViewShot>
                )}
              </>
            ) : (
              <>
                <>
                  {thumbnailCoverGradient}
                  {thumnailImageUri ? (
                    <Image
                      source={{
                        uri: thumnailImageUri,
                        cache: "only-if-cached",
                      }}
                      style={{
                        width: "100%",
                        height: thumbnailHeight,
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                      }}
                      resizeMode="cover"
                    />
                  ) : null}
                </>
              </>
            )}
          </Box>
        </CoachmarkWrapper>

        {!isStarted ? (
          <>
            <Box position="absolute" zIndex={11} bottom={24} left={24}>
              <ICON_VIDEO_WHITE
                style={{
                  width: 25.7,
                  height: 20,
                }}
              />
            </Box>
            <Box position="absolute" zIndex={11} left="47%" top="46%">
              {isOwner || isSubscriber ? (
                <TouchableOpacity activeOpacity={1} onPress={startVideo}>
                  <ICON_VIDEO_PLAY
                    style={{
                      width: 32,
                      height: 32,
                    }}
                  />
                </TouchableOpacity>
              ) : null}
            </Box>
          </>
        ) : null}
      </Box>
      {/* Title */}
      <PaddingContainer>
        {videoUri ? (
          <CoachmarkWrapper
            allowBackgroundInteractions={false}
            ref={toolbarTourRef}
            message={TOOLBAR_GUIDE}
          >
            <Toolbar toolbarList={TOOLABR_OPTIONS} />
          </CoachmarkWrapper>
        ) : null}
        <Box direction="row" alignItems="center">
          <Box flex={1} marginTop={!videoUri ? 24 : 0}>
            <Text
              color={theme.color.light.WHITE}
              fontSize={20}
              lineHeight={20}
              fontWeight={600}
            >
              {contentName}
            </Text>
          </Box>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              openReportModalHandler();
            }}
          >
            <CoachmarkWrapper
              allowBackgroundInteractions={false}
              ref={reportTourRef}
              message={REPORTE_GUIDE}
            >
              <Box
                alignItems="center"
                justifyContent="center"
                width={50}
                position="relative"
                zIndex={1040}
              >
                <Text color={"#666680"} fontSize={14} fontWeight={400}>
                  Report
                </Text>
              </Box>
            </CoachmarkWrapper>
          </TouchableOpacity>
        </Box>
      </PaddingContainer>
    </Box>
  );
}

type ReportSectionType = {
  openReportModalHandler: () => void;
  reportTourRef: any;
};

const ReportSection = ({
  openReportModalHandler,
  reportTourRef,
}: ReportSectionType) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        openReportModalHandler();
      }}
    >
      <CoachmarkWrapper
        allowBackgroundInteractions={false}
        ref={reportTourRef}
        message={REPORTE_GUIDE}
      >
        <Box
          alignItems="center"
          justifyContent="center"
          width={50}
          position="relative"
          zIndex={1040}
        >
          <Text color={"#666680"} fontSize={14} fontWeight={400}>
            Report
          </Text>
        </Box>
      </CoachmarkWrapper>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  thumbnailCoverStyles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 10,
    height: thumbnailHeight,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  iconVideoPlayerStyles: {
    width: 32,
    height: 32,
  },
  iconVideoWhiteStyles: {
    width: 25.7,
    height: 20,
  },
  thumbnailStyles: {
    width: "100%",
    height: thumbnailHeight,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  videoStyles: {
    width: "100%",
    height: thumbnailHeight,
    backgroundColor: "black",
  },
  mainThumbnailStyles: {
    width: "100%",
    height: thumbnailHeight,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  viewShotStyles: { flex: 1 },
});

const thumbnailCoverGradient = (
  <Image
    source={{
      uri: SINGLE_VIDEO_COVER_IMAGE_GRADIENT,
      cache: "only-if-cached",
    }}
    style={styles.thumbnailCoverStyles}
  />
);