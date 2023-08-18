import { TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { Input } from '../../../components/form';
import { Text } from '../../../components/text';
import { PaddingContainer } from '../../../styles/grid';
import {
    ICON_MASTER_CARD_BLUE,
    ICON_PAYPAL_GRAY
} from '../../../constaints/icons';
import { theme } from '../../../constaints/theme';
import { Button } from '../../../components/button';

type Props = {
    closeAddCardAlertHandler: () => void;
};

export function AddCard({ closeAddCardAlertHandler }: Props) {
    return (
        <PaddingContainer>
            <Box  paddingTop={16}>
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
                    <TouchableOpacity
                        onPress={closeAddCardAlertHandler}
                        activeOpacity={1}
                    >
                        <Text
                            color={theme.color.light.LIGHT_TEXT}
                            fontWeight={400}
                            fontSize={14}
                            lineHeight={16}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
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
                            Master card
                        </Text>
                    </Box>
                </Box>
                <Box marginTop={25}>
                    <Input placeholder="Insert amount..." labelText="Wallet" />
                    <Button
                        varient="dark"
                        text="Pay"
                        marginTop={24}
                        borderRadius={16}
                        size="lg"
                    />
                </Box>
            </Box>
        </PaddingContainer>
    );
}
