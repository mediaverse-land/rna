import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Box } from "../../../components/box";
import { useGetExternalAccountsListQuery } from "../../../services/auth.service";
import { useCallback, useContext, useEffect, useState } from "react";
import { retriveToken } from "../../../utils/retrive-token";
import { tokenContext } from "../../../context/token";
import { CondutorTitle } from "./conductor-title";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ICON_ARROW_LEFT_SVG,
  ICON_SPEAKER_BLACK,
} from "../../../constaints/icons";
import { Text } from "../../../components/text";
import { ChannelItem } from "../types";
import { theme } from "../../../constaints/theme";
import { windowSize } from "../../../utils/window-size";
import { ExternalAccount } from "../../../types/external-account";

const { width } = windowSize();

const speakerIconGradientProps = {
  style: {
    width: 40,
    height: 40,
    borderRadius: 8,
    padding: 1,
  },
  colors: ["#8bb3ff", "#4484ff"],
  start: {
    x: 0.1,
    y: 0.7,
  },
};

const gradientProps = {
  style: {
    width: "100%",
    height: 72,
    borderRadius: 16,
    padding: 1,
  },
  colors: ["rgba(207, 207, 252, 0)", "rgba(207, 207, 252, 0.3)"],
  start: {
    x: 0.7,
    y: 0,
  },
};

const accountTypes = {
  1: "Google",
  2: "Twitter",
  3: "Meta",
  4: "RTMP",
};

export const SelectAccountModal = ({
  closerHandler,
  setSelectedChannel,
}: {
  closerHandler: () => void;
  setSelectedChannel: (channel: ExternalAccount) => void;
}) => {
  const [token, setToken] = useState("");

  const tokenCtx = useContext(tokenContext);

  useEffect(() => {
    const getToken = async () => {
      const _token = await retriveToken(tokenCtx);

      setToken(_token);
    };

    getToken();
  }, []);

  const { data, isLoading, isFetching } = useGetExternalAccountsListQuery(
    {
      token,
      page: 1,
    },
    {
      skip: !token ? true : false,
    }
  );

  const renderItem = ({
    item,
  }: {
    item: ChannelItem | ExternalAccount | any;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedChannel(item)}
      >
        <Box
          width={width - 48}
          position="relative"
          left={24}
          marginBottom={16}
          height={72}
        >
          <Box position="relative" zIndex={10} width="100%">
            <LinearGradient {...gradientProps}>
              <Box
                width="100%"
                height="100%"
                borderRadius={16}
                backgroundColor="#121247"
                padding={16}
                direction="row"
                alignItems="center"
                position="relative"
                justifyContent="space-between"
              >
                <Box
                  width="90%"
                  height="100%"
                  direction="row"
                  alignItems="center"
                >
                  <LinearGradient {...speakerIconGradientProps}>
                    <Box
                      id="speaker-icon"
                      width={40}
                      height={40}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <ICON_SPEAKER_BLACK />
                    </Box>
                  </LinearGradient>
                  <Box flex={1} height="100%" paddingLeft={16}>
                    <Box height={23}>
                      <Text
                        color="rgba(255, 255, 255, 1)"
                        fontWeight={400}
                        fontSize={14}
                      >
                        {item?.title}
                      </Text>
                    </Box>
                    <Text
                      color="rgba(102, 102, 128, 1)"
                      fontWeight={400}
                      fontSize={12}
                    >
                      {/* @ts-ignore */}
                      {accountTypes[item.type]}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </LinearGradient>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  const key = useCallback((item: ChannelItem) => item.id.toString(), []);

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <Box
          width="100%"
          borderBottomEndRadius={16}
          borderBottomStartRadius={16}
          height={83}
          backgroundColor="rgba(14, 14, 18, 0.50)"
          paddingLeft={24}
          paddingRight={24}
        >
          <Box
            direction="row"
            alignItems="center"
            position="relative"
            justifyContent="center"
            paddingTop={32}
          >
            <Text
              color={theme.color.light.WHITE}
              fontSize={16}
              fontWeight={600}
            >
              Select channel
            </Text>
          </Box>
          <Box width={22} height={17} position="absolute" left={24} top={35}>
            <TouchableOpacity activeOpacity={1} onPress={closerHandler}>
              <ICON_ARROW_LEFT_SVG />
            </TouchableOpacity>
          </Box>
        </Box>
      }
      ListHeaderComponentStyle={{
        marginBottom: 24,
      }}
      data={data?.data}
      renderItem={renderItem}
      ListFooterComponent={
        <>
          {!isLoading && !isFetching && !data?.data?.length ? (
            <Box
              width="100%"
              marginTop={32}
              alignItems="center"
              justifyContent="center"
            >
              <Text color={theme.color.light.WHITE}>No account found</Text>
            </Box>
          ) : null}
        </>
      }
      keyExtractor={key}
    />
  );
};
