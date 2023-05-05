import { useState } from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Flex, PaddingContainer } from '../../styles/grid';
import { SearchBoxComponents } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { imageUriResolver } from '../../utils/image-uri-resolver';
import ICON_SEARCH_PNG from './../../../assets/icons/icon__search.png';
import ICON_SEARCH_X_PNG from './../../../assets/icons/icon__x.png';
import ICON_ARROW_DOWN_PNG from './../../../assets/icons/icon__arrow-down.png';
import { searchPageConstaints } from './constaints';

const ICON_SEARCH = imageUriResolver(ICON_SEARCH_PNG);
const ICON_SEARCH_X = imageUriResolver(ICON_SEARCH_X_PNG);
const ICON_ARROW_DOWN = imageUriResolver(ICON_ARROW_DOWN_PNG);

const windowWidth = Dimensions.get('window').width;

const {
    Container,
    Wrapper,
    MainSearchInputWrapper,
    SearchIconWrapper,
    BorderIndicator,
    AdvancedSearchHeader,
    AdvancedSearchHeaderText,
    AdvancedSearchWrapper,
    SearchGroupItem,
    DetailSearchBox,
    SearchInput,
    Label
} = SearchBoxComponents;

export function SearchBox() {
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

    function toggleSearchBarHandler() {
        setIsSearchBarOpen(!isSearchBarOpen);
    }

    return (
        <Container height={!isSearchBarOpen ? '148px' : '310px'}>
            <PaddingContainer>
                <Wrapper>
                    <MainSearchInputWrapper
                        style={{ width: Math.floor(windowWidth) - 111 }}
                    >
                        <View style={{ height: 56 }}>
                            <SearchInput
                                placeholder={
                                    searchPageConstaints.mainInputPlaceholder
                                }
                            />
                            <Image
                                source={{ uri: ICON_SEARCH }}
                                style={{
                                    width: 18,
                                    height: 18,
                                    position: 'absolute',
                                    right: 19,
                                    top: 19
                                }}
                            />
                        </View>
                    </MainSearchInputWrapper>
                    <SearchIconWrapper>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: ICON_SEARCH_X }}
                                style={{ width: 20, height: 20 }}
                            />
                        </TouchableOpacity>
                    </SearchIconWrapper>
                </Wrapper>

                <BorderIndicator style={{ marginTop: 12 }} />
                <AdvancedSearchWrapper style={{ height: 48 }}>
                    <AdvancedSearchHeader>
                        <Flex
                            direction="row"
                            align="center"
                            justify="space-between"
                            height="48"
                        >
                            <AdvancedSearchHeaderText>
                                Advance search
                            </AdvancedSearchHeaderText>
                            <TouchableOpacity onPress={toggleSearchBarHandler}>
                                <Image
                                    source={{ uri: ICON_ARROW_DOWN }}
                                    style={{ width: 18, height: 9.64 }}
                                />
                            </TouchableOpacity>
                        </Flex>
                    </AdvancedSearchHeader>
                    {isSearchBarOpen ? (
                        <>
                            <DetailSearchBox>
                                {/* SearchGroupItem start */}
                                <SearchGroupItem>
                                    <Flex
                                        direction="row"
                                        align="center"
                                        justify="space-between"
                                        height="56"
                                    >
                                        <View style={{ width: 56 }}>
                                            <Label>Tag:</Label>
                                        </View>
                                        <View
                                            style={{
                                                width:
                                                    Math.floor(windowWidth) -
                                                    111
                                            }}
                                        >
                                            <SearchInput
                                                placeholder={
                                                    searchPageConstaints.tagInputPlaceholder
                                                }
                                            />
                                        </View>
                                    </Flex>
                                </SearchGroupItem>
                                <SearchGroupItem style={{ marginTop: 16 }}>
                                    <Flex
                                        direction="row"
                                        align="center"
                                        justify="space-between"
                                        height="56"
                                    >
                                        <View style={{ width: 56 }}>
                                            <Label>Plan:</Label>
                                        </View>
                                        <View
                                            style={{
                                                width:
                                                    Math.floor(windowWidth) -
                                                    111
                                            }}
                                        >
                                            <SearchInput
                                                placeholder={
                                                    searchPageConstaints.planInputPlaceholder
                                                }
                                            />
                                        </View>
                                    </Flex>
                                </SearchGroupItem>
                                {/* SearchGroupItem end */}
                            </DetailSearchBox>
                        </>
                    ) : null}
                </AdvancedSearchWrapper>
            </PaddingContainer>
        </Container>
    );
}
