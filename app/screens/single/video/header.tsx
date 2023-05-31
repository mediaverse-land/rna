import { Image } from 'react-native';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { SINGLE_VIDEO_COVER_IMAGE_GRADIENT } from '../../../constaints/images';
import { PaddingContainer } from '../../../styles/grid';
import { GoBackButton } from '../components/goback-button';
import { ICON_VIDEO_PLAY, ICON_VIDEO_WHITE } from '../../../constaints/icons';
import { theme } from '../../../constaints/theme';

type Props = {
    goBackHandler: () => void;
};

const thumbnailHeight = 264;
const videoThumbnailCoverPath =
    'https://s3-alpha-sig.figma.com/img/43f5/fd0b/108d3af19c1494f0e588166ba567c70c?Expires=1685923200&Signature=i9oLIJQZlXtXY1z~aRULqWji8zHBjQDuL9mxah4gNYiJZAiitaxRfnzOia0kHfKg-CNPPh1boVuw2bPH9GL~RT-bsbhhSAmk6vgEFM-knbhi2~nKwP7ySw93ArhjHgazfIzrsHvR61sdhILZP~aM5SBhGHHFbLpKJm98KoSrwrEcu-SYKMIwuMNd-g1DcKs-2Nrw27i1k4om9B41~WgVC9ZTXZaQVGli~BCu1YFJ3M2hJjQtqIRVJsL3kpT4E21v0L0e~1UBeriDLWya-JByBokcN3Elb54jYedLzwuEpQnct81sNrDh7SCM8YxUbx4RjpHXmPgwJh4vDAfkSesSmA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

export function SingleVideoHeader({ goBackHandler }: Props) {
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
                <Box width="100%" height={thumbnailHeight}>
                    {thumbnailCoverGradient}
                    <Image
                        source={{ uri: videoThumbnailCoverPath }}
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
                    <ICON_VIDEO_WHITE
                        style={{
                            width: 25.7,
                            height: 20
                        }}
                    />
                </Box>
                <Box position="absolute" zIndex={11} left="47%" top="46%">
                    <ICON_VIDEO_PLAY
                        style={{
                            width: 32,
                            height: 32
                        }}
                    />
                </Box>
            </Box>
            {/* Title */}
            <PaddingContainer>
                <Box marginTop={32}>
                    <Text
                        color={theme.color.light.WHITE}
                        fontSize={20}
                        lineHeight={20}
                        fontWeight={600}
                    >
                        Model clothes are expensive
                    </Text>
                </Box>
            </PaddingContainer>
        </Box>
    );
}
