import { ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from "../../layout/header";
import { SinglePageFooter } from "../../shared/components/single-page-footer";
import { SingleTextComponents } from "./style";
import { SingleTextPageHead } from "./head";
import { SingleTextPageContent } from "./content";
import { CommentCard } from "../../shared/components/comment-card";

export function SingleTextPage() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView>
                <SingleTextComponents.Container>
                    <SingleTextPageHead />
                    <SingleTextPageContent />
                    <CommentCard />
                </SingleTextComponents.Container>
            </ScrollView>
            <SinglePageFooter />
        </SafeAreaView>
    )
}