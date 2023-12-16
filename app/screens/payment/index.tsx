import { useState, useContext, useEffect } from 'react';
import { Linking, ScrollView, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../components/screen-gradient';
import { Box } from '../../components/box';
import { PaymentSuccess } from './payment-success';
import { PaymentContentHeader } from './components/header';
import { HowToPayList } from './components/how-to-pay-list';
import { FocusedStatusBar } from '../../components/focused-statusbar';
import { tokenContext } from '../../context/token';
import { buyAssetApiHandler } from './service';
import { Button } from '../../components/button';
import { PaddingContainer } from '../../styles/grid';
import {
  useCheckStripeAccountBalanceQuery,
  useConnectToStripeMutation,
} from '../../services/payment.service';
import { retriveToken } from '../../utils/retrive-token';
import { tokenStringResolver } from '../../utils/token-string-resolver';

export function PaymentScreen({ navigation, route }: any) {
  const [isPayed, setIsPayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState('');

  const { price, assetId, title, thumbnail } = route.params;

  // const userCtx = useContext(userContext);
  const tokenCtx = useContext(tokenContext);

  const { data,  isError } = useCheckStripeAccountBalanceQuery(
    { token },
    {
      skip: !token ? true : false,
    },
  );

  const [_connectHandler] = useConnectToStripeMutation();

  const createStripeAccount = async () => {
    const response = await _connectHandler({ token });
    if (response?.data?.url) {
      Linking.openURL(response?.data?.url);
    }
  };

  useEffect(() => {
    if (isError) {
      createStripeAccount();
    }
  }, [isError]);

  const balance = data?.available?.[0]?.amount?.toString();

  useEffect(() => {
    const getToken = async () => {
      const _token = await retriveToken(tokenCtx);
      setToken(_token);
    };

    getToken();
  }, []);

  // const connectStripeAccount = async () => {

  //   const response = await _connectHandler({ token });
  //   if (response?.data) {
  //     Linking.openURL(response?.data?.url);
  //   }
  // };

  // const checkStripeAccount = async () => {
  //   // /stripe/balance
  // };

  // const userData = userCtx.getUser();

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

    const { isSuccess, errorRes } = await buyAssetApiHandler(token, assetId);

    if (errorRes) {
      const message = errorRes?.message || 'Failed';
      ToastAndroid.show(message, ToastAndroid.LONG);
      setIsLoading(() => false);
    }

    if (isSuccess) {
      setIsPayed(true);
    }
    setIsLoading(() => false);
  };

  // const wallet = (userData && userData?.wallets && userData?.wallets[0]) || 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <ScreenGradient>
        <ScrollView style={{ width: '100%' }}>
          <Box width="100%">
            {!isPayed ? (
              <>
                <PaymentContentHeader
                  goBackHandler={goBackHandler}
                  thumbnail={thumbnail}
                  title={title}
                  price={price}
                />
                <HowToPayList userBalance={balance} />
                {/* {!isError ? 
                <Box direction="row" alignItems="center" marginTop={24} paddingLeft={24}>
                  <Text color="red">Please create an stripe account.</Text>
                  <TouchableOpacity style={{
                    marginLeft: 8
                  }}>
                    <Text color="#fff">Click here</Text>
                  </TouchableOpacity>
                </Box>
                : null} */}
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
