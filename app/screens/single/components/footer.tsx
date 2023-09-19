import React, { useEffect } from "react";
import { Box } from "../../../components/box";
import * as Google from "expo-auth-session/providers/google";
import { Image, TouchableOpacity } from "react-native";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { ICON_DOWNLOAD_WHITE } from "../../../constaints/icons";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import { StorageService } from "../../../services/storage.service";
import { Logger } from "../../../utils/logger";
import {
  useAddExternalAccountMutation,
  useGoogleDriveShareMutation,
} from "../../../services/asset.service";
import {
  DOWNLOAD_BTN_BG_GTADIENT,
  EDIT_BTN_BG_GTADIENT,
  SINGLE_ASSET_FOOTER_BG_PNG_GRADIENT,
} from "../../../constaints/images";
import { enviroments } from "../../../../enviroments/enviroments";

type Props = {
  fileName: string;
  asset_Id: number;
  parent_Id: number;
  editorHandler: () => void;
  tokenCtx: any;
};

const _storageService = new StorageService();
const _logger = new Logger();

export const SingleAssetFooter = ({
  fileName,
  editorHandler,
  asset_Id,
  parent_Id,
  tokenCtx,
}: Props) => {
  const [request, response, promptAsync]: any = Google.useAuthRequest({
    androidClientId: enviroments.REACT_APP_ANDROID_CLIENT_ID,
    iosClientId: enviroments.REACT_APP_IOS_CLIENT_ID,
    clientSecret: enviroments.REACT_APP_WEB_CLIENT_SECTET,
    expoClientId: enviroments.REACT_APP_EXPO_CLIENT_ID,
    extraParams: {
      access_type: "offline",
    },
    scopes: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  const [downalodHandler, { isLoading, isFetching, error }] =
    useGoogleDriveShareMutation();

  const [addExternalAccountHandler] = useAddExternalAccountMutation();

  useEffect(() => {
    manageGoogleResponse();
  }, [response]);

  const manageGoogleResponse = async () => {
    if (response?.authentication) {
      // const shouldOpenPrompt = await shouldSignInToGoogle();
      // if (shouldOpenPrompt) {
      //   return;
      // }

      const googleRefreshToken = response?.authentication?.refreshToken;
      const googleAccessToken = response?.authentication?.accessToken;

      try {
        // Save data to async storage
        await saveGoogleAccountDataToStorage({
          googleAccessToken,
          googleRefreshToken,
        });

        const token = await getToken();

        console.log(token)

        const _googleResponse = await getUserRequestEmail(googleAccessToken);
        if (!_googleResponse) {
          return;
        }

        const email = _googleResponse?.email;

        const requestBody = {
          token,
          body: {
            type: 1,
            title: email,
            refresh_token:
              googleRefreshToken || (await getGoogleRefreshTokenFromStorage()),
            access_token: googleAccessToken,
          },
        };

        const __result = await addExternalAccountHandler(requestBody);

        if (!__result) {
          _logger.log(`error in footer.tsx/line=102`);
          return;
        }

        // Download
        const downloadSourceRequestBody = {
          asset: asset_Id,
          account: parent_Id,
        };

        console.log({ asset: asset_Id, account: parent_Id });

        const result = await downalodHandler({
          body: downloadSourceRequestBody,
          token,
        });

        // console.log({ result: JSON.stringify(result) });
      } catch (err) {
        _logger.log(`Errrrrrorrrrr: ___${JSON.stringify(err)}`);
      }
    }
  };

  async function getUserRequestEmail(token: string) {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return await response.json();
    } catch (err) {
      _logger.logErro(JSON.stringify(err));
      return null;
    }
  }

  const getToken = async () => {
    const token = await tokenCtx.getToken();
    return await tokenStringResolver(token);
  };

  const downaloderHandler = async () => {
    const shouldOpenPrompt = await shouldSignInToGoogle();

    if (!shouldOpenPrompt) {
      await promptAsync();
      return;
    }
    const requestBody = {
      asset: asset_Id,
      account: parent_Id,
    };

    // console.log({requestBody})
    const token = await getToken();

    const result = await downalodHandler({ body: requestBody, token });
    console.log(result?.error);
  };

  const getGoogleRefreshTokenFromStorage = async (): Promise<string | null> => {
    const storedRefreshToken = await _storageService.get("googleRefreshToken");
    return storedRefreshToken || null;
  };

  // const existsGoogleDataInStorage = async (): Promise<boolean> => {
  //   const storedRefreshToken = await getGoogleRefreshTokenFromStorage();
  //   return storedRefreshToken ? true : false;
  // };

  // const existsUserExternalAccountInStorage = async (): Promise<boolean> => {
  //   const existsInStorage = await _storageService.get(
  //     "HAS_USER_GOOGLE_EXTERNAL_ACCOUNT"
  //   );
  //   return existsInStorage ? true : false;
  // };

  const saveGoogleAccountDataToStorage = async ({
    googleRefreshToken,
    googleAccessToken,
  }: {
    googleRefreshToken: string;
    googleAccessToken: string;
  }) => {
    if (googleRefreshToken) {
      await _storageService.set("googleRefreshToken", googleRefreshToken);
    }
    if (googleAccessToken) {
      await _storageService.set("googleAccessToken", googleAccessToken);
    }
  };

  const shouldSignInToGoogle = async () => {
    const hasRefreshToken = await _storageService.get("googleRefreshToken");
    const hasExternalAccount = await _storageService.get(
      "HAS_USER_GOOGLE_EXTERNAL_ACCOUNT"
    );
    return hasRefreshToken || hasExternalAccount ? false : true;
  };

  return (
    <Box width="100%" height={160} position="relative">
      <GradientBg />
      <Box
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
        padding={24}
        zIndex={10}
      >
        <DownloadButton handler={downaloderHandler} fileName={fileName} />
        <EditButton handler={editorHandler} />
      </Box>
    </Box>
  );
};

const DownloadButton = ({ handler, fileName }: any) => {
  return (
    <TouchableOpacity onPress={handler} activeOpacity={1}>
      <Box
        width="100%"
        height={48}
        borderRadius={8}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={16}
      >
        <Image
          source={{
            uri: DOWNLOAD_BTN_BG_GTADIENT,
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          resizeMode="stretch"
        />
        <Text
          color={theme.color.light.WHITE}
          fontWeight={400}
          fontSize={14}
          // lineHeight={14}
          marginLeft={16}
        >
          {fileName}
        </Text>
        <Box marginRight={16}>
          <ICON_DOWNLOAD_WHITE />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const EditButton = ({ handler }: any) => {
  return (
    <TouchableOpacity onPress={handler} activeOpacity={1}>
      <Box
        width="100%"
        height={48}
        borderRadius={8}
        justifyContent="center"
        alignItems="center"
      >
        <Image
          source={{
            uri: EDIT_BTN_BG_GTADIENT,
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          resizeMode="stretch"
        />
        <Box
          alignItems="center"
          justifyContent="center"
          width="90%"
          height="90%"
          backgroundColor="#333355"
        >
          <Text
            color={theme.color.light.LIGHT_DESCRIPTION}
            fontWeight={600}
            fontSize={14}
            // lineHeight={20}
          >
            Edit information
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const GradientBg = () => {
  return (
    <Image
      source={{
        uri: SINGLE_ASSET_FOOTER_BG_PNG_GRADIENT,
      }}
      style={{
        width: "101%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
      }}
      resizeMode="stretch"
    />
  );
};
