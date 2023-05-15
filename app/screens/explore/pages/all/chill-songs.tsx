import { ImagesPageComponents } from './style';
import { Title } from '../../../../shared/components/title';
import { HorizontalSlider } from '../../../../shared/components/horizontal-slider';
import { dailyRecommendedMockData } from './mock-data/daily-recommended';
import { View } from 'react-native';

const { DailyRecomended } = ImagesPageComponents;

export function AllPageChillSongs() {
    return (
        <DailyRecomended>
            <Title str="Daily recommended" />
            <View style={{ marginTop: 24 }}>
                <HorizontalSlider data={dailyRecommendedMockData} />
            </View>
        </DailyRecomended>
    );
}
