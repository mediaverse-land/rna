import React from "react";
import { Circle, Path, Svg } from "react-native-svg";
import { theme } from "../../constaints/theme";

const states = {
  pathX: "357",
  pathY: "675",
  pathA: "689",
  pathB: "706",
};

export const BackgroundSvg = () => {
  return (
    <Svg
      id="bottom-bar"
      x="0px"
      y="0px"
      width="100%"
      height="100"
      viewBox="0 0 1092 260"
    >
      <Path
        fill={"#4e4e61d8"}
        stroke={"#4e4e61d8"}
        d={`M30,60h${states.pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${states.pathY}.7,74.5,${states.pathA}.5,60,${states.pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`}
      />
      <Circle
        fill={theme.color.light.PRIMARY}
        stroke={theme.color.light.PRIMARY}
        cx="546"
        cy="100"
        r="100"
      />
    </Svg>
  );
};
