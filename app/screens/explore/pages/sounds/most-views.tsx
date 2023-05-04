import { FlatList, View } from 'react-native';
import { Title } from '../../../../shared/components/title';
import { SoundItemCard } from '../../../../shared/components/sound-item-card';
import { soundsMostViewMockData } from './sound-mock-data';

export function MostViewsSounds() {
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
            <Title str="Most view" />
            <FlatList
                numColumns={1}
                data={soundsMostViewMockData}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
            />
        </>
    );
}
