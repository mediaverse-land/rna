import { useEffect, useRef, useState } from "react";
import {
  ICON_MASTER_CARD,
  ICON_PAYPAL,
  ICON_WALLET_BLUE,
  ICON_WALLET_SVG,
} from "../../../constaints/icons";
import { theme } from "../../../constaints/theme";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { PaddingContainer } from "../../../styles/grid";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useIsFocused } from "@react-navigation/native";
import { StorageService } from "../../../services/storage.service";
import { HAS_USER_SEEN_PAYMENT_TOUR } from "../../../constaints/consts";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";

type Props = {
  userBalance: number;
};

const TOUR_TEXT =
  "You can buy your digital asset by paying from your wallet or credit card";

const _storageService = new StorageService();
const CoachmarkWrapper: any = Coachmark;

export function HowToPayList({ userBalance }: Props) {
  const paymentMethods = [
    {
      id: 1,
      icon: (
        <>
          <ICON_WALLET_BLUE
            style={{
              width: 20,
              height: 20,
            }}
          />
          <ICON_WALLET_SVG
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              top: 12,
              left: 10,
            }}
          />
        </>
      ),
      title: "Wallet",
      description: `Inventory: ${userBalance} $`,
    },
    {
      id: 2,
      icon: (
        <ICON_PAYPAL
          style={{
            width: 40,
            height: 40,
          }}
        />
      ),
      title: "PayPal",
      description: "Online pay",
    },
    {
      id: 3,
      icon: (
        <ICON_MASTER_CARD
          style={{
            width: 40,
            height: 40,
          }}
        />
      ),
      title: "MasterCard",
      description: "Online pay",
    },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    paymentMethods[0].title
  );

  const setSelectedPaymentMethodHandler = (title: string) => {
    setSelectedPaymentMethod(title);
  };

  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  // const res = await _storageService.get(HAS_USER_SEEN_PAYMENT_TOUR);

  const tourViewRef = useRef();

  /**
   * Checks if user has seen the tour before or not,
   * if has seen, return true else false
   * @returns {boolean}
   */
  const hasUserSeenTour = async () => {
    const hasUserSeen = await _storageService.get(HAS_USER_SEEN_PAYMENT_TOUR);
    return hasUserSeen ? true : false;
  };

  const setUserSeenTour = async () => {
    await _storageService.set(
      HAS_USER_SEEN_PAYMENT_TOUR,
      HAS_USER_SEEN_PAYMENT_TOUR
    );
  };

  const setupTour = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (tourViewRef?.current) {
      setTimeout(() => {
        const composer = new CoachmarkComposer([tourViewRef]);
        composer.show().then(async () => {
          await setUserSeenTour();
        });
      }, 2000);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setupTour();
    }
  }, [tourViewRef]);

  return (
    <PaddingContainer>
      <CoachmarkWrapper
        allowBackgroundInteractions={false}
        ref={tourViewRef}
        message={TOUR_TEXT}
        style={{
          with: "100%",
          height: 400,
        }}
      >
        <Box marginTop={32}>
          <Text
            color={theme.color.light.WHITE}
            fontWeight={600}
            fontSize={theme.numericFontSize.md}
            lineHeight={theme.numericLineHeight.md}
          >
            How to pay
          </Text>
          {isFocused ? (
            <Box>
              <>
                {paymentMethods.map((m) => (
                  <TouchableOpacity
                    key={m.id}
                    activeOpacity={1}
                    onPress={() => setSelectedPaymentMethodHandler(m.title)}
                  >
                    <Box marginTop={8} height={70}>
                      <Box
                        width="100%"
                        flex={1}
                        direction="row"
                        alignItems="center"
                        backgroundColor="#121246"
                        padding={16}
                        borderRadius={8}
                        additionalStyles={{
                          borderWidth: 1,
                          borderColor:
                            selectedPaymentMethod === m.title
                              ? theme.color.light.PRIMARY
                              : "transparent",
                        }}
                      >
                        <Box width={40} height={40}>
                          {m.icon}
                        </Box>
                        <Box
                          flex={1}
                          direction="row"
                          alignItems="center"
                          marginLeft={16}
                        >
                          <Box>
                            <Text
                              color={theme.color.light.WHITE}
                              fontWeight={600}
                              fontSize={theme.numericFontSize.md}
                              lineHeight={theme.numericLineHeight.md}
                            >
                              {m.title}
                            </Text>
                            <Text
                              color={theme.color.light.TEXT}
                              fontWeight={400}
                              fontSize={theme.numericFontSize.sm}
                              lineHeight={theme.numericLineHeight.md}
                              marginTop={4}
                            >
                              {m.description}
                            </Text>
                          </Box>
                          <Box
                            flex={1}
                            direction="row"
                            justifyContent="flex-end"
                          >
                            <Box
                              width={18}
                              height={18}
                              borderRadius={100}
                              additionalStyles={{
                                borderWidth: 1,
                                borderColor:
                                  selectedPaymentMethod !== m.title
                                    ? theme.color.light.SONG_CARD_TITLE_TEXT
                                    : "transparent",
                              }}
                              backgroundColor={
                                selectedPaymentMethod === m.title
                                  ? theme.color.light.PRIMARY
                                  : "transparent"
                              }
                            ></Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                ))}
              </>
            </Box>
          ) : null}
        </Box>
      </CoachmarkWrapper>
    </PaddingContainer>
  );
}
