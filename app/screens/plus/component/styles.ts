import { StyleSheet } from "react-native";
import { theme } from "../../../constaints/theme";

export const styles = StyleSheet.create({
  textArea: {
    color: theme.color.light.WHITE,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 24,
    flex: 1,
    textAlignVertical:'top',
    direction:'ltr',
    width:'100%' 
  },
});
