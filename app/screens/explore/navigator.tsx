import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBar from '../../shared/components/top-tab-bar';
import { ImagesPages } from './pages/images';
import { VideosPage } from './pages/videos';
import { SoundsPage } from './pages/sounds';
import { TextsPage } from './pages/text';
import { AllPage } from './pages/all';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


export function Navigator() {
    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="all" component={AllPage} />
                <Stack.Screen name="image" component={ImagesPages} />
                <Stack.Screen
                    name="video"
                    component={VideosPage}
                    options={{
                        title: 'video'
                    }}
                />
                <Stack.Screen
                    name="sound"
                    component={SoundsPage}
                    options={{
                        title: 'sound'
                    }}
                />
                <Stack.Screen
                    name="text"
                    component={TextsPage}
                    options={{
                        title: 'text'
                    }}
                />
            </Stack.Navigator>
        </View>
    );
}
