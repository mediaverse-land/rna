import { SafeAreaView } from 'react-native-safe-area-context';
import { Navigator } from './bottom-tab-navigator';

export function PlusScreen(props: any) {
    return (
        <SafeAreaView
            style={{
                width: '100%',
                flex: 1,
                backgroundColor: '#ccc'
            }}
        >
            <Navigator />
        </SafeAreaView>
    );
}
