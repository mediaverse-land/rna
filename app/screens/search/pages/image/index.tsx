import { ScrollView } from 'react-native-gesture-handler';
import { PaddingContainer } from '../../../../styles/grid';
import { SearchPagePlaceholder } from '../../../../shared/components/sesrch-page-placeholder';

export function ImagesPage() {
    return (
        <ScrollView>
            <PaddingContainer>
                <SearchPagePlaceholder />
            </PaddingContainer>
        </ScrollView>
    );
}
