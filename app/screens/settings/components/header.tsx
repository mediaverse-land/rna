import { Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flex } from '../../../styles/grid';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { theme } from '../../../constaints/theme';
import { ICON_ARROW_LEFT_SVG } from '../../../constaints/icons';
import { useNavigation } from '@react-navigation/native';
import { useRtl } from '../../../hooks/use-rtl';

const URI =
    'https://s3-alpha-sig.figma.com/img/8b38/0123/1b3bc56d8d3d28d35c9776e478125bae?Expires=1685923200&Signature=gWMAZUvjlSCOfKP4e6hFLjFgOSd-IECkM40ZQ4~YTNr~WUr6gqDibYMhqOmNiwcMBzE2uFfLq7NcF8WJTxrQi9M6WJmXFTvwxWtxRPtDA~pPSx48PXwbibPvThmZVX3O5SAv9szQetIMBGF9VgyQNJMT~wuxVRNDPSkQGTUn~DdeZwbVELADu~Sgz5LTC-IPr~5St8CpDpQvDxCYDOKjFw091uL~PJiFUIJ1smHYXIczAAAOcWEtgHi187J0mufQL5CW2kymK7~RrFarFPZbUtSToEX44Um3JqXE2mtFxhyToGki4DTo6hmgntK0ZaWVhuxGhlZvGd2YUpS0ld92Dw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

export function SettingsScreenHeader() {
    const { isRtl } = useRtl();
    const navigation = useNavigation();

    const goBackHandler = () => {
        navigation.goBack();
    };

    return (
        <>
            <LinearGradient
                colors={['#204cb4', '#b3c4ea']}
                start={{ x: 0.6, y: 0.2 }}
                end={{ x: 0.1, y: 0.2 }}
                style={{
                    width: '100%',
                    height: 52
                }}
            />
            <Flex>
                <Box width="100%">
                    <Flex
                        width="100%"
                        height="140px"
                        align="center"
                        justify="center"
                    >
                        <Box
                            width={88}
                            height={88}
                            backgroundColor="#0b0b30"
                            position="absolute"
                            top={-14}
                            borderRadius={100}
                            paddingLeft={5}
                            paddingTop={5}
                        >
                            <Image
                                source={{
                                    uri: URI
                                }}
                                style={{
                                    width: 77,
                                    height: 77,
                                    borderRadius: 100
                                }}
                            />
                        </Box>
                        <Text
                            fontWeight={600}
                            marginTop={68}
                            color="#FFFFFF"
                            fontSize={theme.numericFontSize.md}
                            lineHeight={theme.numericFontSize.md}
                        >
                            Ma.nakhli
                        </Text>
                        <Text
                            fontWeight={400}
                            marginTop={8}
                            color="#83839C"
                            fontSize={theme.numericFontSize.sm}
                            lineHeight={theme.numericFontSize.sm}
                        >
                            Manakhli@gmail.com
                        </Text>
                    </Flex>
                </Box>
            </Flex>
            <Box
                position="absolute"
                top={76}
                left={24}
            >
                <TouchableOpacity onPress={goBackHandler}>
                    <ICON_ARROW_LEFT_SVG
                        style={{
                            width: 122,
                            height: 16.88,
                            transform: [
                                { rotate: isRtl ? '180deg' : '0deg' }
                            ]
                        }}
                    />
                </TouchableOpacity>
            </Box>
        </>
    );
}
