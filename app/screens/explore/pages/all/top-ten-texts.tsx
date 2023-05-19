import { FlatList, View } from 'react-native';
import { SVG_ICON } from '../../../../constaints/icons';
import { Title } from '../../../../shared/components/title';
import { ImagesPageComponents } from './style';
import { TEXT_SLIDER_ITEM_GRADIENT } from '../../../../constaints/images';
import { topTenTextsMockData } from './mock-data/top-ten-texts';
import { UserNameCard } from '../../../../shared/components/username-card';

const {
    TextSliderWrapper,
    TextSlide,
    TextSlideBackgroundGradient,
    TextSlideBody,
    TextSlideTitle,
    TextSlideContentText
} = ImagesPageComponents;

export function AllPageTopTenText() {
    const renderItem = ({ item }: { item: any }) => {
        return (
            <TextSlide>
                <TextSlideBackgroundGradient
                    source={{ uri: TEXT_SLIDER_ITEM_GRADIENT }}
                />
                <TextSlideBody activeOpacity={1}>
                    <TextSlideTitle>{item.title}</TextSlideTitle>
                    <TextSlideContentText>{item.content}</TextSlideContentText>
                    <View style={{ marginTop: 16 }}>
                        <UserNameCard
                            username={item.username}
                            profileUri={item.profileUri}
                            usernameStyles={{
                                color: '#666680',
                                marginLeft: 8
                            }}
                        />
                    </View>
                </TextSlideBody>
            </TextSlide>
        );
    };

    return (
        <View style={{ flex: 1, marginTop: 40, paddingLeft: 24 }}>
            <View style={{ flexDirection: 'row' }}>
                <SVG_ICON
                    width={16}
                    height={16}
                    style={{ marginRight: 8, marginTop: 3 }}
                />
                <Title str="Top 10 texts" />
            </View>
            <TextSliderWrapper>
                <FlatList
                    horizontal
                    data={topTenTextsMockData}
                    renderItem={renderItem}
                />
            </TextSliderWrapper>
        </View>
    );
}
