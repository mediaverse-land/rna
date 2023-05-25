import { Image, TouchableOpacity, View } from 'react-native';
import { SearchBoxComponents } from './style';
import { Flex } from '../../styles/grid';
import { ICON_ARROW_LEFT_SVG, ICON_PROFILE_SETTINGS_SVG, ICON_SEARCH_SVG_PATH } from '../../constaints/icons';
import { windowSize } from '../../utils/window-size';

const { width } = windowSize();

const { SearchBoxWrapper, SearchInput, SearchIcon, AdvancedSearchIconButton } =
    SearchBoxComponents;

export function SearchBox() {
    return (
        <Flex
            width="100%"
            direction="row"
            style={SearchBoxWrapper}
            align="center"
        >
            <TouchableOpacity
                activeOpacity={1}
                style={{ width: 22, marginRight: 24, marginTop: 25 }}
            >
                <ICON_ARROW_LEFT_SVG
                    style={{ width: 22, height: 16.88 }}
                />

                {/* <Image
                    source={{ uri: ICON_ARROW_BACK }}
                    style={{ width: 22, height: 16.88 }}
                /> */}
            </TouchableOpacity>
            <View style={{ width: width - 150 }}>
                <ICON_SEARCH_SVG_PATH
                    style={{
                        width: 16,
                        height: 16,
                        position: 'absolute',
                        top: 40,
                        right: 24,
                        zIndex: 12,
                    }}
                />
                {/* <SearchIcon source={{ uri: ICON_SEARCH }} /> */}
                <SearchInput
                    placeholder="Search"
                    placeholderTextColor="#353542"
                />
            </View>
            <AdvancedSearchIconButton
                style={{
                    marginTop: 25
                }}
            >
                <ICON_PROFILE_SETTINGS_SVG style={{ width: 19.62, height: 20 }} />
                {/* <Image
                    source={{ uri: ICON_SETTINGS }}
                    
                /> */}
            </AdvancedSearchIconButton>
        </Flex>
    );
}
