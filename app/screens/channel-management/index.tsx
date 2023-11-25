import { ReactNode, useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { FocusedStatusBar } from "../../components/focused-statusbar";
import { ScreenGradient } from "../../components/screen-gradient";
import { PaddingContainer } from "../../styles/grid";
import { ChannelManagementSearchBar } from "./components/search-bar";
import { ChanelManagementView } from "./types";
import { Box } from "../../components/box";
import { Button } from "../../components/button";
import { ICON_ADD } from "../../constaints/icons";
import { ChannelsPage } from "./pages/channels";
import { ConductorPage } from "./pages/conductor";

const views: Record<ChanelManagementView, any> = {
  CHANNEL: ChannelsPage,
  CONDUCTOR: ConductorPage,
};

export function ChannelManagementScreen() {
  const [selectedView, setSelectedView] =
    useState<ChanelManagementView>("CHANNEL");

  const CurrentView = useMemo(() => views[selectedView], [selectedView]);

  return (
    <>
      <FocusedStatusBar color="#0c0c21" />
      <SafeAreaView style={styles.safeAreaView}>
        <ScreenGradient>
          <CurrentView
            setSelectedView={setSelectedView}
            selectedView={selectedView}
            headerComponent={
              <ChannelManagementSearchBar
                setSelectedView={setSelectedView}
                selectedView={selectedView}
              />
            }
          />
          
          <PaddingContainer></PaddingContainer>
        </ScreenGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  header: {
    flex: 1,
    height: 200,
  },
});
