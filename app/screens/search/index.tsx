import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Navigator } from './navigator';
import { SearchBox } from './search-box';
import { SearchBoxComponents } from './style';

const { BorderIndicator } = SearchBoxComponents;

export function SearchPage() {
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <SearchBox />
                <View
                    style={{
                        paddingLeft: 24,
                        paddingRight: 24,
                        backgroundColor: '#fff'
                    }}
                >
                    <BorderIndicator />
                </View>
                <Navigator />
            </SafeAreaView>
        </>
    );
}
