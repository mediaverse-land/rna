import React from "react";
import BottomTabBarComponent from "./component";

export function BottomTabBar({ state, descriptors, navigation }: any) {
  return (
    <BottomTabBarComponent
      state={state}
      descriptors={descriptors}
      navigation={navigation}
    />
  );
}
