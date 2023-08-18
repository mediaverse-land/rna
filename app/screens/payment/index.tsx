import { useState, useContext, useEffect } from "react";
import { ScrollView, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenGradient } from "../../components/screen-gradient";
import { Box } from "../../components/box";
import { PaymentSuccess } from "./payment-success";
import { PaymentContentHeader } from "./components/header";
import { HowToPayList } from "./components/how-to-pay-list";
import { FocusedStatusBar } from "../../components/focused-statusbar";
import { userContext } from "../../context/user";
import { tokenContext } from "../../context/token";
import { tokenStringResolver } from "../../utils/token-string-resolver";
import { buyAssetApiHandler } from "./service";
import { Button } from "../../components/button";
import { PaddingContainer } from "../../styles/grid";

export function PaymentScreen({ navigation, route }: any) {
  const [isPayed, setIsPayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { price, assetId, title, thumbnail } = route.params;

  const userCtx = useContext(userContext);
  const tokenCtx = useContext(tokenContext);

  const userData = userCtx.getUser();

  const goBackHandler = () => {
    navigation.goBack();
  };

  const setPayHandler = async () => {
    setIsLoading(true);
    const token = await tokenCtx.getToken();

    if (token === null) {
      setIsLoading(false);

      return;
    }

    const formattedToken = tokenStringResolver(token);
    await butAsset(formattedToken);
    if (isPayed) {
      setIsLoading(true);
    }
  };

  const butAsset = async (token: string) => {
    if (!assetId) {
      return;
    }

    const { isError, isSuccess, res, errorRes } = await buyAssetApiHandler(
      token,
      assetId
    );

    if (errorRes) {
      const message = errorRes?.message || "Failed";
      ToastAndroid.show(message, ToastAndroid.LONG);
      setIsLoading(() => false);
    }

    if (isSuccess) {
      setIsPayed(true);
    }
    setIsLoading(() => false);
  };

  console.log({ isLoading });

  const wallet = (userData && userData?.wallets && userData?.wallets[0]) || 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <ScreenGradient>
        <ScrollView style={{ width: "100%" }}>
          <Box width="100%">
            {!isPayed ? (
              <>
                <PaymentContentHeader
                  goBackHandler={goBackHandler}
                  thumbnail={thumbnail}
                  title={title}
                  price={price}
                />
                <HowToPayList userBalance={wallet?.balance || 0} />
              </>
            ) : (
              <PaymentSuccess />
            )}
          </Box>
        </ScrollView>
        {!isPayed ? (
          <Box width="100%" paddingBottom={10}>
            <PaddingContainer>
              <Button
                text="Buy"
                isLoading={isLoading}
                varient="primary"
                onpressHandler={setPayHandler}
                size="lg"
              />
            </PaddingContainer>
          </Box>
        ) : null}
      </ScreenGradient>
    </SafeAreaView>
  );
}
