import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileScreenHead } from './components/head';
import { Navigator } from './topbar-navigator';
import { ScreenGradient } from '../../shared/components/screen-gradient';

export function ProfileScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                <ProfileScreenHead />
                <Navigator />
            </ScreenGradient>
        </SafeAreaView>
    );
}
