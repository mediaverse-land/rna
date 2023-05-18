import { StyleSheet, View } from 'react-native';
import { HorizontalSlider } from '../../../../shared/components/horizontal-slider';
import { Title } from '../../../../shared/components/title';
import { PaddingContainer } from '../../../../styles/grid';
import { soundsMockData } from './sound-mock-data';

const styles = StyleSheet.create({
    container: {
        marginTop: 49
    },
    sliderWrapper: {
        marginTop: 40
    }
});

export function SoundsPageBestProducts() {
    return (
        <PaddingContainer style={styles.container}>
            <Title str="Best Podcasts" />
            <View style={styles.sliderWrapper}>
                <HorizontalSlider data={soundsMockData} />
            </View>
        </PaddingContainer>
    );
}
