import React, { FC, memo, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Box } from "../box";
import { theme } from "../../constaints/theme";
import { Text } from "../text";
import { Button } from "../button";
import { LoadingSpinner } from "../loader-spinner";
import { useGetExternalAccountsListQuery } from "../../services/auth.service";
import { ICONS_GOOGLE_BLUE } from "../../constaints/icons";
import { UseNavigationType } from "../../types/use-navigation";
import { ExternalAccount as IExternalAccount } from "../../types/external-account";
import { ACCOUNTS_SCREEN } from "../../constaints/consts";

type Props = {
  setSelectedAccount: (account: IExternalAccount) => void;
  token: string;
};

const ExternalAccount: FC<Props> = ({ setSelectedAccount, token }) => {
  const [page, setPage] = useState(1);
  const [__dataList, setDataList] = useState<IExternalAccount[]>([]);

  const { data, isFetching, isLoading, refetch } =
    useGetExternalAccountsListQuery({
      token,
      page,
    });

  const isFocuses = useIsFocused();
  const navigation = useNavigation<UseNavigationType>();

  useEffect(() => {
    if (isFocuses) {
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

  const setNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const createAccountHandler = () => {
    navigation.navigate(ACCOUNTS_SCREEN);
  };

  const navigateToSharedAccountsScreen = () => {
    navigation.navigate(ACCOUNTS_SCREEN);
  };

  const totalRecords = data?.total;
  const shouldLoadMore = totalRecords > __dataList?.length;

  const renderItem = ({ item }: { item: IExternalAccount }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedAccount(item)}
      >
        <Box
          width={"100%"}
          backgroundColor="#4E4E61"
          height={56}
          marginBottom={16}
          borderRadius={16}
          paddingRight={16}
          paddingLeft={16}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ICONS_GOOGLE_BLUE />
          <Text>{item.id}</Text>
          <Text color={theme.color.light.WHITE} fontSize={14} fontWeight={600}>
            {item.title}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  };

  const _key = (item: IExternalAccount) => item.id.toString();

  return (
    <>
      <BottomSheetFlatList
        data={__dataList}
        keyExtractor={_key}
        renderItem={renderItem}
        ListHeaderComponent={
          <Box
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={32}
          >
            <Text
              color={theme.color.light.WHITE}
              fontSize={16}
              fontWeight={600}
            >
              Select an account to continue
            </Text>
            <TouchableOpacity
              onPress={navigateToSharedAccountsScreen}
              activeOpacity={1}
            >
              <Text
                color={theme.color.light.TEXT}
                fontSize={14}
                fontWeight={400}
              >
                Manage accounts
              </Text>
            </TouchableOpacity>
          </Box>
        }
        ListFooterComponent={
          <>
            {isFetching || isLoading ? (
              <LoadingSpinner />
            ) : !__dataList?.length ? (
              <Box >
                <Button
                  onpressHandler={createAccountHandler}
                  varient="dark"
                  text="No accounts yet? create one"
                  borderRadius={16}
                />
              </Box>
            ) : (
              <Box marginTop={16}>
                {shouldLoadMore ? (
                  <Button
                    onpressHandler={setNextPage}
                    varient="dark"
                    text="Load more"
                    size="lg"
                    borderRadius={16}
                  />
                ) : null}
              </Box>
            )}
          </>
        }
        contentContainerStyle={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 650,
        }}
      />
    </>
  );
};

export default memo(ExternalAccount);
