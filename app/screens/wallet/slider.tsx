import { useContext, useRef, useState, useEffect } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { ScreenGradient } from "../../components/screen-gradient";
import { CardSlider } from "./components/card-slider";
import { Box } from "../../components/box";
import { ConfirmAlert } from "../../components/confirm-alert";
import { alertContext } from "../../context/alert";
import { ModalBottomSheet } from "../../components/bottom-sheet-modal";
import { AddInventory } from "./components/add-inventory";
import { AddCard } from "./components/add-card";
import { windowSize } from "../../utils/window-size";
import { Button } from "../../components/button";
import { ICON_ADD } from "../../constaints/icons";
import { tokenContext } from "../../context/token";
import { tokenStringResolver } from "../../utils/token-string-resolver";
import { getWalletsApiHandler } from "./service";
import { Wallet } from "../../types/wallet";
import { Spacer } from "../../components/spacer";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { UseNavigationType } from "../../types/use-navigation";
import { Text } from "../../components/text";
import { theme } from "../../constaints/theme";
import { INVENTORY_BOX_PNG } from "../../constaints/images";
import { PaddingContainer } from "../../styles/grid";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
import { StorageService } from "../../services/storage.service";
import {
  HAS_USER_SEEN_PLUS_CREATE_FORM_TOUR,
  HAS_USER_SEEN_WALLET_TOUR,
} from "../../constaints/consts";

const { width: WINDOW_WIDTH } = windowSize();

const CoachmarkWrapper: any = Coachmark;

const HISTORY_GUIDE =
  "You can spend money in Mediaverse and of course , you will earn money, the history of your transactions will always be available in history !";
const INVENTORY_GUIDE = "See your inventory in the list!";
const ADD_CARD_GUIDE = "Specify a bank account for payment";
const ADD_INVENTORY_GUIDE =
  "Enter the amount and increase your account balance by withdrawing from the account";

const _storageService = new StorageService();

export function WalletSlider() {
  const confirmAlertRef = useRef(null);
  const addInventoryAlertRef = useRef(null);
  const addCardAlertRef = useRef(null);

  const isFocused = useIsFocused();

  const alertCtx = useContext(alertContext);
  const tokenCtx = useContext(tokenContext);

  const navigation = useNavigation<UseNavigationType>();

  const [balence, setBalance] = useState<number>(null);

  const redirectToHistoryHandler = () => {
    navigation.navigate("HistoryPage");
  };
  // const isOpen: any = alertCtx.isOpen();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await tokenCtx.getToken();
    if (token === null) {
      return;
    }

    const formattedToken = tokenStringResolver(token);
    await getBalenceData(formattedToken);
  };

  const getBalenceData = async (token: string) => {
    const { isError, res } = await getWalletsApiHandler(token);

    if (isError) {
      return;
    }

    const data: Wallet[] = res.data;
    setBalance(data[0].balance);
  };

  const openAddCardAlertHandler = () => {
    addCardAlertRef.current?.open();
    alertCtx.open();
  };

  const closeAddCardAlertHandler = () => {
    addCardAlertRef.current?.close();
    alertCtx.close();
  };

  const openAddInventoryAlertHandler = () => {
    addInventoryAlertRef.current?.expand();
    alertCtx.open();
  };

  const closeAddInventoryAlertHandler = () => {
    addInventoryAlertRef.current?.close();
    alertCtx.close();
  };

  const balanceRef = useRef();
  const historyRef = useRef();
  const addAccountRef = useRef();
  const addInventroyRef = useRef();

  const hasUserSeenTour = async () => {
    const res = await _storageService.get(HAS_USER_SEEN_WALLET_TOUR);
    return res ? true : false;
  };

  const _userSeenTourHandler = async () => {
    await _storageService.set(
      HAS_USER_SEEN_WALLET_TOUR,
      HAS_USER_SEEN_WALLET_TOUR
    );
  };

  const setupTour = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (
      balanceRef?.current &&
      historyRef?.current &&
      addAccountRef?.current &&
      addInventroyRef?.current
    ) {
      setTimeout(() => {
        const composer = new CoachmarkComposer([
          balanceRef,
          historyRef,
          addAccountRef,
          addInventroyRef,
        ]);
        composer.show().then(async () => {
          await _userSeenTourHandler();
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setupTour();
    }
  }, [balanceRef, historyRef, addAccountRef, addInventroyRef]);

  return (
    <>
      <ScreenGradient>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <Box>
            <PaddingContainer>
              <Box
                width={Math.floor(WINDOW_WIDTH) - 48}
                marginTop={40}
                height={56}
                borderRadius={16}
                alignItems="center"
                justifyContent="center"
                additionalStyles={{
                  overflow: "hidden",
                }}
              >
                <>
                  <Image
                    source={{
                      uri: INVENTORY_BOX_PNG,
                    }}
                    style={{
                      width: "100%",
                      height: 56,
                      position: "absolute",
                      top: 0,
                    }}
                    resizeMode="stretch"
                  />
                  <Box
                    width="100%"
                    height={56}
                    paddingLeft={16}
                    paddingRight={16}
                    direction="row"
                    alignItems="center"
                  >
                    <Box
                      width={80}
                      height={32}
                      direction="row"
                      alignItems="center"
                      additionalStyles={{
                        borderRightWidth: 1,
                        borderRightColor: theme.color.light.TEXT,
                      }}
                    >
                      <Text
                        color={theme.color.light.TEXT}
                        lineHeight={16}
                        fontSize={14}
                        fontWeight={400}
                      >
                        Inventory
                      </Text>
                    </Box>
                    <Box
                      flex={1}
                      marginLeft={16}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <CoachmarkWrapper
                        allowBackgroundInteractions={false}
                        ref={balanceRef}
                        message={INVENTORY_GUIDE}
                      >
                        <Text
                          color={theme.color.light.WHITE}
                          fontSize={16}
                          fontWeight={600}
                        >
                          {balence}
                        </Text>
                      </CoachmarkWrapper>

                      <CoachmarkWrapper
                        ref={historyRef}
                        allowBackgroundInteractions={false}
                        message={HISTORY_GUIDE}
                      >
                        <TouchableOpacity
                          onPress={redirectToHistoryHandler}
                          activeOpacity={1}
                        >
                          <Text
                            color={theme.color.light.PRIMARY}
                            fontSize={14}
                            fontWeight={400}
                          >
                            History
                          </Text>
                        </TouchableOpacity>
                      </CoachmarkWrapper>
                    </Box>
                  </Box>
                </>
              </Box>
            </PaddingContainer>
            <CardSlider />
            <Box>
              <Box
                direction="row"
                width={"100%"}
                justifyContent="center"
                position="relative"
              >
                <CoachmarkWrapper
                  allowBackgroundInteractions={false}
                  ref={addAccountRef}
                  message={ADD_CARD_GUIDE}
                >
                  <Box width={230} paddingTop={30}>
                    <Button
                      varient="flat"
                      text="Add account"
                      onpressHandler={openAddCardAlertHandler}
                      icon={<ICON_ADD width={16} height={16} />}
                      size="lg"
                    />
                  </Box>
                </CoachmarkWrapper>
              </Box>
            </Box>
            <Box>
              <CoachmarkWrapper
                allowBackgroundInteractions={false}
                ref={addInventroyRef}
                message={ADD_INVENTORY_GUIDE}
              >
                <Box
                  direction="row"
                  width={"100%"}
                  justifyContent="center"
                  position="relative"
                >
                  <Box width={"90%"} paddingTop={30}>
                    <Button
                      varient="flat"
                      text="Add inventory"
                      onpressHandler={openAddInventoryAlertHandler}
                      icon={<ICON_ADD width={16} height={16} />}
                      size="lg"
                    />
                  </Box>
                </Box>
              </CoachmarkWrapper>
            </Box>
          </Box>
          <Spacer />
        </ScrollView>
      </ScreenGradient>

      <ModalBottomSheet
        ref={addInventoryAlertRef}
        height={WINDOW_WIDTH < 370 ? 400 : 300}
        snapPoints={WINDOW_WIDTH < 370 ? ["40"] : ["30"]}
      >
        <Box width={"100%"} flex={1} position="absolute" zIndex={100}>
          <AddInventory
            closeAddInventoryAlertHandler={closeAddInventoryAlertHandler}
          />
        </Box>
      </ModalBottomSheet>
      <ModalBottomSheet
        ref={addCardAlertRef}
        height={WINDOW_WIDTH < 370 ? 500 : 400}
        snapPoints={WINDOW_WIDTH < 370 ? ["50"] : ["38"]}
      >
        <Box width={"100%"} flex={1} position="absolute" zIndex={100}>
          <AddCard closeAddCardAlertHandler={closeAddCardAlertHandler} />
        </Box>
      </ModalBottomSheet>
      <ConfirmAlert ref={confirmAlertRef} />
    </>
  );
}