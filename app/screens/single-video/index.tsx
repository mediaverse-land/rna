import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Header } from '../../layout/header';
import { SinglePageFooter } from '../../shared/components/single-page-footer';

export function SingleVideoPage() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView>
                {/* <SingleImageComponents.Container style={{ flex: 1 }}>
                <SingleImagePageHead />
                <SingleImagePageConent />
                <CommentCard />
            </SingleImageComponents.Container> */}
            </ScrollView>
            <SinglePageFooter />
        </SafeAreaView>
    );
}
