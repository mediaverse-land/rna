import { SafeAreaView } from 'react-native-safe-area-context';
import { Navigator } from './navigator';

export function ExploreStack() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Header /> */}
            <Navigator />
        </SafeAreaView>
    );
}
