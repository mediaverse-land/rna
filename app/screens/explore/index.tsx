import { StyleSheet } from 'react-native';
import { Navigator } from './navigator';
import { SearchBar } from '../../layout/search-bar';
import { CustomSafeArea } from '../../components/custom-safe-area';

export function ExploreStack() {
  return (
    <CustomSafeArea style={styles.flex}>
      <SearchBar />
      <Navigator />
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
