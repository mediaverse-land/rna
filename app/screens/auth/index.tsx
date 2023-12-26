import { ReactNode, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { AuthLogo } from './components/logo';
import { AuthRoot } from './pages/auth-root';
import { Signin } from './pages/signin';
import { AuthWindows } from './pages/types';
import { Login } from './pages/login';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomSafeArea } from '../../components/custom-safe-area';

export function AuthScreen() {
  const [currentWindow, setCurrentWindow] = useState<AuthWindows>('root');
  const isFocused = useIsFocused();

  const setWindowHandler = (window: AuthWindows) => {
    setCurrentWindow(window);
  };

  const goBackToSigninWindow = () => {
    setCurrentWindow('singin');
  };

  const authWindows: Record<AuthWindows, ReactNode> = useMemo(() => {
    return {
      root: <AuthRoot setWindowHandler={setWindowHandler} />,
      login: <Login setWindowHandler={setWindowHandler} />,
      singin: (
        <Signin goBackToSigninWindow={goBackToSigninWindow} setWindowHandler={setWindowHandler} />
      ),
    };
  }, []);

  return (
    <>
      {isFocused ? <StatusBar backgroundColor={'#030340'} barStyle="light-content" /> : null}
      <CustomSafeArea style={styles.safeAreaView}>
        <ScrollView style={styles.scrollView}>
          <LinearGradient
            colors={['#090952', '#030340']}
            start={{ x: 0.7, y: 0 }}
            style={{ flex: 1 }}
          >
            <AuthLogo />
            {authWindows[currentWindow]}
          </LinearGradient>
        </ScrollView>
      </CustomSafeArea>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    // backgroundColor: "#030340",
    paddingBottom: 50,
  },
});
