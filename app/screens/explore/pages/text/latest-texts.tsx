import { FlatList } from "react-native";
import { TextItemCard } from "../../../../shared/components/text-item-card";
import { Title } from "../../../../shared/components/title";
import { textMockData } from "./text-mock-data";

export function LatestTexts() {
    const renderItem = ({ item }: any) => (
        <TextItemCard
            title={item.title}
            description={item.description}
            userAvatarPath={item.userAvatarPath}
            userName={item.userName} />
    );

    return (
        <>
            <Title str="Latest" />
            <FlatList
                numColumns={1}
                data={textMockData}
                keyExtractor={(item): any => item.id}
                renderItem={renderItem}
            />
        </>
    );
}