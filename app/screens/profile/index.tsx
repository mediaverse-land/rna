import { Navigator } from './topbar-navigator';
import { FocusedStatusBar } from '../../components/focused-statusbar';
import { ScreenGradient } from '../../components/screen-gradient';
import { ProfileScreenHead } from './components/head';
import { CustomSafeArea } from '../../components/custom-safe-area';

export function ProfileScreen() {
  return (
    <CustomSafeArea style={{ flex: 1, width: '100%', marginTop: -30 }}>
      <FocusedStatusBar />
      <ScreenGradient>
        <ProfileScreenHead />
        <Navigator />
      </ScreenGradient>
    </CustomSafeArea>
  );
}
