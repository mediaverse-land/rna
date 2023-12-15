import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Box } from "../../../components/box";
import { ICON_PUBLISH } from "../../../constaints/icons";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";

type Props = {
  publishPressHandler: () => void;
};

const speakerIconGradientProps = {
  style: {
    width: 48,
    height: 48,
    borderRadius: 100,
    padding: 1,
  },
  colors: theme.gradients.PUBLISH_BUTTON_GRADIENT,
  start: {
    x: 0.1,
    y: 0.7,
  },
};

export const CreateAssetToolbar: FC<Props> = ({ publishPressHandler }) => {
  return (
    <Box width="100%" paddingBottom={150} alignItems="center" marginTop={70}>
      <TouchableOpacity onPress={publishPressHandler}>
        <LinearGradient {...speakerIconGradientProps}>
          <Box
            width={47}
            height={47}
            backgroundColor="#19194a"
            borderRadius={100}
            justifyContent="center"
            alignItems="center"
            paddingBottom={4}
            marginBottom={4}
            paddingRight={1}
          >
            <ICON_PUBLISH />
          </Box>
        </LinearGradient>
        <Box marginTop={4}>
          <Text
            color={theme.color.light.ACTIVE_TEXT}
            fontSize={14}
            fontWeight={400}
          >
            Save &
          </Text>
          <Text
            color={theme.color.light.ACTIVE_TEXT}
            fontSize={14}
            fontWeight={400}
          >
            Publish
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};
