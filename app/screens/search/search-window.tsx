import { useState } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
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
import { useRtl } from '../../hooks/use-rtl';
import { theme } from '../../constaints/theme';
import { SearchParam } from '.';

type Props = {
    setSearch: (param: SearchParam) => void;
};

const { width, height } = windowSize();

const { ContainerStyles } = ImagesPageComponents;
const {
    SearchBoxWrapper,
    SearchInput,
    TagSearchWrapper,
    SearchTagDropDown,
    SearchTagDropDownTitle,
    DropDown
} = SearchBoxComponents;

const dropDownList: {
    id: number;
    title: 'Plan' | 'Tag';
}[] = [
    {
        id: 1,
        title: 'Plan'
    },
    {
        id: 2,
        title: 'Tag'
    }
];

export function SearchWindow({ setSearch }: Props) {
    const { isRtl } = useRtl();

    const [showTagDropDown, setShowTagDropDown] = useState(false);
    const [selectedItem, setSelectedItem] = useState<'Plan' | 'Tag'>('Plan');

    const [searchParams, setSearchParams] = useState<SearchParam>({
        type: null,
        plan: null,
        name: null,
        tag: null
    });

    const navigation = useNavigation();

    const showTagDropDownHandler = () => {
        setShowTagDropDown(true);
    };

    const hideTagDropDownHandler = (item?: 'Plan' | 'Tag') => {
        if (item) {
            setSelectedItem(item);
        }
        setShowTagDropDown(false);
    };

    const goBackHandler = () => {
        navigation.goBack();
    };

    const submitHandler = () => {
        setSearch(searchParams);
    };

    const setNameToSearchHandler = (name: string) => {
        setSearchParams({ ...searchParams, name: name });
    };

    const setPlanHandler = (plan: string) => {
        setSearchParams({ ...searchParams, plan });
    };

    const setTagHandler = (tag: string) => {
        setSearchParams({ ...searchParams, tag });
    };

    return (
        <TouchableWithoutFeedback onPress={() => hideTagDropDownHandler(null)}>
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
                            <ICON_ARROW_LEFT_SVG
                                width={22}
                                height={16.88}
                                style={{
                                    transform: [
                                        { rotate: isRtl ? '180deg' : '0deg' }
                                    ]
                                }}
                            />
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
                                placeholderTextColor={
                                    theme.color.light.INPUT_PLACEHOLDER
                                }
                                onSubmitEditing={submitHandler}
                                onChangeText={setNameToSearchHandler}
                                textAlign={isRtl ? 'right' : 'left'}
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
                                        {selectedItem}:
                                    </SearchTagDropDownTitle>
                                </TouchableOpacity>
                                {showTagDropDown === true ? (
                                    <DropDown>
                                        {dropDownList.map((l) => (
                                            <TouchableOpacity
                                                key={l.id}
                                                activeOpacity={1}
                                                style={{ marginBottom: 16 }}
                                                onPress={() =>
                                                    hideTagDropDownHandler(
                                                        l.title
                                                    )
                                                }
                                            >
                                                <SearchTagDropDownTitle>
                                                    {l.title}
                                                </SearchTagDropDownTitle>
                                            </TouchableOpacity>
                                        ))}
                                    </DropDown>
                                ) : null}
                            </SearchTagDropDown>
                            <View
                                style={{
                                    width: width - 141
                                }}
                            >
                                <SearchInput
                                    placeholder={`Search in ${selectedItem.toLocaleLowerCase()}s`}
                                    placeholderTextColor={
                                        theme.color.light.INPUT_PLACEHOLDER
                                    }
                                    style={{ marginTop: 0 }}
                                    textAlign={isRtl ? 'right' : 'left'}
                                    onChangeText={(text) => {
                                        selectedItem === 'Plan'
                                            ? setPlanHandler(text)
                                            : setTagHandler(text);
                                    }}
                                    defaultValue={
                                        selectedItem === 'Plan'
                                            ? searchParams.plan
                                            : searchParams.tag
                                    }
                                    onSubmitEditing={submitHandler}
                                />
                            </View>
                        </Flex>
                    </TagSearchWrapper>
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    );
}
