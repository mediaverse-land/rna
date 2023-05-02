import { FlatList, Image, View, ScrollView } from 'react-native';
import {
    LeftPaddingContainer,
} from '../../../../styles/grid';
import { Title } from '../../../../shared/components/title';
import { LiveVideosComponents } from './style';
import { liveVideosMockData } from './video-mock-data';

export function LiveVideos() {
    const renderItem = ({ item }: any) => {
        return (
            <LiveVideosComponents.Item>
                <View>
                    <Image
                        source={{ uri: item.imagePath }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 4
                        }}
                    />
                </View>
                <LiveVideosComponents.Body>
                    <LiveVideosComponents.Title>
                        {item.title}
                    </LiveVideosComponents.Title>
                    <LiveVideosComponents.Categoty>
                        {item.category}
                    </LiveVideosComponents.Categoty>
                </LiveVideosComponents.Body>
            </LiveVideosComponents.Item>
        );
    };

    return (
        <LiveVideosComponents.Container>
            <LeftPaddingContainer>
                <Title str="Live" />
                <ScrollView>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{
                            justifyContent: 'space-between'
                        }}
                        data={liveVideosMockData}
                        keyExtractor={(item: any) => item.id}
                        renderItem={renderItem}
                    />
                </ScrollView>
            </LeftPaddingContainer>
        </LiveVideosComponents.Container>
    );
}
