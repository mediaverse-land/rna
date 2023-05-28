import { useState } from 'react';
import { Box } from '../../../shared/components/box';
import { PaddingContainer } from '../../../styles/grid';
import { Text } from '../../../shared/components/text';
import { TouchableOpacity } from 'react-native';
import { Input } from '../../../shared/components/form';
import { ICON_FRANCE_FLAG } from '../../../constaints/icons';
import { useNavigation } from '@react-navigation/native';
import { windowSize } from '../../../utils/window-size';

export function Login() {
    const [currentWindow, setCurrentWindow] = useState<
        'INSERT_PHONE' | 'SEND_CODE' | 'USER_PASS'
    >('INSERT_PHONE');

    const setCurrentWindowHandler = (
        window: 'INSERT_PHONE' | 'SEND_CODE' | 'USER_PASS'
    ) => {
        setCurrentWindow(window);
    };

    const windows: any = {
        INSERT_PHONE: (
            <InsertPhone setCurrentWindowHandler={setCurrentWindowHandler} />
        ),
        SEND_CODE: <SendCode />,
        USER_PASS: <UserPass />
    };
    return (
        <PaddingContainer>
            <Box additionalStyles={{
                minHeight: Math.floor(height) - 150
            }}>{windows[currentWindow]}</Box>
        </PaddingContainer>
    );
}

function SendCode() {
    const navigation = useNavigation<any>();

    const navigateToExploreHandler = () => {
        navigation.navigate('AppStack');
    };

    return (
        <>
            <Box flex={1} alignItems="center">
                <Box position="relative"
                    top={'27%'}
                    alignItems='center'
                >

                    <Text
                        color="#fff"
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
                        color="#83839C"
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                        marginBottom={24}
                    >
                        Have an account?
                        <Text color="#597AFF"> Log in</Text>
                    </Text>
                    <TouchableOpacity
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
                                Send code
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </>
    );
}

const { height } = windowSize();

function InsertPhone({
    setCurrentWindowHandler
}: {
    setCurrentWindowHandler: any;
}) {
    return (
        <>
            <Box height={Math.floor(height) - 170} alignItems="center">
                <Text
                    color="#fff"
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                >
                    Insert your number for loging in.
                </Text>

                <Box width="100%" marginTop={40} position="relative">
                    <Input
                        placeholder="your number..."
                        labelText="+33"
                        labelIcon={
                            <ICON_FRANCE_FLAG
                                style={{
                                    width: 25,
                                    height: 18
                                }}
                            />
                        }
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
                        style={{
                            width: '100%'
                        }}
                        onPress={() => setCurrentWindowHandler('SEND_CODE')}
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
                                Send code
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </>
    );
}

function UserPass() {
    const navigation = useNavigation<any>();

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
}
