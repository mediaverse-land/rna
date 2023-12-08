import { useEffect } from "react";
import { useFonts } from "expo-font";
import { splashScreenController } from "../controllers/splash-screen.controller";

export const useLoadFonts = () => {
  const [isLoaded] = useFonts({
    default: require('./../../assets/fonts/IRANSans.ttf'),
    light: require('./../../assets/fonts/IRANSans_Light.ttf'),
    medium: require('./../../assets/fonts/IRANSans_Medium.ttf'),
    // bold: require("./assets/fonts/IRANSans_Bold.ttf"),
  });

  useEffect(() => {
    const handleOnLayout = async () => {
      if (isLoaded) {
        await splashScreenController.hide(); 
      }
    };

    handleOnLayout();
  }, [isLoaded]);

  const areFontsLoaded = isLoaded;

  return [areFontsLoaded];
};
