import { FC } from 'react';
import { ImagesPageComponents } from './style';
import { Title } from '../../../../components/title';
import { HorizontalSlider } from '../../../../components/horizontal-slider';
import { Box } from '../../../../components/box';
import { useRtl } from '../../../../hooks/use-rtl';
import { Asset } from '../../../../types/asset';
import { RenderIf } from '../../../../components/render-if';
import { DAILY_RECOMMENDED } from '../../../../constaints/consts';

const { DailyRecomended } = ImagesPageComponents;

type Props = {
    data: Asset[];
    isLoading: boolean;
};

export const AllPageDailyRecomended: FC<Props> = ({ data, isLoading }) => {
    const { isRtl } = useRtl();

    return (
        <DailyRecomended>
            <Title str={DAILY_RECOMMENDED} />
            <Box marginTop={24}>
                <RenderIf condition={isLoading}>
                    <HorizontalSlider data={data} isRtl={isRtl} />
                </RenderIf>
            </Box>
        </DailyRecomended>
    );
};
