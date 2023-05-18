import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from './style';
import { AllPageBanners } from './banners';
import { AllPageDailyRecomended } from './daily-recomended';
import { AllPageMostViewed } from './most-viewed';
import { AllPageTopTenText } from './top-ten-texts';
import { AllPageChillSongs } from './chill-songs';

const { Container, FixedStyles, ContainerStyles } = ImagesPageComponents;

export function AllPage() {
    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            <ScrollView
                style={[
                    FixedStyles,
                    { backgroundColor: 'transparent', paddingTop: 196 }
                ]}
            >
                <Container>
                    <AllPageBanners />
                </Container>
                <AllPageDailyRecomended />
                <Container>
                    <AllPageMostViewed />
                </Container>
                <AllPageTopTenText />
                <AllPageChillSongs />
                <View style={{ width: '100%', height: 350 }}></View>
            </ScrollView>
        </LinearGradient>
    );
}
