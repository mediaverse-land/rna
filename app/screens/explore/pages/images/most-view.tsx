import { PaddingContainer } from '../../../../styles/grid';
import { Title } from '../../../../shared/components/title';
import { FlatList, Image } from 'react-native';
import { mostViewsImageMockData } from './mock-data';

export function MostViewImages() {
    const renderItem = ({ item }: any) => {
        return (
            <Image
                source={{ uri: item.path }}
                style={[
                    {
                        height: 120,
                        borderRadius: 5,
                        width: '31%',
                        marginRight: 10,
                        marginBottom: 10
                    }
                ]}
                resizeMode="contain"
            />
        );
    };

    return (
        <PaddingContainer>
            <Title str="Most View" />
            <FlatList
                contentContainerStyle={{ justifyContent: 'space-between' }}
                numColumns={3}
                data={mostViewsImageMockData}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
            />
        </PaddingContainer>
    );
}
