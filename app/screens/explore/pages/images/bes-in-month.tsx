import { StyleSheet, View } from 'react-native';
import { Title } from '../../../../shared/components/title';
import { PaddingContainer } from '../../../../styles/grid';
import { HorizontalSlider } from '../../../../shared/components/horizontal-slider';
import { bestInMonthImagesMockData } from './mock-data/best-in-month';

const styles = StyleSheet.create({
    sliderWrapper: {
        marginTop: 40
    }
});

export function ImagePageBestInMonth() {
    return (
        <PaddingContainer>
            <Title str="Best in month" />
            <View style={styles.sliderWrapper}>
                <HorizontalSlider
                    data={bestInMonthImagesMockData}
                    navigationScreenName="SingleImageScreen"
                />
            </View>
        </PaddingContainer>
    );
}
