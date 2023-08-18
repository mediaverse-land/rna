import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { UserNameCard } from "../../../components/username-card";
import { theme } from "../../../constaints/theme";
import { HORIZONTAL_SLIDER_GRADIENT } from "../../../constaints/images";
import { ICON_CHECK_WHITE } from "../../../constaints/icons";

type Props = {
  width: number;
  imagePath: string;
  title: string;
  username: string;
  profileUri: string;
  onlongpress?: () => void;
  onpress?: () => void;
  isSelected: boolean;
};

export function ListItem({
  imagePath,
  title,
  username,
  profileUri,
  onlongpress,
  onpress,
  isSelected,
}: Props) {
  return (
    <Box width={"48%"} marginBottom={30}>
      <TouchableOpacity
        onLongPress={onlongpress}
        onPress={onpress}
        activeOpacity={1}
      >
        <Box
          width={"100%"}
          height={163}
          borderColor={isSelected ? theme.color.light.PRIMARY : null}
          borderRadius={16}
        >
          <Image source={{ uri: imagePath }} style={styles.thumbnail} />
          {!isSelected ? (
            <Image
              source={{
                uri: HORIZONTAL_SLIDER_GRADIENT,
              }}
              style={styles.nonSelectedItemPlaceholder}
            />
          ) : null}
          {isSelected ? (
            <>
              <Box
                width="100%"
                height={163}
                backgroundColor={theme.color.light.PRIMARY}
                additionalStyles={styles.selectedItem}
                position="absolute"
                top={0}
                borderRadius={16}
                zIndex={11}
                alignItems="center"
                justifyContent="center"
              ></Box>
              <Box
                width={32}
                height={32}
                backgroundColor={theme.color.light.PRIMARY}
                position="absolute"
                top={0}
                borderRadius={8}
                zIndex={12}
                additionalStyles={styles.selectedItemPlaceholder}
                alignItems="center"
                justifyContent="center"
              >
                <ICON_CHECK_WHITE width={18} height={14} />
              </Box>
            </>
          ) : null}
        </Box>
        <Box paddingLeft={8} paddingRight={8}>
          <Box direction="row">
            <Text
              marginTop={16}
              color={theme.color.light.TEXT}
              fontWeight={400}
              fontSize={theme.numericFontSize.md}
              lineHeight={16}
            >
              {title}
            </Text>
          </Box>
          <Box width="100%" marginTop={8}>
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
    width: "100%",
    height: 163,
    borderWidth: 1,
  },
  nonSelectedItemPlaceholder: {
    borderRadius: 16,
    width: "100%",
    height: 163,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    borderWidth: 2,
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
    lineHeight: 12,
  },
  profileImage: {
    width: 16,
    height: 16,
  },
});
