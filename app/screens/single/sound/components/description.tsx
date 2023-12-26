import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { Text } from '../../../../components/text';
import { theme } from '../../../../constaints/theme';
import { PaddingContainer } from '../../../../styles/grid';
import { RootState } from '../../../../store';

export const SoundDescription = () => {
  const { description } = useSelector((state: RootState) => state.singleAssetSlice);

  return (
    <Box marginTop={32}>
      <PaddingContainer>
        <Box>
          <Text fontSize={14} fontWeight={400} color={theme.color.light.TEXT}>
            {description}
          </Text>
        </Box>
      </PaddingContainer>
    </Box>
  );
};
