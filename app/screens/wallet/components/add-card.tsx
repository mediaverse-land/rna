import { TouchableOpacity } from 'react-native';
import { Box } from '../../../shared/components/box';
import { Input } from '../../../shared/components/form';
import { Text } from '../../../shared/components/text';
import { PaddingContainer } from '../../../styles/grid';
import {
    ICON_MASTER_CARD_BLUE,
    ICON_PAYPAL_GRAY
} from '../../../constaints/icons';
import { FontWeight } from '@shopify/react-native-skia';
import { theme } from '../../../constaints/theme';

export function AddCard() {
    return (
        <PaddingContainer>
            <Box paddingTop={16} height={400}>
                <Box
                    width="100%"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text
                        color={theme.color.light.WHITE}
                        fontWeight={600}
                        fontSize={16}
                        lineHeight={16}
                    >
                        Add card
                    </Text>
                    <Text
                        color={theme.color.light.LIGHT_TEXT}
                        fontWeight={400}
                        fontSize={14}
                        lineHeight={16}
                    >
                        Cancel
                    </Text>
                </Box>
                <Box
                    marginTop={24}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box
                        height={43}
                        width="48%"
                        additionalStyles={{
                            borderWidth: 1,
                            borderColor: theme.color.light.LIGHT_TEXT,
                            borderRadius: 8
                        }}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ICON_PAYPAL_GRAY width={15.9} height={16} />
                        <Text
                            color={theme.color.light.LIGHT_TEXT}
                            fontSize={14}
                            lineHeight={16}
                            fontWeight={400}
                            marginLeft={8}
                        >
                            PayPal
                        </Text>
                    </Box>
                    <Box
                        height={43}
                        width="48%"
                        additionalStyles={{
                            borderWidth: 1,
                            borderColor: theme.color.light.PRIMARY,
                            backgroundColor: theme.color.light.PRIMARY,
                            borderRadius: 8
                        }}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ICON_MASTER_CARD_BLUE width={22} height={13.87} />
                        <Text
                            color={theme.color.light.WHITE}
                            fontSize={14}
                            lineHeight={16}
                            fontWeight={400}
                            marginLeft={8}
                        >
                            PayPal
                        </Text>
                    </Box>
                </Box>
                <Box marginTop={25}>
                    <Input placeholder="Insert amount..." labelText="Wallet" />

                    <TouchableOpacity activeOpacity={1}>
                        <Box
                            marginTop={24}
                            width="100%"
                            height={48}
                            borderRadius={16}
                            backgroundColor={theme.color.light.DARK_GRAY}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color={theme.color.light.WHITE} fontSize={14} fontWeight={600}>
                                Pay
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </PaddingContainer>
    );
}
