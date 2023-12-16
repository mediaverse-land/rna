import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScreenGradient } from '../../components/screen-gradient';
import { VirtualizedList } from '../../components/virtualized-list';
import { useGetExternalAccountsListQuery } from '../../services/auth.service';
import { tokenContext } from '../../context/token';
import { tokenStringResolver } from '../../utils/token-string-resolver';
import { ExternalAccount } from '../../types/external-account';
import { UseNavigationType } from '../../types/use-navigation';
import { AccountsSCreenComponents } from './components';
import { useRemoveExternalAccountMutation } from '../../services/asset.service';
import { Toaster } from '../../utils/toaster';

// const _ID_TOKEN =
//   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmNzI1NDEwMWY1NmU0MWNmMzVjOTkyNmRlODRhMmQ1NTJiNGM2ZjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1Njc1MTA5NjgxNC1jOGR2bThzMHU2NnN2NDFjcjhwZmFhZms4dmkxb2NrZi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjU2NzUxMDk2ODE0LWM4ZHZtOHMwdTY2c3Y0MWNyOHBmYWFmazh2aTFvY2tmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNzM4MDkwNzMxNzYzMzk0NzkzIiwiZW1haWwiOiJtYWhkaTkxOTM1MTQ0MThAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ3NGw0TnRYY192NWxWbjBvYldMd3l3IiwibmFtZSI6Ik1laGRpIEFsaXBvb3IiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmktRUVNcWpqdWFPbUg4X24tWmlnUkRob2I3NXRobUduUE96R2Q0ZjVfPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1laGRpIiwiZmFtaWx5X25hbWUiOiJBbGlwb29yIiwibG9jYWxlIjoiZmEiLCJpYXQiOjE2OTU0NjM2NjcsImV4cCI6MTY5NTQ2NzI2N30.X-aJE_cx9tUgM3L_H3l9JjAzElAiJNZUoMfmInW1-a-W3xE9nkDV2ZAvNL5ZG6UQwsBdZR67kC4DWaMPKOIh-9KWUFoF99htu14E3qcC4uyiver3sO9mIyJNE8AKxSjv8yyTTVc7rsNyNVRdcxXlRy1Bjd3CanxufaVEIKJigZbYRf5f61Rv7UEOiahXx_3XXRs7Q4l58DMLGUe-yPpXcMApDEqGqMekZFFj0v-45s0hHKyMz5fU_b5IIBwtsIUsEZJ1y4osNI1GC6OMQfdm3zFi8pfTNVjtigx0HvRdo_QhLFjzwCmaDfuomfDQAjKL5X54xgtXts30OIMVeAp1cg";
// const _ACCESS_TOKEN =
//   "ya29.a0AfB_byBqAECQBmSdsUmy7dWGYrtO8aDrf-U77vSMFy4MYxDcOyNqFftS0Yg2qfVcZXS18NHdABl9DS4K4nfgHPX0mJHSefYb78DdRzN3boHlQnL6uml3fXaVuuO37r_lwINeDvcvYEDoXgdoO9AfWabCgcoH27MTQCEaCgYKAU0SARISFQGOcNnCpA3hZQ0-pPahy3H42vM2Kw0170";

const _toaster = new Toaster();

const AccountsScreen = () => {
  const [page, setPage] = useState(1);
  const [token, setToken] = useState<string>(null);
  const [__dataList, setDataList] = useState<ExternalAccount[]>([]);

  const [forceRefresh, setForceRefresh] = useState(null);

  const tokenCtx = useContext(tokenContext);

  const { data, isFetching, isLoading, refetch } = useGetExternalAccountsListQuery({
    token,
    page,
  });

  const [removeAccountApiHandler] = useRemoveExternalAccountMutation();

  const isFocuses = useIsFocused();
  const navigation = useNavigation<UseNavigationType>();

  const totalRecords = data?.total;
  const shouldLoadMore = totalRecords > __dataList?.length;

  useEffect(() => {
    if (isFocuses) {
      getToken();
      refetch();
    }
    if (!isFocuses) {
      setPage(1);
      setDataList(null);
    }
  }, [isFocuses]);

  useEffect(() => {
    if (!isFocuses) {
      return;
    }

    if (page === 0 || page === 1) {
      setDataList(data?.data);
    } else {
      // eslint-disable-next-line no-unsafe-optional-chaining
      setDataList((prev) => [...prev, ...data?.data]);
    }
  }, [forceRefresh, data?.data]);

  const getToken = async () => {
    const _tk: unknown = await tokenCtx.getToken();

    if (!_tk) {
      return;
    }

    setToken(await getFormattedToken(_tk));
  };

  const getFormattedToken = async (_token: string | unknown): Promise<string> => {
    return await tokenStringResolver(_token);
  };

  const onEndReached = () => {
    if (isFetching || isLoading || !shouldLoadMore) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  const onRefresh = async () => {
    await refetchData();
    await setForceRefresh(new Date());
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  const removaAccountHandler = async (item: ExternalAccount) => {
    const result = await removeAccountApiHandler({
      token,
      body: { id: item.id },
    });
    if (result?.error) {
      _toaster?.show('Deleting account failed');
      return;
    }

    _toaster?.show('Account deleted successfully');
    refetchData();
  };

  const refetchData = () => {
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
            updateAccountHandler={() => {
              //
            }}
            removaAccountHandler={removaAccountHandler}
            isLoading={isFetching || isLoading ? true : false}
          />
        </VirtualizedList>
        <AccountsSCreenComponents.SelectAccountBottomSheet
          refetchData={refetchData}
          token={token}
        />
      </ScreenGradient>
    </SafeAreaView>
  );
};

export default AccountsScreen;
