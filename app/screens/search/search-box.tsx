import { TouchableOpacity, View } from 'react-native';
import { SearchBoxComponents } from './style';
import { Flex } from '../../styles/grid';
import {
    ICON_ARROW_DOWN_SVG,
    ICON_ARROW_LEFT_SVG,
    ICON_ARROW_UP,
    ICON_PROFILE_SETTINGS_SVG,
    ICON_SEARCH_SVG_PATH
} from '../../constaints/icons';
import { windowSize } from '../../utils/window-size';
import { useRtl } from '../../hooks/use-rtl';
import { theme } from '../../constaints/theme';
import { UseNavigationType } from '../../types/use-navigation';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Box } from '../../components/box';
import { SearchParam } from '.';

type Props = {
    setSearch: (param: SearchParam) => void;
    defaultSearchParams: SearchParam;
};

const { width } = windowSize();

const {
    SearchBoxWrapper,
    SearchInput,
    AdvancedSearchIconButton,
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

export function SearchBox({ setSearch, defaultSearchParams }: Props) {
    const { isRtl } = useRtl();
    const navigation = useNavigation<UseNavigationType>();

    const [showModifyWindow, setShowModifyWindow] = useState(false);
    const [selectedItem, setSelectedItem] = useState<'Plan' | 'Tag'>('Plan');
    const [showTagDropDown, setShowTagDropDown] = useState(false);

    const [searchParams, setSearchParams] = useState<SearchParam>({
        type: null,
        plan: null,
        name: null,
        tag: null
    });

    const { name, tag, plan } = defaultSearchParams;

    useEffect(() => {
        if (plan) {
            setSearchParams({ ...searchParams, plan });
        }
        if (tag) {
            setSearchParams({ ...searchParams, tag });
        }
    }, []);

    const goBackHandler = () => {
        navigation.goBack();
    };

    const showModifyWindowHandler = () => {
        setShowModifyWindow(!showModifyWindow);
    };

    const showTagDropDownHandler = () => {
        setShowTagDropDown(true);
    };

    const hideTagDropDownHandler = (item?: 'Plan' | 'Tag') => {
        if (item) {
            setSelectedItem(item);
        }
        setShowTagDropDown(false);
    };

    const setPlanHandler = (plan: string) => {
        // Reset tag
        setSearchParams({ ...searchParams, tag: null, plan });
    };

    const setTagHandler = (tag: string) => {
        // Reset plan
        setSearchParams({ ...searchParams, plan: null, tag });
    };

    const setNameToSearchHandler = (name: string) => {
        setSearchParams({ ...searchParams, name: name });
    };

    const submitHandler = () => {
        setSearch(searchParams);
    };
    return (
        <>
            <Flex
                width="100%"
                direction="row"
                style={SearchBoxWrapper}
                align="center"
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ width: 22, marginRight: 24, marginTop: 25 }}
                    onPress={goBackHandler}
                >
                    <ICON_ARROW_LEFT_SVG style={{ width: 22, height: 16.88 }} />
                </TouchableOpacity>
                <View style={{ width: width - 150 }}>
                    <ICON_SEARCH_SVG_PATH
                        style={{
                            width: 16,
                            height: 16,
                            position: 'absolute',
                            top: 40,
                            right: 24,
                            zIndex: 12
                        }}
                    />
                    <SearchInput
                        placeholder="Search"
                        placeholderTextColor={
                            theme.color.light.INPUT_PLACEHOLDER
                        }
                        textAlign={isRtl ? 'right' : 'left'}
                        onSubmitEditing={submitHandler}
                        onChangeText={setNameToSearchHandler}
                        defaultValue={name || ''}
                    />
                </View>
                <AdvancedSearchIconButton
                    activeOpacity={1}
                    style={{
                        marginTop: 25
                    }}
                    onPress={showModifyWindowHandler}
                >
                    {showModifyWindow ? (
                        <ICON_ARROW_UP />
                    ) : (
                        <ICON_PROFILE_SETTINGS_SVG
                            style={{ width: 19.62, height: 20 }}
                        />
                    )}
                </AdvancedSearchIconButton>
            </Flex>
            {showModifyWindow ? (
                <Box
                    width="100%"
                    height={70}
                    position="relative"
                    top={120}
                    zIndex={100}
                    backgroundColor="#0e0e12a0"
                    paddingLeft={24}
                    paddingRight={24}
                >
                    <TouchableOpacity activeOpacity={1}>
                        <Box width="100%" height={48}>
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
                        </Box>
                    </TouchableOpacity>
                </Box>
            ) : null}
        </>
    );
}
