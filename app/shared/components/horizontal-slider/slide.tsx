import { View } from "react-native";
import { HorizontalSliderComponents } from "./style";
import { UserNameCard } from "../username-card";
import { HORIZONTAL_SLIDER_GRADIENT } from "../../../constaints/images";

type Props = {
    slidePressRedirectHandler: (id: number) => void,
    title: string;
    thumbnailPath: string;
    username: string;
    profileUri: string;
    id: number
}

const {
    Slide,
    SliderThumbnailGradient,
    SlideThumbnail,
    SlideTitle,
} = HorizontalSliderComponents;

export function HorizontalSlide(
    {
        slidePressRedirectHandler,
        title,
        thumbnailPath,
        profileUri,
        username,
        id
    }: Props
) {
    return (
        <Slide
            onPress={() => slidePressRedirectHandler(id)}
        >
            <View>
                <SlideThumbnail
                    source={{ uri: thumbnailPath }}
                />
                <SliderThumbnailGradient
                    source={{ uri: HORIZONTAL_SLIDER_GRADIENT }}
                />
            </View>
            <View>
                <SlideTitle>{title}</SlideTitle>
            </View>
            <View style={{ marginTop: 8 }}>
                <UserNameCard
                    username={username}
                    profileUri={profileUri}
                    width={16}
                    height={16}
                    profileImageStyles={{ marginRight: 8 }}
                    usernameStyles={{ color: '#666680', fontSize: 12 }}
                />
            </View>
        </Slide>
    )
}