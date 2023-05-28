import { ScrollView, StyleSheet, Button } from 'react-native'
import { stickyStyles } from "../../styles/sticky";
import { ScreenGradient } from '../../shared/components/screen-gradient';
import { InventoryBox } from './components/inventory-box';
import { CardSlider } from './components/card-slider';
import Animated, {
    withSpring,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';


export function WalletScreen() {
    const offset = useSharedValue(0);

    const defaultSpringStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withSpring(offset.value - 250) }],
        };
    });

    const customSpringStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withSpring(offset.value * 255, {
                        damping: 20,
                        stiffness: 100,
                    }),
                },
            ],
        };
    });


    return (
        // <ScreenGradient>
        <ScrollView style={[stickyStyles.fixed]}>
            {/* <InventoryBox />
                <CardSlider /> */}
            <Animated.View style={[styles.box, defaultSpringStyles]} />
            {/* <Animated.View style={[styles.box, customSpringStyles]} /> */}
            <Button onPress={() => (offset.value = Math.random())} title="Move" />
        </ScrollView>
        // {/* </ScreenGradient> */ }
    )
}


const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 20
    }
})