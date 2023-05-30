import { ImagesPageComponents } from './style';
import { Title } from '../../../../shared/components/title';
import { HorizontalSlider } from '../../../../shared/components/horizontal-slider';
import { dailyRecommendedMockData } from './mock-data/daily-recommended';
import { Box } from '../../../../shared/components/box';
import { useRtl } from '../../../../hooks/use-rtl';

const { DailyRecomended } = ImagesPageComponents;

export function AllPageDailyRecomended() {
    const { isRtl } = useRtl();

    return (
        <DailyRecomended>
            <Title str="Daily recommended" />
            <Box marginTop={24}>
                <HorizontalSlider
                    data={dailyRecommendedMockData}
                    isRtl={isRtl}
                />
            </Box>
        </DailyRecomended>
    );
}
