import { FC } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { ExternalAccount } from "../../../types/external-account";
import { Box } from "../../../components/box";
import { SHARE_ACCOUNT_ITEM_BG } from "../../../constaints/images";
import {
  ICONS_GOOGLE_BLUE,
  ICON_STREAM,
  ICON_TRASHBEEN,
} from "../../../constaints/icons";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { LoadingSpinner } from "../../../components/loader-spinner";

type ListProps = {
  data: ExternalAccount[];
  isLoading: boolean;
  updateAccountHandler: (item: ExternalAccount) => void;
  removaAccountHandler: (item: ExternalAccount) => void;
};

export const AccountsScreenListComponent: FC<ListProps> = ({
  data,
  isLoading,
  removaAccountHandler,
}) => {
  const renderItem = ({ item }: { item: ExternalAccount }) => {
    return (
      <TouchableOpacity activeOpacity={1}>
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
              {item.type === 1 ? (
                <ICONS_GOOGLE_BLUE width={18} height={18} />
              ) : (
                <ICON_STREAM width={18} height={18} />
              )}
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
            <Box direction="row" alignItems="center">
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => removaAccountHandler(item)}
              >
                <ICON_TRASHBEEN />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

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
