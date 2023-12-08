import * as NavigationBar from "expo-navigation-bar";

export const navigationBarController = {
  fadeNavbarHandler: () => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#ffffff01");
  },
};
