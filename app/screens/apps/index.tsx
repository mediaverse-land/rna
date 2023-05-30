import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '../../layout/search-bar';
import { Navigator } from './topbar-navigator';
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'react-native'

export function AppsStack() {
    const [shouldHide, setShouldHide] = useState(false);

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused/mount
            setShouldHide(false)

            return () => {
                setShouldHide(true)

                // Do something when the screen is unfocused/unmount
                // Useful for cleanup functions
            };
        }, [])
    );

    return (
        <>
            {shouldHide ? null :
                <StatusBar backgroundColor={'#0c0c21'} barStyle='light-content' />
            }

            <SafeAreaView style={{ flex: 1 }}>
                <SearchBar />
                <Navigator />
            </SafeAreaView>
        </>
    );
}
