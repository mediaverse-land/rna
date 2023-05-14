// import { SafeAreaView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../layout/header';
import { Navigator } from './navigator';
import { SearchBar } from '../../layout/search-bar';

export function ExploreStack() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Header /> */}
            <Navigator />
        </SafeAreaView>
    );
}
