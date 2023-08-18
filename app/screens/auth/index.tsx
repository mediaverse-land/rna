import { ReactNode, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthLogo } from './components/logo';
import { AuthRoot } from './pages/auth-root';
import { Signin } from './pages/signin';
import { AuthWindows } from './pages/types';
import { Login } from './pages/login';
import { FocusedStatusBar } from '../../components/focused-statusbar';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';

export function AuthScreen() {
    const [currentWindow, setCurrentWindow] = useState<AuthWindows>('root');
    const isFocused = useIsFocused();


    const setWindowHandler = (window: AuthWindows) => {
        setCurrentWindow(window);
    };

    const goBackToSigninWindow = () => {
        setCurrentWindow('singin');
    };

    const authWindows: Record<AuthWindows, ReactNode> = {
        root: <AuthRoot setWindowHandler={setWindowHandler} />,
        login: <Login setWindowHandler={setWindowHandler} />,
        singin: (
            <Signin
                goBackToSigninWindow={goBackToSigninWindow}
                setWindowHandler={setWindowHandler}
            />
        )
    };

    return (
        <>
            {isFocused ? (
                <StatusBar
                    backgroundColor={'#030340'}
                    barStyle="light-content"
                />
            ) : null}
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView style={styles.scrollView}>
                    <AuthLogo />
                    {authWindows[currentWindow]}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#030340',
        paddingBottom: 50
    }
});
