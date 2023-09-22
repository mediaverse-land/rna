import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ScreenGradient } from "../../components/screen-gradient";
import { Box } from "../../components/box";
import { Text } from "../../components/text";
import { theme } from "../../constaints/theme";
import {
  ICONS_GOOGLE_BLUE,
  ICON_ADD,
  ICON_ARROW_LEFT_SVG,
  ICON_TRASHBEEN,
} from "../../constaints/icons";
import { VirtualizedList } from "../../components/virtualized-list";
import {
  ADD_SHARE_ACCOUNT_BG,
  SHARE_ACCOUNT_ITEM_BG,
} from "../../constaints/images";
import { useGetExternalAccountsListQuery } from "../../services/auth.service";
import { tokenContext } from "../../context/token";
import { tokenStringResolver } from "../../utils/token-string-resolver";
import { ExternalAccount } from "../../types/external-account";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { UseNavigationType } from "../../types/use-navigation";
import { LoadingSpinner } from "../../components/loader-spinner";
import { AddAccountButton } from "./style";

const AccountsScreen = (props: any) => {
  const [page, setPage] = useState(1);
  const [token, setToken] = useState<string>(null);
  const [__dataList, setDataList] = useState<ExternalAccount[]>([]);

  const tokenCtx = useContext(tokenContext);

  const { data, isFetching, isLoading, refetch } =
    useGetExternalAccountsListQuery({
      token,
      page,
    });

  const isFocuses = useIsFocused();
  const navigation = useNavigation<UseNavigationType>();

  const totalRecords = data?.total;
  const shouldLoadMore = totalRecords > __dataList?.length * page;

  useEffect(() => {
    if (!isFocuses) {
      return;
    }
    getToken();
  }, []);

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

    refetch();
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenGradient>
        <VirtualizedList onEndReached={onEndReached} onRefresh={onRefresh}>
          <Title goBackHandler={goBackHandler} />
          <List
            data={__dataList}
            isLoading={isFetching || isLoading ? true : false}
          />
        </VirtualizedList>

        <Footer />
      </ScreenGradient>
    </SafeAreaView>
  );
};

type ListProps = {
  data: ExternalAccount[];
  isLoading: boolean;
};

const List: FC<ListProps> = ({ data, isLoading }) => {
  console.log({ isLoading });
  const renderItem = useCallback(({ item }: { item: ExternalAccount }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        // onPress={() => setSelectedLanguage("item")}
      >
        <Box width={"100%"} height={56} marginBottom={16} borderRadius={16}>
          <Image
            source={{
              uri: SHARE_ACCOUNT_ITEM_BG,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 56,
            }}
            resizeMode="stretch"
          />
          <Box
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            height={56}
            paddingLeft={16}
            paddingRight={16}
          >
            <Box direction="row" alignItems="center">
              <ICONS_GOOGLE_BLUE />
              <Box marginLeft={16}>
                <Text
                  color={theme.color.light.WHITE}
                  fontSize={14}
                  fontWeight={600}
                >
                  {item.title}
                </Text>
              </Box>
            </Box>
            <ICON_TRASHBEEN />
          </Box>
        </Box>
      </TouchableOpacity>
    );
  }, []);

  const _key = (item: ExternalAccount) => item.id.toString();

  return (
    <Box marginTop={48} paddingRight={24} paddingLeft={24}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={_key}
        ListFooterComponent={
          <Box height={52}>{isLoading ? <LoadingSpinner /> : null}</Box>
        }
      />
    </Box>
  );
};

const Footer = () => {
  return (
    <Box
      width="100%"
      height={104}
      borderTopEndRadius={16}
      borderTopStartRadius={16}
      paddingLeft={24}
      paddingTop={24}
      paddingRight={24}
      paddingBottom={32}
    >
      <ADD_SHARE_ACCOUNT_BG
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").width / 3}
        style={{
          position: "absolute",
          top: -20,
          left: 1,
        }}
      />
      <AddAccountButton activeOpacity={1}>
        <Text color="#83839C" fontSize={14} lineHeight={20} fontWeight={600}>
          Add account
        </Text>
        <ICON_ADD
          width={20}
          style={{
            position: "relative",
            top: 1.5,
          }}
        />
      </AddAccountButton>
    </Box>
  );
};

const Title = ({ goBackHandler }: { goBackHandler: () => void }) => {
  return (
    <Box
      id="title"
      width="100%"
      marginTop={32}
      direction="row"
      justifyContent="center"
      position="relative"
    >
      <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
        Share account
      </Text>
      <TouchableOpacity
        onPress={goBackHandler}
        style={{
          position: "absolute",
          left: 24,
          top: 5,
        }}
        activeOpacity={1}
      >
        <ICON_ARROW_LEFT_SVG />
      </TouchableOpacity>
    </Box>
  );
};

export default AccountsScreen;
