import { Image, TouchableOpacity } from 'react-native';
import { Box } from '../../../shared/components/box';
import {
    ADD_ACCOUNT_BUTTON_GRADIENT,
    SINGLE_VIDEO_FOOTER_GRAIDENT
} from '../../../constaints/images';
import { Text } from '../../../shared/components/text';
import { theme } from '../../../constaints/theme';
import { ICON_EYE_GRAY, ICON_SHRE_GRAY } from '../../../constaints/icons';
import { useNavigation } from '@react-navigation/native';

export function BuyBottom() {
    const navigation = useNavigation<any>();

    const paymentScreenNavigationHandler = () => {
        navigation.navigate('PaymentScreen');
    };

    return (
        <Box width="100%" height={176}>
            <Image
                source={{ uri: SINGLE_VIDEO_FOOTER_GRAIDENT }}
                style={{
                    width: '100%',
                    height: 176,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16
                }}
            />

            <Box width="100%" height={176} padding={24}>
                <Box
                    width="100%"
                    height={56}
                    borderRadius={16}
                    backgroundColor="rgba(78, 78, 97, 0.5)"
                >
                    <Image
                        source={{
                            uri: ADD_ACCOUNT_BUTTON_GRADIENT
                        }}
                        style={{
                            width: '100%',
                            height: 56,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 10,
                            borderRadius: 16
                        }}
                    />
                    <Box
                        position="relative"
                        zIndex={11}
                        height="100%"
                        direction="row"
                        alignItems="center"
                        paddingLeft={17}
                        paddingRight={17}
                    >
                        <Text
                            color="#CCCCFF"
                            fontSize={theme.numericFontSize.md}
                            lineHeight={theme.numericLineHeight.md}
                            fontWeight={400}
                        >
                            Ownership
                        </Text>
                        <Text
                            color="#fff"
                            fontSize={theme.numericFontSize.md}
                            lineHeight={theme.numericLineHeight.md}
                            marginLeft={16}
                            fontWeight={600}
                        >
                            150 $
                        </Text>
                        <Box
                            flex={1}
                            height={20}
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                        >
                            <ICON_EYE_GRAY
                                style={{
                                    width: 16,
                                    height: 16
                                }}
                            />
                            <ICON_SHRE_GRAY
                                style={{
                                    width: 16,
                                    height: 16,
                                    marginLeft: 16
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
                {/* buy-buton */}
                <Box marginTop={16}>
                    <TouchableOpacity onPress={paymentScreenNavigationHandler}>
                        <Box
                            width="100%"
                            height={48}
                            backgroundColor="#597AFF"
                            borderRadius={16}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text
                                color="#fff"
                                fontSize={14}
                                lineHeight={20}
                                fontWeight={600}
                            >
                                Buy
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </Box>
    );
}
