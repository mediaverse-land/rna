import * as ExpoCamera from "expo-camera";

const CAMERA_OPTIONS = { base64: true };

export class ImageController {
  private _cameraPermission: boolean = null;

  async askForPermission() {
    await ExpoCamera.Camera.requestMicrophonePermissionsAsync();
    const cameraStatus =
      await ExpoCamera.Camera.requestCameraPermissionsAsync();
    this._cameraPermission = cameraStatus.status === "granted" ? true : false;

    return cameraStatus;
  }

  async takePicture(camera: any, setImage: (image: any) => void) {
    if (camera) {
      const data = await camera.takePictureAsync(CAMERA_OPTIONS);
      setImage(data);
      return data;
    }
  }

  async takeVideo(video: any, setVideo: (video: any) => void) {
    const data = await video?.recordAsync(CAMERA_OPTIONS);
    setVideo(data);
    return data;
  }

  async stopVideo(video: any, setVideo: any) {
    const data = await video?.stopRecording();
    setVideo(data);
    return data;
  }
}
