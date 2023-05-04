import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../layout/header';
import { SingleImageComponents } from './style';
import { SingleImagePageHead } from './head';
import { SingleImagePageConent } from './content';
import { CommentCard } from '../../shared/components/comment-card';
import { SinglePageFooter } from '../../shared/components/single-page-footer';

export function SingleImagePage() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView>
                <SingleImageComponents.Container style={{ flex: 1 }}>
                    <SingleImagePageHead />
                    <SingleImagePageConent />
                    <CommentCard />
                </SingleImageComponents.Container>
            </ScrollView>
            <SinglePageFooter />
        </SafeAreaView>
    );
}
