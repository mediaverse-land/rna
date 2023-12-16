import { ViewStyle, Image } from 'react-native';
import { Box } from '../../../components/box';
import { STRIPE_IMG, WALLET_SLIDER_BACKGROUND } from '../../../constaints/images';
import { Text } from '../../../components/text';
import { ICON_SIMCARD } from '../../../constaints/icons';
import { theme } from '../../../constaints/theme';
import { useContext } from 'react';
import { userContext } from '../../../context/user';

export function CardSlider() {
    const _userCtx = useContext(userContext);

    const userData = _userCtx.getUser();

    const rotates = ['-15deg', '-7.5deg', '0deg', '7.5deg', '15deg'];

    return (
        <Box
            marginTop={40}
            width="100%"
            flex={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
        >
            <Card
                rotate={rotates[0]}
                style={{
                    position: 'absolute',
                    top: 60,
                    left: '5%',
                    zIndex: 1,
                    width: 133,
                    height: 200,
                    backgroundColor: 'rgba(78, 78, 97, 0.2)'
                }}
            />
            <Card
                rotate={rotates[1]}
                style={{
                    position: 'absolute',
                    top: 25,
                    left: '10%',
                    zIndex: 2,
                    width: 183,
                    height: 275,
                    backgroundColor: 'rgba(78, 78, 97, 0.5)'
                }}
            />
            <Card
                rotate={rotates[2]}
                style={{
                    position: 'relative',
                    zIndex: 10
                }}
            >
                <Image
                    source={{
                        uri: WALLET_SLIDER_BACKGROUND
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0
                    }}
                />
                <Box width={'100%'} height={'100%'}>
                    <Box
                        width="100%"
                        paddingTop={34}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Image 
                            source={{
                                uri: STRIPE_IMG,
                            }}
                            style={{
                                width: 35,
                                height: 42,
                                borderRadius: 8
                            }}
                        />
                        <Text
                            fontSize={14}
                            fontWeight={400}
                            lineHeight={24}
                            color={theme.color.light.WHITE}
                        >
                            Paypal
                        </Text>
                    </Box>
                    <Box width="100%" position="absolute" bottom={1}>
                        <Box
                            width="100%"
                            paddingRight={28}
                            paddingLeft={28}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            marginBottom={12}
                        >
                            <Text
                                fontSize={16}
                                fontWeight={600}
                                lineHeight={24}
                                color={theme.color.light.CARD_TITLE_TEXT}
                            >
                                {userData?.username}
                            </Text>
                            <Text
                                fontSize={16}
                                fontWeight={600}
                                lineHeight={24}
                                color={theme.color.light.CARD_TITLE_TEXT}
                            >
                                01/15
                            </Text>
                        </Box>
                        <Box alignItems="center" marginBottom={24}>
                            <Text
                                fontSize={16}
                                fontWeight={600}
                                lineHeight={24}
                                color={theme.color.light.WHITE}
                            >
                                **** **** **** 3054
                            </Text>
                        </Box>
                        <Box
                            width="100%"
                            alignItems="center"
                            paddingBottom={35}
                        >
                            <ICON_SIMCARD width={38} height={26} />
                        </Box>
                    </Box>
                </Box>
            </Card>
            <Card
                rotate={rotates[3]}
                style={{
                    position: 'absolute',
                    top: 25,
                    right: '10%',
                    zIndex: 2,
                    width: 183,
                    height: 275,
                    backgroundColor: 'rgba(78, 78, 97, 0.5)'
                }}
            />
            <Card
                rotate={rotates[4]}
                style={{
                    position: 'absolute',
                    top: 65,
                    right: '5%',
                    zIndex: 1,
                    width: 133,
                    height: 200,
                    backgroundColor: 'rgba(78, 78, 97, 0.2)'
                }}
            />
        </Box>
    );
}

function Card({
    rotate,
    style,
    children
}: {
    rotate: string;
    style: ViewStyle;
    children?: any;
}) {
    return (
        <Box
            width={230}
            height={349}
            // hasBlackBorder
            borderRadius={16}
            additionalStyles={[
                {
                    transform: [{ rotate }]
                },
                style
            ]}
        >
            {children ? children : null}
        </Box>
    );
}
