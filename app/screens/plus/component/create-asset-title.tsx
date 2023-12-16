import { Box } from "../../../components/box";
import { Input } from "../../../components/form";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { windowSize } from "../../../utils/window-size";

const { width } = windowSize();

const HALF_ROW_WIDTH = width / 2 - 34;

export const CreateAssetTitle = ({
  updateTitle,
  value,
}: {
  updateTitle: (str: string) => void;
  value: string;
}) => {
  return (
    <Box>
      <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={400}>
        Title
      </Text>
      <Box marginTop={8}>
        <Input
          varient="flat-dark"
          isTextArea
          placeholder="your title..."
          height={HALF_ROW_WIDTH - 27}
          onChangeText={updateTitle}
          defaultValue={value}
        />
      </Box>
    </Box>
  );
};
