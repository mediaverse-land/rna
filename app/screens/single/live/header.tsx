import { useEffect, useState, useRef } from "react";
import { Box } from "../../../components/box";
import { PaddingContainer } from "../../../styles/grid";
import { GoBackButton } from "../components/goback-button";
import {
  ICON_RECORD_VOIC_ACTIVE,
  ICON_RECORD_VOIC_IS_RECORDING,
  ICON_TAKE_PHOTO,
} from "../../../constaints/icons";
import { AVPlaybackStatus } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { Toaster } from "../../../utils/toaster";
import { useNavigation } from "@react-navigation/native";
import { UseNavigationType } from "../../../types/use-navigation";
import { useDispatch } from "react-redux";
import { addImage } from "../../../slices/single-image.slice";
import ViewShot from "react-native-view-shot";
import { setParam } from "../../../slices/plus.slice";
import { RenderIfWithoutLoading } from "../../../components/render-if-without-loading";
import { Toolbar } from "../components/toolbar";
import { SingleLiveComponents } from "./components";
import { ToastAndroid } from "react-native";

type Props = {
  goBackHandler: () => void;
  thumnailImageUri: string;
  contentName: string;
  videoRef?: any;
  videoUri?: string;
  imageUrl: string;
  description: string;
  openRecordBottomSheetHandler: () => void;
  isLiveRecording: boolean;
};

const thumbnailHeight = 500;

const toaster = new Toaster();

export function SingleLiveHeader({
  goBackHandler,
  thumnailImageUri,
  contentName,
  videoRef,
  videoUri,
  imageUrl,
  description,
  openRecordBottomSheetHandler,
  isLiveRecording,
}: Props) {
  const [rotationStatus, setRotationStatus] = useState<1 | 3>(3);

  const navigation = useNavigation<UseNavigationType>();
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

  const _pauseVideo = async () => {
    await videoRef?.current?.pauseAsync();
  };

  const captureScreenShot = async (position: number | string) => {
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

  const _takeScreenShotHandler = async () => {
    if (!videoRef?.current) {
      return;
    }
    await _pauseVideo();

    const position = await _getCurrenMilSec();
    await captureScreenShot(position);
  };

  const _recordLiveHandler = async () => {
    if (isLiveRecording) {
      ToastAndroid.show("Live is already recording", ToastAndroid.SHORT);
      return;
    }
    openRecordBottomSheetHandler();
  };

  const toolbarOptions = [
    {
      id: 1,
      func: _recordLiveHandler,
      icon: isLiveRecording ? (
        <ICON_RECORD_VOIC_IS_RECORDING width={20} height={20} />
      ) : (
        <ICON_RECORD_VOIC_ACTIVE width={20} height={20} />
      ),
      isDisable: false,
    },
    {
      id: 2,
      func: _takeScreenShotHandler,
      icon: <ICON_TAKE_PHOTO />,
      isDisable: false,
    },
  ];

  return (
    <>
      <Box position="relative" zIndex={20}>
        <Box>
          <GoBackButton
            goBackHandler={goBackHandler}
            hasBackground={true}
            isOwner={false}
          />
          <Box width="100%" height={thumbnailHeight}>
            <SingleLiveComponents.VideoPlayer
              videoRef={videoRef}
              thumnailImageUri={thumnailImageUri}
              videoAreaRef={videoAreaRef}
              videoUri={videoUri}
              setRotationStatus={setRotationStatus}
              thumbnailHeight={thumbnailHeight}
            />
          </Box>
        </Box>
        <PaddingContainer>
          <RenderIfWithoutLoading condition={videoUri ? true : false}>
            <Toolbar toolbarList={toolbarOptions} />
          </RenderIfWithoutLoading>
          <SingleLiveComponents.Title
            videoUri={videoUri}
            imageUrl={imageUrl}
            contentName={contentName}
          />
          <SingleLiveComponents.Description description={description} />
        </PaddingContainer>
      </Box>
    </>
  );
}
