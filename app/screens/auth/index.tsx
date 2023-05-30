import { ReactNode, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthLogo } from './components/logo';
import { AuthRoot } from './pages/auth-root';
import { StatusBar } from 'react-native';
import { Signin } from './pages/signin';
import { AuthWindows } from './pages/types';
import { Login } from './pages/login';

export function AuthScreen() {
    const [currentWindow, setCurrentWindow] = useState<AuthWindows>('root');

    const setWindowHandler = (window: AuthWindows) => {
        setCurrentWindow(window);
    };

    const authWindows: Record<AuthWindows, ReactNode> = {
        root: <AuthRoot setWindowHandler={setWindowHandler} />,
        login: <Login />,
        singin: <Signin />
    };

    return (
        <>
            <StatusBar backgroundColor={'#030340'} barStyle="light-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: '#030340',
                        paddingBottom: 50
                    }}
                >
                    <AuthLogo />
                    {authWindows[currentWindow]}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
