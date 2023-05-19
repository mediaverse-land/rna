import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from '../../../explore/pages/all/style';
import { PaddingContainer } from '../../../../styles/grid';

const { FixedStyles, ContainerStyles } = ImagesPageComponents;

export function SoundsPage() {
    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={{
                x: 0.7,
                y: 0
            }}
        >
            <ScrollView
                style={[
                    FixedStyles,
                    {
                        backgroundColor: 'transparent',
                        paddingTop: 196
                    }
                ]}
            >
                <PaddingContainer></PaddingContainer>
            </ScrollView>
        </LinearGradient>
    );
}
