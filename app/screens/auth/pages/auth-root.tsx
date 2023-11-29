import { TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { HeroShapes } from "../components/hero-shapes";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  setWindowHandler: (window: "login" | "singin") => void;
};

const darkButtonGradients = {
  style: {
    width: "100%",
    height: 48,
    borderRadius: 32,
    marginTop: 16,
    padding: 1,
  },
  colors: ["#49496d", "#292953"],
  start: {
    x: 0.1,
    y: 0.7,
  },
};

const lightButtonGradients = {
  style: {
    width: "100%",
    height: 48,
    borderRadius: 32,
    marginTop: 16,
    padding: 1,
  },
  colors: ["#8aa1ff", theme.color.light.PRIMARY],
  start: {
    x: 0.1,
    y: 0.7,
  },
};

export function AuthRoot({ setWindowHandler }: Props) {
  const isFocused = useIsFocused();
  return (
    <>
      {isFocused ? (
        <StatusBar backgroundColor={"#030340"} barStyle="light-content" />
      ) : null}
      <Box flex={1} paddingBottom={50}>
        <HeroShapes />
        <Box
          width="100%"
          flex={1}
          paddingLeft={24}
          paddingRight={24}
          marginTop={30}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setWindowHandler("singin")}
          >
            <LinearGradient {...lightButtonGradients}>
              <Box
                width="100%"
                height="100%"
                backgroundColor={theme.color.light.PRIMARY}
                borderRadius={32}
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  color={theme.color.light.WHITE}
                  fontWeight={600}
                  lineHeight={16}
                  fontSize={14}
                >
                  Lets start
                </Text>
              </Box>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setWindowHandler("login")}
          >
            <LinearGradient {...darkButtonGradients}>
              <Box
                width="100%"
                height="100%"
                backgroundColor="#292953"
                borderRadius={32}
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  color={theme.color.light.WHITE}
                  fontWeight={600}
                  lineHeight={16}
                  fontSize={14}
                >
                  I have an account
                </Text>
              </Box>
            </LinearGradient>
          </TouchableOpacity>
          <Text
            textStyles={{ textAlign: "center" }}
            marginTop={24}
            color={theme.color.light.LIGHT_DESCRIPTION}
            fontSize={12}
            fontWeight={500}
            lineHeight={16}
          >
            By registering, you agree to our{" "}
            <Text color={theme.color.light.PRIMARY}>Terms of Use</Text>.
          </Text>
        </Box>
      </Box>
    </>
  );
}
