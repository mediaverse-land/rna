import { AppRegistry, Platform } from 'react-native';
import App from './App';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './trackPlayerServices';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

AppRegistry.registerComponent('main', () => App);
TrackPlayer.registerPlaybackService(() => playbackService);


if (Platform.OS === 'web') {
    const rootTag =
        document.getElementById('root') || document.getElementById('main');
    AppRegistry.runApplication('main', { rootTag });
}
