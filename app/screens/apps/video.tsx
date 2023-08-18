import { ScrollView } from 'react-native';
import { stickyStyles } from '../../styles/sticky';
import { ScreenGradient } from '../../components/screen-gradient';

export function AppsPageVideoScreen() {
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
