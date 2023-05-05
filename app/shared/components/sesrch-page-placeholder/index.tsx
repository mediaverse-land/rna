import { View, Image, Dimensions } from 'react-native';
import ICON_PNG from './../../../../assets/icons/icon__search-page-placeholder.png'
import { imageUriResolver } from '../../../utils/image-uri-resolver';
import { Flex } from '../../../styles/grid';
import { SearchPagePlaceholderComponents } from './style';

const ICON = imageUriResolver(ICON_PNG);

const width = Dimensions.get('window').height;

const { Text } = SearchPagePlaceholderComponents

export function SearchPagePlaceholder() {
    return (
        <View>
            <Flex
                align='center'
                justify='center'
                height={(Math.floor(width) - 300).toString()}
                style={{ flex: 1 }}
            >
                <Image
                    source={{ uri: ICON }}
                    style={{ width: 40, height: 40, marginBottom: 16 }}
                />
                <Text>
                    Search in more then
                </Text>
                <Text>
                    30.000.000 content
                </Text>
            </Flex>
        </View>
    )
}