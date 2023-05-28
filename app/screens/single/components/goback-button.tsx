import { FC } from 'react';
import { SingleVideoPageComponents } from '../style';
import { ICON_ARROW_LEFT_WHITE } from '../../../constaints/icons';
import { TouchableOpacity } from 'react-native';

type Props = {
    goBackHandler: () => void;
    hasBackground?: boolean;
};
const { BackButton } = SingleVideoPageComponents;

export const GoBackButton: FC<Props> = ({ goBackHandler, hasBackground }) => {
    if (!hasBackground) {
        return (
            <TouchableOpacity
                onPress={goBackHandler}
                style={{
                    position: 'absolute',
                    top: 40,
                    left: 24,
                    zIndex: 10
                }}
            >
                <ICON_ARROW_LEFT_WHITE
                    style={{
                        width: 20,
                        height: 15.5
                    }}
                />
            </TouchableOpacity>
        );
    } else {
        return (
            <BackButton onPress={goBackHandler}>
                <ICON_ARROW_LEFT_WHITE
                    style={{
                        width: 20,
                        height: 15.5
                    }}
                />
            </BackButton>
        );
    }
};
