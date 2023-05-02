import { FlatList } from "react-native";
import { Title } from "../../../../shared/components/title";
import { soundMockData } from "./sound-mock-data";
import { SoundItemCard } from "../../../../shared/components/sound-item-card";

export function LatestSounds() {
    const renderItem = ({ item }: any) => {
        return (
            <SoundItemCard
                title={item.title}
                description={item.description}
                userAvatarPath={item.userAvatarPath}
                userName={item.userName}
            />
        );
    };

    return (
        <>
            <Title str="Latest" />
            <FlatList
                numColumns={1}
                data={soundMockData}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
            />
        </>
    );
}