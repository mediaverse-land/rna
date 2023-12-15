import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { stickyStyles } from "../../styles/sticky";

export function ScreenGradient({
  children,
  colors,
}: {
  children: ReactNode;
  colors?: string[];
}) {
  return (
    <LinearGradient
      style={[stickyStyles.container]}
      colors={colors ? colors : ["#030340", "#030340"]}
      start={{ x: 0.7, y: 0 }}
    >
      {children}
    </LinearGradient>
  );
}
