/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useContext, useEffect, useState } from 'react';
// import { SafeAreaView } from "react-native";
// import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SearchPage } from './app/screens/search';
import { SettingsStack } from './app/screens/settings/stack-navigator';
import { SingleVideoScreen } from './app/screens/single/video';
import { SingleImageScreen } from './app/screens/single/image';
import { SingleSoundScreen } from './app/screens/single/sound';
import { SingleTextScreen } from './app/screens/single/text';
import { PaymentScreen } from './app/screens/payment';
import { AuthScreen } from './app/screens/auth';
import { WalletScreen } from './app/screens/wallet';
import { tokenContext } from './app/context/token';
import { fadeTransition } from './app/utils/fade-transition';
import { FullScreenSpinnerLoader } from './app/components/loader-spinner';
import { LinearGradient } from 'expo-linear-gradient';
import { SingleLiveScreen } from './app/screens/single/live';
import { PlusScreen } from './app/screens/plus';
import { AppStack } from './app/screens/stack';
import { EditScreen } from './app/screens/edit';

import AccountsScreen from './app/screens/accounts';
// import { userContext } from "./app/context/user";
// import axios from "axios";
// import { Toaster } from "./app/utils/toaster";
// import { PushNotificationPermissionAlert } from "./app/components/push-notification-permission-alert";
import { useSetFirebasePushNotificationAccountMutation } from './app/services/auth.service';
// import PushNotificationWrapper from "./app/components/push-notification-wrapper";
import { tokenStringResolver } from './app/utils/token-string-resolver';
// import { PushNotificationPermissionAlert } from "./app/components/push-notification-permission-alert";
import { CustomSafeArea } from './app/components/custom-safe-area';
import { rightToLeftScreenAnimation } from './app/UI/animations';
import {
  ACCOUNTS_SCREEN,
  APP_STACK,
  AUTH_SCREEN,
  EDIT_SCREEN,
  PAYMENT_STACK,
  SEARCH_STACK,
  SETTINGS_STACK,
  SINGLE_IMAGE_SCREEN,
  SINGLE_LIVE_SCREEN,
  SINGLE_SOUND_SCREEN,
  SINGLE_TEXT_SCREEN,
  SINGLE_VIDEO_SCREEN,
  WALLET_STACK,
} from './app/constaints/consts';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type Route = { id: number; name: string; component: FC | any; options?: any };

const Stack = createNativeStackNavigator();

const authRoute: Route = {
  id: 1,
  name: AUTH_SCREEN,
  component: AuthScreen,
};

const appRoutes: Route[] = [
  {
    id: 1,
    name: APP_STACK,
    component: AppStack,
  },
  {
    id: 31,
    name: 'Plus',
    component: PlusScreen,
  },
  {
    id: 2,
    name: SEARCH_STACK,
    component: SearchPage,
  },
  {
    id: 3,
    name: SETTINGS_STACK,
    component: SettingsStack,
  },
  {
    id: 4,
    name: SINGLE_VIDEO_SCREEN,
    component: SingleVideoScreen,
    options: rightToLeftScreenAnimation,
  },
  {
    id: 5,
    name: SINGLE_IMAGE_SCREEN,
    component: SingleImageScreen,
    options: rightToLeftScreenAnimation,
    // component: EditScreen
  },
  {
    id: 6,
    name: SINGLE_SOUND_SCREEN,
    component: SingleSoundScreen,
    options: rightToLeftScreenAnimation,
  },
  {
    id: 7,
    name: SINGLE_TEXT_SCREEN,
    component: SingleTextScreen,
    options: rightToLeftScreenAnimation,
  },
  {
    id: 8,
    name: PAYMENT_STACK,
    component: PaymentScreen,
  },
  {
    id: 10,
    name: WALLET_STACK,
    component: WalletScreen,
  },
  {
    id: 11,
    name: SINGLE_LIVE_SCREEN,
    component: SingleLiveScreen,
    options: rightToLeftScreenAnimation,
  },
  // Edits
  {
    id: 12,
    name: EDIT_SCREEN,
    component: EditScreen,
  },
  {
    id: 13,
    name: ACCOUNTS_SCREEN,
    component: AccountsScreen,
  },
];

// const deliverNotificationTokenToApi = async (
//   token: string,
//   userToken: string
// ) => {
//   try {
//     await axios.post(
//       `${process.env.EXPO_APPBASE_URL}/push-notifications/firebase-tokens`,
//       { token },
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           "X-App": "_Android",
//         },
//       }
//     );
//     // console.log(result);
//   } catch (err: any) {
//     // console.log(err?.response);
//   }
// };

type Props = {
  firebaseToken: string;
};

// const _toaster = new Toaster();

export function RootNavigator({ firebaseToken }: Props) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | string>('__false__');

  const [userToken, setUserToken] = useState<string>('');

  const [isLoading, setIsLoading] = useState(true);

  const [_setAccountHandler] = useSetFirebasePushNotificationAccountMutation();

  const tokenCtx = useContext(tokenContext);
  // const userCtx: any = useContext(userContext);
  const getToken: any = tokenCtx.getToken();

  useEffect(() => {
    getTokenHandler();
  }, [getToken]);

  useEffect(() => {
    registerFirebaseToken();
  }, [firebaseToken, userToken]);

  const registerFirebaseToken = async () => {
    if (!firebaseToken || !userToken) {
      return;
    }

    const _token = tokenStringResolver(userToken);

    const requestBody = { token: firebaseToken };

    await _setAccountHandler({
      body: requestBody,
      token: _token,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const getTokenHandler = async () => {
    const tk = await tokenCtx.getToken();

    if (typeof tk === 'string') {
      setUserToken(tk);
      setIsUserAuthenticated(true);
    } else setIsUserAuthenticated(false);
  };

  // const saveDeviceFirebasePushNotificationToken = async () => {
  //   if (!firebaseToken) {
  //     _toaster.show("NO FIREBASE TOKEN FOR THIS DEVICE");
  //   }

  //   const userData = await userCtx.getUser();
  //   const tk: any = await tokenCtx.getToken();
  //   if (!userData || !tk) {
  //     return;
  //   }

  //   const { id } = userData;
  //   const token: string = tk;

  //   await deliverNotificationTokenToApi(firebaseToken, token);
  // };

  // const isAuth = isUserAuthenticated === true;

  return (
    <>
      <NavigationContainer>
        {/* <PushNotificationPermissionAlert isAuth={isAuth} /> */}
        {isLoading ? (
          <CustomSafeArea style={{ flex: 1 }}>
            <LinearGradient
              colors={['#030340', '#030340']}
              start={{ x: 0.7, y: 0 }}
              style={{ flex: 1 }}
            >
              <FullScreenSpinnerLoader />
            </LinearGradient>
          </CustomSafeArea>
        ) : isUserAuthenticated === 'boolean' || isUserAuthenticated === false ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              //@ts-ignore
              cardStyleInterpolator: fadeTransition,
            }}
          >
            <Stack.Screen name={authRoute.name} component={authRoute.component} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              //@ts-ignore
              cardStyleInterpolator: fadeTransition,
            }}
          >
            {appRoutes.map((route) => (
              <Stack.Screen
                key={route.id}
                name={route.name}
                component={route.component}
                options={route.options}
              />
            ))}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
