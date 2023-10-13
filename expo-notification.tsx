import { Platform, StatusBar, Text } from "react-native";
import { AlertContextProvider } from "./app/context/alert";
import { TokenContextProvider } from "./app/context/token";
import { UserContextProvider } from "./app/context/user";
import { RootNavigator } from "./root-navigator";
import { Provider } from "react-redux";
import { ClickOutsideProvider } from "react-native-click-outside";
import store from "./app/store";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "./app/utils/toaster";

// import { DatabaseConnectionProvider } from "./app/db";

const _toaster = new Toaster();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// async function sendPushNotification(expoPushToken: string) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();

//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }

//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig.extra.eas.projectId,
//     });

//     console.log(token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }

export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState<any>("");
  // const [notification, setNotification] = useState<any>(false);
  // const notificationListener = useRef<any>();
  // const responseListener = useRef<any>();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  // usePreventScreenCapture();



  return (
    <>
      <Provider store={store}>
      {/* <Text selectable>Your expo push token: {JSON.stringify(expoPushToken)}</Text> */}

        <ClickOutsideProvider>
          <TokenContextProvider>
            <UserContextProvider>
              <AlertContextProvider>
                <RootNavigator />
              </AlertContextProvider>
            </UserContextProvider>
          </TokenContextProvider>
        </ClickOutsideProvider>
      </Provider>
      <StatusBar backgroundColor={"#0c0c21"} barStyle="light-content" />
    </>
  );
}
