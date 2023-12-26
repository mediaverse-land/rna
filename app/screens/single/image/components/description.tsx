import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { RootState } from '../../../../store';
import { PaddingContainer } from '../../../../styles/grid';
import { SingleItemDescription } from '../../components/description';
import { memo } from 'react';

const ImageDescriptionMemo = () => {
  const { description } = useSelector((state: RootState) => state.singleAssetSlice);

  return (
    <PaddingContainer>
      <Box marginTop={16}>
        <SingleItemDescription description={description|| "ImageDescriptionMemo"} />
      </Box>
    </PaddingContainer>
  );
};

export const ImageDescription = memo(ImageDescriptionMemo)