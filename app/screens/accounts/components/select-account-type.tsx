import {
  FC,
  memo,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import { useClickOutside } from "react-native-click-outside";
import * as Google from "expo-auth-session/providers/google";
import { ModalBottomSheet } from "../../../components/bottom-sheet-modal";
import { Box } from "../../../components/box";
import { AccountsSCreenComponents } from "./index";
import { enviroments } from "../../../../enviroments/enviroments";
import { getUserEmailByAccessToken } from "../service";
import { Logger } from "../../../utils/logger";
import { useAddExternalAccountMutation } from "../../../services/asset.service";
import { Toaster } from "../../../utils/toaster";
import { Button } from "../../../components/button";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { Input } from "../../../components/form";
import {
  EXTERNAL_ACCOUNT_GOOGLE_TYPE,
  EXTERNAL_ACCOUNT_STREAM_TYPE,
} from "../../../constaints/consts";
import {
  ERROR_EXTERNAL_ACCOUNT_CREATION_MSG,
  ERROR_FETCH_GOOGLE_DATA,
  EXTERNAL_ACCOUNT_CREATION_SUCCESS_MSG,
} from "../../../constaints/errors-and-messages";

type Props = {
  token: string;
  refetchData: () => void;
};

type CreateAccount = {
  accessToken: string;
  refreshToken: string;
  email: string;
};

const _logger = new Logger();
const _toaster = new Toaster();

const SelectAccountType: FC<Props> = ({ token, refetchData }) => {
  const [snapPoints, setSnapPoints] = useState(["30%"]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [request, response, promptAsync]: any = Google.useAuthRequest({
    androidClientId: enviroments.REACT_APP_ANDROID_CLIENT_ID,
    iosClientId: enviroments.REACT_APP_IOS_CLIENT_ID,
    expoClientId: enviroments.REACT_APP_EXPO_CLIENT_ID,
    scopes: enviroments.GOOGLE_AUTH_SCOPE,
  });

  // const [request, response, promptAsync]: any = Google.useAuthRequest({
  //   androidClientId: enviroments.REACT_APP_ANDROID_CLIENT_ID,
  //   iosClientId: enviroments.REACT_APP_IOS_CLIENT_ID,
  //   clientSecret: enviroments.REACT_APP_WEB_CLIENT_SECTET,
  //   expoClientId: enviroments.REACT_APP_EXPO_CLIENT_ID,
  //   scopes: enviroments.GOOGLE_AUTH_SCOPE,
  //   // extraParams: {
  //   //   access_type: "offline",
  //   // },
  //   // responseType: "code",
  // });

  const [createAccountApiHandler, { isLoading, isFetching }] =
    useAddExternalAccountMutation();

  const selectAccountModalRef = useRef(null);
  const modalSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  const modalCloser = () => {
    selectAccountModalRef?.current?.close();
  };

  const selectAccountModalRefWrapperRef = useClickOutside<View>(() => {
    modalCloser();
  });

  useEffect(() => {
    manageGoogleApi();
  }, [response]);

  const _createAccountMiddleware = async ({
    email,
    accessToken,
    refreshToken,
  }: CreateAccount) => {
    const requestBody = {
      body: {
        type: EXTERNAL_ACCOUNT_GOOGLE_TYPE,
        title: email,
        refresh_token: refreshToken,
        access_token: accessToken,
      },
      token,
    };

    const response = await createAccountApiHandler(requestBody);

    if (response?.error) {
      _toaster.show(
        response?.error?.data?.error || ERROR_EXTERNAL_ACCOUNT_CREATION_MSG
      );
    }
    if (response?.data) {
      refetchData();
      _toaster.show(EXTERNAL_ACCOUNT_CREATION_SUCCESS_MSG);
    }
  };

  const manageGoogleApi = async () => {
    if (response?.authentication) {

      const accessToken = response?.authentication?.accessToken;
      const refreshToken = response?.authentication?.refreshToken || null;

      // const {accessToken, refreshToken} = googleTokens;

      const userGoogleData = await getUserEmailByAccessToken(accessToken);
      if (!userGoogleData) {
        _logger.log(ERROR_FETCH_GOOGLE_DATA);
        return;
      }

      await _createAccountMiddleware({
        email: userGoogleData?.email,
        accessToken,
        refreshToken,
      });
    }
  };

  // const getGoogleTokens = ({ authentication }: any) => {
  //   const accessToken = authentication?.accessToken;
  //   const refreshToken = authentication?.refreshToken;

  //   // if (!accessToken) {
  //   //   _logger.log(NO_ACCESS_TOKEN_MSG);
  //   //   return NO_ACCESS_TOKEN_MSG;
  //   // }

  //   return {
  //     accessToken: accessToken || "",
  //     refreshToken,
  //   };
  // };

  const createStreamExternalAccountEndpoint = async ({
    title,
    stream_key,
    stream_url,
  }: InitialFormState) => {
    const requestBody = {
      body: {
        // Stream type
        type: EXTERNAL_ACCOUNT_STREAM_TYPE,
        title,
        stream_url,
        stream_key,
      },
      token,
    };

    const response = await createAccountApiHandler(requestBody);
    if (response?.error) {
      _toaster.show(
        response?.error?.data?.error || ERROR_EXTERNAL_ACCOUNT_CREATION_MSG
      );
    }
    if (response?.data) {
      refetchData();
      modalCloser();
      _toaster.show(EXTERNAL_ACCOUNT_CREATION_SUCCESS_MSG);
    }
  };

  const createGoogleExternalAccountEndpoint = async () => {
    modalCloser();
    await promptAsync();
  };

  const openModal = () => {
    selectAccountModalRef?.current?.open();
  };

  return (
    <>
      {/*<Box backgroundColor='#fff' padding={20}>*/}
      {/*    <Text selectable>{JSON.stringify(response?.authentication)}</Text>*/}
      {/*</Box>*/}
      <AccountsSCreenComponents.Footer createAccountHandler={openModal} />
      {/* <BottomSheet /> */}
      <ModalBottomSheet
        ref={selectAccountModalRef}
        snapPoints={modalSnapPoints}
      >
        <View
          ref={selectAccountModalRefWrapperRef}
          style={{
            marginBottom: 200,
            flex: 1,
            height: 1000,
          }}
        >
          <BottomSheet
            setSnapPoints={setSnapPoints}
            createStreamAccountHandler={createStreamExternalAccountEndpoint}
            createGoogleAccountHandler={createGoogleExternalAccountEndpoint}
            isLoading={isLoading || isFetching}
          />
        </View>
      </ModalBottomSheet>
      {/* </KeyboardAwareScrollView> */}
    </>
  );
};

type BottomSheetProps = {
  setSnapPoints: (point: string[]) => void;
  createStreamAccountHandler: (args: InitialFormState) => void;
  createGoogleAccountHandler: (...args: any) => void;
  isLoading: boolean;
};

const formStateUpdateTypes = {
  UPDATE_TITLE: "UPDATE_TITLE",
  UPDATE_STREAM_URL: "UPDATE_STREAM_URL",
  UPDATE_STREAM_KEY: "UPDATE_STREAM_KEY",
  CLEAN_STATE: "CLEAN_STATE",
};

type InitialFormState = {
  title: string;
  stream_url: string;
  stream_key: string;
};

const initialFormState: InitialFormState = {
  title: "",
  stream_key: "",
  stream_url: "",
};

const streamFormReducer = (state: InitialFormState, { type, payload }: any) => {
  switch (type) {
    case formStateUpdateTypes.UPDATE_TITLE:
      return {
        ...state,
        title: payload,
      };
    case formStateUpdateTypes.UPDATE_STREAM_URL:
      return {
        ...state,
        stream_url: payload,
      };
    case formStateUpdateTypes.UPDATE_STREAM_KEY:
      return {
        ...state,
        stream_key: payload,
      };
    case formStateUpdateTypes.CLEAN_STATE:
      state = initialFormState;
      return initialFormState;
    default:
      return state;
  }
};

const BottomSheet: FC<BottomSheetProps> = ({
  setSnapPoints,
  createStreamAccountHandler,
  createGoogleAccountHandler,
  isLoading,
}) => {
  const [currentView, setCurrentView] = useState<
    "account-types" | "stream-account"
  >("account-types");

  const [formState, dispatch] = useReducer(streamFormReducer, initialFormState);

  useEffect(() => {
    viewHeightManager();
  }, [currentView]);

  const viewHeightManager = () => {
    switch (currentView) {
      case "account-types":
        setSnapPoints(["30%"]);
        return;
      case "stream-account":
        setSnapPoints(["45%"]);
        return;
    }
  };

  const _createStreamAccount = async () => {
    await createStreamAccountHandler(formState);
  };

  const setStreamAccountView = () => {
    setCurrentView(() => "stream-account");
  };

  const updateInputs = (type: string, value: string) => {
    dispatch({ type, payload: value });
  };

  // const cleanUp = () => {
  //   dispatch({ type: formStateUpdateTypes.CLEAN_STATE });
  // };

  return (
    <Box width="100%" height={170} paddingLeft={24} paddingRight={24}>
      {currentView === "account-types" ? (
        <>
          <Box>
            <Text
              color={theme.color.light.WHITE}
              fontSize={16}
              fontWeight={600}
            >
              Select account type
            </Text>
          </Box>
          <Box marginTop={24}>
            <Button
              borderRadius={16}
              varient="dark"
              text="Google account"
              onpressHandler={createGoogleAccountHandler}
            />
          </Box>
          <Box marginTop={16}>
            <Button
              borderRadius={16}
              varient="dark"
              text="Stream account"
              onpressHandler={setStreamAccountView}
              isLoading={isLoading}
            />
          </Box>
        </>
      ) : (
        <Box>
          <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
            Add stream account
          </Text>
          <Box marginTop={24}>
            <Input
              labelText="Email"
              onChangeText={(text: string) =>
                updateInputs(formStateUpdateTypes.UPDATE_TITLE, text)
              }
            />
          </Box>
          <Box marginTop={16}>
            <Input
              labelText="Stream url"
              onChangeText={(text: string) =>
                updateInputs(formStateUpdateTypes.UPDATE_STREAM_URL, text)
              }
            />
          </Box>
          <Box marginTop={16}>
            <Input
              labelText="Stream key"
              onChangeText={(text: string) =>
                updateInputs(formStateUpdateTypes.UPDATE_STREAM_KEY, text)
              }
            />
          </Box>
          <Box marginTop={24}>
            <Button
              varient="primary"
              borderRadius={16}
              size="lg"
              text="Create account"
              onpressHandler={_createStreamAccount}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const SelectAccountTypeMemo = memo(SelectAccountType);

// https://www.tradingview.com/chart/?symbol=BINGX%3AARKMUSDT.PS
