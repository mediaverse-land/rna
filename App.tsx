import { useEffect, useState } from "react";
import {
  Dimensions,
  I18nManager,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
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
// import { Button } from "./app/components/button";
import PushNotificationWrapper from "./app/components/push-notification-wrapper";
import { addEventListener } from "@react-native-community/netinfo";
import { Text } from "./app/components/text";
import * as Updates from 'expo-updates';

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

export default function App() {
  const [token, setToken] = useState("");

  const [isOffline, setIsOffline] = useState(false);

  const [newPushMessage, setNewPushMessage] = useState<any>(null);

  if (I18nManager.isRTL && Platform.OS !== 'web') {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    Updates.reloadAsync();
  }

  const isDevMode = () => __DEV__;

  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      if (!state.isConnected) {
        setIsOffline(true);
        return;
      }
      setIsOffline(false);
    });
    // Unsubscribe
    unsubscribe();
  }, []);

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
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      setNewPushMessage(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const checkConnection = () => {
    addEventListener((state) => {
      if (!state.isConnected) {
        setIsOffline(true);
        return;
      }
      setIsOffline(false);
    });
  };

  const offlineView = (
    <View
      style={{
        width: "100%",
        minHeight: Dimensions.get("screen").height,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text color="black">Please connect to internet to continue</Text>
      <TouchableOpacity
        style={{
          marginTop: 14,
        }}
        onPress={checkConnection}
      >
        <Text color="blue">Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Provider store={store}>
        <ClickOutsideProvider>
          <TokenContextProvider>
            <UserContextProvider>
              <AlertContextProvider>
                {isOffline ? (
                  offlineView
                ) : (
                  <RootNavigator firebaseToken={token} />
                )}
                <PushNotificationWrapper
                  message={newPushMessage}
                  setMessage={setNewPushMessage}
                />
              </AlertContextProvider>
            </UserContextProvider>
          </TokenContextProvider>
        </ClickOutsideProvider>
      </Provider>
      <StatusBar backgroundColor={"#0c0c21"} barStyle="light-content" />
    </>
  );
}

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
