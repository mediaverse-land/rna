import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../constaints/theme";
import { Box } from "../../../shared/components/box";
import { Text } from "../../../shared/components/text";
import { Flex } from "../../../styles/grid";
import { TouchableOpacity } from "react-native";

export type ListItem = {
    id: number,
    title: string;
    value?: string | null;
    bage?: number | string | null;
    icon: any;
    routePath: string
}

type Props = {
    data: ListItem[]
}

export function ListColumn({ data }: Props) {
    const navigation = useNavigation<any>();

    const navigationHandler = (routePath: string) => {
        navigation.navigate(routePath)
    }

    return (
        <Box
            width="100%"
            borderRadius={16}
            backgroundColor='#1d1d3a'
            paddingLeft={18}
            paddingRight={18}
            paddingBottom={23}
            paddingTop={23}
        >
            {data.map((list: ListItem) => (
                <Box
                    key={list.id}
                    width='100%'
                    marginBottom={list.id !== data.at(-1).id ? 32 : 0}
                >
                    <TouchableOpacity onPress={() => navigationHandler(list.routePath)}>
                        <Flex
                            width='100%'
                            direction='row'
                            align='center'
                            justify='space-between'
                        >
                            <Flex width='60%' direction='row' align='center'>
                                <list.icon
                                    style={{
                                        width: 14.4,
                                        height: 18,
                                        marginRight: 21.6
                                    }}
                                />
                                <Text color='#fff' fontSize={14} lineHeight={20}>
                                    {list.title}
                                </Text>
                            </Flex>
                            {
                                list.value ?
                                    <Text
                                        color='#A2A2B5'
                                        fontSize={theme.numericFontSize.sm}
                                        lineHeight={theme.numericLineHeight.md}
                                    >
                                        {list.value}
                                    </Text> : null
                            }
                            {
                                list.bage ?
                                    <Box
                                        width={18}
                                        height={18}
                                        backgroundColor='#fff'
                                        borderRadius={100}
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <Text
                                            color='#353542'
                                            fontSize={theme.numericFontSize.sm}
                                            lineHeight={theme.numericLineHeight.md}
                                            fontWeight={400}
                                        >{list.bage}</Text>
                                    </Box>
                                    : null
                            }

                        </Flex>
                    </TouchableOpacity>
                </Box>
            ))}
        </Box>
    )
}