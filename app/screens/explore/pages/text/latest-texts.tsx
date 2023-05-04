import { FlatList, TouchableOpacity } from 'react-native';
import { TextItemCard } from '../../../../shared/components/text-item-card';
import { Title } from '../../../../shared/components/title';
import { textMockData } from './text-mock-data';
import { useNavigation } from '@react-navigation/native';


export function LatestTexts() {

    const navigation = useNavigation<any>();

    function itemPressRedirectHandler(itemId: number) {
        navigation.navigate('SingleTextStack', {
            itemId
        });
    }


    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => itemPressRedirectHandler(item.id)}
        >
            <TextItemCard
                title={item.title}
                description={item.description}
                userAvatarPath={item.userAvatarPath}
                userName={item.userName}
            />
        </TouchableOpacity>
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
