import { useState } from 'react';
import {
    ICON_MASTER_CARD,
    ICON_PAYPAL,
    ICON_WALLET_BLUE,
    ICON_WALLET_SVG
} from '../../../constaints/icons';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { PaddingContainer } from '../../../styles/grid';
import { TouchableOpacity } from 'react-native';

const paymentMethods = [
    {
        id: 1,
        icon: (
            <ICON_PAYPAL
                style={{
                    width: 40,
                    height: 40
                }}
            />
        ),
        title: 'PayPal',
        description: 'Online pay'
    },
    {
        id: 2,
        icon: (
            <ICON_MASTER_CARD
                style={{
                    width: 40,
                    height: 40
                }}
            />
        ),
        title: 'MasterCard',
        description: 'Online pay'
    }
];

export function HowToPayList() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
        paymentMethods[0].title
    );

    const setSelectedPaymentMethodHandler = (title: string) => {
        setSelectedPaymentMethod(title);
    };

    return (
        <PaddingContainer>
            <Box marginTop={32}>
                <Text
                    color="#fff"
                    fontWeight={600}
                    fontSize={theme.numericFontSize.md}
                    lineHeight={theme.numericLineHeight.md}
                >
                    How to pay
                </Text>

                <Box marginTop={24}>
                    <Box
                        width="100%"
                        flex={1}
                        direction="row"
                        alignItems="center"
                        backgroundColor="#121246"
                        padding={16}
                        borderRadius={8}
                    >
                        <Box width={40} height={40}>
                            <ICON_WALLET_BLUE
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                            <ICON_WALLET_SVG
                                style={{
                                    width: 20,
                                    height: 20,
                                    position: 'absolute',
                                    top: 12,
                                    left: 10
                                }}
                            />
                        </Box>
                        <Box
                            flex={1}
                            direction="row"
                            alignItems="center"
                            marginLeft={16}
                        >
                            <Box>
                                <Text
                                    color="#fff"
                                    fontWeight={600}
                                    fontSize={theme.numericFontSize.md}
                                    lineHeight={theme.numericLineHeight.md}
                                >
                                    Wallet
                                </Text>
                                <Text
                                    color="#666680"
                                    fontWeight={400}
                                    fontSize={theme.numericFontSize.sm}
                                    lineHeight={theme.numericLineHeight.md}
                                    marginTop={4}
                                >
                                    Inventory: 15 $
                                </Text>
                            </Box>
                            <Box
                                flex={1}
                                direction="row"
                                justifyContent="flex-end"
                            >
                                <Text
                                    color="#666680"
                                    fontWeight={400}
                                    fontSize={theme.numericFontSize.sm}
                                    lineHeight={theme.numericLineHeight.md}
                                    marginTop={4}
                                >
                                    Add inventory
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {paymentMethods.map((m) => (
                    <TouchableOpacity
                        key={m.id}
                        activeOpacity={1}
                        onPress={() => setSelectedPaymentMethodHandler(m.title)}
                    >
                        <Box marginTop={8}>
                            <Box
                                width="100%"
                                flex={1}
                                direction="row"
                                alignItems="center"
                                backgroundColor="#121246"
                                padding={16}
                                borderRadius={8}
                                additionalStyles={{
                                    borderWidth: 1,
                                    borderColor:
                                        selectedPaymentMethod === m.title
                                            ? '#597AFF'
                                            : 'transparent'
                                }}
                            >
                                <Box width={40} height={40}>
                                    {m.icon}
                                </Box>
                                <Box
                                    flex={1}
                                    direction="row"
                                    alignItems="center"
                                    marginLeft={16}
                                >
                                    <Box>
                                        <Text
                                            color="#fff"
                                            fontWeight={600}
                                            fontSize={theme.numericFontSize.md}
                                            lineHeight={
                                                theme.numericLineHeight.md
                                            }
                                        >
                                            {m.title}
                                        </Text>
                                        <Text
                                            color="#666680"
                                            fontWeight={400}
                                            fontSize={theme.numericFontSize.sm}
                                            lineHeight={
                                                theme.numericLineHeight.md
                                            }
                                            marginTop={4}
                                        >
                                            {m.description}
                                        </Text>
                                    </Box>
                                    <Box
                                        flex={1}
                                        direction="row"
                                        justifyContent="flex-end"
                                    >
                                        <Box
                                            width={18}
                                            height={18}
                                            borderRadius={100}
                                            additionalStyles={{
                                                borderWidth: 1,
                                                borderColor:
                                                    selectedPaymentMethod !==
                                                    m.title
                                                        ? '#CCCCFF'
                                                        : 'transparent'
                                            }}
                                            backgroundColor={
                                                selectedPaymentMethod ===
                                                m.title
                                                    ? '#597AFF'
                                                    : 'transparent'
                                            }
                                        ></Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </TouchableOpacity>
                ))}
            </Box>
        </PaddingContainer>
    );
}
