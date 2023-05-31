import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../../shared/types/use-navigation';
import { Box } from '../../../../shared/components/box';
import { Text } from '../../../../shared/components/text';
import { Input } from '../../../../shared/components/form';
import { theme } from '../../../../constaints/theme';

export const SendCode = () => {
    const navigation = useNavigation<UseNavigationType>();

    const navigateToExploreHandler = () => {
        navigation.navigate('AppStack');
    };

    return (
        <>
            <Box flex={1} alignItems="center">
                <Box position="relative" top={'27%'} alignItems="center">
                    <Text
                        color={theme.color.light.WHITE}
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                    >
                        We send the code to +339012910407
                    </Text>

                    <Box width="100%" marginTop={40} position="relative">
                        <Input placeholder="your number..." labelText="Code" />
                    </Box>
                </Box>
                <Box
                    width="100%"
                    alignItems="center"
                    position="absolute"
                    bottom={10}
                >
                    <Text
                        color={theme.color.light.LIGHT_DESCRIPTION}
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                        marginBottom={24}
                    >
                        Have an account?
                        <Text color={theme.color.light.PRIMARY}> Log in</Text>
                    </Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.fullWidth}
                        onPress={navigateToExploreHandler}
                    >
                        <Box
                            width="100%"
                            height={48}
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={32}
                            backgroundColor="rgba(78, 78, 97, 0.5)"
                        >
                            <Text
                                color={theme.color.light.WHITE}
                                lineHeight={20}
                                fontSize={12}
                                fontWeight={600}
                            >
                                Send code
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </>
    );
};

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    }
});
