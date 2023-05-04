import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStack } from './app/screens/stack';
import { SingleVideoPage } from './app/screens/single-video';
import { SingleImagePage } from './app/screens/single-image';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="AppStack" component={AppStack} />
                <Stack.Screen
                    name="SingleVideoStack"
                    component={SingleVideoPage}
                />
                <Stack.Screen
                    name="SingleImageStack"
                    component={SingleImagePage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
