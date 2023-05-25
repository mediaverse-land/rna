import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, View } from 'react-native';
// import { NavigationHeader } from '../../components/navigation-header';
import { ImagesPageComponents } from '../all/style';
import { ImagePageBestInMonth } from './bes-in-month';
import { ImagePageMasonryList } from './masonry-list';

const { FixedStyles, ContainerStyles } = ImagesPageComponents;

// export function ImagesPage({ route, navigation }: any) {
export function ImagesPage() {
    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={linearGradient}
        >
            {/* <NavigationHeader navigation={navigation} route={route} /> */}
            <ScrollView style={[FixedStyles, styles.scrollView]}>
                <ImagePageBestInMonth />
                <ImagePageMasonryList />
                <View style={styles.seperator} />
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
