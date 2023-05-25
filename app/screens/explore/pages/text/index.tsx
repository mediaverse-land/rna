import { ScrollView, View } from 'react-native';
import { PaddingContainer } from '../../../../styles/grid';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from '../all/style';
import { ImagePageBestInMonth } from './best-in-month';
import { TextPageSwiper } from './swiper';
import { TextPageBestWriters } from './best-writers';

const { FixedStyles, ContainerStyles } = ImagesPageComponents;

export function TextsPage() {
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
