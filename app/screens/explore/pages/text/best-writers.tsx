import { TextPageComponents } from './style';
import { Title } from '../../../../components/title';
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

const defaultImageUri =
    'https://s3-alpha-sig.figma.com/img/98b4/e91a/7b4d60b90289785ed80e557c081dcf6a?Expires=1687737600&Signature=Pb5-li-CYteTSshWFNwEb4Xn84c7TPoHXidv3FAlRtY2h7KUYX9bas-YapyE7~TUQte42AgCUI3x0JhiyV-zisrxUN7SHiqD0ZRbYbgYP5XUpZ88jX0I~wXU~v~8KWq327DvEJEBxq5nDvBpVi1EuSrMNP9FonCtDtgn9ylysu7C-h5jxzu-xpDjQE~~0k4TkZxA1B8U1LTJ7TxmrmE~A-vZHKo5Wy7VvYiDkpJdupoWeE1jCjP~c679uMoL8FYWV0CiUvCX~usOC6xW-ajdmYr0vTitv~z-xI3xbOelb96Qw1QCQMk3px7i9zs7JMRvYe6QpJtYngCgSMU-lRv~fQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

export function TextPageBestWriters() {
    const renderSliderItem = ({ item }: { item: WriterType }) => {
        return (
            <BestWritersSlide>
                <BestWritersSlideUserImage source={{ uri: defaultImageUri }} />
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
                    showsHorizontalScrollIndicator={false}
                />
            </BestWritersSlider>
        </BestWritersContainer>
    );
}
