import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTabBar from '../../shared/components/top-tab-bar';
import { ProfileScreenAllPage } from './all';
import { Box } from '../../shared/components/box';

const Tab = createMaterialTopTabNavigator();

const routes = [
    {
        id: 1,
        title: 'All',
        component: ProfileScreenAllPage,
        name: 'all'
    },
    {
        id: 3,
        title: 'image',
        component: ProfileScreenAllPage,
        name: 'image'
    },
    {
        id: 4,
        title: 'video',
        component: ProfileScreenAllPage,
        name: 'video'
    },
    {
        id: 5,
        title: 'sound',
        component: ProfileScreenAllPage,
        name: 'sound'
    },
    {
        id: 6,
        title: 'text',
        component: ProfileScreenAllPage,
        name: 'text'
    }
];

export function Navigator() {
    return (
        <Box width={'100%'} flex={1}>
            <Tab.Navigator
                tabBar={(props) => <TopTabBar isProfilePage {...props} />}
                style={{
                    top: 4,
                }}
            >
                {routes.map((route) => (
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
