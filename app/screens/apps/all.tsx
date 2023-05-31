import { FlatList, StyleSheet } from 'react-native';
import { ScreenGradient } from '../../shared/components/screen-gradient';
import { AppItemType, appItemListMockData } from './mock-data/apps-mock-data';
import { AppItem } from './components/apps-list';
import { Box } from '../../shared/components/box';
import { PaddingContainer } from '../../styles/grid';

export function AppsPageAllScreen() {
    const renderItem = ({ item }: { item: AppItemType }) => {
        return (
            <PaddingContainer>
                <Box width={'100%'} key={item.id}>
                    <AppItem
                        title={item.title}
                        category={item.category}
                        imagePath={item.imagePath}
                    />
                </Box>
            </PaddingContainer>
        );
    };

    const keyExtractor = (item: AppItemType) => item.id.toString();

    return (
        <ScreenGradient>
            <Box width="100%">
                <FlatList
                    contentContainerStyle={styles.list}
                    data={appItemListMockData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
            </Box>
            {/* <ScrollView
                style={{
                    flex: 1,
                    paddingTop: 192,
                    width: '100%',
                }}

            >
                <PaddingContainer>
                    {appItemListMockData.map((item: AppItemType) => (
                        <Box width={'100%'} key={item.id}>
                            <AppItem
                                title={item.title}
                                category={item.category}
                                imagePath={item.imagePath}
                            />
                        </Box>
                    ))}
                </PaddingContainer>
            </ScrollView> */}
        </ScreenGradient>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingTop: 192,
        paddingBottom: 100
    }
})