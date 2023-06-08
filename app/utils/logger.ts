import { Alert } from 'react-native';

class Logger {
    log(logData: any) {
        console.log(logData);
    }

    alert(logData: any) {
        Alert.alert(logData);
    }
}

export default new Logger();
