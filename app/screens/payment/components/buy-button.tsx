import { TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';

type Props = {
  setPayHandler: () => void;
};

export function BuyButton({ setPayHandler }: Props) {
  const buyButtonPressHandler = () => {
    setPayHandler();
  };

  return (
    <Box width="100%" height={80} backgroundColor="transparent" paddingLeft={24} paddingRight={24}>
      <TouchableOpacity activeOpacity={1} onPress={buyButtonPressHandler}>
        <Box
          width="100%"
          height={48}
          backgroundColor={theme.color.light.PRIMARY}
          marginTop={10}
          borderRadius={32}
          alignItems="center"
          justifyContent="center"
        >
          <Text color={theme.color.light.WHITE} fontSize={14} lineHeight={20} fontWeight={600}>
            Buy
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
