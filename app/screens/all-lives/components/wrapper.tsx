import React, { ReactNode } from "react";
import { FocusedStatusBar } from "../../../components/focused-statusbar";
import { LinearGradient } from "expo-linear-gradient";
import { stickyStyles } from "../../../styles/sticky";
import { VirtualizedList } from "../../../components/virtualized-list";
import { Box } from "../../../components/box";

export const AllLivesWrapperComponent = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <>
      <FocusedStatusBar color="#0c0c21" />
      <LinearGradient
        style={[stickyStyles.container]}
        colors={["#030340", "#030340"]}
        start={{ x: 0.7, y: 0 }}
      >
        <Box width="100%" flex={1}>
          <VirtualizedList>{children}</VirtualizedList>
        </Box>
      </LinearGradient>
    </>
  );
};
