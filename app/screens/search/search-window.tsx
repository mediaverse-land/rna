import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { ImagesPageComponents } from "../explore/pages/all/style";
import { Flex } from "../../styles/grid";
import { SearchBoxComponents } from "./style";
import {
    ICON_ARROW_BACK,
    ICON_ARROW_DOWN,
    ICON_SEARCH
} from "../../constaints/icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('screen')

const { FixedStyles, ContainerStyles } = ImagesPageComponents;
const {
    SearchBoxWrapper,
    SearchInput,
    SearchIcon,
    TagSearchWrapper,
    SearchTagDropDown,
    SearchTagDropDownTitle,
    DropDown
} = SearchBoxComponents

export function SearchWindow() {
    const [showTagDropDown, setShowTagDropDown] = useState(false);

    const navigation = useNavigation();

    const showTagDropDownHandler = () => {
        setShowTagDropDown(true)
    }

    const hideTagDropDownHandler = () => {
        setShowTagDropDown(false)
    }

    const goBackHandler = () => {
        navigation.goBack()
    }

    return (
        <TouchableWithoutFeedback
            onPress={hideTagDropDownHandler}>
            <View style={{
                position: 'absolute',
                width,
                height,
                top: 0,
                zIndex: 100,
                left: 0,
            }}
            >
                <LinearGradient
                    style={[ContainerStyles]}
                    colors={['#0D0D21', '#0D0D21']}
                    start={{
                        x: 0.7,
                        y: 0
                    }}
                >
                    <Flex
                        width="100%"
                        direction="row"
                        style={[SearchBoxWrapper, { backgroundColor: 'transparent' }]}
                        align="center"
                    >
                        <TouchableOpacity
                            style={{ width: 22, marginRight: 24, marginTop: 25 }}
                            onPress={goBackHandler}
                        >
                            <Image
                                source={{ uri: ICON_ARROW_BACK }}
                                style={{ width: 22, height: 16.88 }}
                            />
                        </TouchableOpacity>
                        <View
                            style={{ width: Dimensions.get('window').width - 96 }}
                        >
                            <SearchIcon source={{ uri: ICON_SEARCH }} />
                            <SearchInput
                                placeholder="Search"
                                placeholderTextColor="#353542"
                            />
                        </View>
                    </Flex>
                    <TagSearchWrapper>
                        <Flex direction="row" align="center" justify="space-between">
                            <SearchTagDropDown >
                                <Image
                                    source={{ uri: ICON_ARROW_DOWN }}
                                    style={{ width: 12, height: 14, marginBottom: 2 }}
                                />
                                <TouchableOpacity onPress={showTagDropDownHandler}>
                                    <SearchTagDropDownTitle >Tag:</SearchTagDropDownTitle>
                                </TouchableOpacity>
                                {showTagDropDown === true ?
                                    <DropDown >
                                        <TouchableOpacity
                                            style={{ marginBottom: 16 }}
                                            onPress={hideTagDropDownHandler}
                                        >
                                            <SearchTagDropDownTitle
                                            >Tag</SearchTagDropDownTitle>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={hideTagDropDownHandler}>
                                            <SearchTagDropDownTitle>Plan</SearchTagDropDownTitle>
                                        </TouchableOpacity>
                                    </DropDown> :
                                    null
                                }
                            </SearchTagDropDown>
                            <View
                                style={{ width: Dimensions.get('window').width - 141 }}
                            >
                                <SearchInput
                                    placeholder="Search in tags"
                                    placeholderTextColor="#353542"
                                    style={{ marginTop: 0 }}
                                />
                            </View>
                        </Flex>
                    </TagSearchWrapper>
                    <ScrollView style={[FixedStyles, {
                        backgroundColor: 'transparent',
                        paddingTop: 196
                    }]}>
                    </ScrollView>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    )
}