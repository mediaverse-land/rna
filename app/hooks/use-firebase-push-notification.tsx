/* eslint-disable @typescript-eslint/no-unused-vars */
// Notifications.setNotificationChannelAsync("location-reached", {
//   name: "location-reached",
//   importance: Notifications.AndroidImportance.MAX,
//   vibrationPattern: [0, 250, 250, 250],
//   lightColor: "#597AFF",
//   showBadge: true,
//   sound: "default",
// });

import { useState } from 'react';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     priority: Notifications.AndroidNotificationPriority.MAX,
//   }),
// });

export const useFirebasePushNotification = () => {
  const [token, setToken] = useState('');
  const [newPushMessage, setNewPushMessage] = useState<any>(null);

  // const isDevMode = () => __DEV__;

  // async function requestUserPermission() {
  //   try {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //     if (enabled) {
  //       // console.log("Authorization status:", authStatus);
  //     }
  //   } catch (err) {
  //     // console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   if (isDevMode()) {
  //     return;
  //   }
  //   if (requestUserPermission()) {
  //     // Return fcm token key
  //     messaging()
  //       .getToken()
  //       .then((token: string) => {
  //         setToken(token);
  //       });
  //   } else {
  //     _toaster.show("failed to getToken");
  //   }

  //   // Getting initial notification
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage: any) => {
  //       if (remoteMessage) {
  //         // console.log(
  //         //   "Notification caused app to open from quit state:",
  //         //   remoteMessage.notification
  //         // );
  //       }
  //     });

  //   messaging().onNotificationOpenedApp((remoteMessage: any) => {
  //     // console.log(
  //     //   "Notification caused app to open from background state:",
  //     //   remoteMessage.notification
  //     // );
  //   });

  //   messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  //     // console.log("Message handled in the background!", remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
  //     setNewPushMessage(remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);

  return [token];
};
