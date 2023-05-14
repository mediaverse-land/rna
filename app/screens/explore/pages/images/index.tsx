import { ScrollView, StyleSheet, View } from 'react-native';
import { LatestImages } from './latest-images';
import { MostViewImages } from './most-view';
import { SearchBar } from '../../../../layout/search-bar';
import { NavigationHeader } from '../../components/navigation-header';
import { LinearGradient } from 'expo-linear-gradient';


export function ImagesPages() {
    return (
        <LinearGradient
            style={[styles.container]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            <SearchBar style={styles.fixed} />
            <NavigationHeader style={styles.fixed} />
            <ScrollView style={[styles.fixed, { backgroundColor: 'transparent', paddingTop: 100 }]}>
                <LatestImages />
                <MostViewImages />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#030340'
    },
    fixed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})

