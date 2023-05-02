import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBar from '../../shared/components/top-tab-bar';
import { ImagesPages } from './pages/images';
import { VideosPage } from './pages/videos';
import { SoundsPage } from './pages/sounds';
import { TextsPage } from './pages/text';

const Tab = createMaterialTopTabNavigator();

export function Navigator() {
    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Tab.Navigator tabBar={(props) => <TopTabBar {...props} />}>
                <Tab.Screen name="image" component={ImagesPages} />
                <Tab.Screen
                    name="video"
                    component={VideosPage}
                    options={{
                        title: 'video'
                    }}
                />
                <Tab.Screen
                    name="sound"
                    component={SoundsPage}
                    options={{
                        title: 'sound'
                    }}
                />
                <Tab.Screen
                    name="text"
                    component={TextsPage}
                    options={{
                        title: 'text'
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

