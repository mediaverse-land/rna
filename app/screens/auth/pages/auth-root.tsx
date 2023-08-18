import { TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { HeroShapes } from '../components/hero-shapes';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';


type Props = {
    setWindowHandler: (window: 'login' | 'singin') => void;
};

export function AuthRoot({ setWindowHandler }: Props) {
    const isFocused = useIsFocused();
    return (
        <>
            {isFocused ? (
                <StatusBar
                    backgroundColor={'#030340'}
                    barStyle="light-content"
                />
            ) : null}
            <Box flex={1} paddingBottom={50}>
                <HeroShapes />
                <Box
                    width="100%"
                    flex={1}
                    paddingLeft={24}
                    paddingRight={24}
                    marginTop={30}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setWindowHandler('singin')}
                    >
                        <Box
                            width="100%"
                            height={48}
                            backgroundColor={theme.color.light.PRIMARY}
                            borderRadius={32}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text
                                color={theme.color.light.WHITE}
                                fontWeight={600}
                                lineHeight={16}
                                fontSize={14}
                            >
                                Lets start
                            </Text>
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setWindowHandler('login')}
                    >
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
                                color={theme.color.light.WHITE}
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
                        color={theme.color.light.LIGHT_DESCRIPTION}
                        fontSize={12}
                        fontWeight={500}
                        lineHeight={16}
                    >
                        By registering, you agree to our{' '}
                        <Text color={theme.color.light.PRIMARY}>Terms of Use</Text>.
                    </Text>
                </Box>
            </Box>
        </>
    );
}
