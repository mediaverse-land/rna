// import { SafeAreaView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../layout/header';
import { Navigator } from './navigator';

export function ExploreStack() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <Navigator />
        </SafeAreaView>
    );
}

// exp://192.168.37.238:19000
