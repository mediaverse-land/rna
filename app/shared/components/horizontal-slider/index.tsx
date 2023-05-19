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
    type?: 'sound' | 'video' | 'image' | 'text';
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
                type={item.type ? item.type : 'image'}
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
