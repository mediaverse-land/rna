import { Dimensions } from 'react-native';

export function screenSize() {
    const { width, height } = Dimensions.get('screen');
    return { width, height };
}
