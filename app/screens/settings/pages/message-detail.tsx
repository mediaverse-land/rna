import { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenGradient } from "../../../components/screen-gradient"
import { RenderIf } from "../../../components/render-if"
import { Box } from "../../../components/box"
import { Message } from "../../../types/message"
import { tokenContext } from '../../../context/token'
import { tokenStringResolver } from '../../../utils/token-string-resolver'
import { getMessageDetailApiHandler } from '../service'
import { PaddingContainer } from '../../../styles/grid'
import { SettingsScreenTitle } from '../components/title'
import { Text } from '../../../components/text'
import { formatDate } from '../../../utils/format-date'

const pageHeaderComponent = (
    <Box width='100%' marginBottom={48}>
        <PaddingContainer>
            <SettingsScreenTitle title="Inbox" />
        </PaddingContainer>
    </Box>
);

export const MessageDetail = ({ route }: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Message>();

    const { id } = route.params;

    const tokenCtx = useContext(tokenContext);

    const getData = async () => {
        setIsLoading(true);
        const token = await tokenCtx.getToken();

        if (token !== null) {
            const formattedToken = await tokenStringResolver(token);

            const { isSuccess, isError, res } = await getMessageDetailApiHandler(
                formattedToken,
                id
            );

            if (isError || !isSuccess) {
                setIsLoading(false);
                return;
            }

            if (res) {
                setData(res.data);
            }

            setIsLoading(false);
        }
    }


    useEffect(() => {
        if (!id) {
            return;
        }
        getData();
    }, []);

    const date = data && data?.created_at && formatDate(data.created_at);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                {pageHeaderComponent}
                <RenderIf condition={isLoading}>
                    {data?.message ?
                        <Box width='100%' paddingRight={24} paddingLeft={24}>
                            <Box
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                            >
                                <Box width='40%' height={20}>
                                    <Text
                                        color='#fff'
                                        fontSize={16}
                                        fontWeight={400}
                                        lineHeight={20}
                                    >{data.message}</Text>
                                </Box>
                                <Box height={20}>
                                    <Text
                                        color='#666680'
                                        fontSize={12}
                                        fontWeight={400}
                                        lineHeight={16}
                                    >{date || ""}</Text>
                                </Box>
                            </Box>
                            <Box
                                width='100%'
                                marginTop={24}>
                                <Text
                                    color='#666680'
                                    fontSize={16}
                                    fontWeight={400}
                                    lineHeight={16}
                                >{data.message}</Text>
                            </Box>
                        </Box>
                        : null
                    }
                </RenderIf>
            </ScreenGradient>
        </SafeAreaView >
    )
}