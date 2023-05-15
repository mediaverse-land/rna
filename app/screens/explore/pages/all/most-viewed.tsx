import { View } from "react-native";
import { Title } from "../../../../shared/components/title";
import { ICON_IMAGE } from "../../../../constaints/icons";
import { MasonryView } from "../../../../shared/components/masonry";

export function AllPageMostViewed() {
    return (
        <View style={{ flex: 1, marginTop: 40 }}>
            <Title str="Most viewed" iconPath={ICON_IMAGE} />
            {/* <MasonryView /> */}
        </View>
    )
}