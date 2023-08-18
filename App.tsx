import { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { AlertContextProvider } from "./app/context/alert";
import { TokenContextProvider } from "./app/context/token";
import { UserContextProvider } from "./app/context/user";
import { RootNavigator } from "./root-navigator";
import { Provider } from "react-redux";
import { ClickOutsideProvider } from "react-native-click-outside";
import { CopilotProvider } from "react-native-copilot";
import store from "./app/store";
import messaging from "@react-native-firebase/messaging";
import {usePreventScreenCapture} from 'expo-screen-capture'

const firebaseConfig = {
  apiKey:
    "AAAADTahA-4:APA91bGns4AfNlQt5ybxBCOwQtgbAdWZcg1gPzpEZXfV4Qy9dRbSH24nCWd0qE-j-jo4XZ3JUzSzy3kJ9yCwzjjswcrmUgCFypYmYzHL6CL8ZQ6bXhHU1szY6m5U2aRY7YO9Y-uPgCli",
  authDomain: "argon-depot-370512.firebaseapp.com",
  databaseURL: "https://argon-depot-370512.firebaseio.com",
  projectId: "argon-depot-370512",
  storageBucket: "argon-depot-370512.appspot.com",
  messagingSenderId: "56751096814",
  appId: "1:56751096814:android:c26a5a1296539fbe3704ff",
  measurementId: "G-measurement-id",
};

export default function App() {
  usePreventScreenCapture()
  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     Alert.alert(`Authorization status:${authStatus}`, );
  //   }
  // };

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     // Request FMC token for the device
  //     messaging()
  //       .getToken()
  //       .then((token) => {
  //         console.log(token);
  //       });
  //   } else {
  //     Alert.alert(`Failed to get token` );
  //   }

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         Alert.alert(
  //           `Notification caused app to open from quit state:${remoteMessage.notification}`,
  //         );
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       // setLoading(false);
  //     });

  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     Alert.alert(
  //       `Notification caused app to open from background state:${remoteMessage.notification}`,
  //     );
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log("Message handled in the background!", remoteMessage);
  //   });


  //   // Listening to messages
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <Provider store={store}>
      <CopilotProvider>
        {/* <TourGuideProvider {...{ borderRadius: 16 }}> */}
        {/* <TourGuideProvider tooltipComponent={GuideTooltip}> */}
        <ClickOutsideProvider>
          <TokenContextProvider>
            <UserContextProvider>
              <AlertContextProvider>
                <RootNavigator />
              </AlertContextProvider>
            </UserContextProvider>
          </TokenContextProvider>
        </ClickOutsideProvider>
        {/* </TourGuideProvider> */}
      </CopilotProvider>
      <StatusBar backgroundColor={"#0c0c21"} barStyle="light-content" />
    </Provider>
  );
}
