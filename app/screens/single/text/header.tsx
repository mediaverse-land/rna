import { Image } from 'react-native';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { GoBackButton } from '../components/goback-button';
import { ICON_TEXT_WHITE } from '../../../constaints/icons';
import {
    PROFILE_ONE,
    SINGLE_SOUND_COVER_IMAGE_GRADIENT,
    SINGLE_TEXT_COVER_GRAIDENT,
    SINGLE_TEXT_THUMBNAIL_GRAIDENT,
} from '../../../constaints/images';
import { SingleItemUsernameAndDuration } from '../components/username-and-duration';

type Props = {
    goBackHandler: () => void;
};

const thumbnailHeight = 232;
const username = 'Ralph Edwards'

export function SingleTextHeader({ goBackHandler }: Props) {
    const thumbnailHeaderGradient = (
        <Image
            source={{
                uri: SINGLE_SOUND_COVER_IMAGE_GRADIENT
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 2,
                height: thumbnailHeight,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16
            }}
        />
    );

    return (
        <Box>
            <GoBackButton goBackHandler={goBackHandler} />
            <Box
                width="100%"
                height={thumbnailHeight}
            >
                <GoBackButton goBackHandler={goBackHandler} hasBackground={false} />
                <Box
                    width={'100%'}
                    height={'100%'}
                    position='relative'
                    zIndex={11}
                    padding={24}
                >

                    <Box
                        id='inner'
                        width='100%'
                        height={127}
                        flex={1}
                        marginTop={81 - 24}
                        direction='row'
                        justifyContent='space-between'
                    >
                        <Box
                            width={127}
                            height={127}
                        >
                            <Image
                                source={{ uri: SINGLE_TEXT_THUMBNAIL_GRAIDENT }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 8
                                }}
                            />
                            <Image
                                source={{ uri: SINGLE_TEXT_COVER_GRAIDENT }}
                                style={{
                                    width: 127,
                                    height: 127,
                                    borderRadius: 8,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0

                                }}
                            />
                            <ICON_TEXT_WHITE
                                style={{
                                    width: 20,
                                    height: 20,
                                    position: 'absolute',
                                    top: 53,
                                    left: 53
                                }}
                            />
                        </Box>
                        <Box
                            flex={1}
                            height={127}
                            justifyContent='space-between'
                        >
                            <Text
                                color="#fff"
                                fontSize={20}
                                lineHeight={20}
                                fontWeight={600}
                                marginTop={24}
                                paddingLeft={16}
                                paddingRight={16}
                                paddingBottom={16}
                            >
                                My thoughts
                            </Text>
                            <Box
                                paddingLeft={16}
                                paddingBottom={16}
                            >
                                <SingleItemUsernameAndDuration
                                    username={username}
                                    profileUri={PROFILE_ONE}
                                    duration={''}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {thumbnailHeaderGradient}
            </Box>
        </Box>
    );
}

