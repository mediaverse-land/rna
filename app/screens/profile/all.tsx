import { useState, useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SelectBar } from './components/select-bar';
import { ListItem } from './components/list-item';
import { Box } from '../../shared/components/box';
import { stickyStyles } from '../../styles/sticky';
import { PaddingContainer } from '../../styles/grid';
import { windowSize } from '../../utils/window-size';
import {
    ListItemType,
    mockDataListItem
} from './mock-data/list-item-mock-data';

const { width } = windowSize();
const screenSize = Math.floor(width);
const listItemWidth = screenSize / 2 - 32;

const keyExtractor = (item: ListItemType) => item.id.toString();

export function ProfileScreenAllPage() {
    const [selectedContents, setSelectedContents] = useState([]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSelectedContents([]);
            };
        }, [])
    );

    const selectOwnedItemLognPressHandler = (itemId: number) => {
        const findContent = findSelectedContent(itemId);
        if (!findContent) {
            setSelectedContents([...selectedContents, itemId]);
            return;
        }
        // filter repeated contents;
        else {
            removeContentFromSelectedList(itemId);
        }
    };

    const removeContentFromSelectedList = (itemId: number) => {
        const filteredContent = selectedContents.filter((f) => f !== itemId);
        const newArray = [...filteredContent];
        setSelectedContents(newArray);
    };

    const isSelectedContent = (itemId: number) => {
        const findContent = findSelectedContent(itemId);
        return findContent ? true : false;
    };

    const selectOwnedItemPressHandler = (itemId: number) => {
        if (selectedContents.length === 0) {
            return;
        }

        selectOwnedItemLognPressHandler(itemId);
    };

    const selectBarCloserHandler = () => {
        setSelectedContents([]);
    };

    const findSelectedContent = (itemId: number) =>
        selectedContents.find((f) => f === itemId);

    const renderListItem = ({ item }: { item: ListItemType }) => {
        const { imagePath, title, username, profileUri } = item;

        const isSelected = isSelectedContent(item.id);

        return (
            <ListItem
                width={listItemWidth}
                imagePath={imagePath}
                title={title}
                username={username}
                profileUri={profileUri}
                onlongpress={() => selectOwnedItemLognPressHandler(item.id)}
                onpress={() => selectOwnedItemPressHandler(item.id)}
                isSelected={isSelected}
            />
        );
    };

    const isSelectBarVisible = selectedContents.length ? true : false;

    return (
        <LinearGradient
            style={[stickyStyles.container]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            <SelectBar
                isVisible={isSelectBarVisible}
                closerHandler={selectBarCloserHandler}
            />
            <ScrollView>
                <Box flex={1} width="100%" backgroundColor="transparent">
                    <PaddingContainer>
                        <FlatList
                            columnWrapperStyle={{
                                justifyContent: 'space-between'
                            }}
                            numColumns={2}
                            data={mockDataListItem}
                            renderItem={renderListItem}
                            keyExtractor={keyExtractor}
                            style={{
                                paddingTop: 95
                            }}
                        />
                    </PaddingContainer>
                </Box>
                <Box width="100%" height={100}></Box>
            </ScrollView>
        </LinearGradient>
    );
}
