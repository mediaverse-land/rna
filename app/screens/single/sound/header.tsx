import { Image } from 'react-native';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { GoBackButton } from '../components/goback-button';
import { SingleItemUsernameAndDuration } from '../components/username-and-duration';
import { ICON_SOUND_WHITE } from '../../../constaints/icons';
import {
    PROFILE_ONE,
    SINGLE_SOUND_COVER_IMAGE_GRADIENT,
    SINGLE_VIDEO_COVER_IMAGE_GRADIENT
} from '../../../constaints/images';
import { theme } from '../../../constaints/theme';

type Props = {
    goBackHandler: () => void;
};

const thumbnailHeight = 332;
const username = 'Ralph Edwards';
const duration = '8:15';
const soundThumbnailCoverPath =
    'https://s3-alpha-sig.figma.com/img/10e1/c4cf/e9985984e59b0b6150ea62faf736493a?Expires=1685923200&Signature=WHRaNiS~OHdfQMza1lg941xYbM9rsnAn5kqV9CaFzdqNQ9d~DpWQza2gIQO-ank3oNoULIEI5Gr8FjBu7X2Pq~vF~4NcC44MF2ESnlXgsBtCwCFeKTkYmfyEHUWdZ5u98-D7qtUPTdSZCZqXJbLFSrIunJkCNbp9km7l7sDRiIlZL02YdXz5MIl59RDcvxENXqy-1mPI7y9QcZg9AmgWeeGLMiNZlRaDIT-yoFSnkHDrNcTkxbXUy2RDajvxrcLoJ~G-CLaXXvfX3Uyc22gUFT-T773wJsaL70N3Ug~rwkB1THK0YNQu5F1cCX~7ykaVU98d2RPJxrqW66r-1GlxaA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

export function SingleSoundHeader({ goBackHandler }: Props) {
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

    const thumbnailCoverGradient = (
        <Image
            source={{
                uri: SINGLE_VIDEO_COVER_IMAGE_GRADIENT
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 198,
                height: 198,
                zIndex: 2,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16
            }}
        />
    );

    return (
        <Box position="relative" zIndex={20}>
            <GoBackButton goBackHandler={goBackHandler} />
            <Box width="100%" height={thumbnailHeight}>
                <GoBackButton
                    goBackHandler={goBackHandler}
                    hasBackground={false}
                />
                <Box
                    width={'100%'}
                    height={'100%'}
                    position="relative"
                    zIndex={11}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box>
                        <Image
                            source={{ uri: soundThumbnailCoverPath }}
                            style={{
                                width: 198,
                                height: 198,
                                borderRadius: 16
                            }}
                        />
                        <ICON_SOUND_WHITE
                            style={{
                                width: 20,
                                height: 17.99,
                                position: 'absolute',
                                zIndex: 10,
                                left: 24,
                                bottom: 24
                            }}
                        />
                        {thumbnailCoverGradient}
                    </Box>
                    {/* title */}
                    <Text
                        color={theme.color.light.WHITE}
                        fontSize={20}
                        lineHeight={20}
                        fontWeight={600}
                        marginTop={24}
                    >
                        Tiger love is beautiful
                    </Text>
                    <Box width={198} marginTop={16}>
                        <SingleItemUsernameAndDuration
                            username={username}
                            duration={duration}
                            profileUri={PROFILE_ONE}
                        />
                    </Box>
                </Box>
                {thumbnailHeaderGradient}
            </Box>
        </Box>
    );
}
