import { ScrollView } from 'react-native';
import { ScreenGradient } from '../../shared/components/screen-gradient';
import { AppItemType, appItemListMockData } from './mock-data/apps-mock-data';
import { AppItem } from './components/apps-list';
import { Box } from '../../shared/components/box';
import { PaddingContainer } from '../../styles/grid';

export function AppsPageAllScreen() {
    return (
        <ScreenGradient>
            <ScrollView
                style={{
                    paddingTop: 192,
                    width: '100%'
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
            </ScrollView>
        </ScreenGradient>
    );
}
