import { StyleSheet, TextInput } from "react-native";
import { Box } from "../../../components/box";
import { windowSize } from "../../../utils/window-size";
import { ICON_SEARCH_SVG_PATH } from "../../../constaints/icons";

const { width: WINDOW_WIDTH } = windowSize();

export const ChannelManagementSearchBox = () => {
  return (
    <Box
      width={WINDOW_WIDTH - 48}
      height={48}
      marginTop={32}
      position="relative"
      left={24}
    >
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        placeholderTextColor="#83839C"
      />
      <Box width={16} height={16} position="absolute" top={15.5} right={16}>
        <ICON_SEARCH_SVG_PATH />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#353542",
    padding: 16,
  },
});
