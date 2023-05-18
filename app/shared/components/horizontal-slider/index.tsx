import { FlatList } from 'react-native';
import { HorizontalSliderComponents } from './style';
import { HorizontalSlide } from './slide';

export type HorizontailSlideType = {
    id: number;
    title: string;
    thumbnailPath: string;
    username: string;
    profileUri: string;
    slidePressRedirectHandler?: () => void;
};

type Props = {
    data: HorizontailSlideType[];
};

const { Wrapper } = HorizontalSliderComponents;

export function HorizontalSlider({ data }: Props) {
    function slidePressRedirectHandler(id: number) {
        console.log(id);
    }

    const renderItem = ({ item }: { item: HorizontailSlideType }) => {
        return (
            <HorizontalSlide
                id={item.id}
                title={item.title}
                thumbnailPath={item.thumbnailPath}
                username={item.username}
                profileUri={item.profileUri}
                slidePressRedirectHandler={slidePressRedirectHandler}
            />
        );
    };

    return (
        <Wrapper>
            <FlatList
                data={data}
                horizontal
                keyExtractor={(item: HorizontailSlideType | any) => item.id}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </Wrapper>
    );
}
