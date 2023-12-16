import * as NavigationBar from 'expo-navigation-bar';
import { isAndroid } from './platform.controller';

export const navigationBarController = {
  fadeNavbarHandler: () => {
    if (isAndroid()) {
      NavigationBar.setPositionAsync('absolute');
      NavigationBar.setBackgroundColorAsync('#ffffff01');
    }
  },
};
