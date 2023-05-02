import { View } from 'react-native';
import { TitleComponent } from './style';

type Props = {
    str: string;
};

export function Title({ str }: Props) {
    return (
        <View>
            <TitleComponent>{str}</TitleComponent>
        </View>
    );
}
