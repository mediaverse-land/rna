import { TouchableOpacity } from 'react-native';
import { Box } from '../../../shared/components/box';
import { Input } from '../../../shared/components/form';
import { Text } from '../../../shared/components/text';
import { PaddingContainer } from '../../../styles/grid';

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
                        color="#fff"
                        fontWeight={600}
                        fontSize={16}
                        lineHeight={16}
                    >
                        Add inventory
                    </Text>
                    <Text
                        color="#A2A2B5"
                        fontWeight={400}
                        fontSize={14}
                        lineHeight={16}
                    >
                        Cancel
                    </Text>
                </Box>
                <Box marginTop={25}>
                    <Input placeholder="Insert amount..." labelText="Amount" />

                    <TouchableOpacity activeOpacity={1}>
                        <Box
                            marginTop={24}
                            width="100%"
                            height={48}
                            borderRadius={16}
                            backgroundColor="rgba(28, 28, 35, 0.75)"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color="#fff" fontSize={14} fontWeight={600}>
                                Pay
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </PaddingContainer>
    );
}
