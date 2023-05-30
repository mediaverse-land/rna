import { TouchableOpacity } from 'react-native';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';

type Props = {
    backgroundColor: string;
    textColor: string;
    icon: any;
    text: string;
};

export function AuthProviderButton({
    backgroundColor,
    textColor,
    icon,
    text
}: Props) {
    return (
        <TouchableOpacity activeOpacity={1}>
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
                <Text
                    color={textColor}
                    fontWeight={600}
                    lineHeight={20}
                    fontSize={14}
                    marginLeft={10}
                >
                    {text}
                </Text>
            </Box>
        </TouchableOpacity>
    );
}
