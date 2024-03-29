import { createStackNavigator } from '@react-navigation/stack';
import { IndexMenu } from './pages/index-menu';
import { AccountPage } from './pages/account';
import { GeneralInformationPage } from './pages/account/general-information';
import { SignInsPage } from './pages/account/singins';
import { SessionsPage } from './pages/account/seassions';
import { MessagesPage } from './pages/messages';
import { MessageDetail } from './pages/message-detail';

const Stack = createStackNavigator();

const routes = [
  {
    id: 1,
    title: 'Index Menu',
    component: IndexMenu,
    name: 'index Menu',
  },
  {
    id: 9,
    title: 'Account',
    component: AccountPage,
    name: 'account',
  },
  {
    id: 2,
    title: 'Massage',
    component: MessagesPage,
    name: 'massage',
  },
  {
    id: 12,
    title: 'MassageDetail',
    component: MessageDetail,
    name: 'MassageDetail',
  },
  {
    id: 3,
    title: 'Wallet',
    component: IndexMenu,
    name: 'wallet',
  },
  {
    id: 4,
    title: 'Analytics',
    component: IndexMenu,
    name: 'analytics',
  },
  {
    id: 6,
    title: 'General information',
    component: GeneralInformationPage,
    name: 'general_information',
  },
  {
    id: 7,
    title: 'Sign ins',
    component: SignInsPage,
    name: 'sign_ins',
  },
  {
    id: 8,
    title: 'Seassions',
    component: SessionsPage,
    name: 'seassions',
  },
];

const fadeTransition = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export function SettingsStack() {
  console.log('4', 'SETTINGS_CONSOLE')

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: fadeTransition,
        }}
      >
        {routes.map((route) => (
          <Stack.Screen key={route.id} name={route.name} component={route.component} />
        ))}
      </Stack.Navigator>
    </>
  );
}
