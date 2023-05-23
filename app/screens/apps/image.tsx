import { ScrollView } from 'react-native';
import { stickyStyles } from '../../styles/sticky';
import { ScreenGradient } from '../../shared/components/screen-gradient';

export function AppsPageImageScreen() {
    return (
        <ScreenGradient>
            <ScrollView
                style={[
                    stickyStyles.fixed,
                    { backgroundColor: 'transparent', paddingTop: 196 }
                ]}
            ></ScrollView>
        </ScreenGradient>
    );
}
