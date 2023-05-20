import { View } from 'react-native';
import { TitleComponent } from './style';

import { SvgUri } from 'react-native-svg';

type Props = {
    str: string;
    iconPath?: string;
};

export function Title({ str, iconPath }: Props) {

    return (
        <TitleComponent>
            {iconPath ? (
                <>
                    <SvgUri uri={iconPath} width={16} height={16} />
                    <View
                        style={{ width: 8, height: 16, marginRight: 8 }}
                    ></View>
                </>
            ) : null}
            {str}
        </TitleComponent>
    );
}
