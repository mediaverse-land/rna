import { TouchableOpacity } from 'react-native';
import { INVENTORY_BOX_GRADIENT } from '../../../constaints/images';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { PaddingContainer } from '../../../styles/grid';
import { windowSize } from '../../../utils/window-size';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../shared/types/use-navigation';
import { theme } from '../../../constaints/theme';

const { width } = windowSize();

export function InventoryBox() {
    const navigation = useNavigation<UseNavigationType>();

    const redirectToHistoryHandler = () => {
        navigation.navigate('HistoryPage');
    };

    return (
        <PaddingContainer>
            <Box
                width={Math.floor(width) - 48}
                additionalStyles={{
                    overflow: 'hidden'
                }}
                marginTop={40}
                height={56}
                borderRadius={16}
            >
                <INVENTORY_BOX_GRADIENT
                    style={{
                        width: Math.floor(width) - 48,
                        height: 56,
                        position: 'absolute',
                        top: 0
                    }}
                />
                <Box
                    width="100%"
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
                            borderRightColor: theme.color.light.TEXT
                        }}
                    >
                        <Text
                            color={theme.color.light.TEXT}
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
                            color={theme.color.light.WHITE}
                            fontSize={16}
                            fontWeight={600}
                        >
                            200 $
                        </Text>
                        <TouchableOpacity
                            onPress={redirectToHistoryHandler}
                            activeOpacity={1}
                        >
                            <Text
                                color={theme.color.light.PRIMARY}
                                fontSize={14}
                                fontWeight={400}
                            >
                                History
                            </Text>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Box>
        </PaddingContainer>
    );
}
