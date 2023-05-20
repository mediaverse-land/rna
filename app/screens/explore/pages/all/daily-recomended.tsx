import { ImagesPageComponents } from './style';
import { Title } from '../../../../shared/components/title';
import { HorizontalSlider } from '../../../../shared/components/horizontal-slider';
import { dailyRecommendedMockData } from './mock-data/daily-recommended';
import { View } from 'react-native';
import { Box } from '../../../../shared/components/box';

const { DailyRecomended } = ImagesPageComponents;

export function AllPageDailyRecomended() {
    return (
        <DailyRecomended>
            <Title str="Daily recommended" />
            <Box marginTop={24}>
                <HorizontalSlider data={dailyRecommendedMockData} />
            </Box>
        </DailyRecomended>
    );
}
