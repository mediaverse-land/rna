import { FC } from 'react';
import { Box } from '../../../../components/box';
import { ICON_SIGNLE_TEXT_THUMBNAIL, ICON_TEXT_WHITE } from '../../../../constaints/icons';

type ThumbnailProps = {
  thumbnailRui?: string;
};

export const Thumbnail: FC<ThumbnailProps> = ({ thumbnailRui }) => {
  return (
    <Box borderRadius={8} position="relative" width={127} height={127} id="thumbnail-wrapper">
      {!thumbnailRui ? (
        <>
          <ICON_SIGNLE_TEXT_THUMBNAIL />
          <Box position="absolute" top={127 / 2 - 10} left={127 / 2 - 10}>
            <ICON_TEXT_WHITE />
          </Box>
        </>
      ) : null}
    </Box>
  );
};
