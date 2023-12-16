import { TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';

type Props = {
  backgroundColor: string;
  textColor: string;
  icon: any;
  text: string;
  onpress: any;
};

export function AuthProviderButton({ backgroundColor, textColor, icon, text, onpress }: Props) {
  return (
    <TouchableOpacity onPress={onpress} activeOpacity={1}>
      <Box
        width="100%"
        borderRadius={32}
        marginBottom={16}
        backgroundColor={backgroundColor}
        direction="row"
        alignItems="center"
        justifyContent="center"
        paddingTop={14}
        paddingBottom={14}
      >
        {icon}
        <Text color={textColor} fontWeight={600} lineHeight={20} fontSize={14} marginLeft={10}>
          {text}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
