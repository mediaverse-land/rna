import { useEffect, useState, useRef } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { SINGLE_VIDEO_COVER_IMAGE_GRADIENT } from "../../../constaints/images";
import { PaddingContainer } from "../../../styles/grid";
import { GoBackButton } from "../components/goback-button";
import {
  ICON_SOUND_WHITE,
  ICON_TAKE_PHOTO,
  ICON_VIDEO_PLAY,
  ICON_VIDEO_WHITE,
} from "../../../constaints/icons";
import { theme } from "../../../constaints/theme";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { windowSize } from "../../../utils/window-size";
import { Toaster } from "../../../utils/toaster";
import {useNavigation} from '@react-navigation/native'
import { UseNavigationType } from "../../../types/use-navigation";
import { useDispatch } from "react-redux";
import { addImage } from "../../../slices/single-image.slice";
import ViewShot from "react-native-view-shot";
import { setParam } from "../../../slices/plus.slice";

type Props = {
  goBackHandler: () => void;
  thumnailImageUri: string;
  contentName: string;
  videoRef?: any;
  videoUri?: string;
  imageUrl: string;
};

const { height: windowHeight } = windowSize();

const thumbnailHeight = 500;

const toaster = new Toaster();

export function SingleLiveHeader({
  goBackHandler,
  thumnailImageUri,
  contentName,
  videoRef,
  videoUri,
  imageUrl,
}: Props) {
  const [rotationStatus, setRotationStatus] = useState<1 | 3>(3);

  const navigation = useNavigation<UseNavigationType>()
  const videoAreaRef = useRef<ViewShot>(null);
  const dispatch = useDispatch();


  useEffect(() => {
    onFullscreenUpdate(rotationStatus);
  }, [rotationStatus]);

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

  const _getCurrenMilSec = async () => {
    const position: AVPlaybackStatus | any =
      await videoRef?.current?.getStatusAsync();
    return (position?.positionMillis as number) || null;
  };

  const _pauseVideo = () => {
    videoRef?.current?.pauseAsync();
  };

  const _takeScreenShotHandler = async () => {
    if (!videoRef?.current) {
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

  return (
    <Box position="relative" zIndex={20}>
      <Box>
        <GoBackButton
          goBackHandler={goBackHandler}
          hasBackground={true}
          isOwner={false}
        />
        <Box width="100%" height={thumbnailHeight}>
          <>
            <Box id="video-player" width={"100%"} height={thumbnailHeight}>
            <ViewShot
                  style={{ flex: 1 }}
                  ref={videoAreaRef}
                  options={{
                    format: "jpg",
                    result: "base64",
                  }}
                >
              {videoUri ? (
                <Video
                  shouldPlay
                  posterSource={{
                    uri: thumnailImageUri,
                  }}
                  ref={videoRef}
                  style={{
                    width: "100%",
                    height: thumbnailHeight,
                    backgroundColor: "black",
                  }}
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
              </ViewShot>
            </Box>
          </>
        </Box>
      </Box>
      {/* Title */}
      <PaddingContainer>
        {videoUri ? (
          <>
            <Box
              id="tool-bar"
              width="100%"
              height={50}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              marginTop={8}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={_takeScreenShotHandler}
              >
                <Box
                  width={40}
                  justifyContent="center"
                  alignItems="center"
                  marginLeft={16}
                  height={40}
                >
                  <ICON_TAKE_PHOTO />
                </Box>
              </TouchableOpacity>
            </Box>
          </>
        ) : null}
        <Box direction="row" alignItems="center" marginTop={14}>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
            }}
            resizeMode="contain"
          />
          <Text
            color={theme.color.light.WHITE}
            fontSize={20}
            lineHeight={20}
            fontWeight={600}
            marginLeft={16}
          >
            {contentName}
          </Text>
        </Box>
      </PaddingContainer>
    </Box>
  );
}
