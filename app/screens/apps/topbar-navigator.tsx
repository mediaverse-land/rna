import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AppsPageAllScreen } from "./all";
import { Box } from "../../components/box";

const Tab = createMaterialTopTabNavigator();

const routes = [
  {
    id: 1,
    title: "All",
    component: AppsPageAllScreen,
    name: "all",
  },
  {
    id: 3,
    title: "image",
    component: AppsPageAllScreen,
    name: "image",
  },
  {
    id: 4,
    title: "video",
    component: AppsPageAllScreen,
    name: "video",
  },
  {
    id: 5,
    title: "sound",
    component: AppsPageAllScreen,
    name: "sound",
  },
  {
    id: 6,
    title: "text",
    component: AppsPageAllScreen,
    name: "text",
  },
];

export function Navigator() {
  return (
    <Box width={"100%"} flex={1}>
      {/* <Tab.Navigator tabBar={(props) => <TopTabBar {...props} />}> */}
      <Tab.Navigator
        tabBar={() => <></>}
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
