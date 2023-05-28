import { TouchableOpacity } from "react-native";
import { INVENTORY_BOX_GRADIENT } from "../../../constaints/images";
import { Box } from "../../../shared/components/box";
import { Text } from "../../../shared/components/text";
import { PaddingContainer } from "../../../styles/grid";

export function InventoryBox() {
    return (
        <PaddingContainer>
            <Box
                marginTop={40}
                height={56}
                borderRadius={16}
            >
                <INVENTORY_BOX_GRADIENT
                    style={{
                        width: '100%',
                        height: 56,
                        position: 'absolute',
                        top: 0
                    }}
                />
                <Box
                    width='100%'
                    height={56}
                    paddingLeft={16}
                    paddingRight={16}
                    direction="row"
                    alignItems="center"
                >
                    <Box
                        width={80}
                        height={32}
                        direction="row"
                        alignItems="center"
                        additionalStyles={{
                            borderRightWidth: 1,
                            borderRightColor: '#666680'
                        }}
                    >
                        <Text
                            color="#666680"
                            lineHeight={16}
                            fontSize={14}
                            fontWeight={400}
                        >
                            Inventory
                        </Text>
                    </Box>
                    <Box
                        flex={1}
                        marginLeft={16}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Text
                            color="#fff"
                            fontSize={16}
                            fontWeight={600}
                        >
                            200 $
                        </Text>
                        <TouchableOpacity
                            activeOpacity={1}
                        >
                            <Text
                                color="#597AFF"
                                fontSize={14}
                                fontWeight={400}
                            >
                                Inventory
                            </Text>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Box>
        </PaddingContainer>
    )
}