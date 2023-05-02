import { ScrollView } from "react-native";
import { PaddingContainer } from "../../../../styles/grid";
import { LatestSounds } from "./latest-sounds";
import { MostViewsSounds } from "./most-views";

export function SoundsPage() {
    return (
        <ScrollView>
            <PaddingContainer>
                <LatestSounds />
                <MostViewsSounds />
            </PaddingContainer>
        </ScrollView>
    )
}