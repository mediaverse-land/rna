import { Image, View } from "react-native";
import { TextCardItemComponents } from "./style";

type Props = {
    title: string
    description: string
    userAvatarPath: string
    userName: string
}

export function TextItemCard({ title, description, userAvatarPath, userName }: Props) {
    return (
        <TextCardItemComponents.Container>
            <TextCardItemComponents.CoverBox>
                <Image
                    source={require('./../../../../assets/icons/icon__sound-white.png')}
                    style={{
                        width: 27,
                        height: 30
                    }}
                />
            </TextCardItemComponents.CoverBox>
            <View style={{ justifyContent: 'center', paddingLeft: 8 }}>
                <TextCardItemComponents.Title>{title}</TextCardItemComponents.Title>
                <TextCardItemComponents.Description>{description}</TextCardItemComponents.Description>
                <TextCardItemComponents.UserInfoBox>
                    <Image
                        source={{ uri: userAvatarPath }}
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 50
                        }}
                    />
                    <TextCardItemComponents.UserName>{userName}</TextCardItemComponents.UserName>
                </TextCardItemComponents.UserInfoBox>
            </View>
        </TextCardItemComponents.Container>
    )
}