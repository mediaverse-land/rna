import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../../shared/components/screen-gradient';
import { Box } from '../../../shared/components/box';
import { CommentCard } from '../../../shared/components/comment-card';
import { SingleImageHeader } from './header';
import { SingleImageContent } from './content';
import { BuyBottom } from '../components/buy-button';

export function SingleImageScreen({ navigation }: any) {
    const goBackHandler = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                <ScrollView style={{ width: '100%' }}>
                    <Box width="100%" position='relative'
                        zIndex={20}
                    >
                        <SingleImageHeader goBackHandler={goBackHandler} />
                        <SingleImageContent />
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
