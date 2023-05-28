import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../../shared/components/screen-gradient';
import { SingleTextHeader } from './header';
import { Box } from '../../../shared/components/box';
import { CommentCard } from '../../../shared/components/comment-card';
import { SingleTextContent } from './content';
import { BuyBottom } from '../components/buy-button';

export function SingleTextScreen({ navigation }: any) {
    const goBackHandler = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                <ScrollView style={{ width: '100%' }}>
                    <Box width="100%">
                        <SingleTextHeader goBackHandler={goBackHandler} />
                        <SingleTextContent />
                        <Box marginTop={24} marginBottom={50}>
                            <CommentCard />
                        </Box>
                    </Box>
                </ScrollView>
                <BuyBottom />
            </ScreenGradient>
        </SafeAreaView>
    );
}
