import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from '../explore/pages/all/style';
import { SearchBox } from './search-box';
import { Navigator } from './navigator';
import { useState } from 'react';
import { SearchWindow } from './search-window';

const { FixedStyles, ContainerStyles } = ImagesPageComponents;

export function SearchPage() {
    const [showSearchWindow, setShowSearchWindow] = useState(true);

    const showSearchWindowHandler = () => {
        setShowSearchWindow(true)
    }

    const hideSearchWindowHandler = () => {
        setShowSearchWindow(false)
    }
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient
                    style={[ContainerStyles]}
                    colors={['#030340', '#030340']}
                    start={{ x: 0.7, y: 0 }}
                >
                    {showSearchWindow ?
                        <SearchWindow />
                        :
                        <SearchBox />
                    }
                    <Navigator />
                </LinearGradient>
            </SafeAreaView>
        </>
    );
}

