import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { Text } from '../../../../components/text';
import { theme } from '../../../../constaints/theme';
import { RootState } from '../../../../store';
import { PaddingContainer } from '../../../../styles/grid';

export const ImageTitle = () => {
  const { name } = useSelector((state: RootState) => state.singleAssetSlice);

  return (
    <PaddingContainer>
      <Box marginTop={32}>
        <Text color={theme.color.light.WHITE} fontSize={20} fontWeight={600}>
          {name ||'name'}
        </Text>
      </Box>
    </PaddingContainer>
  );
};
