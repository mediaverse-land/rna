import { TextPageComponents } from './style';
import { LatestTexts } from './latest-texts';
import { MostViewsText } from './most-views';
import { PaddingContainer } from '../../../../styles/grid';
import { ScrollView } from 'react-native';

// TextItemCard

export function TextsPage() {
    return (
        <TextPageComponents.Container>
            <ScrollView>
                <PaddingContainer>
                    <LatestTexts />
                    <MostViewsText />
                </PaddingContainer>
            </ScrollView>
        </TextPageComponents.Container>
    );
}
