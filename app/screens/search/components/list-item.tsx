import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { UserNameCard } from "../../../components/username-card";
import { theme } from "../../../constaints/theme";
import { HORIZONTAL_SLIDER_GRADIENT } from "../../../constaints/images";
import {
  ICON_IMAGE_WHITE,
  ICON_SOUND_WHITE,
  ICON_TEXT_WHITE,
  ICON_VIDEO_WHITE,
} from "../../../constaints/icons";
import { windowSize } from "../../../utils/window-size";

type Props = {
  width: number;
  imagePath: string;
  title: string;
  username: string;
  profileUri: string;
  onlongpress?: () => void;
  onpress?: () => void;
  isSelected: boolean;
  showItemTypeIcon?: boolean;
  index?: number;
  type?: 1 | 2 | 3 | 4;
};

const contentTypeIcon: any = {
  1: <ICON_TEXT_WHITE width={16} height={14} />,
  2: <ICON_IMAGE_WHITE width={16} height={16} />,
  3: <ICON_SOUND_WHITE width={16} height={16} />,
  4: <ICON_VIDEO_WHITE width={19} height={14} />,
};

const { width } = windowSize();

const ITEM_WIDTH = width / 2 - 32;

export function ListItem({
  imagePath,
  title,
  username,
  profileUri,
  onlongpress,
  onpress,
  isSelected,
  showItemTypeIcon = false,
  type,
  index,
}: Props) {
  const contentIcon = (showItemTypeIcon && contentTypeIcon[type]) || null;

  return (
    <Box
      width={ITEM_WIDTH}
      paddingTop={index === 0 || index === 1 ? 40 : 0}
      marginBottom={30}
    >
      <TouchableOpacity
        onLongPress={onlongpress}
        onPress={onpress}
        activeOpacity={1}
      >
        <Box
          width={"100%"}
          borderColor={isSelected ? theme.color.light.PRIMARY : null}
          borderRadius={16}
        >
          <Image
            source={{ uri: imagePath }}
            style={[
              styles.thumbnail,
              {
                width: ITEM_WIDTH,
                height: ITEM_WIDTH,
              },
            ]}
          />
          {!isSelected ? (
            <Image
              source={{
                uri: HORIZONTAL_SLIDER_GRADIENT,
              }}
              style={[
                styles.nonSelectedItemPlaceholder,
                {
                  width: ITEM_WIDTH,
                  height: ITEM_WIDTH,
                },
              ]}
            />
          ) : null}

          {contentIcon !== null ? (
            <Box
              width="100%"
              position="absolute"
              top={ITEM_WIDTH - 20}
              alignItems="flex-end"
              paddingRight={14}
              paddingLeft={14}
            >
              {contentIcon}
            </Box>
          ) : null}
        </Box>
        <Box paddingLeft={8} paddingRight={8}>
          <Box direction="row" width="100%" height={40}>
            <Text
              marginTop={16}
              color={theme.color.light.TEXT}
              fontWeight={400}
              fontSize={theme.numericFontSize.md}
            >
              {title}
            </Text>
          </Box>
          <Box width="100%" marginTop={10}>
            <UserNameCard
              username={username}
              profileUri={profileUri}
              usernameStyles={styles.username}
              profileImageStyles={styles.profileImage}
            />
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    borderRadius: 16,
  },
  nonSelectedItemPlaceholder: {
    borderRadius: 16,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  selectedItem: {
    opacity: 0.1,
  },
  selectedItemPlaceholder: {
    left: "40%",
    top: "40%",
  },
  username: {
    color: theme.color.light.TEXT,
    fontSize: theme.numericFontSize.sm,
    marginLeft: 8,
    // lineHeight: 12,
  },
  profileImage: {
    width: 16,
    height: 16,
  },
});
