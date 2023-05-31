import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navigator } from './navigator';
import { SearchBar } from '../../layout/search-bar';

export function ExploreStack() {
    return (
        <SafeAreaView style={styles.flex}>
            <SearchBar />
            <Navigator />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    }
});
