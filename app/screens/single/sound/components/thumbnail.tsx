import { FC } from 'react';
import { Box } from '../../../../components/box';
import { ICON_SOUND_WHITE } from '../../../../constaints/icons';
import { windowSize } from '../../../../utils/window-size';
import { Image } from 'react-native';
import { SINGLE_SOUND_COVER_IMAGE_GRADIENT } from '../../../../constaints/images';

type ThumbnailProps = {
  thumbnailRui?: string;
};

const { width } = windowSize();

const ITEM_WIDTH = width - 192;

export const Thumbnail: FC<ThumbnailProps> = ({ thumbnailRui }) => {
  return (
    <Box
      borderRadius={8}
      position="relative"
      width={ITEM_WIDTH}
      height={ITEM_WIDTH}
      id="thumbnail-wrapper"
    >
      <Image
        source={{ uri: thumbnailRui }}
        style={{
          width: ITEM_WIDTH,
          height: ITEM_WIDTH,
          borderRadius: 16,
        }}
      />
      <Box zIndex={10} position="absolute" bottom={24} left={24}>
        <ICON_SOUND_WHITE />
      </Box>
      {!thumbnailRui ? (
        <>
          <Image
            source={{
              uri: SINGLE_SOUND_COVER_IMAGE_GRADIENT,
            }}
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              zIndex: 2,
              height: '100%',
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
            resizeMode="stretch"
          />
        </>
      ) : null}
    </Box>
  );
};
