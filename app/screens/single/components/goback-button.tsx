import { FC } from 'react';
import { SingleVideoPageComponents } from '../style';
import { ICON_ARROW_LEFT_WHITE } from '../../../constaints/icons';
import { TouchableOpacity } from 'react-native';
import { useRtl } from '../../../hooks/use-rtl';

type Props = {
    goBackHandler: () => void;
    hasBackground?: boolean;
};
const { BackButton } = SingleVideoPageComponents;

export const GoBackButton: FC<Props> = ({ goBackHandler, hasBackground }) => {
    const { isRtl } = useRtl();

    if (!hasBackground) {
        return (
            <TouchableOpacity
                activeOpacity={1}
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
                        height: 15.5,
                        transform: [{ rotate: isRtl ? '180deg' : '0deg' }]
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
                        height: 15.5,
                        transform: [{ rotate: isRtl ? '180deg' : '0deg' }]
                    }}
                />
            </BackButton>
        );
    }
};
