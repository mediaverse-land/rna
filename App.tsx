import 'react-native-gesture-handler';
import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStack } from './app/screens/stack';
import { SearchPage } from './app/screens/search';

const Stack = createStackNavigator();

const routes: { id: number; name: string; component: FC }[] = [
    {
        id: 1,
        name: 'AppStack',
        component: AppStack
    },
    {
        id: 5,
        name: 'Search',
        component: SearchPage
    }
];

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
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
