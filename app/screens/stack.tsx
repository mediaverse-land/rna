import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreStack } from './explore';
import { BottomTabBar } from '../components/bottom-tab-bar';
import { AppsStack } from './apps';
import { WalletStack } from './wallet/navigation';
import { ProfileScreen } from './profile';
import { ALL_LIVES_SCREEN, CHANNEL_MANAGEMENT_SCREEN } from '../constaints/consts';
import { AllSLivescreen } from './all-lives';
import ViewAllScreen from './view-all';
import { ChannelManagementScreen } from './channel-management';

type RoutesType = {
  Explore: undefined;
  Apps: undefined;
  CreateContent: undefined;
  Wallet: undefined;
  Profile: undefined;
};

export const EXPORE = 'Explore',
  APPS = 'Apps',
  WALLET = 'Wallet',
  PROFILE = 'Profile',
  CREATE_CONTENT = 'CreateContent',
  VIEW_ALL = 'ViewAll';

const Tab = createBottomTabNavigator<RoutesType>();


const routes = [
  {
    id: 1,
    name: EXPORE,
    component: ExploreStack,
    title: 'explore',
  },
  {
    id: 2,
    name: APPS,
    component: AppsStack,
    title: 'apps',
  },
  {
    id: 3,
    name: CREATE_CONTENT,
    component: ExploreStack,
    title: 'createContent',
  },
  {
    id: 4,
    name: WALLET,
    component: WalletStack,
    title: 'wallet',
  },
  {
    id: 5,
    name: PROFILE,
    component: ProfileScreen,
    title: 'profile',
  },
  {
    id: 6,
    name: VIEW_ALL,
    component: ViewAllScreen,
    title: 'view all',
  },
  {
    id: 7,
    name: ALL_LIVES_SCREEN,
    component: AllSLivescreen,
    title: 'live channel',
  },
  {
    id: 8,
    name: CHANNEL_MANAGEMENT_SCREEN,
    component: ChannelManagementScreen,
    title: 'channel management',
  },
];

export function AppStack() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {routes.map((route: any) => (
        <Tab.Screen
          key={route.id}
          name={route.name}
          component={route.component}
          options={{
            title: route.title,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
