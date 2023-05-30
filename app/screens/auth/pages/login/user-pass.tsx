import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../../shared/types/use-navigation';
import { Box } from '../../../../shared/components/box';
import { Text } from '../../../../shared/components/text';
import { Input } from '../../../../shared/components/form';

export const UserPass = () => {
    const navigation = useNavigation<UseNavigationType>();

    const navigateToExploreHandler = () => {
        navigation.navigate('AppStack');
    };

    return (
        <>
            <Box height="60%" marginTop={150} alignItems="center">
                <Text
                    color="#fff"
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                >
                    Insert your username and password
                </Text>

                <Box width="100%" marginTop={40} position="relative">
                    <Input
                        placeholder="Insert username..."
                        labelText="Username"
                    />
                </Box>
                <Box width="100%" marginTop={16} position="relative">
                    <Input
                        placeholder="Insert password..."
                        labelText="Password"
                    />
                </Box>
                <Box
                    width="100%"
                    alignItems="center"
                    position="absolute"
                    bottom={2}
                >
                    <Text
                        color="#83839C"
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                        marginBottom={24}
                    >
                        DOnt have an account?
                        <Text color="#597AFF"> Signup</Text>
                    </Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            width: '100%'
                        }}
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
                                color="#fff"
                                lineHeight={20}
                                fontSize={12}
                                fontWeight={600}
                            >
                                Log in
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </>
    );
};
