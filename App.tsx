import 'react-native-gesture-handler';
import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStack } from './app/screens/stack';
import { SearchPage } from './app/screens/search';
import { SettingsStack } from './app/screens/settings/stack-navigator';
import { SingleVideoScreen } from './app/screens/single/video';

const Stack = createNativeStackNavigator();

const routes: { id: number; name: string; component: FC }[] = [
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
        name: 'SingleVideoHeader',
        component: SingleVideoScreen
    }
];

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'fade_from_bottom'
                }}
            >
                {routes.map((route) => (
                    <Stack.Screen
                        key={route.id}
                        name={route.name}
                        component={route.component}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
