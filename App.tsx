import { Alert, Platform, StatusBar, Text } from "react-native";
import { AlertContextProvider } from "./app/context/alert";
import { TokenContextProvider } from "./app/context/token";
import { UserContextProvider } from "./app/context/user";
import { RootNavigator } from "./root-navigator";
import { Provider } from "react-redux";
import { ClickOutsideProvider } from "react-native-click-outside";
import store from "./app/store";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "./app/utils/toaster";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import axios from "axios";
// import { DatabaseConnectionProvider } from "./app/db";

const _toaster = new Toaster();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const deliverNotificationTokenToApi = async (
  token: string,
  userToken: string
) => {
  console.log(token);
  try {
    const result = await axios.post(
      `https://api.mediaverse.land/v2/push-notifications/firebase-tokens`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "X-App": "_ReactNative",
        },
      }
    );
    console.log(result);
  } catch (err: any) {
    console.log(err?.response);
  }
};

// async function sendPushNotification(nativePushToken: string) {
//   return axios.post(
//     "https://fcm.googleapis.com/fcm/send",
//     JSON.stringify({
//       to: nativePushToken,
//       priority: "normal",
//       data: {
//         experienceId: "@emahdi1297/mediaverse",
//         scopeKey: "@emahdi1297/mediaverse",
//         title: "📧 You've got mail",
//         message: "Hello world! 🌐",
//       },
//     }),
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `key=AAAADTahA-4:APA91bGns4AfNlQt5ybxBCOwQtgbAdWZcg1gPzpEZXfV4Qy9dRbSH24nCWd0qE-j-jo4XZ3JUzSzy3kJ9yCwzjjswcrmUgCFypYmYzHL6CL8ZQ6bXhHU1szY6m5U2aRY7YO9Y-uPgCli`,
//       },
//     }
//   );
//   // return await fetch("https://fcm.googleapis.com/fcm/send", {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     Authorization: `key=AAAADTahA-4:APA91bGns4AfNlQt5ybxBCOwQtgbAdWZcg1gPzpEZXfV4Qy9dRbSH24nCWd0qE-j-jo4XZ3JUzSzy3kJ9yCwzjjswcrmUgCFypYmYzHL6CL8ZQ6bXhHU1szY6m5U2aRY7YO9Y-uPgCli`,
//   //   },
//   //   body: JSON.stringify({
//   //     to: nativePushToken,
//   //     priority: "normal",
//   //     data: {
//   //       experienceId: "@emahdi1297/mediaverse",
//   //       scopeKey: "@emahdi1297/mediaverse",
//   //       title: "📧 You've got mail",
//   //       message: "Hello world! 🌐",
//   //     },
//   //   }),
//   // });
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

//     token = await Notifications
//       .getDevicePushTokenAsync
//       //   {
//       //   projectId: Constants.expoConfig.extra.eas.projectId,
//       // }
//       ();
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }

export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState<any>("");
  // const [notification, setNotification] = useState<any>(false);
  // const [response, setResponse] = useState("");

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
  //       console.log({ response });
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  // const sender = async () => {
  //   setResponse("");
  //   try {
  //     const result = await sendPushNotification(expoPushToken?.data);
  //     console.log(result);
  //     setResponse(JSON.stringify(result));
  //   } catch (err: any) {
  //     setResponse(JSON.stringify({err}));
  //     console.log({ err });
  //   }
  // };
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Home");
  const [token, setToken] = useState("");

  // For ios
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  useEffect(() => {
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
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    deliverNotificationTokenToApi(
      "drdUTZJCQeijjPzcccO-is:APA91bFxFDpUSg8Q9Evos-BUTmJfhNCownkjJicLty0xFWeMH4dLhqICn1TQr4ejhkj5rqR9zsKNwNAmVD4QEsvTEaYWgK16oqqoW15FNiYTUvidppCI6FZYLEPxxBtA8XQb0vX5N5tV",
      "afe10149a57e3a3eacf1d516eeb50ed573fdb72e930dd3cb9259802ac9058a9b1d8bedf7a22990c83e8852dabfdbdc1e263e24371063818068f06379fce39b7e"
    );
  }, []);

  return (
    <>
      <Provider store={store}>
        {/* <Text selectable>Your expo push token: {token || "no token"}</Text> */}
        {/* 
        <Button
          varient="primary"
          text="send notification"
          onpressHandler={sender}
        />
        <Text selectable>response: {response}</Text> */}

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
