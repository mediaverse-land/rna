import { Image, TouchableOpacity } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
import ViewShot from 'react-native-view-shot';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '../../../../components/box';
import { ICON_VIDEO_PLAY, ICON_VIDEO_WHITE } from '../../../../constaints/icons';
import { GoBackButton } from '../../components/goback-button';
import { AppDispatch, RootState } from '../../../../store';
import { VideoPlayer } from '../../../../components/video-player';
import { videPlayerUtils } from '../../../../components/video-player/utils';
import { ViewShoter } from '../../../../components/view-shot';
import {
  openToolbarHandler,
  setTakeScreenShotMethodHandler,
} from '../../../../slices/single-asset.slice';
import { setParam } from '../../../../slices/plus.slice';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../../types/use-navigation';
import { alertContext } from '../../../../context/alert';

export const VideoHeader = ({ video_position }: { video_position: any }) => {
  const { top } = useSafeAreaInsets();
  const [isPlayStarted, setIsPlayStarted] = useState(false);

  const { thumnails, file } = useSelector((state: RootState) => state.singleAssetSlice);
  const thumbnailUri = thumnails?.['390x264'];

  const alertCtx = useContext(alertContext)

  const navigation = useNavigation<UseNavigationType>()
  const dispatch = useDispatch<AppDispatch>();

  const videoPlayerRef = useRef<Video>(null);
  const videoAreaRef = useRef<ViewShot>(null);

  const _getCurrenMilSec = async () => {
    const mils = await videPlayerUtils.getCurrenMilSec(videoPlayerRef);
    return mils;
  };

  const pauseVide = async () => {
    await videPlayerUtils?.pauseVide(videoPlayerRef);
  };

  const _takeScreenShotHandler = async () => {
    await pauseVide();

    const position = await _getCurrenMilSec();
    if(!position){
      alertCtx.fire('To take screenshot, start the video first', 'warning');
      return
    }

    try {
      await videoAreaRef.current?.capture().then((uri: string) => {
        if (uri) {
          dispatch(
            setParam({
              video_position: position,
              IS_REDIRECTED_FROM_CREATE_SCREENSHOT: 'true',
            }),
          );
          navigation.navigate('Plus');
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(setTakeScreenShotMethodHandler(_takeScreenShotHandler));
  }, []);

  const toolbarClickHandler = () => {
    dispatch(openToolbarHandler());
  };

  const goBackHandler = () => {
    navigation.goBack(); 
  }

  return (
    <Box marginTop={top} position="relative" width="100%">
      <Box position="absolute" width="100%" left={0} zIndex={1000} top={0}>
        <GoBackButton
          hasBackground
          goBackHandler={goBackHandler}
          toolbarClickHandler={toolbarClickHandler}
          isOwner
          showToolbarMenu
        />
      </Box>
      <Box borderBottomLeftRadius={16} borderBottomRightRadius={16} width="100%" height={264}>
        <ThumbnailImage
          isPlayStarted={isPlayStarted}
          thumbnailUri={thumbnailUri}
          setIsPlayStarted={setIsPlayStarted}
        />
        <ViewShoter ref={videoAreaRef}>
          <VideoPlayer
            isPlayStarted={isPlayStarted}
            ref={videoPlayerRef}
            posterSource={thumbnailUri}
            videoUri={file?.url}
            video_position={video_position}
          />
        </ViewShoter>
      </Box>
    </Box>
  );
};

const headerBgGradientProps: any = {
  style: {
    width: '100%',
    height: 264,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 1,
    posistion: 'relative',
    zInde: 1,
  },
  colors: ['#5e5f6c', 'transparent'],
  start: {
    x: 0.1,
    y: 0.7,
  },
};

const thumbnailConverGradientProps: any = {
  style: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 1,
    posistion: 'relative',
    zInde: 3,
    top: -265,
    length: 1,
  },
  colors: ['rgba(11, 11, 50, 0.00)', 'rgba(11, 11, 49, 0.70)'],
  start: {
    x: 0.4,
    y: 0,
  },
};

const ThumbnailImage = ({
  thumbnailUri,
  setIsPlayStarted,
  isPlayStarted,
}: {
  thumbnailUri: string;
  setIsPlayStarted: (start: boolean) => void;
  isPlayStarted: boolean;
}) => {
  if (isPlayStarted) {
    return null;
  }
  return (
    <Box height={264}>
      <LinearGradient {...headerBgGradientProps}>
        <Image
          source={{
            uri: thumbnailUri,
          }}
          style={{
            width: '100%',
            height: '100%',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            position: 'relative',
            zIndex: 2,
          }}
        />
      </LinearGradient>

      <LinearGradient {...thumbnailConverGradientProps}>
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <TouchableOpacity onPress={() => setIsPlayStarted(true)}>
            <ICON_VIDEO_PLAY />
          </TouchableOpacity>
        </Box>
        <VideoTypeIcon />
      </LinearGradient>
    </Box>
  );
};

const VideoTypeIcon = () => {
  return (
    <Box position="absolute" bottom={24} left={24}>
      <ICON_VIDEO_WHITE />
    </Box>
  );
};
