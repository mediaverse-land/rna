import { Image } from 'react-native'
import { PaddingContainer } from '../../../styles/grid';
import { Box } from '../box';
import { Text } from '../text';
import { CommentCardComponents } from './style';
import { COMMENT_BOX_GRADIENT } from '../../../constaints/images';

const profile = 'https://s3-alpha-sig.figma.com/img/8b38/0123/1b3bc56d8d3d28d35c9776e478125bae?Expires=1685923200&Signature=gWMAZUvjlSCOfKP4e6hFLjFgOSd-IECkM40ZQ4~YTNr~WUr6gqDibYMhqOmNiwcMBzE2uFfLq7NcF8WJTxrQi9M6WJmXFTvwxWtxRPtDA~pPSx48PXwbibPvThmZVX3O5SAv9szQetIMBGF9VgyQNJMT~wuxVRNDPSkQGTUn~DdeZwbVELADu~Sgz5LTC-IPr~5St8CpDpQvDxCYDOKjFw091uL~PJiFUIJ1smHYXIczAAAOcWEtgHi187J0mufQL5CW2kymK7~RrFarFPZbUtSToEX44Um3JqXE2mtFxhyToGki4DTo6hmgntK0ZaWVhuxGhlZvGd2YUpS0ld92Dw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'

const { CommentInput } = CommentCardComponents

export function CommentCard() {
    return (
        <PaddingContainer>
            <Box
                width='100%'
                height={102}
                borderRadius={8}
            >
                <Image
                    source={{
                        uri: COMMENT_BOX_GRADIENT
                    }}
                    style={{
                        width: '100%',
                        height: 102,
                        position: 'absolute',
                        top: 0
                    }}
                />
                <Box padding={16}>
                    {/* title */}
                    <Box
                        width='100%'
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Text
                            color="#fff"
                            fontSize={14}
                            lineHeight={14}
                        >
                            Comments
                        </Text>
                        <Text
                            color='#666680'
                            fontSize={14}
                            lineHeight={14}
                        >
                            56
                        </Text>
                    </Box>
                    {/* body */}
                    <Box
                        marginTop={16}
                        width='100%'
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Box>
                            <Image
                                source={{
                                    uri: profile,
                                }}
                                style={{
                                    width: 32,
                                    height: 32,
                                    marginRight: 16,
                                    borderRadius: 100
                                }}
                            />
                        </Box>
                        <Box flex={1}  >
                            <CommentInput
                                placeholder='Add a comment...'
                                placeholderTextColor='#666680'
                            />
                        </Box>
                    </Box>
                </Box>

            </Box>
        </PaddingContainer>
    );
}
