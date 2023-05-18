import { PaddingContainer } from '../../../../styles/grid';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from '../all/style';
import { SearchBar } from '../../../../layout/search-bar';
import { NavigationHeader } from '../../components/navigation-header';
import { ImagePageBestInMonth } from './best-in-month';
import { TextPageSwiper } from './swiper';
import { TextPageBestWriters } from './best-writers';

const { FixedStyles, ContainerStyles } = ImagesPageComponents;

export function TextsPage({ route, navigation }: any) {
    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            <SearchBar style={FixedStyles} />
            <NavigationHeader navigation={navigation} route={route} />
            <ScrollView
                style={[
                    FixedStyles,
                    { backgroundColor: 'transparent', paddingTop: 196 }
                ]}
            >
                <ImagePageBestInMonth />
                <PaddingContainer>
                    <TextPageSwiper />
                </PaddingContainer>
                <TextPageBestWriters />
                <View style={{ width: '100%', height: 350 }}></View>
            </ScrollView>
        </LinearGradient>
    );
}
