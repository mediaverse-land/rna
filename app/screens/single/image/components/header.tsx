import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '../../../../components/box';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Image } from 'react-native';
import { ICON_IMAGE_WHITE } from '../../../../constaints/icons';
import { windowSize } from '../../../../utils/window-size';
import { GoBackButton } from '../../components/goback-button';
import { openToolbarHandler } from '../../../../slices/single-asset.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';

export const ImageHeader = () => {
  const { top } = useSafeAreaInsets();

  const dispatch = useDispatch<AppDispatch>();

  const toolbarClickHandler = () => {
    dispatch(openToolbarHandler());
  };

  return (
    <Box width="100%" marginTop={top} flex={1}>
      <Box position="absolute" width="100%" left={0} zIndex={1000} top={-8}>
        <GoBackButton
          hasBackground
          goBackHandler={() => {}}
          toolbarClickHandler={toolbarClickHandler}
          isOwner
          showToolbarMenu
        />
      </Box>
      <ThumbnailImage />
    </Box>
  );
};

const { width } = windowSize();

const ThumbnailImage = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const imageRatio = 1.778;

  const { thumnails } = useSelector((state: RootState) => state.singleAssetSlice);

  const thumb = thumnails?.['390x218'];

  const IMAGE_HEIGHT = imageRatio > 0 ? width / imageRatio : 0;

  const headerBgGradientProps: any = useMemo(() => {
    return {
      style: {
        width: '100%',
        height: IMAGE_HEIGHT,
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
  }, [IMAGE_HEIGHT]);

  const thumbnailConverGradientProps: any = useMemo(() => {
    return {
      style: {
        width: '100%',
        height: IMAGE_HEIGHT + 20,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        padding: 1,
        zInde: 3,
        top: -239,
        length: 1,
      },
      colors: ['rgba(11, 11, 50, 0.00)', 'rgba(11, 11, 49, 0.70)'],
      start: {
        x: 0.4,
        y: 0,
      },
    };
  }, [IMAGE_HEIGHT]);

  return (
    <Box height={IMAGE_HEIGHT + 3} flex={1}>
      <LinearGradient {...headerBgGradientProps}>
        {isImageLoading ? (
          <Box width="100%" height={200} alignItems="center" justifyContent="center">
            <ActivityIndicator />
          </Box>
        ) : null}
        <Image
          source={{
            uri: thumb,
          }}
          style={{
            display: !imageRatio || IMAGE_HEIGHT === 0 ? 'none' : 'flex',
            width: width,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            position: 'relative',
            zIndex: 2,
            height: IMAGE_HEIGHT,
          }}
          resizeMethod="auto"
          onLoad={() => {
            setIsImageLoading(false);
          }}
        />
      </LinearGradient>

      {isImageLoading || !imageRatio || IMAGE_HEIGHT === 0 ? (
        <></>
      ) : (
        <LinearGradient {...thumbnailConverGradientProps}>
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
          ></Box>
          <ImageTypeIcon />
        </LinearGradient>
      )}
    </Box>
  );
};

const ImageTypeIcon = () => {
  return (
    <Box position="absolute" bottom={24} left={24}>
      <ICON_IMAGE_WHITE />
    </Box>
  );
};
