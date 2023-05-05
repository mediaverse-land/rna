import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStack } from './app/screens/stack';
import { SingleImagePage } from './app/screens/single-image';
import { SingleTextPage } from './app/screens/single-text';
import { SingleSoundPage } from './app/screens/single-sound';
import { SearchPage } from './app/screens/search';

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
                    name="SingleImageStack"
                    component={SingleImagePage}
                />
                <Stack.Screen
                    name="SingleTextStack"
                    component={SingleTextPage}
                />
                <Stack.Screen
                    name="SingleSoundStack"
                    component={SingleSoundPage}
                />
                <Stack.Screen name="Search" component={SearchPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
