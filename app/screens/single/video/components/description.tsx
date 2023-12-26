import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { RootState } from '../../../../store';
import { PaddingContainer } from '../../../../styles/grid';
import { SingleItemDescription } from '../../components/description';
import { memo } from 'react';

const VideoDescriptionMemo = () => {
  const { description } = useSelector((state: RootState) => state.singleAssetSlice);

  if(!description){
    return null
  }

  return (
    <PaddingContainer>
      <Box marginTop={16}>
        <SingleItemDescription description={description} />
      </Box>
    </PaddingContainer>
  );
};

export const VideoDescription = memo(VideoDescriptionMemo)