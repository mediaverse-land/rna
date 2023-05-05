import { Tags } from '../../shared/components/tags';
import { PaddingContainer } from '../../styles/grid';
import { singleSoundPageConstaints } from './constints';
import { SingleSoundComponents } from './style';

export function SingleSoundPageContent() {
    return (
        <PaddingContainer>
            <SingleSoundComponents.ContentText>
                {singleSoundPageConstaints.contentText}
            </SingleSoundComponents.ContentText>
            <Tags />
        </PaddingContainer>
    );
}
