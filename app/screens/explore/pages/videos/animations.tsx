import { FlatList, Image } from 'react-native';
import { PaddingContainer } from '../../../../styles/grid';
import { Title } from '../../../../shared/components/title';
import { videosAnimationMockData } from './video-mock-data';

export function AnimationVideos() {
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
            <Title str="Animation" />
            <FlatList
                contentContainerStyle={{ justifyContent: 'space-between' }}
                numColumns={3}
                data={videosAnimationMockData}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
            />
        </PaddingContainer>
    );
}
