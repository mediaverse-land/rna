import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreStack } from './explore';
import { BottomTabBar } from '../shared/components/bottom-tab-bar';
import { AppsStack } from './apps';
import { ProfileScreen } from './profile';

type RoutesType = {
    Explore: undefined;
    Apps: undefined;
    CreateContent: undefined;
    Wallet: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<RoutesType>();

const routes = [
    {
        id: 1,
        name: 'Explore',
        component: ExploreStack,
        title: 'explore'
    },
    {
        id: 2,
        name: 'Apps',
        component: AppsStack,
        title: 'apps'
    },
    {
        id: 3,
        name: 'CreateContent',
        component: ExploreStack,
        title: 'createContent'
    },
    {
        id: 4,
        name: 'Wallet',
        component: ExploreStack,
        title: 'wallet'
    },
    {
        id: 5,
        name: 'Profile',
        component: ProfileScreen,
        title: 'profile'
    }
];

export function AppStack() {
    return (
        <Tab.Navigator
            tabBar={(props) => <BottomTabBar {...props} />}
            screenOptions={{
                headerShown: false
            }}
        >
            {routes.map((route: any) => (
                <Tab.Screen
                    key={route.id}
                    name={route.name}
                    component={route.component}
                    options={{
                        title: route.title
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}
