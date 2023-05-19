import { useState } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from '../explore/pages/all/style';
import { Flex } from '../../styles/grid';
import { SearchBoxComponents } from './style';
import {
    ICON_ARROW_DOWN_SVG,
    ICON_ARROW_LEFT_SVG,
    ICON_SEARCH_SVG_PATH
} from '../../constaints/icons';
import { useNavigation } from '@react-navigation/native';
import { windowSize } from '../../utils/window-size';

const { width, height } = windowSize();

const { FixedStyles, ContainerStyles } = ImagesPageComponents;
const {
    SearchBoxWrapper,
    SearchInput,
    TagSearchWrapper,
    SearchTagDropDown,
    SearchTagDropDownTitle,
    DropDown
} = SearchBoxComponents;

export function SearchWindow() {
    const [showTagDropDown, setShowTagDropDown] = useState(false);

    const navigation = useNavigation();

    const showTagDropDownHandler = () => {
        setShowTagDropDown(true);
    };

    const hideTagDropDownHandler = () => {
        setShowTagDropDown(false);
    };

    const goBackHandler = () => {
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={hideTagDropDownHandler}>
            <View
                style={{
                    position: 'absolute',
                    width,
                    height,
                    top: 0,
                    zIndex: 100,
                    left: 0
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
                        style={[
                            SearchBoxWrapper,
                            { backgroundColor: 'transparent' }
                        ]}
                        align="center"
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: 22,
                                marginRight: 24,
                                marginTop: 25
                            }}
                            onPress={goBackHandler}
                        >
                            <ICON_ARROW_LEFT_SVG width={22} height={16.88} />
                        </TouchableOpacity>
                        <View
                            style={{
                                width: width - 96
                            }}
                        >
                            <ICON_SEARCH_SVG_PATH
                                width={16}
                                height={16}
                                style={{
                                    position: 'absolute',
                                    right: 16,
                                    top: 40,
                                    zIndex: 10
                                }}
                            />
                            <SearchInput
                                placeholder="Search"
                                placeholderTextColor="#353542"
                            />
                        </View>
                    </Flex>
                    <TagSearchWrapper>
                        <Flex
                            direction="row"
                            align="center"
                            justify="space-between"
                        >
                            <SearchTagDropDown activeOpacity={1}>
                                <ICON_ARROW_DOWN_SVG
                                    width={10}
                                    height={14}
                                    style={{
                                        marginTop: 2
                                    }}
                                />
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={showTagDropDownHandler}
                                >
                                    <SearchTagDropDownTitle>
                                        Tag:
                                    </SearchTagDropDownTitle>
                                </TouchableOpacity>
                                {showTagDropDown === true ? (
                                    <DropDown>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={{ marginBottom: 16 }}
                                            onPress={hideTagDropDownHandler}
                                        >
                                            <SearchTagDropDownTitle>
                                                Tag
                                            </SearchTagDropDownTitle>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={hideTagDropDownHandler}
                                        >
                                            <SearchTagDropDownTitle>
                                                Plan
                                            </SearchTagDropDownTitle>
                                        </TouchableOpacity>
                                    </DropDown>
                                ) : null}
                            </SearchTagDropDown>
                            <View
                                style={{
                                    width: width - 141
                                }}
                            >
                                <SearchInput
                                    placeholder="Search in tags"
                                    placeholderTextColor="#353542"
                                    style={{ marginTop: 0 }}
                                />
                            </View>
                        </Flex>
                    </TagSearchWrapper>
                    <ScrollView
                        style={[
                            FixedStyles,
                            {
                                backgroundColor: 'transparent',
                                paddingTop: 196
                            }
                        ]}
                    ></ScrollView>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    );
}
