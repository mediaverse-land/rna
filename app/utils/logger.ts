import { Alert } from "react-native";

export class Logger {
  log(logData: any) {
    console.log(logData);
  }

  logErro(logData: any) {
    console.error(logData);
  }

  logWarn(logData: any) {
    console.warn(logData);
  }

  alert(logData: any) {
    Alert.alert(logData);
  }
}
