import { FlatList, Image, TouchableOpacity } from 'react-native';
import { Title } from '../../../../shared/components/title';
import { imageMockData } from './mock-data';
import { PaddingContainer } from '../../../../styles/grid';
import { useNavigation } from '@react-navigation/native';

export function LatestImages() {
    const navigation = useNavigation<any>();

    function itemPressRedirectHandler(itemId: number) {
        navigation.navigate('SingleImageStack', {
            itemId
        });
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity
                style={[
                    {
                        height: 120,
                        borderRadius: 5,
                        width: '31%',
                        marginRight: 10,
                        marginBottom: 10
                    }
                ]}
                onPress={() => itemPressRedirectHandler(item.id)}
            >
                <Image
                    source={{ uri: item.path }}
                    style={[
                        {
                            height: 120,
                            borderRadius: 5,
                            width: '100%'
                        }
                    ]}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    };

    return (
        <PaddingContainer>
            <Title str="Latest" />
            <FlatList
                contentContainerStyle={{ justifyContent: 'space-between' }}
                numColumns={3}
                data={imageMockData}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
            />
        </PaddingContainer>
    );
}
