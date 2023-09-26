import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { ICON_ADD } from "../../../constaints/icons";
import { ADD_SHARE_ACCOUNT_BG } from "../../../constaints/images";
import { windowSize } from "../../../utils/window-size";
import { AddAccountButton } from "../style";

const { width } = windowSize();
const SHARE_ACCOUNT_BG_WIDTH = width;
const SHARE_ACCOUNT_BG_HEIGHT = width / 3;

export const AccountsScreenFooterComponent = ({
  createAccountHandler,
}: any) => {
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
        width={SHARE_ACCOUNT_BG_WIDTH}
        height={SHARE_ACCOUNT_BG_HEIGHT}
        style={{
          position: "absolute",
          top: -16,
          left: 1,
        }}
      />
      <AddAccountButton activeOpacity={1} onPress={createAccountHandler}>
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
