import { FlatList, View } from 'react-native';
import { VideoPageComponents } from './style';
import { VIDEO_LIST_ITEM_GRADIENT } from '../../../../constaints/images';
import { videosMockData } from './mock-data/video-mock-data';
import { Flex } from '../../../../styles/grid';
import { UserNameCard } from '../../../../shared/components/username-card';

const {
    ListWrapper,
    VideoListItem,
    VideoListItemThumbnail,
    VideoListItemGradietImage,
    VideoListItemDescription,
    VideoListItemDuration
} = VideoPageComponents;

export function VideoPageList() {
    const renderVidoeListItem = ({ item }: { item: any }) => {
        return (
            <VideoListItem>
                <View>
                    <VideoListItemThumbnail source={{ uri: item.imagePath }} />
                    <VideoListItemGradietImage
                        source={{ uri: VIDEO_LIST_ITEM_GRADIENT }}
                    />
                </View>
                <View>
                    <VideoListItemDescription>
                        {item.description}
                    </VideoListItemDescription>
                    <Flex
                        direction="row"
                        align="center"
                        justify="space-between"
                        style={{
                            marginTop: 16,
                            paddingLeft: 8,
                            paddingRight: 8
                        }}
                    >
                        <UserNameCard
                            username={item.username}
                            profileUri={item.userProfileUri}
                            usernameStyles={{
                                color: '#666680',
                                marginLeft: 8,
                                fontSize: 12
                            }}
                        />
                        <VideoListItemDuration>
                            {item.duration}
                        </VideoListItemDuration>
                    </Flex>
                </View>
            </VideoListItem>
        );
    };

    const keyExtractor = (item: any) => item.id;

    return (
        <ListWrapper>
            <FlatList
                data={videosMockData}
                renderItem={renderVidoeListItem}
                keyExtractor={keyExtractor}
            />
        </ListWrapper>
    );
}
