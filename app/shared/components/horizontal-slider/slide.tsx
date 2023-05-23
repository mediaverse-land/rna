import { StyleSheet } from 'react-native';
import { HorizontalSliderComponents } from './style';
import { UserNameCard } from '../username-card';
import { HORIZONTAL_SLIDER_GRADIENT } from '../../../constaints/images';
import {
    ICON_TOP_TABBAR_IMAGE_SVG,
    ICON_TOP_TABBAR_SOUND_SVG,
    ICON_TOP_TABBAR_TEXT_SVG,
    ICON_TOP_TABBAR_VIDEO_SVG
} from '../../../constaints/icons';
import { Box } from '../box';

type Props = {
    slidePressRedirectHandler: (id: number) => void;
    title: string;
    thumbnailPath: string;
    username: string;
    profileUri: string;
    id: number;
    type?: 'image' | 'sound' | 'video' | 'text';
};

const { Slide, SliderThumbnailGradient, SlideThumbnail, SlideTitle } =
    HorizontalSliderComponents;

export function HorizontalSlide({
    slidePressRedirectHandler,
    title,
    thumbnailPath,
    profileUri,
    username,
    id,
    type
}: Props) {
    const icon = detectTypeIcon(type);

    return (
        <Slide onPress={() => slidePressRedirectHandler(id)} activeOpacity={1}>
            <Box>
                <SlideThumbnail source={{ uri: thumbnailPath }} />
                <SliderThumbnailGradient
                    source={{ uri: HORIZONTAL_SLIDER_GRADIENT }}
                />
            </Box>
            <Box>
                <SlideTitle>{title}</SlideTitle>
            </Box>
            <Box marginTop={8}>
                <UserNameCard
                    username={username}
                    profileUri={profileUri}
                    width={16}
                    height={16}
                    profileImageStyles={{ marginRight: 8 }}
                    usernameStyles={{ color: '#666680', fontSize: 12 }}
                />
            </Box>
            {icon ? icon : null}
        </Slide>
    );
}

function detectTypeIcon(type: 'image' | 'sound' | 'video' | 'text') {
    const types = {
        image: (
            <ICON_TOP_TABBAR_IMAGE_SVG
                width={16}
                height={16}
                style={styles.typeIconStyles}
            />
        ),
        video: (
            <ICON_TOP_TABBAR_VIDEO_SVG
                width={20.57}
                height={16}
                style={styles.typeIconStyles}
            />
        ),
        sound: (
            <ICON_TOP_TABBAR_SOUND_SVG
                width={16}
                height={14.39}
                style={styles.typeIconStyles}
            />
        ),
        text: (
            <ICON_TOP_TABBAR_TEXT_SVG
                width={16}
                height={16}
                style={styles.typeIconStyles}
            />
        )
    };

    return types[type] || null;
}

const styles = StyleSheet.create({
    typeIconStyles: {
        position: 'absolute',
        zIndex: 10,
        bottom: 72,
        right: 16
    }
});
