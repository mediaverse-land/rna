import { LogBox } from 'react-native';

export class SystemLoggerController {
  hideLogsOnDevelopment() {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
  }
}
