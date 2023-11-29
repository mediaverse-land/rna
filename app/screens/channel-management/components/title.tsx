import { TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { ICON_ARROW_LEFT_SVG } from "../../../constaints/icons";

export const ChannelManagementTitle = ({ goBackHandler }: { goBackHandler: () => void }) => {
  return (
    <>
      <Box
        direction="row"
        alignItems="center"
        position="relative"
        justifyContent="center"
      >
        <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
          Channel Management
        </Text>
      </Box>
      <Box width={22} height={17} position="absolute" left={24} top={35}>
        <TouchableOpacity onPress={goBackHandler}>
          <ICON_ARROW_LEFT_SVG />
        </TouchableOpacity>
      </Box>
    </>
  );
};