import { ImagesPageComponents } from './style';
import { Title } from '../../../../shared/components/title';
import {
    HorizontailSlideType,
    HorizontalSlider
} from '../../../../shared/components/horizontal-slider';
import { Box } from '../../../../shared/components/box';
import { useRtl } from '../../../../hooks/use-rtl';
import { ExploreService } from './service';
import { useApi } from '../../../../hooks/use-api';
import { LoadingSpinner } from '../../../../shared/components/loader-spinner';

const { DailyRecomended } = ImagesPageComponents;

const service = new ExploreService();

export function AllPageDailyRecomended() {
    const { isRtl } = useRtl();

    const { isPending, data } = useApi<HorizontailSlideType[]>(
        service.getGetDailyRecommendedData
    );

    return (
        <DailyRecomended>
            <Title str="Daily recommended" />
            <Box marginTop={24}>
                {isPending ? (
                    <LoadingSpinner color="red" />
                ) : (
                    <HorizontalSlider data={data} isRtl={isRtl} />
                )}
            </Box>
        </DailyRecomended>
    );
}
