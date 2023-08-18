import { HorizontalSlider } from '../../../../components/horizontal-slider';
import { IfNoItem } from '../../../../components/if-no-item';
import { RenderIf } from '../../../../components/render-if';
import { Title } from '../../../../components/title';
import { PaddingContainer } from '../../../../styles/grid';
import { Sound } from '../../../../types/sound';
import { Box } from '../../../../components/box';

type Props = {
    isLoading: boolean;
    data: Sound[];
};

export function SoundsPageBestInMonth({ isLoading, data }: Props) {
    return (
        <>
            <PaddingContainer>
                <Box marginBottom={24}>
                    <Title str="Best in month" />
                </Box>
            </PaddingContainer>
            <Box paddingLeft={24}>
                <RenderIf condition={isLoading}>
                    <IfNoItem dataLength={data.length}>
                        <HorizontalSlider
                            data={data}
                            navigationScreenName="SingleImageScreen"
                        />
                    </IfNoItem>
                </RenderIf>
            </Box>
        </>
    );
}
