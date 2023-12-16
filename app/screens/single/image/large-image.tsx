import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { windowSize } from '../../../utils/window-size';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Box } from '../../../components/box';
import { ICON_X_WHITE } from '../../../constaints/icons';

type Props = {
  hasFile: boolean;
  showLargeImage: boolean;
  fileUrl: string;
  hideLargeImageHandler: () => void;
};

export function AssetLargeImage({
  hasFile,
  showLargeImage,
  fileUrl,
  hideLargeImageHandler,
}: Props) {
  const [imageSize, setImageSize] = useState<{
    imgWidth: number;
    imgHeight: number;
  }>(null);

  const [orientation, setOrientation] = useState<
    ScreenOrientation.OrientationLock.PORTRAIT | ScreenOrientation.OrientationLock.LANDSCAPE
  >(ScreenOrientation.OrientationLock.PORTRAIT);

  const [_windowSize, _setWindowSize] = useState(windowSize());

  if (!hasFile) {
    return null;
  }

  useEffect(() => {
    setImageSizeHandler();
  }, [fileUrl]);

  useEffect(() => {
    if (showLargeImage) {
      setScreenOrientationHandler();
    }

    return () => {
      lockScreenOrientationHandler();
    };
  }, [showLargeImage]);

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((info: any) => {
      setOrientation(info.orientation);
    });

    // subscribe to future changes
    const subscription = ScreenOrientation.addOrientationChangeListener((evt: any) => {
      setOrientation(evt.orientationInfo.orientation);
    });

    // return a clean up function to unsubscribe from notifications
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  useEffect(() => {
    const updatedWindowSize = windowSize();
    _setWindowSize(updatedWindowSize);

    setImageSizeHandler(updatedWindowSize.width);
  }, [orientation]);

  const setImageSizeHandler = (staticWidth?: number) => {
    Image.getSize(fileUrl, (width, height) => {
      const screenWidth = staticWidth || _windowSize.width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;

      setImageSize({ imgWidth: screenWidth, imgHeight: imageHeight });
    });
  };

  const setScreenOrientationHandler = async () => {
    setOrientation(ScreenOrientation.OrientationLock.PORTRAIT);

    await ScreenOrientation.unlockAsync();
  };

  const lockScreenOrientationHandler = async () => {
    setOrientation(ScreenOrientation.OrientationLock.LANDSCAPE);

    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  };

  return (
    <>
      <Box
        width={76}
        height={40}
        position="absolute"
        top={20}
        left={24}
        zIndex={110}
        borderRadius={16}
        backgroundColor="#000000e6"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: 76,
            height: 40,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={hideLargeImageHandler}
        >
          <ICON_X_WHITE />
        </TouchableOpacity>
      </Box>
      <TouchableOpacity
        style={{
          width: '100%',
          height: _windowSize.height,
          backgroundColor: '#0c0d0ebd',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: 0,
          zIndex: 100,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        activeOpacity={1}
      >
        <View>
          {fileUrl && imageSize?.imgWidth ? (
            <Image
              source={{
                uri: fileUrl,
              }}
              style={{
                width: imageSize.imgWidth,
                height: imageSize.imgHeight,
                position: 'relative',
                zIndex: 110,
              }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    </>
  );
}
