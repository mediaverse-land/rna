import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import { Box } from "../../components/box";
import { CreateImageScreen } from "./pages/create-image";
import { CreateSoundScreen } from "./pages/create-sound";
import { CreateTextScreen } from "./pages/create-text";
import { AddAssetMetaData } from "./pages/add-asset-meta-data";

type RoutesType = {
  createImage: undefined;
  createSound: undefined;
  createText: undefined;
  createVideo: undefined;
  addAssetMetadata: undefined;
};

type RouteObject = {
  id: number;
  name: keyof RoutesType;
  title: string;
  component: () => JSX.Element;
};

const routes: RouteObject[] = [
  {
    id: 1,
    name: "createImage",
    title: "All",
    component: CreateImageScreen,
  },
  {
    id: 2,
    name: "createSound",
    title: "image",
    component: CreateSoundScreen,
  },
  {
    id: 3,
    name: "createText",
    title: "text",
    component: CreateTextScreen,
  },
  {
    id: 4,
    name: "addAssetMetadata",
    title: null,
    component: AddAssetMetaData,
  },
];

const Tab = createBottomTabNavigator<RoutesType>();

export const Navigator = () => {
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

      {/* if route === createImage => hide bottom tab and show inner bottom tab in 
              createImageScreen */}
      <Tab.Navigator
        tabBar={(props) => (
          // <BottomTabBar {...props} />
          <></>
        )}
      >
        {routes.map((route) => (
          <Tab.Screen
            key={route.id}
            name={route.name}
            component={route.component}
            options={{
              title: route.title,
              headerShown: false,
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};
