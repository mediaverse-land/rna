import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImagesPages } from './pages/images';
import { VideosPage } from './pages/videos';
import { SoundsPage } from './pages/sounds';
import { TextsPage } from './pages/text';
import { AllPage } from './pages/all';

const Stack = createStackNavigator();

export function Navigator() {
    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="AllPage" component={AllPage} />
                <Stack.Screen
                    name="ImagesPages"
                    component={ImagesPages}
                    options={{
                        title: 'image'
                    }}
                />
                <Stack.Screen
                    name="VideosPage"
                    component={VideosPage}
                    options={{
                        title: 'video'
                    }}
                />
                <Stack.Screen
                    name="SoundsPage"
                    component={SoundsPage}
                    options={{
                        title: 'sound'
                    }}
                />
                <Stack.Screen
                    name="TextsPage"
                    component={TextsPage}
                    options={{
                        title: 'text'
                    }}
                />
            </Stack.Navigator>
        </View>
    );
}
