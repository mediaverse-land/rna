import { SafeAreaView } from 'react-native-safe-area-context';
import { Navigator } from './navigator';
import { SearchBar } from '../../layout/search-bar';

export function ExploreStack() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchBar />
            <Navigator />
        </SafeAreaView>
    );
}

