import { TextPageComponents } from './style';
import { Title } from '../../../../shared/components/title';
import { FlatList } from 'react-native';
import { bestWritersMockData } from './mock-data/best-writers';

const {
    BestWritersContainer,
    BestWritersSlider,
    BestWritersSlide,
    BestWritersSlideUserImage,
    BestWritersSlideTitle,
    BestWritersSlideDescription
} = TextPageComponents;

export function TextPageBestWriters() {
    const renderSliderItem = ({ item }: { item: any }) => {
        return (
            <BestWritersSlide>
                <BestWritersSlideUserImage source={{ uri: item.image }} />
                <BestWritersSlideTitle>{item.title}</BestWritersSlideTitle>
                <BestWritersSlideDescription>
                    {item.description}
                </BestWritersSlideDescription>
            </BestWritersSlide>
        );
    };

    return (
        <BestWritersContainer>
            <Title str="Best writers" />
            <BestWritersSlider>
                <FlatList
                    horizontal
                    data={bestWritersMockData}
                    renderItem={renderSliderItem}
                    keyExtractor={(item: any) => item.id}
                />
            </BestWritersSlider>
        </BestWritersContainer>
    );
}
