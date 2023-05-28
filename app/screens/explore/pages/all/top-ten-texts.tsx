import { FlatList } from 'react-native';
import { Title } from '../../../../shared/components/title';
import { ImagesPageComponents } from './style';
import { TEXT_SLIDER_ITEM_GRADIENT } from '../../../../constaints/images';
import { TextItem, topTenTextsMockData } from './mock-data/top-ten-texts';
import { UserNameCard } from '../../../../shared/components/username-card';
import { Box } from '../../../../shared/components/box';
import { Flex } from '../../../../styles/grid';
import { SVG_ICON } from '../../../../constaints/icons';
import { useNavigation } from '@react-navigation/native';

const {
    TextSliderWrapper,
    TextSlide,
    TextSlideBackgroundGradient,
    TextSlideBody,
    TextSlideTitle,
    TextSlideContentText
} = ImagesPageComponents;

export function AllPageTopTenText() {

    const navigation = useNavigation<{ navigate: (screenName: string, option: Record<string, string>) => void }>();

    const textScreenNavigationHandler = (title: string) => {
        console.log('title')
        navigation.navigate('SingleTextScreen', {
            title
        })
    }

    const renderItem = ({ item }: { item: TextItem }) => {
        return (
            <TextSlide

            >
                <TextSlideBackgroundGradient
                    source={{ uri: TEXT_SLIDER_ITEM_GRADIENT }}
                />
                <TextSlideBody
                    onPress={() => textScreenNavigationHandler(item.title)}
                    activeOpacity={1}>
                    <TextSlideTitle>{item.title}</TextSlideTitle>
                    <TextSlideContentText>{item.content}</TextSlideContentText>
                    <Box marginTop={16}>
                        <UserNameCard
                            username={item.username}
                            profileUri={item.profileUri}
                            usernameStyles={{
                                color: '#666680',
                                marginLeft: 8
                            }}
                        />
                    </Box>
                </TextSlideBody>
            </TextSlide>
        );
    };

    return (
        <Box marginTop={40} paddingLeft={24} flex={1}>
            <Flex direction="row">
                <SVG_ICON
                    width={16}
                    height={16}
                    style={{ marginRight: 8, marginTop: 3 }}
                />
                <Title str="Top 10 texts" />
            </Flex>
            <TextSliderWrapper>
                <FlatList
                    horizontal
                    data={topTenTextsMockData}
                    renderItem={renderItem}
                />
            </TextSliderWrapper>
        </Box>
    );
}
