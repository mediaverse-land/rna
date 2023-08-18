import { StyleSheet } from "react-native";
import { HorizontalSliderComponents } from "./style";
import { UserNameCard } from "../username-card";
import {
  AUDIO_THUMBNAIL_PLACEHOLDER,
  HORIZONTAL_SLIDER_GRADIENT,
  IMAGE_THUMBNAIL_PLACEHOLDER,
  TEXT_THUMBNAIL_PLACEHOLDER,
  VIDEO_THUMBNAIL_PLACEHOLDER,
} from "../../constaints/images";
import {
  ICON_TOP_TABBAR_IMAGE_SVG,
  ICON_TOP_TABBAR_SOUND_SVG,
  ICON_TOP_TABBAR_TEXT_SVG,
  ICON_TOP_TABBAR_VIDEO_SVG,
} from "../../constaints/icons";
import { Box } from "../box";
import { theme } from "../../constaints/theme";
import { RenderIfWithoutLoading } from "../render-if-without-loading";

type Props = {
  slidePressRedirectHandler: (id: number) => void;
  title: string;
  thumbnailPath: string;
  username: string;
  profileUri: string;
  id: number;
  type?: 1 | 2 | 3 | 4 | null;
  isRtl?: boolean;
};

const { Slide, SliderThumbnailGradient, SlideThumbnail, SlideTitle } =
  HorizontalSliderComponents;

const typesPlaceholderImageUrl = {
  1: TEXT_THUMBNAIL_PLACEHOLDER,
  2: IMAGE_THUMBNAIL_PLACEHOLDER,
  3: AUDIO_THUMBNAIL_PLACEHOLDER,
  4: VIDEO_THUMBNAIL_PLACEHOLDER,
};

export function HorizontalSlide({
  slidePressRedirectHandler,
  title,
  thumbnailPath,
  profileUri,
  username,
  id,
  type,
}: Props) {
  const icon = detectTypeIcon(type);

  const placeholderThumbnail = typesPlaceholderImageUrl[type];
  
  return (
    <Slide
      onPress={() => slidePressRedirectHandler(id)}
      activeOpacity={1}
      style={[
        !username &&
          !title && {
            height: 144,
          },
      ]}
    >
      <Box>
        <SlideThumbnail
          source={{ uri: thumbnailPath || placeholderThumbnail }}
          resizeMode="cover"
        />
        <SliderThumbnailGradient source={{ uri: HORIZONTAL_SLIDER_GRADIENT }} />
      </Box>
      <Box direction="row">
        <SlideTitle>{title}</SlideTitle>
      </Box>
      <RenderIfWithoutLoading condition={username ? true : false}>
        <Box marginTop={8}>
          <UserNameCard
            username={username}
            profileUri={profileUri}
            width={16}
            height={16}
            profileImageStyles={{ marginRight: 8 }}
            usernameStyles={{
              color: theme.color.light.TEXT,
              fontSize: 12,
            }}
          />
        </Box>
      </RenderIfWithoutLoading>
      <RenderIfWithoutLoading condition={icon ? true : false}>
        {icon}
      </RenderIfWithoutLoading>
    </Slide>
  );
}

function detectTypeIcon(type: 1 | 2 | 3 | 4) {
  const types = {
    2: (
      <ICON_TOP_TABBAR_IMAGE_SVG
        width={16}
        height={16}
        style={styles.typeIconStyles}
      />
    ),
    4: (
      <ICON_TOP_TABBAR_VIDEO_SVG
        width={20.57}
        height={16}
        style={styles.typeIconStyles}
      />
    ),
    3: (
      <ICON_TOP_TABBAR_SOUND_SVG
        width={16}
        height={14.39}
        style={styles.typeIconStyles}
      />
    ),
    1: (
      <ICON_TOP_TABBAR_TEXT_SVG
        width={16}
        height={16}
        style={styles.typeIconStyles}
      />
    ),
  };

  return types[type] || null;
}

const styles = StyleSheet.create({
  typeIconStyles: {
    position: "absolute",
    zIndex: 10,
    bottom: 72,
    right: 16,
  },
});
