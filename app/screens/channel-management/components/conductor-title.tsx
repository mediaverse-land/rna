import { TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";

export const CondutorTitle = ({ handleClosePres, title = "Add upcoming" }: { handleClosePres: () => void, title?: string }) => {
    return (
      <Box
        id="title"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
          {title}
        </Text>
        <Box>
          <TouchableOpacity onPress={handleClosePres}>
            <Text
              fontSize={14}
              fontWeight={300}
              color={theme.color.light.LIGHT_TEXT}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    );
  };
  