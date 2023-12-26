import { useState, useContext, useEffect } from 'react';
import { Linking, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { CustomSafeArea } from '../../components/custom-safe-area';
import { Spacer } from '../../components/spacer';
import { GoBackButton } from '../single/components/goback-button';
import { alertContext } from '../../context/alert';

export function PaymentScreen({ navigation, route }: any) {
  const [isPayed, setIsPayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { top } = useSafeAreaInsets();

  // console.log(navigation?.goBack())

  const [token, setToken] = useState('');

  const { price, assetId, title, thumbnail } = route.params;

  // const userCtx = useContext(userContext);
  const tokenCtx = useContext(tokenContext);
  const alertCtx = useContext(alertContext);

  const { data, isError } = useCheckStripeAccountBalanceQuery(
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

  const goBackHandler = () => {
    navigation?.goBack();
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
      alertCtx?.fire(message, 'warning')
      setIsLoading(() => false);
    }

    if (isSuccess) {
      setIsPayed(true);
    }
    setIsLoading(() => false);
  };

  return (
    <CustomSafeArea>
      <FocusedStatusBar />
      <ScreenGradient>
        <ScrollView style={{ width: '100%' }}>
          <Box paddingTop={top} width="100%">
            {!isPayed ? (
              <>
                <GoBackButton goBackHandler={goBackHandler} hasBackground={false} />
                <PaymentContentHeader
                  goBackHandler={goBackHandler}
                  thumbnail={thumbnail}
                  title={title}
                  price={price}
                />
                <HowToPayList userBalance={balance} />
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
              <Spacer margin={32} />
            </PaddingContainer>
          </Box>
        ) : null}
      </ScreenGradient>
    </CustomSafeArea>
  );
}
