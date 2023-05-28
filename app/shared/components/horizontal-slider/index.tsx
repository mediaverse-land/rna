import { FlatList } from 'react-native';
import { HorizontalSliderComponents } from './style';
import { HorizontalSlide } from './slide';
import { useNavigation } from '@react-navigation/native';

type ContentType = 'sound' | 'video' | 'image' | 'text';

export type HorizontailSlideType = {
    id: number;
    title: string;
    thumbnailPath: string;
    username: string;
    profileUri: string;
    slidePressRedirectHandler?: () => void;
    type?: ContentType;
};

type Props = {
    data: HorizontailSlideType[];
    navigationScreenName?: string;
    isRtl?: boolean
};

const { Wrapper } = HorizontalSliderComponents;

const contentTypeMapperToScreenMapper = (type: ContentType) => {
    const screens = {
        sound: 'SingleSoundScreen',
        image: 'SingleImageScreen',
        video: 'SingleVideoScreen',
        text: 'SingleTextScreen'
    };

    return screens[type] || null;
};

type UseNavigationProps = {
    navigate: (title: string, options: Record<string, string>) => void;

};

export function HorizontalSlider({ data, isRtl }: Props) {
    const navigation = useNavigation<UseNavigationProps>();

    function slidePressRedirectHandler(
        title: string,
        contentType: ContentType
    ) {
        const screen = contentTypeMapperToScreenMapper(contentType);

        if (screen) {
            navigation.navigate(screen, {
                title
            });
        }
    }

    const renderItem = ({ item }: { item: HorizontailSlideType }) => {
        return (
            <HorizontalSlide
                id={item.id}
                title={item.title}
                thumbnailPath={item.thumbnailPath}
                username={item.username}
                profileUri={item.profileUri}
                slidePressRedirectHandler={() =>
                    slidePressRedirectHandler(item.title, item.type)
                }
                type={item.type ? item.type : 'image'}
                isRtl={isRtl}
            />
        );
    };

    const keyExtractor = (item: HorizontailSlideType) => item.id.toString();

    return (
        <Wrapper>
            <FlatList
                data={data}
                horizontal
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </Wrapper>
    );
}
