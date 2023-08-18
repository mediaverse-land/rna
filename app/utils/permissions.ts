import { Audio } from "expo-av";

export class Permissions {
    async _askForRecorder(){
        const res= await Audio.requestPermissionsAsync();
    }

    async _getRecordingPermission(){
        const res = await Audio.PermissionStatus;
        return res
    }
}