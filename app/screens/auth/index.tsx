import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthLogo } from './components/logo';
import { AuthRoot } from './pages/auth-root';
import { ReactNode, useState } from 'react';
import { Signin } from './pages/signin';
import { Login } from './pages/login';


export function AuthScreen() {
    const [currentWindow, setCurrentWindow] = useState<
        'root' | 'login' | 'singin'
    >('root');

    const setWindowHandler = (window: 'login' | 'singin') => {
        setCurrentWindow(window);
    };

    const authWindows: Record<'root' | 'login' | 'singin', ReactNode> = {
        root: <AuthRoot setWindowHandler={setWindowHandler} />,
        login: <Login />,
        singin: <Signin />
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#030340', paddingBottom: 50 }}>
                <AuthLogo />
                {authWindows[currentWindow]}
            </ScrollView>
        </SafeAreaView>
    );
}
