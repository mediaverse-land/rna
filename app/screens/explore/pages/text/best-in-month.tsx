import { FlatList, Text, View } from 'react-native';
import { ICON_TEXT_WHITE } from '../../../../constaints/icons';
import { Title } from '../../../../shared/components/title';
import { TEXT_SLIDER_ITEM_GRADIENT } from '../../../../constaints/images';
import { UserNameCard } from '../../../../shared/components/username-card';
import { ImagesPageComponents } from '../all/style';
import { topTenTextsMockData } from '../all/mock-data/top-ten-texts';

const {
    TextSliderWrapper,
    TextSlide,
    TextSlideBackgroundGradient,
    TextSlideBody,
    TextSlideTitle,
    TextSlideContentText
} = ImagesPageComponents;

export function ImagePageBestInMonth() {
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
        <View style={{ flex: 1, paddingLeft: 24 }}>
            <Title str="Best in month" />
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
