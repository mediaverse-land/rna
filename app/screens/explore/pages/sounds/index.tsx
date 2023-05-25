import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from '../all/style';
import { SoundsPageBestInMonth } from './best-in-moth';
import { SoundsPageChillSongs } from './chil-songs';
import { SoundsPageBestProducts } from './best-products';
import { SoundsPageMusicPlayer } from './music-player';

const { FixedStyles, ContainerStyles } = ImagesPageComponents;

export function SoundsPage() {
    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={linearGradient}
        >
            {/* <SearchBar style={FixedStyles} /> */}
            {/* <NavigationHeader navigation={navigation} route={route} /> */}
            <ScrollView style={[FixedStyles, styles.scrollView]}>
                <SoundsPageBestInMonth />
                <SoundsPageMusicPlayer />
                <SoundsPageChillSongs />
                <SoundsPageBestProducts />
                <View style={styles.seperator}></View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    seperator: {
        width: '100%',
        height: 350
    },
    scrollView: {
        backgroundColor: 'transparent',
        paddingTop: 196
    }
});

const linearGradient = {
    x: 0.7,
    y: 0
};
