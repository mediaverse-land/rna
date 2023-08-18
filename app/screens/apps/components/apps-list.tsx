import { Image, StyleSheet } from "react-native";
import { Box } from "../../../components/box";
import { Flex } from "../../../styles/grid";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { SIGNINS_LIST_ITEM_GRADIET } from "../../../constaints/images";

type Props = {
  title: string;
  category: string;
  imagePath: string;
  isDisable?: boolean;
};

export function AppItem({ title, category, imagePath, isDisable }: Props) {
  return (
    <Box
      width="100%"
      height={72}
      paddingBottom={16}
      borderRadius={16}
      marginBottom={8}
      additionalStyles={{
        opacity: isDisable ? 0.6 : 1,
      }}
    >
      <Image
        source={{
          uri: SIGNINS_LIST_ITEM_GRADIET,
        }}
        style={{
          width: "100%",
          height: 72,
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: 16,
        }}
        resizeMode="stretch"
      />
      <Box direction="row">
        <Box width={80} paddingTop={10} height='100%' >
        {imagePath}
        </Box>
        <Box  width="100%" height="100%">
          <Box direction="row"  paddingTop={30}>
            <Text
              color={theme.color.light.WHITE}
              fontSize={16}
              lineHeight={16}
              fontWeight={600}
            >
              {title}
            </Text>
          </Box>
         
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
});
