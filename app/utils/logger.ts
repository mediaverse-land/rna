import { Alert } from 'react-native';

export class Logger {
  log(logData: any) {
    if (!__DEV__) {
      return;
    }
    console.log(logData);
  }

  logErro(logData: any) {
    if (!__DEV__) {
      return;
    }
    console.error(logData);
  }

  logWarn(logData: any) {
    if (!__DEV__) {
      return;
    }
    console.warn(logData);
  }

  alert(logData: any) {
    if (!__DEV__) {
      return;
    }
    Alert.alert(logData);
  }
}
