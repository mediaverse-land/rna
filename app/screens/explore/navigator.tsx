import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ImagesPage } from './pages/images';
import { VideosPage } from './pages/videos';
import { SoundsPage } from './pages/sounds';
import { TextsPage } from './pages/text';
import { AllPage } from './pages/all';
import TopTabBar from '../../shared/components/top-tab-bar';
import { Box } from '../../shared/components/box';

type RoutesType = {
    AllPage: undefined;
    ImagesPage: undefined;
    VideosPage: undefined;
    SoundsPage: undefined;
    TextsPage: undefined;
};

const routes = [
    {
        id: 1,
        name: 'AllPage',
        title: 'All',
        component: AllPage
    },
    {
        id: 2,
        name: 'ImagesPage',
        title: 'image',
        component: ImagesPage
    },
    {
        id: 3,
        name: 'VideosPage',
        title: 'video',
        component: VideosPage
    },
    {
        id: 4,
        name: 'SoundsPage',
        title: 'sound',
        component: SoundsPage
    },
    {
        id: 5,
        name: 'TextsPage',
        title: 'text',
        component: TextsPage
    }
];

const Tab = createMaterialTopTabNavigator<RoutesType>();

export function Navigator() {
    return (
        <Box width={'100%'} flex={1}>
            <Tab.Navigator tabBar={(props) => <TopTabBar {...props} />}>
                {routes.map((route: any) => (
                    <Tab.Screen
                        key={route.id}
                        name={route.name}
                        component={route.component}
                        options={{
                            title: route.title
                        }}
                    />
                ))}
            </Tab.Navigator>
        </Box>
    );
}
