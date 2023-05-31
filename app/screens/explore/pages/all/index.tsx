import { ScrollView, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from './style';
import { AllPageBanners } from './banners';
import { AllPageDailyRecomended } from './daily-recomended';
import { AllPageMostViewed } from './most-viewed';
import { AllPageTopTenText } from './top-ten-texts';
import { AllPageChillSongs } from './chill-songs';
import { PaddingContainer } from '../../../../styles/grid';

const { FixedStyles, ContainerStyles } = ImagesPageComponents;

export function AllPage() {
    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            <ScrollView style={[FixedStyles, styles.scrollView]}>
                <PaddingContainer>
                    <AllPageBanners />
                </PaddingContainer>
                <AllPageDailyRecomended />
                <PaddingContainer>
                    <AllPageMostViewed />
                </PaddingContainer>
                <AllPageTopTenText />
                <AllPageChillSongs />
                <View style={styles.space}></View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 196,
        backgroundColor: 'transparent'
    },
    space: {
        width: '100%',
        height: 350
    }
});
