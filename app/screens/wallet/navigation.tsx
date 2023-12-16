import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { WalletSlider } from "./slider";
import { HistoryPage } from "./history";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";

const Stack = createStackNavigator();

const routes = [
  {
    id: 1,
    title: "WalletSlider",
    component: WalletSlider,
    name: "walletSlider",
  },
  {
    id: 9,
    title: "HistoryPage",
    component: HistoryPage,
    name: "HistoryPage",
  },
];

const fadeTransition = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});


export function WalletStack() {
  const [shouldHide, setShouldHide] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setShouldHide(false);

      return () => {
        setShouldHide(true);
      };
    }, [])
  );

  return (
    <>
      {shouldHide ? null : (
        <StatusBar backgroundColor={"#030340"} barStyle="light-content" />
      )}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: fadeTransition,
        }}
      >
        {routes.map((route) => (
          <Stack.Screen
            key={route.id}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </>
  );
}
