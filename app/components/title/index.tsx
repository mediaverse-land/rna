import { TouchableOpacity } from "react-native";
import { TitleComponent } from "./style";
import { Box } from "../box";
import { Text } from "../text";

type Props = {
  str: string;
  iconPath?: string;
  svgIcon?: any;
  showViewMoreButton?: boolean;
  navigateHandler?: (...args: any) => void;
};

export function Title({
  str,
  svgIcon,
  navigateHandler,
  showViewMoreButton = false,
}: Props) {
  return (
    <Box
      width="100%"
      justifyContent="space-between"
      direction="row"
      position="relative"
      paddingLeft={8}
    >
      <Box direction="row" alignItems="center">
        {svgIcon ? svgIcon : null}
        <Text>
          <TitleComponent>{str}</TitleComponent>
        </Text>
      </Box>
      {showViewMoreButton ? (
        <Box position="relative" top={2}>
          <TouchableOpacity onPress={navigateHandler} activeOpacity={1}>
            <Text color="#597AFF" fontSize={14} textStyles={{
              flex: 1
            }}>
              View all
            </Text>
          </TouchableOpacity>
        </Box>
      ) : null}
    </Box>
  );
}
