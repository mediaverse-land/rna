import { Image } from 'react-native';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { SINGLE_VIDEO_COVER_IMAGE_GRADIENT } from '../../../constaints/images';
import { ICON_IMAGE_WHITE } from '../../../constaints/icons';
import { PaddingContainer } from '../../../styles/grid';
import { GoBackButton } from '../components/goback-button';

type Props = {
    goBackHandler: () => void;
};

const thumbnailHeight = 218;
const imageThumbnailCoverPath =
    'https://s3-alpha-sig.figma.com/img/0098/539b/5cf8c5cdb0ce5e6ed284538a3bea6eec?Expires=1685923200&Signature=GqtbLIw7ALgmf2KhQkAtCNuhjdPVSdw5Y7joPDkebLkCiTKGmLlE-OdS-ka3Qs6p1ssYvaKf-qq2d0fXCO9mT4mcFDI8-te5dopLqaLTZ2RBG~7kC932Jnu5VZjJNpku7a8CnMHYRp38FFncTpXvwGnS62jQt95PhK6SJfwvZykXerzso0rPUEAdKrfxNehiWTV-lCTr3coy2c36qtVb7JtkfkdXr55YdwHUh0GTdjIia2UDz5dGEF1HSScRWK1xSNYOQSgVHRtXZiKkB7Z1UgkKZIM~Or253T4G-bTRpjThjS9J5QiTHOCBGkeptOQrWa~7liQCQEAhVqYqUjp4Vg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

export function SingleImageHeader({ goBackHandler }: Props) {
    const thumbnailCoverGradient = (
        <Image
            source={{
                uri: SINGLE_VIDEO_COVER_IMAGE_GRADIENT
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 10,
                height: thumbnailHeight,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16
            }}
        />
    );

    return (
        <Box>
            <Box>
                <GoBackButton
                    goBackHandler={goBackHandler}
                    hasBackground={true}
                />
                {/* GoBack button place */}
                <Box width="100%" height={thumbnailHeight}>
                    {thumbnailCoverGradient}
                    <Image
                        source={{ uri: imageThumbnailCoverPath }}
                        style={{
                            width: '100%',
                            height: thumbnailHeight,
                            borderBottomLeftRadius: 16,
                            borderBottomRightRadius: 16
                        }}
                        resizeMode="cover"
                    />
                </Box>
                <Box position="absolute" zIndex={11} bottom={24} left={24}>
                    <ICON_IMAGE_WHITE
                        style={{
                            width: 25.7,
                            height: 20
                        }}
                    />
                </Box>
            </Box>
            {/* Title */}
            <PaddingContainer>
                <Box marginTop={32}>
                    <Text
                        color="#fff"
                        fontSize={20}
                        lineHeight={20}
                        fontWeight={600}
                    >
                        Tiger love is butifull
                    </Text>
                </Box>
            </PaddingContainer>
        </Box>
    );
}
