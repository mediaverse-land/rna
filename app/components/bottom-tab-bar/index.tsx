import React from "react";
import { CopilotProvider } from "react-native-copilot";
import { BottomTabBarComponent } from "./component";


export function BottomTabBar({ state, descriptors, navigation }: any) {
 
  return (
    <BottomTabBarComponent state={state} descriptors={descriptors} navigation={navigation}/>
  );
}
