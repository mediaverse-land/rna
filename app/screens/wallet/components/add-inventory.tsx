import { Box } from '../../../shared/components/box';
import { Input } from '../../../shared/components/form';
import { Text } from '../../../shared/components/text';
import { PaddingContainer } from '../../../styles/grid';
import { theme } from '../../../constaints/theme';
import { Button } from '../../../shared/components/button';

export function AddInventory() {
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
                        Add inventory
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
                <Box marginTop={25}>
                    <Input placeholder="Insert amount..." labelText="Amount" />
                    <Button
                        varient='dark'
                        text='Pay'
                        marginTop={24}
                        borderRadius={16}
                        size='lg'
                    />
                </Box>
            </Box>
        </PaddingContainer>
    );
}
