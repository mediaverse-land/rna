import { useContext, useRef, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { ScreenGradient } from "../../components/screen-gradient";
import { CardSlider } from "./components/card-slider";
import { Box } from "../../components/box";
import { ConfirmAlert } from "../../components/confirm-alert";
import { alertContext } from "../../context/alert";
import { ModalBottomSheet } from "../../components/bottom-sheet-modal";
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
import { HAS_USER_SEEN_WALLET_TOUR } from "../../constaints/consts";
import {
  useChargeStripeMutation,
  useCheckStripeAccountBalanceQuery,
  useCheckStripeAccountQuery,
  useConnectToStripeMutation,
} from "../../services/payment.service";
import {
  FullScreenSpinnerLoader,
  LoadingSpinner,
} from "../../components/loader-spinner";

const { width: WINDOW_WIDTH, height } = windowSize();

const CoachmarkWrapper: any = Coachmark;

const HISTORY_GUIDE =
  "You can spend money in Mediaverse and of course , you will earn money, the history of your transactions will always be available in history !";
const INVENTORY_GUIDE = "See your inventory in the list!";
const ADD_CARD_GUIDE = "Specify a bank account for payment";
const ADD_INVENTORY_GUIDE =
  "Enter the amount and increase your account balance by withdrawing from the account";

const _storageService = new StorageService();

export function WalletSlider() {
  const [_token, setToken] = useState("");

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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await tokenCtx.getToken();
    if (token === null) {
      return;
    }

    const formattedToken = tokenStringResolver(token);
    setToken(formattedToken);
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
      addAccountRef?.current
      // &&
      // addInventroyRef?.current
    ) {
      setTimeout(() => {
        const composer = new CoachmarkComposer([
          balanceRef,
          historyRef,
          addAccountRef,
          // addInventroyRef,
        ]);
        composer.show().then(async () => {
          await _userSeenTourHandler();
        });
      }, 3000);
    }
  };

  const { data, isError, error } = useCheckStripeAccountBalanceQuery(
    {
      token: _token,
    },
    {
      skip: !_token ? true : false,
    }
  );

  const {
    data: stripeData,
    isLoading,
    isFetching,
  } = useCheckStripeAccountQuery(
    {
      token: _token,
    },
    {
      skip: !_token ? true : false,
    }
  );

  const [
    _connectHandler,
    { isLoading: isAddingLoading, isFetching: isAddingFetching },
  ] = useConnectToStripeMutation();

  const [
    _chargeHandler,
    { isLoading: isChargeLoading, isFetching: isChargeFetching },
  ] = useChargeStripeMutation();

  const balance = data?.available?.[0]?.amount?.toString();

  useEffect(() => {
    if (isFocused) {
      setupTour();
    }
  }, [balanceRef, historyRef, addAccountRef]);

  const addCardPressHandler = async () => {
    const response = await _chargeHandler({ token: _token });
    if (response?.data?.url) {
      Linking.openURL(response?.data?.url);
    }
  };

  const createAccountHandler = async () => {
    const response = await _connectHandler({ token: _token });
    if (response?.data?.url) {
      Linking.openURL(response?.data?.url);
    }
  };

  const redirectToAccountsPage = async () => {
    const response = await _connectHandler({ token: _token });
    if (response?.data?.url) {
      Linking.openURL(response?.data?.url);
    }
  };

  return (
    <>
      <ScreenGradient>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          {isLoading || isFetching ? (
            <FullScreenSpinnerLoader />
          ) : (
            <>
              {stripeData ? (
                <>
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
                                  {balance}
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
                              text="Add inventory"
                              onpressHandler={openAddCardAlertHandler}
                              icon={<ICON_ADD width={16} height={16} />}
                              size="lg"
                            />
                          </Box>
                        </CoachmarkWrapper>
                      </Box>
                    </Box>
                  </Box>
                  <Spacer />
                </>
              ) : (
                <Box
                  position="relative"
                  marginTop={height / 2 - 50}
                  width="100%"
                  // direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="#fff">Please create an stripe account</Text>
                  <TouchableOpacity onPress={redirectToAccountsPage}>
                    {isAddingLoading || isAddingFetching ? (
                      <LoadingSpinner />
                    ) : (
                      <Text color="#eee">Click here</Text>
                    )}
                  </TouchableOpacity>
                </Box>
              )}
            </>
          )}
        </ScrollView>
      </ScreenGradient>
      <ModalBottomSheet
        ref={addCardAlertRef}
        height={WINDOW_WIDTH < 370 ? 500 : 400}
        snapPoints={WINDOW_WIDTH < 370 ? ["50"] : ["38"]}
      >
        <Box width={"100%"} flex={1} position="absolute" zIndex={100}>
          <AddCard
            isLoading={isAddingFetching || isAddingLoading}
            closeAddCardAlertHandler={closeAddCardAlertHandler}
            addCardPressHandler={createAccountHandler}
          />
        </Box>
      </ModalBottomSheet>
      <ConfirmAlert ref={confirmAlertRef} />
    </>
  );
}
