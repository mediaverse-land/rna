import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "../../../shared/components/box";
import { ScreenGradient } from "../../../shared/components/screen-gradient";
import { PaddingContainer } from "../../../styles/grid";
import { SettingsScreenTitle } from "../components/title";
import { FlatList, Image } from "react-native";
import { SIGNINS_LIST_ITEM_GRADIET, SIGNINS_LIST_ITEM_LIGHT_GRADIET } from "../../../constaints/images";
import { Text } from "../../../shared/components/text";
import { theme } from "../../../constaints/theme";

type MessageType = {
    id: number;
    date: string;
    description: string;
    isRead: boolean
}

const messages: MessageType[] = [
    {
        id: 1,
        date: 'April 26  13:23',
        isRead: false,
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
    {
        id: 2,
        date: 'April 26  13:23',
        isRead: false,
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
    {
        id: 3,
        date: 'April 26  13:23',
        isRead: true,
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
    {
        id: 4,
        date: 'April 26  13:23',
        isRead: true,
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
    {
        id: 5,
        date: 'April 26  13:23',
        isRead: true,
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
    {
        id: 6,
        date: 'April 26  13:23',
        isRead: true,
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
    {
        id: 7,
        date: 'April 26  13:23',
        isRead: true,
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
    {
        id: 8,
        date: 'April 26  13:23',
        isRead: true,
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
]

const pageHeaderComponent = (
    <Box marginBottom={48}>
        <PaddingContainer>
            <SettingsScreenTitle title="Messages" />
        </PaddingContainer>
    </Box>
)

export function MessagesPage() {
    const renderMessageItem = ({ item }: { item: MessageType }) => {
        return (
            <PaddingContainer>
                <Box
                    width="100%"
                    height={100}
                    paddingTop={22}
                    paddingBottom={22}
                    alignItems="center"
                    marginBottom={8}
                    borderRadius={16}
                >
                    <Image
                        source={{
                            uri: item.isRead ?
                                SIGNINS_LIST_ITEM_GRADIET :
                                SIGNINS_LIST_ITEM_LIGHT_GRADIET
                        }}
                        style={{
                            width: '100%',
                            height: 98,
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            borderRadius: 16
                        }}
                    />
                    <Box
                        width='100%'
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        paddingLeft={16}
                        paddingRight={16}
                        marginBottom={8}
                    >
                        <Text color="#fff" fontSize={14} lineHeight={17.3}>
                            New updates
                        </Text>
                        <Text
                            color="#666680"
                            fontSize={theme.numericFontSize.sm}
                            lineHeight={theme.numericLineHeight.md}
                        >
                            {item.date}
                        </Text>
                    </Box>
                    <Text color="#666680" paddingLeft={16} paddingRight={16}>
                        {item.description}
                    </Text>
                </Box>
            </PaddingContainer>
        )
    }

    const keyExtractor = (item: MessageType): string => item.id.toString();


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                <Box>
                    <FlatList
                        ListHeaderComponent={pageHeaderComponent}
                        data={messages}
                        renderItem={renderMessageItem}
                        keyExtractor={keyExtractor}
                    />
                </Box>
            </ScreenGradient>
        </SafeAreaView>
    )
}