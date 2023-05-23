import { FlatList, Image, SafeAreaView, ScrollView } from "react-native";
import { Box } from "../../../../shared/components/box";
import { ScreenGradient } from "../../../../shared/components/screen-gradient";
import { PaddingContainer } from "../../../../styles/grid";
import { SettingsScreenTitle } from "../../components/title";
import { SIGNINS_LIST_ITEM_GRADIET } from "../../../../constaints/images";
import { Text } from "../../../../shared/components/text";
import { theme } from "../../../../constaints/theme";

type SessionItem = {
    id: number;
    uri: string;
    date: string;
    device_id: number;
}

const sessionList: SessionItem[] = [
    {
        id: 1,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 2,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 3,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 4,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 5,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 6,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 7,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 8,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 9,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 10,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 11,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
    {
        id: 12,
        uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
        date: '2020/03/26  13:23',
        device_id: 84568305
    },
]

export function SessionsPage() {

    const renderSigninItems = ({ item }: { item: SessionItem }) => {
        return (
            <Box
                width='100%'
                height={77}
                paddingTop={16}
                paddingBottom={16}
                marginBottom={8}
                borderRadius={16}
            >
                <Image
                    source={{ uri: SIGNINS_LIST_ITEM_GRADIET }}
                    style={{
                        width: '100%',
                        height: 77,
                        position: 'absolute',
                        left: 0, top: 0,
                        borderRadius: 16
                    }}
                />
                <Box width='100%' paddingLeft={16}>
                    <Text
                        color="#fff"
                        fontSize={14}
                        fontWeight={400}
                        lineHeight={17}
                    >{item.uri}</Text>
                </Box>
                <Box
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width='100%'
                    height={16}
                    marginTop={8}
                >
                    <Text
                        marginLeft={16}
                        color="#666680"
                        fontSize={theme.numericFontSize.sm}
                        lineHeight={theme.numericLineHeight.md}
                    >{item.date}</Text>
                    <Text
                        color="#666680"
                        marginRight={16}
                        fontSize={theme.numericFontSize.sm}
                        lineHeight={theme.numericLineHeight.md}
                    >{item.device_id}</Text>
                </Box>

            </Box>
        )
    }

    const keyExtractor = (item: SessionItem): string => item.id.toString()

    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <ScreenGradient >
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <PaddingContainer>
                        <Box marginTop={32}>
                            <SettingsScreenTitle title="Sessions" />
                        </Box>
                        <Box marginTop={48}>
                            <FlatList
                                data={sessionList}
                                renderItem={renderSigninItems}
                                keyExtractor={keyExtractor}
                            />
                        </Box>
                    </PaddingContainer>
                </ScrollView>
            </ScreenGradient>
        </SafeAreaView>
    )
}