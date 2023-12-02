import { useEffect, useState } from "react";
import { Dimensions, StatusBar, TouchableOpacity, View } from "react-native";
import * as Notifications from "expo-notifications";
import { AlertContextProvider } from "./app/context/alert";
import { TokenContextProvider } from "./app/context/token";
import { UserContextProvider } from "./app/context/user";
import { RootNavigator } from "./root-navigator";
import { Provider } from "react-redux";
import { ClickOutsideProvider } from "react-native-click-outside";
import store from "./app/store";
import { Toaster } from "./app/utils/toaster";
import messaging from "@react-native-firebase/messaging";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

const _toaster = new Toaster();

Notifications.setNotificationChannelAsync("location-reached", {
  name: "location-reached",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#597AFF",
  showBadge: true,
  sound: "default",
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

// const [isLoaded] = useFonts({
//   "mrt-mid": require("./assets/fonts/Montserrat-Medium.ttf"),
//   "mrt-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
//   "mrt-xbold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
// });

export default function App() {
  const [token, setToken] = useState("");
  const [newPushMessage, setNewPushMessage] = useState<any>(null);

  const [isLoaded] = useFonts({
    default: require("./assets/fonts/IRANSans.ttf"),
    light: require("./assets/fonts/IRANSans_Light.ttf"),
    medium: require("./assets/fonts/IRANSans_Medium.ttf"),
    // bold: require("./assets/fonts/IRANSans_Bold.ttf"),
  });

  useEffect(() => {
    const handleOnLayout = async () => {
      if (isLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    handleOnLayout();
  }, [isLoaded]);

  const isDevMode = () => __DEV__;

  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // console.log("Authorization status:", authStatus);
      }
    } catch (err) {
      // console.log(err);
    }
  }

  useEffect(() => {
    if (isDevMode()) {
      return;
    }
    if (requestUserPermission()) {
      // Return fcm token key
      messaging()
        .getToken()
        .then((token: string) => {
          setToken(token);
        });
    } else {
      _toaster.show("failed to getToken");
    }

    // Getting initial notification
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          // console.log(
          //   "Notification caused app to open from quit state:",
          //   remoteMessage.notification
          // );
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      // console.log(
      //   "Notification caused app to open from background state:",
      //   remoteMessage.notification
      // );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      // console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      setNewPushMessage(remoteMessage);
    });

    return unsubscribe;
  }, []);


  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <ClickOutsideProvider>
          <TokenContextProvider>
            <UserContextProvider>
              <AlertContextProvider>
                  <RootNavigator firebaseToken={token} />
              </AlertContextProvider>
            </UserContextProvider>
          </TokenContextProvider>
        </ClickOutsideProvider>
      </Provider>
      <StatusBar backgroundColor={"#0c0c21"} barStyle="light-content" />
    </>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
  instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
  },
  instructions2: {
      textAlign: 'center',
      color: 'white',
      marginBottom: 5,
  },
});

