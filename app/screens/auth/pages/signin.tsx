import { useState, ReactNode } from 'react'
import { Box } from "../../../shared/components/box";
import { AuthProviderButton } from '../components/auth-provider-button';
import { PaddingContainer } from '../../../styles/grid';
import { Text } from '../../../shared/components/text';
import { TouchableOpacity } from 'react-native';
import { providerButtons } from '../mock-data';
import { Input } from '../../../shared/components/form';
import { ICON_FRANCE_FLAG } from '../../../constaints/icons';
import { FillData } from './fill-data';

export function Signin() {
    const [signUpCurrentWindow, setSigUpCurrentWindow] =
        useState<'SINGUP_WITH_PROVIDER' | 'SIGNUP_WITH_USERNAME'>('SINGUP_WITH_PROVIDER')


    const setSIgnupWithUsernameHandler = () => {
        setSigUpCurrentWindow('SIGNUP_WITH_USERNAME')
    }

    const currentWindow: Record<'SINGUP_WITH_PROVIDER' | 'SIGNUP_WITH_USERNAME', ReactNode> = {
        SINGUP_WITH_PROVIDER: <SignUpWithProvider setSIgnupWithUsernameHandler={setSIgnupWithUsernameHandler} />,
        SIGNUP_WITH_USERNAME: <SignUpWithUsername />
    }

    return (
        <Box flex={1} marginTop={250} >
            <PaddingContainer >
                {currentWindow[signUpCurrentWindow]}
            </PaddingContainer>
        </Box>
    )
}



function SignUpWithProvider({ setSIgnupWithUsernameHandler }: { setSIgnupWithUsernameHandler: () => void }) {
    return (
        <Box>
            {providerButtons.map((f) => (
                <AuthProviderButton
                    key={f.id}
                    icon={f.icon}
                    backgroundColor={f.backgroundColor}
                    textColor={f.textColor}
                    text={f.text}
                />
            ))}
            <Box
                width='100%'
                height={124}
                alignItems='center'
                justifyContent='center'
            >
                <Text
                    color='#fff'
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                >Or</Text>
            </Box>
            <TouchableOpacity onPress={setSIgnupWithUsernameHandler}>
                <Box
                    width='100%'
                    height={48}
                    alignItems='center'
                    justifyContent='center'
                    borderRadius={32}
                    backgroundColor='rgba(78, 78, 97, 0.5)'
                >
                    <Text
                        color='#fff'
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                    >Sign up with number</Text>
                </Box>
            </TouchableOpacity>
        </Box>
    )
}


function SignUpWithUsername() {
    const [currentWindow, setCurrentWindow] =
        useState<'INSERT_PHONE' | 'SEND_CODE' | 'FILL_DATA'>('INSERT_PHONE');

    const setCurrentWindowHandler = (window: 'INSERT_PHONE' | 'SEND_CODE' | 'FILL_DATA') => {
        setCurrentWindow(window)
    }

    const windows: any = {
        INSERT_PHONE: <InsertPhone setCurrentWindowHandler={setCurrentWindowHandler} />,
        SEND_CODE: <SendCode setCurrentWindowHandler={setCurrentWindowHandler} />,
        FILL_DATA: <FillData />,
    }
    return (
        <Box height={'100%'} >{windows[currentWindow]}</Box>
    )
}

function SendCode({ setCurrentWindowHandler }: { setCurrentWindowHandler: any }) {
    return (
        <>
            <Box height='100%' marginTop={-50} alignItems='center'>
                <Text
                    color='#fff'
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                >We send the code to +339012910407</Text>

                <Box width='100%' marginTop={40} position='relative'>
                    <Input
                        placeholder='your number...'
                        labelText='Code'
                    />
                </Box>
                <Box width='100%' alignItems='center' position='absolute' bottom={2}>
                    <Text color='#83839C'
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                        marginBottom={24}
                    >
                        Have an account?
                        <Text color='#597AFF'> {' '}Log in</Text>
                    </Text>
                    <TouchableOpacity style={{
                        width: '100%'
                    }} onPress={() => setCurrentWindowHandler('FILL_DATA')}>
                        <Box
                            width='100%'
                            height={48}
                            alignItems='center'
                            justifyContent='center'
                            borderRadius={32}
                            backgroundColor='rgba(78, 78, 97, 0.5)'
                        >
                            <Text
                                color='#fff'
                                lineHeight={20}
                                fontSize={12}
                                fontWeight={600}
                            >Send code</Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </>
    )
}


function InsertPhone({ setCurrentWindowHandler }: { setCurrentWindowHandler: any }) {
    return (
        <>
            <Box height='100%' marginTop={-50} alignItems='center'>
                <Text
                    color='#fff'
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                >Insert your number for loging in.</Text>

                <Box width='100%' marginTop={40} position='relative'>
                    <Input
                        placeholder='your number...'
                        labelText='+33'
                        labelIcon={<ICON_FRANCE_FLAG
                            style={{
                                width: 25,
                                height: 18,
                                marginTop: 10,
                                paddingTop: 10,
                                position: 'relative',
                                top: 5
                            }}
                        />}
                    />
                </Box>
                <Box width='100%' alignItems='center' position='absolute' bottom={2}>
                    <Text color='#83839C'
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                        marginBottom={24}
                    >
                        Have an account?
                        <Text color='#597AFF'> {' '}Log in</Text>
                    </Text>
                    <TouchableOpacity style={{
                        width: '100%'
                    }} onPress={() => setCurrentWindowHandler('SEND_CODE')}>
                        <Box
                            width='100%'
                            height={48}
                            alignItems='center'
                            justifyContent='center'
                            borderRadius={32}
                            backgroundColor='rgba(78, 78, 97, 0.5)'
                        >
                            <Text
                                color='#fff'
                                lineHeight={20}
                                fontSize={12}
                                fontWeight={600}
                            >Send code</Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </>
    )
}