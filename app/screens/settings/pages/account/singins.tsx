import { FlatList, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../../../shared/components/screen-gradient';
import { PaddingContainer } from '../../../../styles/grid';
import { SettingsScreenTitle } from '../../components/title';
import { Box } from '../../../../shared/components/box';
import { Text } from '../../../../shared/components/text';
import { SIGNINS_LIST_ITEM_GRADIET } from '../../../../constaints/images';

type SignInsData = {
    id: number;
    date: string;
    device_id: number;
};

const signInsData: SignInsData[] = [
    {
        id: 1,
        date: '2020/03/26 13:23',
        device_id: 84568305
    },
    {
        id: 2,
        date: '2020/03/26 13:23',
        device_id: 84568305
    },
    {
        id: 3,
        date: '2020/03/26 13:23',
        device_id: 84568305
    }
];

export function SignInsPage() {
    const renderSigninItems = ({ item }: { item: SignInsData }) => {
        return (
            <PaddingContainer>
                <Box
                    width="100%"
                    height={63}
                    paddingTop={22}
                    paddingBottom={22}
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    marginBottom={8}
                    borderRadius={16}
                >
                    <Image
                        source={{ uri: SIGNINS_LIST_ITEM_GRADIET }}
                        style={{
                            width: '100%',
                            height: 62,
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            borderRadius: 16
                        }}
                    />
                    <Text color="#fff" marginLeft={16}>
                        {item.date}
                    </Text>
                    <Text color="#fff" marginRight={16}>
                        {item.device_id}
                    </Text>
                </Box>
            </PaddingContainer>
        );
    };

    const keyExtractor = (item: SignInsData): string => item.id.toString();

    const pageHeaderComponent = (
        <PaddingContainer>
            <Box marginBottom={48}>
                <SettingsScreenTitle title="Sign ins" />
            </Box>
        </PaddingContainer>
    )

    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <ScreenGradient>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <FlatList
                        ListHeaderComponent={pageHeaderComponent}
                        data={signInsData}
                        renderItem={renderSigninItems}
                        keyExtractor={keyExtractor}
                    />
                </ScrollView>
            </ScreenGradient>
        </SafeAreaView>
    );
}
