import { Image, TouchableOpacity } from 'react-native';
import { GoBackButton } from '../../single/components/goback-button';
import { PaddingContainer } from '../../../styles/grid';
import { Box } from '../../../shared/components/box';
import {
    PAYMENT_CARD_BUTTON_GRAIDENT,
    PAYMENT_CARD_ITEM_GRAIDENT,
    SINGLE_TEXT_COVER_GRAIDENT
} from '../../../constaints/images';
import { Text } from '../../../shared/components/text';
import { theme } from '../../../constaints/theme';
import { ICON_EYE_GRAY, ICON_PLAY_GRAY } from '../../../constaints/icons';

type Props = {
    goBackHandler: () => void;
};

const paymentCardItemImagePath =
    'https://s3-alpha-sig.figma.com/img/43f5/fd0b/108d3af19c1494f0e588166ba567c70c?Expires=1685923200&Signature=i9oLIJQZlXtXY1z~aRULqWji8zHBjQDuL9mxah4gNYiJZAiitaxRfnzOia0kHfKg-CNPPh1boVuw2bPH9GL~RT-bsbhhSAmk6vgEFM-knbhi2~nKwP7ySw93ArhjHgazfIzrsHvR61sdhILZP~aM5SBhGHHFbLpKJm98KoSrwrEcu-SYKMIwuMNd-g1DcKs-2Nrw27i1k4om9B41~WgVC9ZTXZaQVGli~BCu1YFJ3M2hJjQtqIRVJsL3kpT4E21v0L0e~1UBeriDLWya-JByBokcN3Elb54jYedLzwuEpQnct81sNrDh7SCM8YxUbx4RjpHXmPgwJh4vDAfkSesSmA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

export function PaymentContentHeader({ goBackHandler }: Props) {
    return (
        <>
            <GoBackButton goBackHandler={goBackHandler} hasBackground={false} />
            <PaddingContainer>
                {/* card item */}
                <Box width="100%" height={160} marginTop={80}>
                    <Image
                        source={{ uri: PAYMENT_CARD_ITEM_GRAIDENT }}
                        style={{
                            width: '100%',
                            height: 160,
                            position: 'absolute',
                            zIndex: 1
                        }}
                    />
                    <Box position="relative" zIndex={2} padding={16}>
                        <Box width="100%" height={72} direction="row">
                            <Box width={72} height={72}>
                                <Image
                                    source={{
                                        uri: paymentCardItemImagePath
                                    }}
                                    style={{
                                        width: 72,
                                        height: 72,
                                        borderRadius: 8
                                    }}
                                />
                                <Image
                                    source={{
                                        uri: SINGLE_TEXT_COVER_GRAIDENT
                                    }}
                                    style={{
                                        width: 72,
                                        height: 72,
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        borderRadius: 8
                                    }}
                                />
                            </Box>
                            <Box
                                flex={1}
                                marginLeft={16}
                                justifyContent="flex-start"
                            >
                                <Text
                                    fontSize={theme.numericFontSize.md}
                                    lineHeight={theme.numericLineHeight.md}
                                    fontWeight={400}
                                    color={theme.color.light.WHITE}
                                    marginTop={12}
                                >
                                    Model clothes are expensive.
                                </Text>
                                <Box
                                    direction="row"
                                    alignItems="center"
                                    marginTop={18}
                                >
                                    <ICON_EYE_GRAY
                                        style={{
                                            width: 19,
                                            height: 12
                                        }}
                                    />
                                    <ICON_PLAY_GRAY
                                        style={{
                                            width: 14,
                                            height: 16,
                                            marginLeft: 16
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box flex={1} marginTop={16}>
                            <TouchableOpacity activeOpacity={1}>
                                <Box
                                    width="100%"
                                    height={40}
                                    backgroundColor="rgba(78, 78, 97, 0.5)"
                                    borderRadius={8}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Image
                                        source={{
                                            uri: PAYMENT_CARD_BUTTON_GRAIDENT
                                        }}
                                        style={{
                                            width: '100%',
                                            height: 40,
                                            position: 'absolute',
                                            top: 0
                                        }}
                                    />
                                    <Text
                                        color={
                                            theme.color.light
                                                .SONG_CARD_TITLE_TEXT
                                        }
                                        fontSize={14}
                                        lineHeight={theme.numericLineHeight.md}
                                    >
                                        Monthly
                                    </Text>
                                    <Text
                                        color={theme.color.light.WHITE}
                                        fontSize={theme.numericFontSize.md}
                                        lineHeight={theme.numericLineHeight.md}
                                        marginLeft={8}
                                        fontWeight={600}
                                    >
                                        20 $
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                        </Box>
                    </Box>
                </Box>
            </PaddingContainer>
        </>
    );
}
