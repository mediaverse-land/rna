// import { createStackNavigator } from "@react-navigation/stack";
// import { ProfileOwnershipScreen } from ".";
// import { fadeTransition } from "../../utils/fade-transition";

// const Stack = createStackNavigator();

// const profileRoutes = [
//   {
//     id: 1,
//     name: "ProfileSubscribeScreen",
//     component: ProfileOwnershipScreen,
//   },
//   {
//     id: 2,
//     name: "ProfileOwnershipScreen",
//     component: ProfileOwnershipScreen,
//   },
// ];

// export const ProfileStackNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         cardStyleInterpolator: fadeTransition,
//       }}
//     >
//       {profileRoutes.map((route) => (
//         <Stack.Screen
//           key={route.id}
//           name={route.name}
//           component={route.component}
//         />
//       ))}
//     </Stack.Navigator>
//   );
// };
