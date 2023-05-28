import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthLogo } from "./components/logo";
import { AuthRoot } from "./pages/auth-root";
import { ReactNode, useState } from "react";
import { Signin } from "./pages/signin";
import { Box } from "../../shared/components/box";
import { windowSize } from "../../utils/window-size";
import { Login } from "./pages/login";

const { height } = windowSize()

export function AuthScreen() {
    const [currentWindow, setCurrentWindow] = useState<'root' | 'login' | 'singin'>('root');

    const setWindowHandler = (window: 'login' | 'singin') => {
        setCurrentWindow(window)
    }

    const authWindows: Record<'root' | 'login' | 'singin', ReactNode> = {
        root: <AuthRoot setWindowHandler={setWindowHandler} />,
        login: <Login />,
        singin: <Signin />,
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#030340' }}>
                <Box flex={1} height={height}>
                    <AuthLogo />
                    {authWindows[currentWindow]}
                </Box>
            </ScrollView>
        </SafeAreaView >
    )
}