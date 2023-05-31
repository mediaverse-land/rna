import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image } from 'react-native';
import { Box } from '../../shared/components/box';
import { PaddingContainer } from '../../styles/grid';
import { SettingsScreenTitle } from '../settings/components/title';
import {
    SIGNINS_LIST_ITEM_GRADIET,
    SIGNINS_LIST_ITEM_LIGHT_GRADIET
} from '../../constaints/images';
import { Text } from '../../shared/components/text';
import { theme } from '../../constaints/theme';
import { ScreenGradient } from '../../shared/components/screen-gradient';
import { ICON_DOWNLOAD } from '../../constaints/icons';

type MessageType = {
    id: number;
    date: string;
    description: string;
    title: string;
};

const messages: MessageType[] = [
    {
        id: 1,
        title: '20 $',
        date: '2020/03/26  13:23',
        description: 'Labeling'
    },
    {
        id: 2,
        title: '20 $',
        date: '2020/03/26  13:23',
        description: 'Labeling'
    },
    {
        id: 4,
        title: '20 $',
        date: '2020/03/26  13:23',
        description: 'Labeling'
    },
    {
        id: 5,
        title: '20 $',
        date: '2020/03/26  13:23',
        description: 'Labeling'
    }
];

const pageHeaderComponent = (
    <Box marginBottom={48}>
        <PaddingContainer>
            <Box
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box width={150}>
                    <SettingsScreenTitle title="History" />
                </Box>
                <Box paddingTop={38}>
                    <ICON_DOWNLOAD width={20} height={20} />
                </Box>
            </Box>
        </PaddingContainer>
    </Box>
);

export function HistoryPage() {
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
                            uri: SIGNINS_LIST_ITEM_GRADIET
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
                        width="100%"
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        paddingLeft={16}
                        paddingRight={16}
                        marginBottom={8}
                    >
                        <Text color={theme.color.light.WHITE} fontSize={14} lineHeight={17.3}>
                            {item.title}
                        </Text>
                        <Text
                            color={theme.color.light.TEXT}
                            fontSize={theme.numericFontSize.sm}
                            lineHeight={theme.numericLineHeight.md}
                        >
                            {item.date}
                        </Text>
                    </Box>
                    <Box width="100%" direction="row">
                        <Text
                            color={theme.color.light.TEXT}
                            paddingLeft={16}
                            paddingRight={16}
                        >
                            {item.description}
                        </Text>
                    </Box>
                </Box>
            </PaddingContainer>
        );
    };

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
    );
}
