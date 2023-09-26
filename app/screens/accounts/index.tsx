import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ScreenGradient } from "../../components/screen-gradient";
import { VirtualizedList } from "../../components/virtualized-list";
import { useGetExternalAccountsListQuery } from "../../services/auth.service";
import { tokenContext } from "../../context/token";
import { tokenStringResolver } from "../../utils/token-string-resolver";
import { ExternalAccount } from "../../types/external-account";
import { UseNavigationType } from "../../types/use-navigation";
import * as Google from "expo-auth-session/providers/google";
import { enviroments } from "../../../enviroments/enviroments";
import { AccountsSCreenComponents } from "./components";
import {
  useAddExternalAccountMutation,
  useRemoveExternalAccountMutation,
  useUpdateExternalAccountMutation,
} from "../../services/asset.service";
import { getUserEmailByAccessToken } from "./service";
import { Toaster } from "../../utils/toaster";
import { Logger } from "../../utils/logger";

// const _ID_TOKEN =
//   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmNzI1NDEwMWY1NmU0MWNmMzVjOTkyNmRlODRhMmQ1NTJiNGM2ZjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1Njc1MTA5NjgxNC1jOGR2bThzMHU2NnN2NDFjcjhwZmFhZms4dmkxb2NrZi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjU2NzUxMDk2ODE0LWM4ZHZtOHMwdTY2c3Y0MWNyOHBmYWFmazh2aTFvY2tmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNzM4MDkwNzMxNzYzMzk0NzkzIiwiZW1haWwiOiJtYWhkaTkxOTM1MTQ0MThAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ3NGw0TnRYY192NWxWbjBvYldMd3l3IiwibmFtZSI6Ik1laGRpIEFsaXBvb3IiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmktRUVNcWpqdWFPbUg4X24tWmlnUkRob2I3NXRobUduUE96R2Q0ZjVfPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1laGRpIiwiZmFtaWx5X25hbWUiOiJBbGlwb29yIiwibG9jYWxlIjoiZmEiLCJpYXQiOjE2OTU0NjM2NjcsImV4cCI6MTY5NTQ2NzI2N30.X-aJE_cx9tUgM3L_H3l9JjAzElAiJNZUoMfmInW1-a-W3xE9nkDV2ZAvNL5ZG6UQwsBdZR67kC4DWaMPKOIh-9KWUFoF99htu14E3qcC4uyiver3sO9mIyJNE8AKxSjv8yyTTVc7rsNyNVRdcxXlRy1Bjd3CanxufaVEIKJigZbYRf5f61Rv7UEOiahXx_3XXRs7Q4l58DMLGUe-yPpXcMApDEqGqMekZFFj0v-45s0hHKyMz5fU_b5IIBwtsIUsEZJ1y4osNI1GC6OMQfdm3zFi8pfTNVjtigx0HvRdo_QhLFjzwCmaDfuomfDQAjKL5X54xgtXts30OIMVeAp1cg";
// const _ACCESS_TOKEN =
//   "ya29.a0AfB_byBqAECQBmSdsUmy7dWGYrtO8aDrf-U77vSMFy4MYxDcOyNqFftS0Yg2qfVcZXS18NHdABl9DS4K4nfgHPX0mJHSefYb78DdRzN3boHlQnL6uml3fXaVuuO37r_lwINeDvcvYEDoXgdoO9AfWabCgcoH27MTQCEaCgYKAU0SARISFQGOcNnCpA3hZQ0-pPahy3H42vM2Kw0170";

type CreateAccount = {
  accessToken: string;
  refreshToken: string;
  email: string;
};

const _toaster = new Toaster();
const _logger = new Logger();

const AccountsScreen = (props: any) => {
  const [page, setPage] = useState(1);
  const [token, setToken] = useState<string>(null);
  const [__dataList, setDataList] = useState<ExternalAccount[]>([]);
  const [shouldCreateUser, setShouldCreateUser] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState<ExternalAccount>(null);

  const [request, response, promptAsync]: any = Google.useAuthRequest({
    androidClientId: enviroments.REACT_APP_ANDROID_CLIENT_ID,
    iosClientId: enviroments.REACT_APP_IOS_CLIENT_ID,
    clientSecret: enviroments.REACT_APP_WEB_CLIENT_SECTET,
    expoClientId: enviroments.REACT_APP_EXPO_CLIENT_ID,
    scopes: enviroments.GOOGLE_AUTH_SCOPE,
    extraParams: {
      access_type: "offline",
    },
  });

  const tokenCtx = useContext(tokenContext);

  const { data, isFetching, isLoading, refetch } =
    useGetExternalAccountsListQuery({
      token,
      page,
    });

  const [createAccountApiHandler] = useAddExternalAccountMutation();
  const [updateAccountApiHandler] = useUpdateExternalAccountMutation();
  const [removeAccountApiHandler] = useRemoveExternalAccountMutation();

  const isFocuses = useIsFocused();
  const navigation = useNavigation<UseNavigationType>();

  const totalRecords = data?.total;
  const shouldLoadMore = totalRecords > __dataList?.length;

  // Handle acctions of google signin
  useEffect(() => {
    if (shouldCreateUser || selectedAccount?.id) {
      manageGoogleApi();
    }
  }, [response, shouldCreateUser]);

  // _toaster.show(JSON.stringify({response, request}));

  const manageGoogleApi = async () => {
    if (response?.authentication) {
      const accessToken = response?.authentication?.accessToken;
      const refreshToken = response?.authentication?.refreshToken;
      if (!accessToken) {
        _logger.log("NO ACCESS TOKEN");
        return;
      }
      try {
        const userGoogleData = await getUserEmailByAccessToken(accessToken);

        // This means the external account should be create
        if (refreshToken) {
          await _createAccountMiddleware({
            email: userGoogleData?.email,
            accessToken,
            refreshToken,
          });
        }

      } catch (err) {
        console.log(`errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr, ${err}`);
      }
    }
  };

  useEffect(() => {
    if (isFocuses) {
      getToken();
      refetch();
    }
    if (!isFocuses) {
      setDataList(null);
      setPage(1);
    }
  }, [isFocuses]);

  useEffect(() => {
    if (!isFocuses) {
      return;
    }

    if (data?.data) {
      setDataList((prev) => [...prev, ...data?.data]);
    }
  }, [data?.data]);

  const _createAccountMiddleware = async ({
    email,
    accessToken,
    refreshToken,
  }: CreateAccount) => {
    const requestBody = {
      body: {
        title: email,
        refresh_token: refreshToken,
        access_token: accessToken,
        type: 1,
      },
      token,
    };

    const response = await createAccountApiHandler(requestBody);
    if (response?.error) {
      if (response?.error?.status === 422) {
        _toaster.show(
          response?.error?.data?.error ||
            "Error while creating new external account; Your email is registered"
        );
      } else {
        _toaster.show("Error while creating new external account");
      }
    }
    if (response?.data) {
      setDataList([]);
      setPage(1);
      refetch();
      _toaster.show("New external account has been created successfully");
    }
  };

  const _updateAccountMiddleware = async ({
    accessToken,
    _innerEmail,
  }: {
    accessToken: string;
    _innerEmail?: string;
  }) => {
    const requestBody = {
      id: selectedAccount.id,
      body: {
        title: _innerEmail ? _innerEmail : selectedAccount?.title,
        refresh_token: selectedAccount?.information?.refresh_token,
        access_token: accessToken,
        type: 1,
      },
      token,
    };

    let response;
    if (_innerEmail) {
      response = await createAccountApiHandler(requestBody);
    } else {
      response = await updateAccountApiHandler(requestBody);
    }

    if (response?.error) {
      _toaster.show("Error while updating external account");
    }
    if (response?.data) {
      setDataList([]);
      setPage(1);
      refetch();
      _toaster.show("external account has been updated successfully");
    }

    setSelectedAccount(null);
  };

  const getToken = async () => {
    const _tk: unknown = await tokenCtx.getToken();

    if (!_tk) {
      return;
    }

    setToken(await getFormattedToken(_tk));
  };

  const getFormattedToken = async (
    _token: string | unknown
  ): Promise<string> => {
    return await tokenStringResolver(_token);
  };

  const onEndReached = () => {
    if (isFetching || isLoading || !shouldLoadMore) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  const onRefresh = () => {
    setDataList([]);
    setPage(1);
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  const createExternalAccount = async () => {
    setShouldCreateUser(() => {
      promptAsync();
      return true;
    });
  };

  const updateAccountHandler = async (item: ExternalAccount) => {
    setSelectedAccount(() => {
      promptAsync();
      return item;
    });
  };

  const removaAccountHandler = async (item: ExternalAccount) => {
    const result = await removeAccountApiHandler({
      token,
      body: { id: item.id },
    });
    if (result?.error) {
      _toaster?.show("Deleting account failed");
      return;
    }

    _toaster?.show("Account deleted successfully");
    setDataList([]);
    setPage(1);
    refetch();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenGradient>
        <VirtualizedList onEndReached={onEndReached} onRefresh={onRefresh}>
          <AccountsSCreenComponents.Title goBackHandler={goBackHandler} />
          <AccountsSCreenComponents.List
            data={__dataList}
            updateAccountHandler={updateAccountHandler}
            removaAccountHandler={removaAccountHandler}
            isLoading={isFetching || isLoading ? true : false}
          />
        </VirtualizedList>
        <AccountsSCreenComponents.Footer
          createAccountHandler={createExternalAccount}
        />
      </ScreenGradient>
    </SafeAreaView>
  );
};

export default AccountsScreen;
