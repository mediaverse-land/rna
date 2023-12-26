import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { Text } from '../../../../components/text';
import { theme } from '../../../../constaints/theme';
import { RootState } from '../../../../store';
import { PaddingContainer } from '../../../../styles/grid';

export const SoundTitle = () => {
  const { name } = useSelector((state: RootState) => state.singleAssetSlice);

  return (
    <PaddingContainer>
      <Box marginTop={24}>
        <Text
          color={theme.color.light.WHITE}
          fontSize={20}
          textStyles={{
            textAlign: 'center',
          }}
          fontWeight={600}
        >
          {name}
        </Text>
      </Box>
    </PaddingContainer>
  );
};
