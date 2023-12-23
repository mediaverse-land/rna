import { TouchableOpacity } from "react-native";
import { windowSize } from "../utils/window-size";
import { Box } from "./box";

const {width, height} =  windowSize();

export const BackdropComponent = ({
    closeBottomSheetHandler,
  }: {
    closeBottomSheetHandler?: () => void;
  }) => {
    return (
      <Box width={width} height={height} position="absolute" left={0} bottom={0} top={0} right={0}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeBottomSheetHandler ? closeBottomSheetHandler: null}
          style={{
            width: '100%',
            height: '100%',
          }}
        ></TouchableOpacity>
      </Box>
    );
  };