import { ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from '../../../../layout/search-bar';
import { NavigationHeader } from '../../components/navigation-header';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from './style';
import { AllPageBanners } from './banners';
import { AllPageDailyRecomended } from './daily-recomended';

const { Container, FixedStyles, ContainerStyles } = ImagesPageComponents

export function AllPage() {
    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            <SearchBar style={FixedStyles} />
            <NavigationHeader style={FixedStyles} />
            <ScrollView style={[FixedStyles, { backgroundColor: 'transparent', paddingTop: 100 }]}>
                <Container>
                    <AllPageBanners />
                </Container>
                <AllPageDailyRecomended />
            </ScrollView>
        </LinearGradient>
    );
}


