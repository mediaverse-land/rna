import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../../../shared/components/box';
import { SettingsScreenHeader } from '../components/header';
import { ScreenGradient } from '../../../shared/components/screen-gradient';
import { PaddingContainer } from '../../../styles/grid';
import {
    ListColumn,
    ListItem
} from '../components/list';
import {
    ICON_ANALYTICS,
    ICON_MAIL,
    ICON_SHARE,
    ICON_USER
} from '../../../constaints/icons';

const listOneRows: ListItem[] = [
    {
        id: 1,
        title: 'Account',
        value: 'Ma.nakhli',
        bage: null,
        icon: ICON_USER,
        routePath: 'account'
    },
    {
        id: 2,
        title: 'Massage',
        value: null,
        bage: 2,
        icon: ICON_MAIL,
        routePath: 'massage'
    },
    {
        id: 3,
        title: 'Wallet',
        value: '200 $',
        bage: null,
        icon: ICON_MAIL,
        routePath: 'wallet'
    },
]

const listTwoRows: ListItem[] = [
    {
        id: 1,
        title: 'Analytics',
        icon: ICON_ANALYTICS,
        routePath: 'analytics'
    },
    {
        id: 2,
        title: 'Share account',
        icon: ICON_SHARE,
        routePath: 'share account'
    },
]


export function IndexMenu() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                <SettingsScreenHeader />
                <PaddingContainer>
                    <Box marginTop={38}>
                        <ListColumn data={listOneRows} />
                    </Box>
                    <Box marginTop={8}>
                        <ListColumn data={listTwoRows} />
                    </Box>
                </PaddingContainer>
            </ScreenGradient>
        </SafeAreaView>
    )
}

