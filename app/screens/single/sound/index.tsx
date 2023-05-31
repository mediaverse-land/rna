import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../../shared/components/screen-gradient';
import { SingleSoundHeader } from './header';
import { Box } from '../../../shared/components/box';
import { SingleSoundContent } from './content';
import { CommentCard } from '../../../shared/components/comment-card';
import { BuyBottom } from '../components/buy-button';

export function SingleSoundScreen({ navigation }: any) {
    const goBackHandler = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                <ScrollView style={{ width: '100%' }}>
                    <Box
                        width="100%"
                        position='relative'
                        zIndex={20}
                    >
                        <SingleSoundHeader goBackHandler={goBackHandler} />
                        <SingleSoundContent />
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
