import { FC, useContext, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
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
import {
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
    WALLET_STACK
} from './app/constaints/consts';
import { SingleLiveScreen } from './app/screens/single/live';
import { PlusScreen } from './app/screens/plus';
import { AppStack } from './app/screens/stack';
import { EditScreen } from './app/screens/edit';

type Route = { id: number; name: string; component: FC| any };

const Stack = createStackNavigator();

const authRoute: Route = {
    id: 1,
    name: AUTH_SCREEN,
    component: AuthScreen
};

const appRoutes: Route[] = [
    {
        id: 1,
        name: APP_STACK,
        component: AppStack
    },
    {
        id: 31,
        name: 'Plus',
        component: PlusScreen
    },
    {
        id: 2,
        name: SEARCH_STACK,
        component: SearchPage
    },
    {
        id: 3,
        name: SETTINGS_STACK,
        component: SettingsStack
    },
    {
        id: 4,
        name: SINGLE_VIDEO_SCREEN,
        component: SingleVideoScreen
    },
    {
        id: 5,
        name: SINGLE_IMAGE_SCREEN,
        component: SingleImageScreen
        // component: EditScreen
    },
    {
        id: 6,
        name: SINGLE_SOUND_SCREEN,
        component: SingleSoundScreen
    },
    {
        id: 7,
        name: SINGLE_TEXT_SCREEN,
        component: SingleTextScreen
    },
    {
        id: 8,
        name: PAYMENT_STACK,
        component: PaymentScreen
    },
    {
        id: 10,
        name: WALLET_STACK,
        component: WalletScreen
    },
    {
        id: 11,
        name: SINGLE_LIVE_SCREEN,
        component: SingleLiveScreen
    },
    // Edits
    {
        id: 12,
        name: EDIT_SCREEN,
        component: EditScreen
    },
];

export function RootNavigator() {

    // useTourGuide();

    const [isUserAuthenticated, setIsUserAuthenticated] = useState<
        boolean | string
    >('__false__');

    const [isLoading, setIsLoading] = useState(true);

    const tokenCtx = useContext(tokenContext);
    const getToken = tokenCtx.getToken();

    useEffect(() => {
        getTokenHandler();
    }, [getToken]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const getTokenHandler = async () => {
        const tk = await tokenCtx.getToken();

        if (typeof tk === 'string') {
            setIsUserAuthenticated(true);
        } else setIsUserAuthenticated(false);
    };

    return (
        <NavigationContainer>
            {isLoading ? (
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar
                        backgroundColor={'#030340'}
                        barStyle="light-content"
                    />
                    <LinearGradient
                        colors={['#030340', '#030340']}
                        start={{ x: 0.7, y: 0 }}
                        style={{ flex: 1 }}
                    >
                        <FullScreenSpinnerLoader />
                    </LinearGradient>
                </SafeAreaView>
            ) : isUserAuthenticated === 'boolean' ||
                isUserAuthenticated === false ? (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyleInterpolator: fadeTransition,
                    }}
                >
                    <Stack.Screen
                        name={authRoute.name}
                        component={authRoute.component}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyleInterpolator: fadeTransition
                    }}
                >
                    {appRoutes.map((route) => (
                        <Stack.Screen
                            key={route.id}
                            name={route.name}
                            component={route.component}
                        />
                    ))}
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
