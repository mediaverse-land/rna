import { useState, useCallback } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { SearchBar } from '../../layout/search-bar';
import { Navigator } from './topbar-navigator';

export function AppsStack() {
    const [shouldHide, setShouldHide] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setShouldHide(false);

            return () => {
                setShouldHide(true);
            };
        }, [])
    );

    return (
        <>
            {shouldHide ? null : (
                <StatusBar
                    backgroundColor={'#0c0c21'}
                    barStyle="light-content"
                />
            )}

            <SafeAreaView style={styles.safeAreaView}>
                <SearchBar />
                <Navigator />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1
    }
});
