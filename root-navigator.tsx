import { FC, useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './app/screens/stack';
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
import { RootService } from './app/shared/services/root.service';

type Route = { id: number; name: string; component: FC };

const Stack = createStackNavigator();

const authRoute: Route = {
    id: 1,
    name: 'AuthScreen',
    component: AuthScreen
}

const appRoutes: Route[] = [
    {
        id: 1,
        name: 'AppStack',
        component: AppStack
    },
    {
        id: 2,
        name: 'Search',
        component: SearchPage
    },
    {
        id: 3,
        name: 'Settings',
        component: SettingsStack
    },
    {
        id: 4,
        name: 'SingleVideoScreen',
        component: SingleVideoScreen
    },
    {
        id: 5,
        name: 'SingleImageScreen',
        component: SingleImageScreen
    },
    {
        id: 6,
        name: 'SingleSoundScreen',
        component: SingleSoundScreen
    },
    {
        id: 7,
        name: 'SingleTextScreen',
        component: SingleTextScreen
    },
    {
        id: 8,
        name: 'PaymentScreen',
        component: PaymentScreen
    },
    {
        id: 10,
        name: 'WalletScreen',
        component: WalletScreen
    }
];

const _rootService = new RootService();

export function RootNavigator() {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | string>('__false__');
    const tokenCtx = useContext(tokenContext);
    const getToken = tokenCtx.getToken();

    useEffect(() => {
        getTokenHandler();
    }, [tokenCtx, getToken]);

    const getTokenHandler = async () => {
        const tk = await tokenCtx.getToken();

        if (typeof tk === 'string') {
            setIsUserAuthenticated(true);
            getUserData(tk)
        }
        else
            setIsUserAuthenticated(false)
    }

    const getUserData = async (token) => {
        if (!token) {
            return;
        }

        const newToken = token.slice(1, token.length - 1)

        const {
            isError,
            isSuccess,
            res,
        } = await _rootService.getUserData(token.charAt(0) === '"' ? newToken : token);

        if (isError || !isSuccess) {
            return;
        }
        tokenCtx.setUser(res.data);
    }

    return (
        <NavigationContainer>
            {
                typeof isUserAuthenticated !== 'boolean' || !isUserAuthenticated ?
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            cardStyleInterpolator: fadeTransition
                        }}
                    >
                        <Stack.Screen
                            name={authRoute.name}
                            component={authRoute.component}
                        />
                    </Stack.Navigator>
                    :
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
            }
        </NavigationContainer >
    )
}
