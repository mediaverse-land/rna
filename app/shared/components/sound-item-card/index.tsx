import { Image, View } from 'react-native';
import { SoundCardItemComponents } from './style';

type Props = {
    title: string;
    description: string;
    userAvatarPath: string;
    userName: string;
};

export function SoundItemCard({
    title,
    description,
    userAvatarPath,
    userName
}: Props) {
    return (
        <SoundCardItemComponents.Container>
            <SoundCardItemComponents.CoverBox>
                <Image
                    source={require('./../../../../assets/icons/icon__sound-white.png')}
                    style={{
                        width: 27,
                        height: 30
                    }}
                />
            </SoundCardItemComponents.CoverBox>
            <View style={{ justifyContent: 'center', paddingLeft: 8 }}>
                <SoundCardItemComponents.Title>
                    {title}
                </SoundCardItemComponents.Title>
                <SoundCardItemComponents.Description>
                    {description}
                </SoundCardItemComponents.Description>
                <SoundCardItemComponents.UserInfoBox>
                    <Image
                        source={{ uri: userAvatarPath }}
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 50
                        }}
                    />
                    <SoundCardItemComponents.UserName>
                        {userName}
                    </SoundCardItemComponents.UserName>
                </SoundCardItemComponents.UserInfoBox>
            </View>
        </SoundCardItemComponents.Container>
    );
}
