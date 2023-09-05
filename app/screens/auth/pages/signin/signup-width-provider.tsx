/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

import { FC, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { AuthProviderButton } from "../../components/auth-provider-button";
import { providerButtons } from "../../mock-data";
import { theme } from "../../../../constaints/theme";
import { Box } from "../../../../components/box";
import { Text } from "../../../../components/text";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { googleAuthApiHandler } from "./service";
import { signupContext } from "./context";
import {
  REACT_APP_ANDROID_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID,
  REACT_APP_EXPO_CLIENT_ID,
} from "@env";
import { Toaster } from "../../../../utils/toaster";

type Props = {
  height: number;
  setSIgnupWithUsernameHandler: () => void;
  navigateToFillData: (token: string) => void;
};

const _toaster = new Toaster();

export const SignUpWithProvider: FC<Props> = ({
  height,
  setSIgnupWithUsernameHandler,
  navigateToFillData,
}) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: REACT_APP_ANDROID_CLIENT_ID,
    iosClientId: REACT_APP_IOS_CLIENT_ID,
    expoClientId: REACT_APP_EXPO_CLIENT_ID,
  });

  console.log({request, response})

  // const { setToken } = useContext(signupContext);

  useEffect(() => {
    const persistAuth = async (res: any) => {
      await sendResponse(res);
      // await AsyncStorage.setItem("auth", JSON.stringify(response.authentication));
    };
    if (response?.type === "success") {
      const res = response?.authentication;
      if (res) {
        persistAuth(res);
      }
    }
  }, [response]);

  const sendResponse = async (ress: any) => {
    const { isError, isSuccess, errorRes, res } = await googleAuthApiHandler(
      ress.accessToken
    );

    console.log("errorRes");
    console.log({ errorRes });

    if (isError) {
      _toaster.show("A problem occured while submiting data");
      return;
    }

    const { token } = res.data;

    if (!token) {
      return;
    }
    navigateToFillData(token);
  };

  return (
    <Box width={"100%"} height={Math.floor(height) - 170} position="relative">
      <Box position="absolute" width={"100%"} bottom={52}>
        {providerButtons.map((f) => (
          <AuthProviderButton
            key={f.id}
            icon={f.icon}
            backgroundColor={f.backgroundColor}
            textColor={f.textColor}
            text={f.text}
            onpress={() => promptAsync()}
          />
        ))}
        <Box
          width="100%"
          height={124}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            color={theme.color.light.WHITE}
            lineHeight={20}
            fontSize={12}
            fontWeight={600}
          >
            Or
          </Text>
        </Box>
      </Box>
      <Box width="100%" position="absolute" bottom={5}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={setSIgnupWithUsernameHandler}
        >
          <Box
            width="100%"
            height={48}
            alignItems="center"
            justifyContent="center"
            borderRadius={32}
            backgroundColor="rgba(78, 78, 97, 0.5)"
          >
            <Text
              color={theme.color.light.WHITE}
              lineHeight={20}
              fontSize={12}
              fontWeight={600}
            >
              Sign up with number
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
