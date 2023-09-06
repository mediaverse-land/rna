// import { StatusBar } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { WalletSlider } from "./slider";
// import { HistoryPage } from "./history";
// import { useFocusEffect, useIsFocused } from "@react-navigation/native";
// import React, { useCallback, useEffect, useState } from "react";
// import { StorageService } from "../../services/storage.service";
// import { HAS_USER_SEEN_PAYMENT_TOUR, HAS_USER_SEEN_WALLET_TOUR } from "../../constaints/consts";

// const Stack = createStackNavigator();

// const routes = [
//   {
//     id: 1,
//     title: "WalletSlider",
//     component: WalletSlider,
//     name: "walletSlider",
//   },
//   {
//     id: 9,
//     title: "HistoryPage",
//     component: HistoryPage,
//     name: "HistoryPage",
//   },
// ];

// const fadeTransition = ({ current }: any) => ({
//   cardStyle: {
//     opacity: current.progress,
//   },
// });

// const _storageService = new StorageService();

// export function WalletStack() {
//   const [shouldHide, setShouldHide] = useState(false);

//   const isFocused = useIsFocused();

//   const [key, setKey] = useState(null);

//   const hasUserSeenTour = async () => {
//     const res = await _storageService.get(HAS_USER_SEEN_WALLET_TOUR);
//     return res ? true : false;
//   };

//   const userSeenTourHandler = async () => {
//     await _storageService.set(
//       HAS_USER_SEEN_WALLET_TOUR,
//       HAS_USER_SEEN_WALLET_TOUR
//     );
//   };


//   useEffect(() => {
//     setKey(70);
//   }, []);
//   useEffect(() => {
//     const setupTour = async() => {
//       const hasSeen = await hasUserSeenTour();
      
//       if(hasSeen){
//         return;
//       }
      
//       if (canStart) {
//         start(key);
//       }
//     }

//     setupTour();
//   }, [canStart, key,  isFocused]);

//   useEffect(() => {
//     eventEmitter?.on("stop", userSeenTourHandler);
//     if (!isFocused) {
//       eventEmitter.off("stop", userSeenTourHandler);
//     }
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       setShouldHide(false);

//       return () => {
//         setShouldHide(true);
//       };
//     }, [])
//   );

//   return (
//     <>
//       {shouldHide ? null : (
//         <StatusBar backgroundColor={"#030340"} barStyle="light-content" />
//       )}
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//           cardStyleInterpolator: fadeTransition,
//         }}
//       >
//         {routes.map((route) => (
//           <Stack.Screen
//             key={route.id}
//             name={route.name}
//             component={route.component}
//           />
//         ))}
//       </Stack.Navigator>
//     </>
//   );
// }
