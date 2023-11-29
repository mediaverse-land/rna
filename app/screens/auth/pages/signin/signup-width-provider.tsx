import { useEffect } from "react";
import { FC } from "react";
import { TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { AuthProviderButton } from "../../components/auth-provider-button";
import { providerButtons } from "../../mock-data";
import { theme } from "../../../../constaints/theme";
import { Box } from "../../../../components/box";
import { Text } from "../../../../components/text";
import { googleAuthApiHandler } from "./service";
import { Toaster } from "../../../../utils/toaster";
import { Logger } from "../../../../utils/logger";
import { enviroments } from "../../../../../enviroments/enviroments";
import { Button } from "../../../../components/button";

type Props = {
  height: number;
  setSIgnupWithUsernameHandler: () => void;
  navigateToFillData: (token: string) => void;
};

const _toaster = new Toaster();

const _logger = new Logger();

export const SignUpWithProvider: FC<Props> = ({
  height,
  setSIgnupWithUsernameHandler,
  navigateToFillData,
}) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: enviroments.REACT_APP_ANDROID_CLIENT_ID,
    iosClientId: enviroments.REACT_APP_IOS_CLIENT_ID,
    expoClientId: enviroments.REACT_APP_EXPO_CLIENT_ID,
    scopes: enviroments.GOOGLE_AUTH_SCOPE,
  });

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

    _logger.log("errorRes");
    _logger.log({ errorRes });

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
        <Button
          text="Sign up with number"
          onpressHandler={setSIgnupWithUsernameHandler}
          varient="muted"
        />
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </Box>
    </Box>
  );
};

// import { useEffect } from "react";
// import { FC } from "react";
// import { TouchableOpacity } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import { AuthProviderButton } from "../../components/auth-provider-button";
// import { providerButtons } from "../../mock-data";
// import { theme } from "../../../../constaints/theme";
// import { Box } from "../../../../components/box";
// import { Text } from "../../../../components/text";
// import { googleAuthApiHandler } from "./service";
// import { Toaster } from "../../../../utils/toaster";
// import { Logger } from "../../../../utils/logger";
// import { enviroments } from "../../../../../enviroments/enviroments";

// type Props = {
//   height: number;
//   setSIgnupWithUsernameHandler: () => void;
//   navigateToFillData: (token: string) => void;
// };

// const _toaster = new Toaster();

// const _logger = new Logger();

// export const SignUpWithProvider: FC<Props> = ({
//   height,
//   setSIgnupWithUsernameHandler,
//   navigateToFillData,
// }) => {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     responseType: "id_token",
//     androidClientId: enviroments.REACT_APP_ANDROID_CLIENT_ID,
//     iosClientId: enviroments.REACT_APP_IOS_CLIENT_ID,
//     expoClientId: enviroments.REACT_APP_EXPO_CLIENT_ID,
//   });

//   console.log(response?.params?.id_token);

//   useEffect(() => {
//     const persistAuth = async (res: any) => {
//       await sendResponse(res);
//     };
//     if (response?.params?.id_token) {
//       const res = response?.params;
//       if (res) {
//         persistAuth(res);
//       }
//     }
//   }, [response]);

//   const sendResponse = async (ress: any) => {
//     const { isError, isSuccess, errorRes, res } = await googleAuthApiHandler(
//       ress.id_token
//     );

//     _logger.log("errorRes");
//     _logger.log({ errorRes });

//     if (isError) {
//       _toaster.show("A problem occured while submiting data");
//       return;
//     }

//     const { token } = res.data;

//     if (!token) {
//       return;
//     }
//     navigateToFillData(token);
//   };

//   return (
//     <Box width={"100%"} height={Math.floor(height) - 170} position="relative">
//       <Box position="absolute" width={"100%"} bottom={52}>
//         {providerButtons.map((f) => (
//           <AuthProviderButton
//             key={f.id}
//             icon={f.icon}
//             backgroundColor={f.backgroundColor}
//             textColor={f.textColor}
//             text={f.text}
//             onpress={() => promptAsync()}
//           />
//         ))}
//         <Box
//           width="100%"
//           height={124}
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Text
//             color={theme.color.light.WHITE}
//             lineHeight={20}
//             fontSize={12}
//             fontWeight={600}
//           >
//             Or
//           </Text>
//         </Box>
//       </Box>
//       <Box width="100%" position="absolute" bottom={5}>
//         <TouchableOpacity
//           activeOpacity={1}
//           onPress={setSIgnupWithUsernameHandler}
//         >
//           <Box
//             width="100%"
//             height={48}
//             alignItems="center"
//             justifyContent="center"
//             borderRadius={32}
//             backgroundColor="rgba(78, 78, 97, 0.5)"
//           >
//             <Text
//               color={theme.color.light.WHITE}
//               lineHeight={20}
//               fontSize={12}
//               fontWeight={600}
//             >
//               Sign up with number
//             </Text>
//           </Box>
//         </TouchableOpacity>
//       </Box>
//     </Box>
//   );
// };
