import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navigator } from './topbar-navigator';
import { FocusedStatusBar } from '../../components/focused-statusbar';

export function AppsStack() {
  return (
    <>
      <FocusedStatusBar color="#0c0c21" />
      <SafeAreaView style={styles.safeAreaView}>
        {/* <SearchBar /> */}
        <Navigator />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});
