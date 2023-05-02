import { ImagesPage } from './style';
import { LatestImages } from './latest-images';
import { MostViewImages } from './most-view';

export function ImagesPages() {
    return (
        <ImagesPage.Container>
            <LatestImages />
            <MostViewImages />
        </ImagesPage.Container>
    );
}
