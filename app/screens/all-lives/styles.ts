import { theme } from "../../constaints/theme";
import { StyleSheet } from "react-native";

export const AllLiveStyles = StyleSheet.create({
  searchInput: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.color.light.INPUT_PLACEHOLDER,
    backgroundColor: theme.color.light.ALL_LIVE_SEARCH_INPUT_BG,
    padding: 16,
    color: theme.color.light.LIGHT_TEXT,
  },
  magnetIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});
