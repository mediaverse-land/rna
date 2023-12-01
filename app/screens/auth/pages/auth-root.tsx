import { Box } from "../../../components/box";
import { HeroShapes } from "../components/hero-shapes";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar, TouchableOpacity } from "react-native";
import { Button } from "../../../components/button";
import { windowSize } from "../../../utils/window-size";
import { RenderIfWithoutLoading } from "../../../components/render-if-without-loading";
import { lazy, useState } from "react";

//@ts-ignore
const TermsOfUseModal = lazy(() => import("../components/terms-of-use-modal"));

type Props = {
  setWindowHandler: (window: "login" | "singin") => void;
};

const { height } = windowSize();

export function AuthRoot({ setWindowHandler }: Props) {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isTermsOpenBeforeSignup, setIsTermsOpenBeforeSignup] = useState(false)

  const isFocused = useIsFocused();

  const openTermsModalHandler = () => {
    setIsTermsModalOpen(true);
  };

  const closeTermsModalHandler = () => {
    setIsTermsModalOpen(false);
    if(isTermsOpenBeforeSignup){
      setIsTermsOpenBeforeSignup(false)
      setWindowHandler("singin")

    }
  };

  const startSigninHandler = () => {
    setIsTermsOpenBeforeSignup(true);
    openTermsModalHandler();
  }

  return (
    <>
      <RenderIfWithoutLoading condition={isFocused}>
        <StatusBar backgroundColor={"#030340"} barStyle="light-content" />
      </RenderIfWithoutLoading>
      <Box
        position="relative"
        height={height - 133}
        paddingBottom={50}
        additionalStyles={{
          minHeight: height - 250,
        }}
      >
        <HeroShapes />
        <Box
          width="100%"
          flex={1}
          paddingLeft={24}
          paddingRight={24}
          marginTop={30}
          position="absolute"
          bottom={32}
        >
          <Button
            text="Lets start"
            varient="primary"
            onpressHandler={startSigninHandler}
            marginTop={16}
            size="lg"
          />

          <Button
            text="I have an account"
            varient="muted"
            onpressHandler={() => setWindowHandler("login")}
            marginTop={16}
            size="lg"
          />
          <Box direction="row" alignItems="center" justifyContent="center">
            <Text
              textStyles={{ textAlign: "center" }}
              marginTop={24}
              color={theme.color.light.LIGHT_DESCRIPTION}
              fontSize={12}
              fontWeight={400}
              lineHeight={16}
            >
              By registering, you agree to our{" "}
            </Text>
            <TouchableOpacity
              onPress={openTermsModalHandler}
              style={{
                position: "relative",
                top: 11,
              }}
            >
              <Text
                fontSize={12}
                fontWeight={400}
                lineHeight={16}
                color={theme.color.light.PRIMARY}
              >
                Terms of Use
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
        {isTermsModalOpen ? (
          <TermsOfUseModal
            isOpen={isTermsModalOpen}
            openTermsModalHandler={openTermsModalHandler}
            closeTermsModalHandler={closeTermsModalHandler}
          />
        ) : null}
      </Box>
    </>
  );
}
