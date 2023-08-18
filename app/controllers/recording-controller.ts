import { Audio } from "expo-av";

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

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async stopRecording(
    recording: Audio.Recording,
    setRecording: (recording: any) => void
  ) {
    try {
      console.log("Stopping recording..");
      setRecording(null);

      await recording.stopAndUnloadAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      this._storedSound = uri;
      console.log("Recording stopped and stored at", uri);
    } catch (err) {
      console.log({ err });
    }
  }

  async getStoredSound() {
    return await this._storedSound;
  }
}
