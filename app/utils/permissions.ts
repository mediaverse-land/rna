import { Audio } from 'expo-av';

export class Permissions {
  async _askForRecorder() {
    await Audio.requestPermissionsAsync();
  }

  async _getRecordingPermission() {
    const res = await Audio.PermissionStatus;
    return res;
  }
}
