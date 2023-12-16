import { StatusBar } from 'react-native';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { RootNavigator } from './root-navigator';
import { navigationBarController } from './app/controllers/navigation-bar.controller';
import { useLoadFonts } from './app/hooks/use-load-fonts';
import { splashScreenController } from './app/controllers/splash-screen.controller';
import { useFirebasePushNotification } from './app/hooks/use-firebase-push-notification';
import { AppProviders } from './app-providets';
import { SystemLoggerController } from './app/controllers/system-logger.controller';

splashScreenController.preventAutoHiding();
navigationBarController.fadeNavbarHandler();

const _systemLoggerController = new SystemLoggerController();
_systemLoggerController.hideLogsOnDevelopment();

export default function App() {
  usePreventScreenCapture();

  const [areFontsLoaded] = useLoadFonts();
  const [token] = useFirebasePushNotification();

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <>
      <AppProviders>
        <RootNavigator firebaseToken={token} />
      </AppProviders>
      <StatusBar backgroundColor={'transparent'} barStyle="light-content" />
    </>
  );
}
