import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { RootState } from '../../../../store';
import { PaddingContainer } from '../../../../styles/grid';
import { SingleItemDescription } from '../../components/description';

export const VideoDescription = () => {
  const { description } = useSelector((state: RootState) => state.singleAssetSlice);

  return (
    <PaddingContainer>
      <Box marginTop={16}>
        <SingleItemDescription description={description} />
      </Box>
    </PaddingContainer>
  );
};
