import { StatusBar } from "react-native";
import { usePreventScreenCapture } from "expo-screen-capture";
import { RootNavigator } from "./root-navigator";
import { navigationBarController } from "./app/controllers/navigation-bar.controller";
import { useLoadFonts } from "./app/hooks/use-load-fonts";
import { splashScreenController } from "./app/controllers/splash-screen.controller";
import { useFirebasePushNotification } from "./app/hooks/use-firebase-push-notification";
import { AppProviders } from "./app-providets";

splashScreenController.preventAutoHiding();

navigationBarController.fadeNavbarHandler();

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
      <StatusBar backgroundColor={"#0c0c21"} barStyle="light-content" />
    </>
  );
}
