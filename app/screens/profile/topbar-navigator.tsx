import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopTabBar from "../../components/top-tab-bar";
import { ProfileScreenAllPage } from "./owner/pages/all";
import { Box } from "../../components/box";
import { ProfileScreenImagePage } from "./owner/pages/image";
import { ProfileScreenVideoPage } from "./owner/pages/video";
import { ProfileScreenSoundPage } from "./owner/pages/sound";
import { ProfileScreenTextPage } from "./owner/pages/text";

const Tab = createMaterialTopTabNavigator();

const routes = [
  {
    id: 1,
    title: "All",
    component: ProfileScreenAllPage,
    name: "all",
  },
  {
    id: 3,
    title: "image",
    component: ProfileScreenImagePage,
    name: "image",
  },
  {
    id: 4,
    title: "video",
    component: ProfileScreenVideoPage,
    name: "video",
  },
  {
    id: 5,
    title: "sound",
    component: ProfileScreenSoundPage,
    name: "sound",
  },
  {
    id: 6,
    title: "text",
    component: ProfileScreenTextPage,
    name: "text",
  },
];

export function Navigator() {
  return (
    <Box
      width={"100%"}
      flex={1}
    >
      <Tab.Navigator
        tabBar={(props) => <TopTabBar isProfilePage {...props} />}
        style={{
          top: 4,
        }}
        screenOptions={{
          animationEnabled: false,
          swipeEnabled: false,
        }}
      >
        {routes.map((route) => (
          <Tab.Screen
            key={route.id}
            name={route.name}
            component={route.component}
            options={{
              title: route.title,
            }}
          />
        ))}
      </Tab.Navigator>
    </Box>
  );
}
