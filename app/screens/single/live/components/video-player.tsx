import ViewShot from 'react-native-view-shot';
import { Box } from '../../../../components/box';
import { ResizeMode, Video } from 'expo-av';

type VideoPlayerProps = {
  videoAreaRef: any;
  videoUri: string;
  thumnailImageUri: string;
  setRotationStatus: (args: 1 | 3) => void;
  videoRef: any;
  thumbnailHeight: number;
};

export const SingleLiveVideoPlayer = ({
  videoAreaRef,
  videoUri,
  thumnailImageUri,
  setRotationStatus,
  videoRef,
  thumbnailHeight,
}: VideoPlayerProps) => {
  return (
    <Box id="video-player" width={'100%'} height={thumbnailHeight}>
      <ViewShot
        style={{ flex: 1 }}
        ref={videoAreaRef}
        options={{
          format: 'jpg',
          result: 'base64',
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
              width: '100%',
              height: thumbnailHeight,
              backgroundColor: 'black',
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
  );
};
