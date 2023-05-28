import { TouchableOpacity } from 'react-native';
import { Box } from '../../../shared/components/box';
import { HeroShapes } from '../components/hero-shapes';
import { Text } from '../../../shared/components/text';
import { windowSize } from '../../../utils/window-size';

type Props = {
    setWindowHandler: (window: 'login' | 'singin') => void;
};

export function AuthRoot({ setWindowHandler }: Props) {
    return (
        <Box flex={1} paddingBottom={50}>
            <HeroShapes />
            <Box
                width="100%"
                flex={1}
                paddingLeft={24}
                paddingRight={24}
                marginTop={30}
            >
                <TouchableOpacity onPress={() => setWindowHandler('singin')}>
                    <Box
                        width="100%"
                        height={48}
                        backgroundColor="#597AFF"
                        borderRadius={32}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text
                            color="#fff"
                            fontWeight={600}
                            lineHeight={16}
                            fontSize={14}
                        >
                            Lets start
                        </Text>
                    </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setWindowHandler('login')}>
                    <Box
                        width="100%"
                        height={48}
                        backgroundColor="rgba(78, 78, 97, 0.5)"
                        borderRadius={32}
                        alignItems="center"
                        justifyContent="center"
                        marginTop={16}
                    >
                        <Text
                            color="#fff"
                            fontWeight={600}
                            lineHeight={16}
                            fontSize={14}
                        >
                            I have an account
                        </Text>
                    </Box>
                </TouchableOpacity>
                <Text
                    textStyles={{ textAlign: 'center' }}
                    marginTop={24}
                    color="#83839C"
                    fontSize={12}
                    fontWeight={500}
                    lineHeight={16}
                >
                    By registering, you agree to our{' '}
                    <Text color="#597AFF">Terms of Use</Text>.
                </Text>
            </Box>
        </Box>
    );
}
