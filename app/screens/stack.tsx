import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreStack } from './explore';
import { CreateContentStack } from './create-content';
import { BottomTabBar } from '../shared/components/bottom-tab-bar';

const Tab = createBottomTabNavigator();

export function AppStack() {
    return (
        // <BottomTabBar />
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBar={(props) => <BottomTabBar {...props} />}
        >
            <Tab.Screen
                name="Explore"
                component={ExploreStack}
                options={{
                    title: 'explore'
                }}
            />
            <Tab.Screen
                name="Apps"
                component={CreateContentStack}
                options={{
                    title: 'apps'
                }}
            />
            <Tab.Screen
                name="CreateContent"
                component={CreateContentStack}
                options={{
                    title: 'createContent'
                }}
            />
            <Tab.Screen
                name="Wallet"
                component={CreateContentStack}
                options={{
                    title: 'wallet'
                }}
            />
            <Tab.Screen
                name="Profile"
                component={CreateContentStack}
                options={{
                    title: 'profile'
                }}
            />
        </Tab.Navigator>
    );
}
