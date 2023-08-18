import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ImagePage } from './pages/image';
import { VideosPage } from './pages/video';
import { SoundsPage } from './pages/sound';
import { TextsPage } from './pages/text';
import { AllPage } from './pages/all';
import { SearchParam } from '.';
import TopTabBar from '../../components/top-tab-bar';

type Props = { searchParams: SearchParam };

const Tab = createMaterialTopTabNavigator();

export function Navigator({ searchParams }: Props) {

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Tab.Navigator
                tabBar={(props) => <TopTabBar hasFullWidth {...props} />}
                screenOptions={{
                    animationEnabled: false,
                    swipeEnabled: false
                }}
            >
                <Tab.Screen
                    name="AllPage"
                    component={(props: any) => (
                        <AllPage searchParams={searchParams} {...props} />
                    )}
                    options={{
                        title: 'All'
                    }}
                />
                <Tab.Screen
                    name="SearchImage"
                    component={(props: any) => (
                        <ImagePage searchParams={searchParams} {...props} />
                    )}
                    options={{
                        title: 'image'
                    }}
                />
                <Tab.Screen
                    name="SearchVideo"
                    component={(props: any) => (
                        <VideosPage searchParams={searchParams} {...props} />
                    )}
                    options={{
                        title: 'video'
                    }}
                />
                <Tab.Screen
                    name="SearchSound"
                    component={(props: any) => (
                        <SoundsPage searchParams={searchParams} {...props} />
                    )}
                    options={{
                        title: 'sound'
                    }}
                />
                <Tab.Screen
                    name="SearchText"
                    component={(props: any) => (
                        <TextsPage searchParams={searchParams} {...props} />
                    )}
                    options={{
                        title: 'text'
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}
