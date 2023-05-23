import { LinearGradient } from 'expo-linear-gradient';
import { stickyStyles } from '../../styles/sticky';
import { Box } from '../../shared/components/box';
import {
    ListItemType,
    mockDataListItem
} from './mock-data/list-item-mock-data';
import { ListItem } from './components/list-item';
import { FlatList } from 'react-native';
import { PaddingContainer } from '../../styles/grid';
import { windowSize } from '../../utils/window-size';

const { width } = windowSize();

const screenSize = Math.floor(width);

const listItemWidth = screenSize / 2 - 32;

export function ProfileScreenAllPage() {
    const renderListItem = ({ item }: { item: ListItemType }) => {
        const { imagePath, title, username, profileUri } = item;

        return (
            <ListItem
                width={listItemWidth}
                imagePath={imagePath}
                title={title}
                username={username}
                profileUri={profileUri}
            />
        );
    };

    return (
        <LinearGradient
            style={[stickyStyles.container]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            <Box flex={1} width="100%" backgroundColor="transparent">
                <PaddingContainer>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        numColumns={2}
                        data={mockDataListItem}
                        renderItem={renderListItem}
                        keyExtractor={(item: any) => item.id}
                        style={{
                            paddingTop: 95
                        }}
                    />
                </PaddingContainer>
            </Box>
        </LinearGradient>
    );
}
