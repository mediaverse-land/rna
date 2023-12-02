import { TouchableOpacity } from "react-native";
import { TitleComponent } from "./style";
import { Box } from "../box";
import { Text } from "../text";



type Props = {
  str: string;
  iconPath?: string;
  svgIcon?: any;
  showViewMoreButton?:boolean
  navigateHandler?:(...args: any) => void;
};

export function Title({
  str,
  iconPath,
  svgIcon,
  navigateHandler,
  showViewMoreButton = false
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
      {showViewMoreButton ?
        <TouchableOpacity onPress={navigateHandler} activeOpacity={1}>
          <Box position="relative" top={7}>
            <Text color="#597AFF" fontSize={14} lineHeight={14}>
              View all
            </Text>
          </Box>
        </TouchableOpacity>
      : null  
      }
    </Box>
  );
}
