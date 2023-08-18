import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as ExpoCamera from "expo-camera";
import { ImageController } from "../../../../controllers/image-controller";

const _imageController = new ImageController();

//@ts-ignore
const BACK_CAMERA = ExpoCamera.Camera.Constants.Type.back
const VIDEO_TYPE = 'VIDEO_TYPE'
const PICTURE_TYPE = 'PICTURE_TYPE';

type AssetType = 'VIDEO_TYPE' | 'PICTURE_TYPE'


export const Camera = forwardRef((props, ref: any) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const cameraStatus: any = await _imageController.askForPermission();
      setHasCameraPermission(cameraStatus.status === "granted");
    };

    setup();
  }, []);

  const takePicture = async () => {
    const data = await _imageController.takePicture(camera, setCamera);
    return data;
  };


  const takeVideo = async () => {
    const data = await _imageController.takeVideo(camera, setVideo);
    return data || video;
  };

  const stopVideo = async() => {
    const data = await _imageController.stopVideo(camera, setVideo);
    return data ;
  }

  useImperativeHandle(ref, () => ({
    async snap() {
      const res = await takePicture();
      return res;
    },
    async snapVideo() {
      const res = await takeVideo();
      return res;
    },
    async stopVideo(){
      const res = await stopVideo();
      return res;
    }
  }));

  if (hasCameraPermission === null || hasCameraPermission === false) {
    return <View />;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <ExpoCamera.Camera
            ref={(ref) => setCamera(ref)}
            style={styles.camera}
            type={BACK_CAMERA}
            ratio={"1:1"}
          />
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
  },
  button: {
    flex: 1,
  },
});
