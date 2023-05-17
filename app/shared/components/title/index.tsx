import { Image, View } from 'react-native';
import { TitleComponent } from './style';

type Props = {
    str: string;
    iconPath?: string;
};

export function Title({ str, iconPath }: Props) {
    return (
        <TitleComponent>
            {iconPath ? (
                <>
                    <Image
                        source={{ uri: iconPath }}
                        style={{ width: 16, height: 16 }}
                    />
                    <View
                        style={{ width: 8, height: 16, marginRight: 8 }}
                    ></View>
                </>
            ) : null}
            {str}
        </TitleComponent>
    );
}
