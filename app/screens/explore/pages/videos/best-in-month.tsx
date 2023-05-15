import { View } from "react-native";
import { Title } from "../../../../shared/components/title";
import { HorizontalSlider } from "../../../../shared/components/horizontal-slider";
import { dailyRecommendedMockData } from "../all/mock-data/daily-recommended";

export function VideoPageBestInMonth() {
    return (
        <View>
            <Title str="Best in month" />
            <View style={{ marginTop: 24 }}>
                <HorizontalSlider data={dailyRecommendedMockData} />
            </View>
        </View>
    )
}