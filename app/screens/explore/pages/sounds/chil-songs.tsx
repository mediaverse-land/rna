import { HorizontalSlider } from '../../../../shared/components/horizontal-slider';
import { Title } from '../../../../shared/components/title';
import { PaddingContainer } from '../../../../styles/grid';
import { soundsMockData } from './sound-mock-data';
import { Box } from '../../../../shared/components/box';

export function SoundsPageChillSongs() {
    return (
        <Box marginTop={49} >
            <PaddingContainer>
                <Title str="Chill songs" />
                <Box marginTop={40}>
                    <HorizontalSlider data={soundsMockData} />
                </Box>
            </PaddingContainer>
        </Box>
    );
}
