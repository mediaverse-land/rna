import React from "react";
import { Text } from "../../../components/text";
import { Box } from "../../../components/box";
import { theme } from "../../../constaints/theme";
import { ICON_ARROW_LEFT_SVG } from "../../../constaints/icons";
import { TouchableOpacity } from "react-native";
import { UseNavigationType } from "../../../types/use-navigation";

type Props = {
  title: string;
  icon?: any;
  goBack: () => void;
};

export const ViewAllTitle = ({ title, icon, goBack }: Props) => {
  const goBackHandler = () => {
    goBack();
  };

  return (
    <Box
      position="relative"
      width="100%"
      marginTop={40}
      direction="row"
      justifyContent="center"
    >
      {icon ? <Box id="icon-wrapper">{icon}</Box> : null}
      <Text
        color={theme.color.light.WHITE}
        lineHeight={16}
        fontWeight={600}
        fontSize={16}
      >
        {title}
      </Text>
      <Box id="go-back-button" width={40} position="absolute" left={24}>
        <TouchableOpacity onPress={goBackHandler} activeOpacity={1}>
          <ICON_ARROW_LEFT_SVG width={22} height={16} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
