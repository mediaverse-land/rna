import { Image, TouchableOpacity } from 'react-native';
import { Flex } from '../../../styles/grid';
import { imageUriResolver } from '../../../utils/image-uri-resolver';
import ICON_ARROW_LEFT_PNG from './../../../../assets/icons/icon__arrow-left.png';
import ICON_CHECK_PNG from './../../../../assets/icons/icon__check.png';
import ICON_CHECK_ACTIVE_PNG from './../../../../assets/icons/icon__check-active.png';
import { useNavigation } from '@react-navigation/native';

type Props = {
    hasError: boolean;
};

const ICON_ARROW_LEFT = imageUriResolver(ICON_ARROW_LEFT_PNG);
const ICON_CHECK = imageUriResolver(ICON_CHECK_PNG);
const ICON_CHECK_ACTIVE = imageUriResolver(ICON_CHECK_ACTIVE_PNG);

export function CreateContentNavigationBar({ hasError }: Props) {
    const navigation = useNavigation();

    function goBackHandler() {
        navigation.goBack();
    }

    return (
        <Flex direction="row" align="center" justify="space-between">
            <TouchableOpacity onPress={goBackHandler}>
                <Image
                    source={{ uri: ICON_ARROW_LEFT }}
                    style={{
                        width: 21,
                        height: 18.09
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={{ uri: hasError ? ICON_CHECK : ICON_CHECK_ACTIVE }}
                    style={{
                        width: 23,
                        height: 16.42
                    }}
                />
            </TouchableOpacity>
        </Flex>
    );
}
