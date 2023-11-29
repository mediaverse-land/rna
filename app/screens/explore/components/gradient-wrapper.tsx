import { LinearGradient } from "expo-linear-gradient";
import { FocusedStatusBar } from "../../../components/focused-statusbar";
import { ImagesPageComponents } from "../pages/all/style";
import { ReactNode } from "react";

const { ContainerStyles } = ImagesPageComponents;

export function ExploreGradientWrapper({children}:{children: ReactNode}) {
  return (
    <>
      <FocusedStatusBar color="#0c0c21" />
      <LinearGradient
        style={[ContainerStyles]}
        colors={["#080850", "#030340", "#030340"]}
        start={{ x: 0.6, y: 0 }}
      >
        {children}
      </LinearGradient>
    </>
  );
}
