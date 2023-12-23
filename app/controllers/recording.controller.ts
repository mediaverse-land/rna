import { Audio } from 'expo-av';
import { Logger } from '../utils/logger';
const _logger = new Logger();

export class RecordingController {
  _storedSound: any = null;

  async askForPermission() {
    await Audio?.requestPermissionsAsync();
  }

  async startRecording(setRecording: (recording: Audio.Recording) => void) {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });



      _logger.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      recording.setOnRecordingStatusUpdate((e) => {
        console.log(e)
      });


      setRecording(recording);
      _logger.log('Recording started');
    } catch (err) {
      _logger.logErro('Failed to start recording');
    }
  }

  async stopRecording(recording: Audio.Recording, setRecording: (recording: any) => void) {
    try {
      _logger.log('Stopping recording..');
      setRecording(null);

      await recording.stopAndUnloadAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      this._storedSound = uri;
      _logger.log(`Recording stopped and stored at ${uri}`);
    } catch (err) {
      _logger.logErro({ err });
    }
  }

  async getStoredSound() {
    return await this._storedSound;
  }
}
