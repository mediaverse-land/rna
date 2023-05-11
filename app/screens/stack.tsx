import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreStack } from './explore';
import { CreateContentStack } from './create-content';
import { BottomTabBar } from '../shared/components/bottom-tab-bar';

const Tab = createBottomTabNavigator();

export function AppStack() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
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
                name="CreateContent"
                component={CreateContentStack}
                options={{
                    title: 'createContent'
                }}
            />
            <Tab.Screen
                name="Plus"
                component={CreateContentStack}
                options={{
                    title: 'plus'
                }}
            />
            <Tab.Screen
                name="Profile"
                component={CreateContentStack}
                options={{
                    title: 'profile'
                }}
            />
            <Tab.Screen
                name="Profiles"
                component={CreateContentStack}
                options={{
                    title: 'profile'
                }}
            />
        </Tab.Navigator>
    );
}
