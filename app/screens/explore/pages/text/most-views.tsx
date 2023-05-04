import { FlatList } from 'react-native';
import { Title } from '../../../../shared/components/title';
import { textMostViewMockData } from './text-mock-data';
import { TextItemCard } from '../../../../shared/components/text-item-card';

export function MostViewsText() {
    const renderItem = ({ item }: any) => {
        return (
            <TextItemCard
                title={item.title}
                description={item.description}
                userAvatarPath={item.userAvatarPath}
                userName={item.userName}
            />
        );
    };

    return (
        <>
            <Title str="Most view" />
            <FlatList
                numColumns={1}
                data={textMostViewMockData}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
            />
        </>
    );
}
