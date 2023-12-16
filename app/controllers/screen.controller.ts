import * as ScreenCapture from 'expo-screen-capture';

export class ScreenController {
  async preventScreenShot() {
    if (!__DEV__) {
      await ScreenCapture.preventScreenCaptureAsync();
    }
  }
}
