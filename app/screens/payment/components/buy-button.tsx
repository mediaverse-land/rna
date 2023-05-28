import { TouchableOpacity } from 'react-native';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';

type Props = {
    setPayHandler: () => void;
};

export function BuyButton({ setPayHandler }: Props) {
    const buyButtonPressHandler = () => {
        setPayHandler();
    };

    return (
        <Box
            width="100%"
            height={80}
            backgroundColor="transparent"
            paddingLeft={24}
            paddingRight={24}
        >
            <TouchableOpacity onPress={buyButtonPressHandler}>
                <Box
                    width="100%"
                    height={48}
                    backgroundColor="#597AFF"
                    marginTop={10}
                    borderRadius={32}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text
                        color="#fff"
                        fontSize={14}
                        lineHeight={20}
                        fontWeight={600}
                    >
                        Buy
                    </Text>
                </Box>
            </TouchableOpacity>
        </Box>
    );
}
