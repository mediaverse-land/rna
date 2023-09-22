import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Box } from "../box";
import { theme } from "../../constaints/theme";
import { Text } from "../text";
import { LoadingSpinner } from "../loader-spinner";
import { useGetExternalAccountsListQuery } from "../../services/auth.service";
import { ICONS_GOOGLE_BLUE } from "../../constaints/icons";
import { useIsFocused } from "@react-navigation/native";
import { Button } from "../button";

type Props = {
  setSelectedLanguage: (lang: string) => void;
  token: string;
};

const ExternalAccount: FC<Props> = ({ setSelectedLanguage, token }) => {
  const [page, setPage] = useState(1);
  const [__dataList, setDataList] = useState<any[]>([]);

  const { data, isFetching, refetch } = useGetExternalAccountsListQuery({
    token: token,
  });

  const isFocuses = useIsFocused();

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
      setDataList((prev) => [...prev, data?.data]);
    }
  }, [data?.data]);

  console.log(__dataList);

  const totalRecords = data?.total;
  const shouldLoadMore = totalRecords > data?.data?.length * page;

  const renderItem = useCallback(({ item }: { item: any }) => {
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

  const _key = (item: any) => Math.random();

  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <BottomSheetFlatList
          data={__dataList}
          // keyExtractor={_key}
          renderItem={renderItem}
          ListHeaderComponent={
            <Box width="100%" marginBottom={32}>
              <Text
                color={theme.color.light.WHITE}
                fontSize={16}
                fontWeight={600}
              >
                Select an account to continue
              </Text>
            </Box>
          }
          ListFooterComponent={
            <Box>
              {shouldLoadMore ? (
                <Button varient="dark" text="Load more..." borderRadius={16} />
              ) : null}
            </Box>
          }
          contentContainerStyle={{
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 16,
            paddingBottom: 800,
          }}
        />
      )}
    </>
  );
};

export default memo(ExternalAccount);
