import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "../../../components/box";
import { SettingsScreenHeader } from "../components/header";
import { ScreenGradient } from "../../../components/screen-gradient";
import { PaddingContainer } from "../../../styles/grid";
import { ListColumn, ListColumnItem } from "../components/list";
import {
  ICON_ANALYTICS,
  ICON_MAIL,
  ICON_SHARE,
  ICON_USER,
} from "../../../constaints/icons";
import { tokenContext } from "../../../context/token";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import { getMessagesApiHandler } from "../service";
import { FocusedStatusBar } from "../../../components/focused-statusbar";
import { userContext } from "../../../context/user";
import { StorageService } from "../../../services/storage.service";
import { useIsFocused } from "@react-navigation/native";
import { ACCOUNTS_SCREEN } from "../../../constaints/consts";

const _storageService = new StorageService();

export function IndexMenu() {
  const isFocused = useIsFocused();

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  const { username, wallets } = userCtx.getUser();

  const [messagesLength, setMessagesLength] = useState<number>(0);
  const [readMessages, setReadMessages] = useState<number>(0);

  useEffect(() => {
    getData();

    const getMessagesLength = async () => {
      const getLength = await _storageService.get("notifs_length");
      if (getLength) {
        setReadMessages(parseInt(getLength));
      }
    };

    getMessagesLength();
  }, [isFocused]);

  const getData = async () => {
    await Promise.allSettled([await getMessagesCount()]);
  };

  const getMessagesCount = async () => {
    const token = await tokenCtx.getToken();

    if (token === null) {
      return;
    }

    const formattedToken = tokenStringResolver(token);
    const { isError, res } = await getMessagesApiHandler(formattedToken);

    if (isError) {
      return;
    }
    const { data } = res.data;
    setMessagesLength(data.length);
  };

  const unReadMessages =
    messagesLength - readMessages <= 0 ? "0" : messagesLength - readMessages;

  const listOneRows: ListColumnItem[] = [
    {
      id: 90,
      title: "Account",
      value: username,
      bage: null,
      icon: ICON_USER,
      routePath: "account",
      iconStyle: {
        width: 14.4,
        height: 18,
      },
    },
    {
      id: 91,
      title: "Inbox",
      value: null,
      bage: unReadMessages,
      icon: ICON_MAIL,
      routePath: "massage",
      iconStyle: {
        width: 18,
        height: 14.4,
      },
    },
    {
      id: 92,
      title: "Wallet",
      value: `${wallets?.[0]?.balance || 0} $`,
      bage: null,
      icon: ICON_MAIL,
      routePath: "Wallet",
      iconStyle: {
        width: 18,
        height: 14.4,
      },
    },
  ];

  const listTwoRows: ListColumnItem[] = [
    {
      id: 1,
      title: "Analytics",
      icon: ICON_ANALYTICS,
      // routePath: 'analytics',
      iconStyle: {
        width: 17.1,
        height: 18,
      },
      isDisabled: true,
    },
    {
      id: 2,
      title: "Share account",
      icon: ICON_SHARE,
      routePath: ACCOUNTS_SCREEN,
      iconStyle: {
        width: 18,
        height: 18,
      },
      // isDisabled: true,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <ScreenGradient>
        <SettingsScreenHeader />
        <PaddingContainer>
          <Box marginTop={38}>
            <ListColumn data={listOneRows} hasTour={true} />
          </Box>
          <Box marginTop={8}>
            <ListColumn data={listTwoRows} />
          </Box>
        </PaddingContainer>
      </ScreenGradient>
    </SafeAreaView>
  );
}
