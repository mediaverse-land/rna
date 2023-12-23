import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { Text } from '../../../../components/text';
import { theme } from '../../../../constaints/theme';
import { PaddingContainer } from '../../../../styles/grid';
import { RootState } from '../../../../store';

export const Description = () => {
  const { description } = useSelector((state: RootState) => state.singelTextSlice);

  return (
    <Box marginTop={32}>
      <PaddingContainer>
        <Box>
          <Text fontSize={14} fontWeight={400} color={theme.color.light.TEXT}>
            {description}
          </Text>
          <Text fontSize={14} fontWeight={400} color={theme.color.light.LIGHT_TEXT}>
            more...
          </Text>
        </Box>
      </PaddingContainer>
    </Box>
  );
};
