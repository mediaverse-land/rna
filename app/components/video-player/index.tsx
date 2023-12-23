import { Ref, forwardRef, useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { Box } from '../box';
import { ActivityIndicator } from 'react-native';

type Props = {
  posterSource: string;
  video_position: number;
  videoUri: string;
  isPlayStarted: boolean;
};

const thumbnailHeight = 264;

export const VideoPlayer = forwardRef((props: Props, ref: Ref<Video>) => {
  const { posterSource, video_position, videoUri, isPlayStarted } = props;

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  if (!videoUri) {
    return null;
  }

  if (!isPlayStarted) {
    return null;
  }

  return (
    <Box id="video-player" width={'100%'} height={thumbnailHeight}>
      {!isVideoLoaded ? (
        <Box width="100%" height={thumbnailHeight} alignItems="center" justifyContent="center">
          <ActivityIndicator />
        </Box>
      ) : null}
      <Video
        shouldPlay={true}
        posterSource={{
          uri: posterSource,
        }}
        ref={ref}
        style={{
          width: '100%',
          height: thumbnailHeight,
          backgroundColor: 'black',
          display: isVideoLoaded ? 'flex':'none'
        }}
        positionMillis={video_position}
        source={{
          uri: videoUri,
        }}
        onFullscreenUpdate={(e) => {
          console.log(e);
          //   const { fullscreenUpdate }: any = e;
          //   setRotationStatus(fullscreenUpdate);
        }}
        onLoad={() => {
          setIsVideoLoaded(true);
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </Box>
  );
});

VideoPlayer.displayName = 'VideoPlayer';
