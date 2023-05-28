import { Image } from 'react-native';
import { ICON_LIKE_BLUE } from '../../constaints/icons';
import { Box } from '../../shared/components/box';
import { Text } from '../../shared/components/text';
import { windowSize } from '../../utils/window-size';
import { TACKING_BOX_GRADEINT } from '../../constaints/images';

const { height: windowHeight } = windowSize();

export function PaymentSuccess() {
    return (
        <Box
            flex={1}
            width="100%"
            height={Math.floor(windowHeight)}
            alignItems="center"
            justifyContent="center"
        >
            <Box>
                <ICON_LIKE_BLUE
                    style={{
                        width: 50,
                        height: 72
                    }}
                />
            </Box>
            <Box>
                <Text
                    color="#fff"
                    lineHeight={20}
                    fontSize={20}
                    fontWeight={600}
                    marginTop={24}
                >
                    It was successful
                </Text>
                <Box alignItems="center">
                    <Text
                        color="#666680"
                        lineHeight={16}
                        fontSize={16}
                        fontWeight={400}
                        marginTop={8}
                    >
                        Enjoy!
                    </Text>
                </Box>
            </Box>
            <Box width="100%" marginTop={40} paddingLeft={48} paddingRight={48}>
                <Box
                    width="100%"
                    height={60}
                    backgroundColor="rgba(78, 78, 97, 0.2)"
                    borderRadius={16}
                >
                    <Image
                        source={{
                            uri: TACKING_BOX_GRADEINT
                        }}
                        style={{
                            width: '100%',
                            height: 60,
                            position: 'absolute',
                            top: 0,
                            left: 1,
                            borderRadius: 16
                        }}
                    />
                    <Box
                        width="100%"
                        height={60}
                        padding={16}
                        direction="row"
                        alignItems="center"
                    >
                        <Box
                            paddingRight={16}
                            height={24}
                            direction="row"
                            alignItems="center"
                            additionalStyles={{
                                borderRightWidth: 1,
                                borderRightColor: '#666680'
                            }}
                        >
                            <Text
                                color="#666680"
                                fontSize={14}
                                lineHeight={16}
                                fontWeight={400}
                            >
                                Tracking
                            </Text>
                        </Box>
                        <Box
                            flex={1}
                            height={24}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            paddingLeft={16}
                        >
                            <Text
                                color="#fff"
                                fontSize={14}
                                lineHeight={16}
                                fontWeight={400}
                            >
                                58741236954347
                            </Text>
                            <Text
                                color="#597AFF"
                                fontSize={14}
                                lineHeight={16}
                                fontWeight={400}
                            >
                                Copy
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
