import { FC } from 'react';
import Masonry from '../../../../components/masonry';
import { Asset } from '../../../../types/asset';
import { PaddingContainer } from '../../../../styles/grid';
import { Box } from '../../../../components/box';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';

type Props = {
    isLoading: boolean;
    data: Asset[];
};

export const ImagePageMasonryList: FC<Props> = ({ isLoading, data }) => {
    return (
        <PaddingContainer>
            <Box width={'100%'} flex={1}>
                <RenderIf condition={isLoading}>
                    <IfNoItem dataLength={data.length}>
                        <Masonry data={data} />
                    </IfNoItem>
                </RenderIf>
            </Box>
        </PaddingContainer>
    );
};
