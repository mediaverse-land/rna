import { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FocusedStatusBar } from '../../components/focused-statusbar';
import { ScreenGradient } from '../../components/screen-gradient';
import { PaddingContainer } from '../../styles/grid';
import { ChannelManagementSearchBar } from './components/search-bar';
import { ChanelManagementView } from './types';
import { ChannelsPage } from './pages/channels';
import { ConductorPage } from './pages/conductor';
import { UseNavigationType } from '../../types/use-navigation';

const views: Record<ChanelManagementView, any> = {
  CHANNEL: ChannelsPage,
  CONDUCTOR: ConductorPage,
};

export function ChannelManagementScreen({ navigation }: { navigation: UseNavigationType }) {
  const [selectedView, setSelectedView] = useState<ChanelManagementView>('CHANNEL');

  const CurrentView = useMemo(() => views[selectedView], [selectedView]);

  const goBackHandler = () => navigation.goBack();

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
                goBackHandler={goBackHandler}
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
