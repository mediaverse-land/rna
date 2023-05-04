import { Tags } from "../../shared/components/tags";
import { PaddingContainer } from "../../styles/grid";
import { singleTextPageConstaints } from "./constaints";
import { SingleTextComponents } from "./style";

export function SingleTextPageContent() {
    return (
        <PaddingContainer>
            <SingleTextComponents.ContentText>
                {singleTextPageConstaints.contentText}
            </SingleTextComponents.ContentText>
            <Tags />
        </PaddingContainer>
    )
}