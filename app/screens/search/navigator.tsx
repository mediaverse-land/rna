import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBar from '../../shared/components/top-tab-bar';
import { ImagesPage } from './pages/image';
import { VideosPage } from './pages/video';
import { SoundsPage } from './pages/sound';
import { TextsPage } from './pages/text';
import { AllPage } from './pages/all';

const Tab = createMaterialTopTabNavigator();

export function Navigator() {
    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Tab.Navigator
                tabBar={(props) => <TopTabBar hasFullWidth {...props} />}
            >
                <Tab.Screen
                    name="AllPage"
                    component={AllPage}
                    options={{
                        title: 'All'
                    }}
                />
                <Tab.Screen
                    name="SearchImage"
                    component={ImagesPage}
                    options={{
                        title: 'image'
                    }}
                />
                <Tab.Screen
                    name="SearchVideo"
                    component={VideosPage}
                    options={{
                        title: 'video'
                    }}
                />
                <Tab.Screen
                    name="SearchSound"
                    component={SoundsPage}
                    options={{
                        title: 'sound'
                    }}
                />
                <Tab.Screen
                    name="SearchText"
                    component={TextsPage}
                    options={{
                        title: 'text'
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}
