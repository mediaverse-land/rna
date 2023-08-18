
import { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'
import { Box } from '../../../components/box';
import { ScreenGradient } from '../../../components/screen-gradient';
import { PaddingContainer } from '../../../styles/grid';
import { SettingsScreenTitle } from '../components/title';
import { FlatList, Image } from 'react-native';
import {
    SIGNINS_LIST_ITEM_GRADIET,
} from '../../../constaints/images';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { Message } from '../../../types/message';
import { tokenContext } from '../../../context/token';
import { tokenStringResolver } from '../../../utils/token-string-resolver';
import { getMessagesApiHandler } from '../service';
import { UseNavigationType } from '../../../types/use-navigation';
import { RenderIf } from '../../../components/render-if';
import { IfNoItem } from '../../../components/if-no-item';
import { StorageService } from '../../../services/storage.service';

const pageHeaderComponent = (
    <Box marginBottom={48}>
        <PaddingContainer>
            <SettingsScreenTitle title="Inbox" />
        </PaddingContainer>
    </Box>
);

const _storageService = new StorageService();

const keyExtractor = (item: Message): string => item.id.toString();

export function MessagesPage() {
    const [data, setData] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const tokenCtx = useContext(tokenContext);

    useEffect(() => {
        getSessions();
    }, []);

    useEffect(() => {
        readMessages();
    }, [data]);

    const readMessages = async () => {
        if (!data.length) {
            return;
        }
        await _storageService.set('notifs_length', data.length)
    }

    const getSessions = async () => {
        setIsLoading(true);
        const token = await tokenCtx.getToken();

        if (token !== null) {
            const formattedToken = await tokenStringResolver(token);

            const { isSuccess, isError, res } = await getMessagesApiHandler(
                formattedToken
            );

            if (isError || !isSuccess) {
                setIsLoading(false);
                return;
            }

            if (res) {
                setData(res.data.data);
            }

            setIsLoading(false);
        }
    };

    const navigation = useNavigation<UseNavigationType>()

    const messageNavigateHandler = (id: number) => {
        navigation.navigate('MassageDetail', {
            id
        })
    }

    const renderMessageItem = ({ item }: { item: Message }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => messageNavigateHandler(item.id)}
            >
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
                            // uri: item.isRead
                            //     ? 
                            //     SIGNINS_LIST_ITEM_GRADIET
                            //     :
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
                        resizeMode='stretch'
                    />
                    <Box
                        width="100%"
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        paddingLeft={16}
                        paddingRight={16}
                        marginBottom={8}
                        height='100%'
                    >
                        <Text
                            color={theme.color.light.WHITE}
                            fontSize={14}
                            lineHeight={17.3}
                        >
                            New updates
                        </Text>
                        <Text
                            color={theme.color.light.TEXT}
                            fontSize={theme.numericFontSize.sm}
                            lineHeight={theme.numericLineHeight.md}
                        >
                            {item.message}
                        </Text>
                    </Box>
                    <Text
                        color={theme.color.light.TEXT}
                        paddingLeft={16}
                        paddingRight={16}
                    >
                        {/* {item.description} */}
                    </Text>
                </Box>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                <Box width='100%' >
                    {pageHeaderComponent}
                </Box>
                <RenderIf condition={isLoading}>
                    <IfNoItem dataLength={data.length}>
                        <Box paddingRight={24} paddingLeft={24}>
                            <FlatList
                                // ListHeaderComponent={pageHeaderComponent}
                                data={data}
                                renderItem={renderMessageItem}
                                keyExtractor={keyExtractor}
                            />
                        </Box>
                    </IfNoItem>
                </RenderIf>
            </ScreenGradient>
        </SafeAreaView>
    );
}
