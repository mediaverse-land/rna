import { useEffect, useContext, useState } from 'react';
import { FlatList, Image, SafeAreaView } from 'react-native';
import { Box } from '../../../../components/box';
import { ScreenGradient } from '../../../../components/screen-gradient';
import { PaddingContainer } from '../../../../styles/grid';
import { SettingsScreenTitle } from '../../components/title';
import { SIGNINS_LIST_ITEM_GRADIET } from '../../../../constaints/images';
import { Text } from '../../../../components/text';
import { theme } from '../../../../constaints/theme';
import { tokenContext } from '../../../../context/token';
import { VirtualizedList } from '../../../../components/virtualized-list';
import { getSessionsApiHandler } from '../../service';
import { tokenStringResolver } from '../../../../utils/token-string-resolver';
import { Session } from '../../../../types/session';
import { FullScreenSpinnerLoader } from '../../../../components/loader-spinner';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';

// type SessionItem = {
//     id: number;
//     uri: string;
//     date: string;
//     device_id: number;
// };

// const sessionList: SessionItem[] = [
//     {
//         id: 1,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 2,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 3,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 4,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 5,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 6,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 7,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 8,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 9,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 10,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 11,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     },
//     {
//         id: 12,
//         uri: 'Mozilla/almas.nakhli.man@gmail.com/sdf...',
//         date: '2020/03/26  13:23',
//         device_id: 84568305
//     }
// ];

const renderSigninItems = ({ item }: { item: Session }) => {
    return (
        <PaddingContainer>
            <Box
                width="100%"
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
                        left: 0,
                        top: 0,
                        borderRadius: 16
                    }}
                    resizeMode='stretch'
                />
                <Box width="100%" paddingLeft={16}>
                    <Text
                        color={theme.color.light.WHITE}
                        fontSize={14}
                        fontWeight={400}
                        lineHeight={17}
                    >
                        {/* {item.details.agent} */}
                        {item.app}
                    </Text>
                </Box>
                <Box
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    height={16}
                    marginTop={8}
                >
                    <Text
                        marginLeft={16}
                        color={theme.color.light.TEXT}
                        fontSize={theme.numericFontSize.sm}
                        lineHeight={theme.numericLineHeight.md}
                    >
                        {item.created_at}
                    </Text>
                    <Text
                        color={theme.color.light.TEXT}
                        marginRight={16}
                        fontSize={theme.numericFontSize.sm}
                        lineHeight={theme.numericLineHeight.md}
                    >
                        {item.id}
                    </Text>
                </Box>
            </Box>
        </PaddingContainer>
    );
};

const pageHeaderComponent = (
    <PaddingContainer>
        <Box marginTop={29}>
            <SettingsScreenTitle title="Sessions" />
        </Box>
    </PaddingContainer>
);

const keyExtractor = (item: Session): string => item.id.toString();

export function SessionsPage() {
    const [data, setData] = useState<Session[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const tokenCtx = useContext(tokenContext);

    const getSessions = async () => {
        setIsLoading(true);
        //
        const token = await tokenCtx.getToken();

        if (token !== null) {
            const formattedToken = await tokenStringResolver(token);

            const { isSuccess, isError, res } = await getSessionsApiHandler(
                formattedToken
            );

            if (isError || !isSuccess) {
                setIsLoading(false);
                return;
            }

            setData(res.data);

            setIsLoading(false);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getSessions();
    }, []);

    const isFocused = useIsFocused();

    return (
        <SafeAreaView style={{ flex: 1, width: '100%', marginTop: -30 }}>
            {isFocused ? (
                <StatusBar
                    backgroundColor={'#030340'}
                    barStyle="light-content"
                />
            ) : null}
            <ScreenGradient>
                <Box width="100%">
                    <VirtualizedList>
                        {pageHeaderComponent}
                        {isLoading ? (
                            <FullScreenSpinnerLoader />
                        ) : (
                            <Box marginTop={48}>
                                <FlatList
                                    data={data}
                                    renderItem={renderSigninItems}
                                    keyExtractor={keyExtractor}
                                />
                            </Box>
                        )}
                    </VirtualizedList>
                </Box>
            </ScreenGradient>
        </SafeAreaView>
    );
}
