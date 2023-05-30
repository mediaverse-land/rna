import { FlatList, View, TouchableOpacity } from 'react-native';
import { VideoPageComponents } from './style';
import { VIDEO_LIST_ITEM_GRADIENT } from '../../../../constaints/images';
import { VideoItem, videosMockData } from './mock-data/video-mock-data';
import { Flex } from '../../../../styles/grid';
import { UserNameCard } from '../../../../shared/components/username-card';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../../shared/types/use-navigation';

const {
    ListWrapper,
    VideoListItem,
    VideoListItemThumbnail,
    VideoListItemGradietImage,
    VideoListItemDescription,
    VideoListItemDuration
} = VideoPageComponents;

export function VideoPageList() {
    const navigation = useNavigation<UseNavigationType>();

    const navigateToSinglVide = (title: string) => {
        navigation.navigate('SingleVideoScreen', {
            videoTitle: title
        });
    };

    const renderVidoeListItem = ({ item }: { item: VideoItem }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigateToSinglVide(item.title)}
            >
                <VideoListItem>
                    <View>
                        <VideoListItemThumbnail
                            source={{ uri: item.imagePath }}
                        />
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
            </TouchableOpacity>
        );
    };

    const keyExtractor = (item: VideoItem) => item.id.toString();

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
