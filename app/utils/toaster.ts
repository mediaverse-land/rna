import { ToastAndroid, Platform } from 'react-native';

export class Toaster {
  show(text: string) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(text, ToastAndroid.LONG);
    }
  }
}
