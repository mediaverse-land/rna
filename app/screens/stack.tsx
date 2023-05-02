import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreStack } from './explore';

const Tab = createBottomTabNavigator();

export function AppStack() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen name="Explore" component={ExploreStack} />
        </Tab.Navigator>
    );
}
