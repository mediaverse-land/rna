import { FC } from 'react';
import { ImagesPageComponents } from './style';
import { Title } from '../../../../components/title';
import { HorizontalSlider } from '../../../../components/horizontal-slider';
import { Asset } from '../../../../types/asset';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';
import { CHILL_SONGS } from '../../../../constaints/consts';
import { Box } from '../../../../components/box';

type Props = {
    isLoading: boolean;
    data: Asset[];
};

const { DailyRecomended } = ImagesPageComponents;

export const AllPageChillSongs: FC<Props> = ({ isLoading, data }) => {
    return (
        <DailyRecomended>
            <Box marginBottom={24}>
                <Title str={CHILL_SONGS} />
            </Box>
            <RenderIf condition={isLoading}>
                <IfNoItem dataLength={data.length}>
                    <HorizontalSlider data={data} />
                </IfNoItem>
            </RenderIf>
        </DailyRecomended>
    );
};
