import { createStackNavigator } from '@react-navigation/stack';
import { IndexMenu } from './pages/index-menu';

const Stack = createStackNavigator();

const routes = [
    {
        id: 1,
        title: 'Index Menu',
        component: IndexMenu,
        name: 'index Menu'
    },
    {
        id: 9,
        title: 'Account',
        component: IndexMenu,
        name: 'account'
    },
    {
        id: 2,
        title: 'Massage',
        component: IndexMenu,
        name: 'massage'
    },
    {
        id: 3,
        title: 'Wallet',
        component: IndexMenu,
        name: 'wallet'
    },
    {
        id: 4,
        title: 'Analytics',
        component: IndexMenu,
        name: 'analytics'
    },
    {
        id: 5,
        title: 'Share account',
        component: IndexMenu,
        name: 'share account'
    },
    {
        id: 6,
        title: 'General information',
        component: IndexMenu,
        name: 'general information'
    },
    {
        id: 7,
        title: 'Signins',
        component: IndexMenu,
        name: 'signins'
    },
    {
        id: 8,
        title: 'Seassions',
        component: IndexMenu,
        name: 'seassions'
    }
];


export function SettingsStack() {
    return (
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
    )
}