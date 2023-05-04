import { Image, ImageSourcePropType } from 'react-native';

export function imageUriResolver(iconPath: ImageSourcePropType) {
    const uri = Image.resolveAssetSource(iconPath).uri;

    return uri;
}
