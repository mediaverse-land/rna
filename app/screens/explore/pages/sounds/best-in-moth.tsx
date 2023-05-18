import { StyleSheet, View } from "react-native";
import { HorizontalSlider } from "../../../../shared/components/horizontal-slider";
import { Title } from "../../../../shared/components/title";
import { PaddingContainer } from "../../../../styles/grid";
import { soundsMockData } from "./sound-mock-data";

const styles = StyleSheet.create({
    sliderWrapper: {
        marginTop: 40
    }
})

export function SoundsPageBestInMonth() {
    return (
        <PaddingContainer>
            <Title str="Best in month" />
            <View style={styles.sliderWrapper}>
                <HorizontalSlider data={soundsMockData} />
            </View>
        </PaddingContainer>
    )
}