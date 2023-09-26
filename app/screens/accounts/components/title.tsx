import { TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { ICON_ARROW_LEFT_SVG } from "../../../constaints/icons";

export const AccountsScreenTitleComponent = ({
  goBackHandler,
}: {
  goBackHandler: () => void;
}) => {
  return (
    <Box
      id="title"
      width="100%"
      marginTop={32}
      direction="row"
      justifyContent="center"
      position="relative"
    >
      <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
        Share account
      </Text>
      <TouchableOpacity
        onPress={goBackHandler}
        style={{
          position: "absolute",
          left: 24,
          top: 5,
        }}
        activeOpacity={1}
      >
        <ICON_ARROW_LEFT_SVG />
      </TouchableOpacity>
    </Box>
  );
};
