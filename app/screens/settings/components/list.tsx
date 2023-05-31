import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { Flex } from '../../../styles/grid';
import { TouchableOpacity } from 'react-native';
import { useRtl } from '../../../hooks/use-rtl';
import { UseNavigationType } from '../../../shared/types/use-navigation';

export type ListColumnItem = {
    id: number;
    title: string;
    value?: string | null;
    bage?: number | string | null;
    icon: any;
    routePath?: string;
    direction?: 'row-reverse';
    iconStyle?: any;
};

type Props = {
    data: ListColumnItem[];
};

export function ListColumn({ data }: Props) {
    const { isRtl } = useRtl();
    const navigation = useNavigation<UseNavigationType>();

    const navigationHandler = (routePath: string) => {
        navigation.navigate(routePath);
    };

    return (
        <Box
            width="100%"
            borderRadius={16}
            backgroundColor="#1d1d3a"
            paddingLeft={18}
            paddingRight={18}
            paddingBottom={23}
            paddingTop={23}
        >
            {data.map((list: ListColumnItem) => (
                <Box
                    key={list.id}
                    width="100%"
                    marginBottom={list.id !== data.at(-1).id ? 32 : 0}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>
                            list.routePath && navigationHandler(list.routePath)
                        }
                    >
                        <Flex
                            width="100%"
                            direction="row"
                            align="center"
                            justify="space-between"
                        >
                            <Flex width="60%" direction="row" align="center">
                                {!list.direction ||
                                    list.direction !== 'row-reverse' ? (
                                    <list.icon
                                        style={[
                                            list.iconStyle,
                                            {
                                                marginRight: 21.6
                                            }
                                        ]}
                                    />
                                ) : null}
                                <Text
                                    color={theme.color.light.WHITE}
                                    fontSize={14}
                                    lineHeight={20}
                                >
                                    {list.title}
                                </Text>
                            </Flex>

                            {list?.direction === 'row-reverse' ? (
                                <>
                                    <list.icon
                                        style={[
                                            list.iconStyle,
                                            {
                                                transform: [
                                                    {
                                                        rotate: isRtl
                                                            ? '180deg'
                                                            : '0deg'
                                                    }
                                                ]
                                            }
                                        ]}
                                    />
                                </>
                            ) : (
                                <>
                                    {list.value ? (
                                        <Text
                                            color={theme.color.light.LIGHT_TEXT}
                                            fontSize={theme.numericFontSize.sm}
                                            lineHeight={
                                                theme.numericLineHeight.md
                                            }
                                        >
                                            {list.value}
                                        </Text>
                                    ) : null}
                                    {list.bage ? (
                                        <Box
                                            width={18}
                                            height={18}
                                            backgroundColor={theme.color.light.WHITE}
                                            borderRadius={100}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Text
                                                color={theme.color.light.INPUT_PLACEHOLDER}
                                                fontSize={
                                                    theme.numericFontSize.sm
                                                }
                                                lineHeight={
                                                    theme.numericLineHeight.md
                                                }
                                                fontWeight={400}
                                            >
                                                {list.bage}
                                            </Text>
                                        </Box>
                                    ) : null}
                                </>
                            )}
                        </Flex>
                    </TouchableOpacity>
                </Box>
            ))}
        </Box>
    );
}
