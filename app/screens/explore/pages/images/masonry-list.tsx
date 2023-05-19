import { Masonry } from '../../../../shared/components/masonry';
import { PaddingContainer } from '../../../../styles/grid';
import { masonryListImagesMockData } from './mock-data/masonry-list';

export function ImagePageMasonryList() {
    return (
        <PaddingContainer>
            <Masonry data={masonryListImagesMockData} />
        </PaddingContainer>
    );
}
