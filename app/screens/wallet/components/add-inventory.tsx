import { TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { Input } from '../../../components/form';
import { Text } from '../../../components/text';
import { PaddingContainer } from '../../../styles/grid';
import { theme } from '../../../constaints/theme';
import { Button } from '../../../components/button';

type Props = {
    closeAddInventoryAlertHandler: () => void;
};

export function AddInventory({ closeAddInventoryAlertHandler }: Props) {
    return (
        <PaddingContainer>
            <Box paddingTop={16}>
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
                        Add inventory
                    </Text>
                    <TouchableOpacity
                        onPress={closeAddInventoryAlertHandler}
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
                <Box marginTop={25}>
                    <Input placeholder="Insert amount..." labelText="Amount" />
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
