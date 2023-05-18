import { View } from 'react-native';
import { ImagesPages } from './pages/images';
import { VideosPage } from './pages/videos';
import { SoundsPage } from './pages/sounds';
import { TextsPage } from './pages/text';
import { AllPage } from './pages/all';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBar from '../../shared/components/top-tab-bar';

const Tab = createMaterialTopTabNavigator();

export function Navigator() {
    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Tab.Navigator
                tabBar={(props) => <TopTabBar {...props} />}
            >
                <Tab.Screen
                    name="AllPage"
                    component={AllPage}
                    options={{
                        title: 'All'
                    }}
                />
                <Tab.Screen
                    name="ImagesPages"
                    component={ImagesPages}
                    options={{
                        title: 'image'
                    }}
                />
                <Tab.Screen
                    name="VideosPage"
                    component={VideosPage}
                    options={{
                        title: 'video'
                    }}
                />
                <Tab.Screen
                    name="SoundsPage"
                    component={SoundsPage}
                    options={{
                        title: 'sound'
                    }}
                />
                <Tab.Screen
                    name="TextsPage"
                    component={TextsPage}
                    options={{
                        title: 'text'
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}
