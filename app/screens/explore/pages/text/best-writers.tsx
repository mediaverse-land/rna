import { TextPageComponents } from './style';
import { Title } from '../../../../shared/components/title';
import { FlatList } from 'react-native';
import { WriterType, bestWritersMockData } from './mock-data/best-writers';

const {
    BestWritersContainer,
    BestWritersSlider,
    BestWritersSlide,
    BestWritersSlideUserImage,
    BestWritersSlideTitle,
    BestWritersSlideDescription
} = TextPageComponents;

export function TextPageBestWriters() {
    const renderSliderItem = ({ item }: { item: WriterType }) => {
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

    const keyExtractor = (item: WriterType): string => item.id.toString();

    return (
        <BestWritersContainer>
            <Title str="Best writers" />
            <BestWritersSlider>
                <FlatList
                    horizontal
                    data={bestWritersMockData}
                    renderItem={renderSliderItem}
                    keyExtractor={keyExtractor}
                />
            </BestWritersSlider>
        </BestWritersContainer>
    );
}
