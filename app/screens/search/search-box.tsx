import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SearchBoxComponents } from "./style";
import { Flex } from "../../styles/grid";
import { ICON_ARROW_BACK, ICON_SEARCH, ICON_SETTINGS } from "../../constaints/icons";

const {
    SearchBoxWrapper,
    SearchInput,
    SearchIcon,
    AdvancedSearchIconButton
} = SearchBoxComponents


export function SearchBox() {
    return (
        <Flex
            width="100%"
            direction="row"
            style={SearchBoxWrapper}
            align="center"
        >
            <TouchableOpacity style={{ width: 22, marginRight: 24, marginTop: 25 }}>
                <Image
                    source={{ uri: ICON_ARROW_BACK }}
                    style={{ width: 22, height: 16.88 }}
                />
            </TouchableOpacity>
            <View
                style={{ width: Dimensions.get('window').width - 150 }}
            >
                <SearchIcon source={{ uri: ICON_SEARCH }} />
                <SearchInput
                    placeholder="Search"
                    placeholderTextColor="#353542"
                />
            </View>
            <AdvancedSearchIconButton style={{
                marginTop: 25
            }}>
                <Image
                    source={{ uri: ICON_SETTINGS }}
                    style={{ width: 19.62, height: 20 }}
                />
            </AdvancedSearchIconButton>
        </Flex>
    )
}