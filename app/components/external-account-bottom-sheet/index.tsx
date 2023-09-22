import React, { FC, memo, useCallback, useEffect, useState } from "react";
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

type Props = {
  setSelectedLanguage: (lang: string) => void;
  token: string;
};

const ExternalAccount: FC<Props> = ({ setSelectedLanguage, token }) => {
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
    navigation.navigate("AccountsView");
  };

  const totalRecords = data?.total;
  const shouldLoadMore = totalRecords > __dataList?.length * page;

  const renderItem = useCallback(({ item }: { item: IExternalAccount }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedLanguage("item")}
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
          <Text color={theme.color.light.WHITE} fontSize={14} fontWeight={600}>
            {item.title}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  }, []);

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
            <Text color={theme.color.light.TEXT} fontSize={14} fontWeight={400}>
              Manage accounts
            </Text>
          </Box>
        }
        ListFooterComponent={
          <>
            {isFetching || isLoading ? (
              <LoadingSpinner />
            ) : !__dataList?.length ? (
              <Box hasBlackBorder>
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
