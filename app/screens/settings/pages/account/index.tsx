import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../../../shared/components/screen-gradient';
import { Box } from '../../../../shared/components/box';
import { ListColumn, ListColumnItem } from '../../components/list';
import { PaddingContainer } from '../../../../styles/grid';
import {
    ICON_ARROW_RIGHT
} from '../../../../constaints/icons';
import { SettingsScreenTitle } from '../../components/title';

const data: ListColumnItem[] = [
    {
        id: 1,
        title: 'General information',
        value: null,
        icon: ICON_ARROW_RIGHT,
        routePath: 'general_information',
        direction: 'row-reverse',
        iconStyle: {
            width: 5.68,
            height: 12
        }
    },
    {
        id: 2,
        title: 'Sign ins',
        value: null,
        icon: ICON_ARROW_RIGHT,
        routePath: 'sign_ins',
        direction: 'row-reverse',
        iconStyle: {
            width: 5.68,
            height: 12
        }
    },
    {
        id: 3,
        title: 'Seassions',
        value: null,
        icon: ICON_ARROW_RIGHT,
        routePath: 'seassions',
        direction: 'row-reverse',
        iconStyle: {
            width: 5.68,
            height: 12
        }
    }
];

const signOutData: ListColumnItem[] = [
    {
        id: 1,
        title: 'Sign out',
        value: null,
        icon: ICON_ARROW_RIGHT,
        direction: 'row-reverse',
        iconStyle: {
            width: 5.68,
            height: 12
        }
    }
];

export function AccountPage() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                <PaddingContainer>
                    <SettingsScreenTitle title="Account" />
                    <Box marginTop={38}>
                        <ListColumn data={data} />
                    </Box>
                    <Box marginTop={16}>
                        <ListColumn data={signOutData} />
                    </Box>
                </PaddingContainer>
            </ScreenGradient>
        </SafeAreaView>
    );
}
