import 'react-native-gesture-handler';
import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStack } from './app/screens/stack';
import { SearchPage } from './app/screens/search';
import { SettingsStack } from './app/screens/settings/stack-navigator';
import { SingleVideoScreen } from './app/screens/single/video';
import { SingleImageScreen } from './app/screens/single/image';
import { SingleSoundScreen } from './app/screens/single/sound';
import { SingleTextScreen } from './app/screens/single/text';
import { StatusBar } from 'react-native';
import { PaymentScreen } from './app/screens/payment';
import { AuthScreen } from './app/screens/auth';

const Stack = createNativeStackNavigator();

const routes: { id: number; name: string; component: FC }[] = [
    {
        id: 1,
        name: 'AuthScreen',
        component: AuthScreen
    }
    , {
        id: 9,
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

];

const isAuth = false

export default function App() {
    return (
        <>
            <StatusBar />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        animation: 'fade_from_bottom'
                    }}
                >
                    {
                        routes.map((route) => (
                            <Stack.Screen
                                key={route.id}
                                name={route.name}
                                component={route.component}
                            />
                        ))}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
