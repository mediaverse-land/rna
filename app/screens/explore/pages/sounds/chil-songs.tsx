import { HorizontalSlider } from '../../../../components/horizontal-slider';
import { Title } from '../../../../components/title';
import { PaddingContainer } from '../../../../styles/grid';
import { Box } from '../../../../components/box';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';
import { Sound } from '../../../../types/sound';

type Props = {
    isLoading: boolean;
    data: Sound[];
};

export function SoundsPageChillSongs({ isLoading, data }: Props) {
    return (
        <>
            <PaddingContainer>
                <Box marginBottom={24} marginTop={34}>
                    <Title str="Chill songs" />
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
