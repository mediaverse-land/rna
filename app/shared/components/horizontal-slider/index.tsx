import { FlatList } from "react-native";
import { HorizontalSliderComponents } from "./style";
import { HorizontalSlide } from "./slide";

type Props = {
    data: any
}

const { Wrapper } = HorizontalSliderComponents

export function HorizontalSlider({ data }: Props) {
    function slidePressRedirectHandler(id: number) {
        console.log(id)
    }

    const renderItem = ({ item }: any) => {
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
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
            />
        </Wrapper>
    )
}