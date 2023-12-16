import { StatusBar } from "react-native";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { ScreenGradient } from "../../../../components/screen-gradient";
import { Box } from "../../../../components/box";
import { ListColumn, ListColumnItem } from "../../components/list";
import { PaddingContainer } from "../../../../styles/grid";
import { ICON_ARROW_RIGHT } from "../../../../constaints/icons";
import { SettingsScreenTitle } from "../../components/title";
import { tokenContext } from "../../../../context/token";
import { StorageService } from "../../../../services/storage.service";
import { Logger } from "../../../../utils/logger";

const data: ListColumnItem[] = [
  {
    id: 1,
    title: "General information",
    value: null,
    icon: ICON_ARROW_RIGHT,
    routePath: "general_information",
    direction: "row-reverse",
    iconStyle: {
      width: 5.68,
      height: 12,
    },
  },
  {
    id: 2,
    title: "Sign ins",
    value: null,
    icon: ICON_ARROW_RIGHT,
    routePath: "sign_ins",
    direction: "row-reverse",
    iconStyle: {
      width: 5.68,
      height: 12,
    },
  },
  {
    id: 3,
    title: "Seassions",
    value: null,
    icon: ICON_ARROW_RIGHT,
    routePath: "seassions",
    direction: "row-reverse",
    iconStyle: {
      width: 5.68,
      height: 12,
    },
  },
];

const signOutData: ListColumnItem[] = [
  {
    id: 1,
    title: "Sign out",
    value: null,
    icon: ICON_ARROW_RIGHT,
    direction: "row-reverse",
    iconStyle: {
      width: 5.68,
      height: 12,
    },
  },
];

const _storageService = new StorageService();
const _logger = new Logger();

export function AccountPage() {
  const _tokenCtx = useContext(tokenContext);

  const signOutHandler = async () => {
    try {
      // Clear bottom nvaigator tour
      // dispatch(removeButtomNavitationTour());

      // // Clear explore top bar nvaigator tour
      // dispatch(removeExploreTopBarTour());
      // dispatch(activeDisableOnIntractions());

      // await _storageService.removeItem(USER_HAS_SEEN_BOTTOM_TAB_GUIDE);
      // await _storageService.removeItem(
      //   USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE
      // );
      // await _storageService.removeItem(HAS_USER_SEEN_EXPLORE_ALL_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_APPS_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_PLUS_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_PLUS_CREATE_FORM_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_WALLET_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_PROFILE_HEADER_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_PROFILE_ITEMS_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_SETTINGS_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_BUY_BUTTON_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_OWNER_VIDEO_TOUR);
      // await _storageService.removeItem(HAS_USER_SEEN_PAYMENT_TOUR);

      await _storageService.removeItem("notifs_length");
      await _storageService.removeItem("user_data");
      await _tokenCtx.clearToken();
    } catch (err) {
      _logger.logErro(`error[in: signoutHandler], res: ${JSON.stringify(err)}`);
    }
    // dispatch(hideExploreNavigationTour());
  };

  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isFocused ? (
        <StatusBar backgroundColor={"#030340"} barStyle="light-content" />
      ) : null}
      <ScreenGradient>
        <PaddingContainer>
          <SettingsScreenTitle title="Account" />
          <Box marginTop={38}>
            <ListColumn data={data} />
          </Box>
          <Box marginTop={16}>
            <ListColumn data={signOutData} onpress={signOutHandler} />
          </Box>
        </PaddingContainer>
      </ScreenGradient>
    </SafeAreaView>
  );
}
