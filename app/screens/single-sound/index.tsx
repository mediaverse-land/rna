import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../layout/header";
import { CommentCard } from "../../shared/components/comment-card";
import { SinglePageFooter } from "../../shared/components/single-page-footer";
import { SingleSoundComponents } from "./style";
import { SingleSoundPagePlayer } from "./player";
import { SingleSoundPageHead } from "./head";
import { SingleSoundPageContent } from "./content";


export function SingleSoundPage() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView>
                <SingleSoundComponents.Container style={{ flex: 1 }}>
                    <SingleSoundPagePlayer />
                    <SingleSoundPageHead />
                    <SingleSoundPageContent />
                    <CommentCard />
                </SingleSoundComponents.Container>
            </ScrollView>
            <SinglePageFooter />
        </SafeAreaView>
    )
}