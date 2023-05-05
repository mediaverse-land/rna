import { FlatList, TouchableOpacity } from 'react-native';
import { Title } from '../../../../shared/components/title';
import { soundMockData } from './sound-mock-data';
import { SoundItemCard } from '../../../../shared/components/sound-item-card';
import { useNavigation } from '@react-navigation/native';

export function LatestSounds() {
    const navigation = useNavigation<any>();

    function itemPressRedirectHandler(itemId: number) {
        navigation.navigate('SingleSoundStack', {
            itemId
        });
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => itemPressRedirectHandler(item.id)}>
                <SoundItemCard
                    title={item.title}
                    description={item.description}
                    userAvatarPath={item.userAvatarPath}
                    userName={item.userName}
                />
            </TouchableOpacity>
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
