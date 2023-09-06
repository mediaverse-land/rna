import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FocusedStatusBar } from "../../components/focused-statusbar";
import { LinearGradient } from "expo-linear-gradient";
import { VirtualizedList } from "../../components/virtualized-list";
import { stickyStyles } from "../../styles/sticky";
import { Flex, PaddingContainer } from "../../styles/grid";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import {
  ICON_ARROW_LEFT_SVG,
  ICON_ARROW_UP,
  ICON_FILTER,
  ICON_LIVE_CHANNELS,
  ICON_PROFILE_SETTINGS_SVG,
  ICON_SEARCH_SVG_PATH,
  ICON_SEARCH_WHITE,
} from "../../constaints/icons";
import { theme } from "../../constaints/theme";
import { useRtl } from "../../hooks/use-rtl";
import { SearchBoxComponents } from "../search/style";
import { screenSize } from "../../utils/screen-size";
import { AllLiveComponents } from "./components";
import { Box } from "../../components/box";
import { AllLiveStyles } from "./styles";
import { Text } from "../../components/text";
import { RenderIfWithoutLoading } from "../../components/render-if-without-loading";
import SelectLanguageBottomSheet from "../../components/select-language";
import SelectCountryBottomSheet from "../../components/select-country";
import { ModalBottomSheet } from "../../components/bottom-sheet-modal";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useClickOutside } from "react-native-click-outside";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { clearSearchParams, setSearchParams } from "../../slices/live.slice";
import { useGetSearchLiveQuery } from "../../services/live.service";
import { Live } from "../../types/live";
import { FlashList } from "@shopify/flash-list";
import { RenderIf } from "../../components/render-if";
import { UseNavigationType } from "../../types/use-navigation";
import { SINGLE_LIVE_SCREEN } from "../../constaints/consts";

const { searchInput, magnetIcon } = AllLiveStyles;

const { width: WINDOW_WIDTH } = screenSize();

export const AllSLivescreen = () => {
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const navigation = useNavigation<UseNavigationType>();

  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if(!isFocused){
      dispatch(clearSearchParams())
    }
  },[isFocused])

  const selectLanguageRef = useRef(null);
  const selectCountryRef = useRef(null);

  const innerSelectLanguageBottomSheet = useClickOutside<View>(() => {
    // setOpenReportModal(false);
    selectLanguageRef?.current.close();
  });
  const innerSelectCountryBottomSheet = useClickOutside<View>(() => {
    // setOpenReportModal(false);
    selectCountryRef?.current.close();
  });

  const openSelectCountryModal = () => {
    selectCountryRef?.current?.open();
  };

  const openSelectLanguageModal = () => {
    selectLanguageRef?.current?.open();
  };

  const setSelectedLanguage = (lang: string) => {
    dispatch(setSearchParams({ lang }));
    selectLanguageRef?.current.close();
  };

  const setSelectedCountry = (country: string) => {
    dispatch(setSearchParams({ country }));
    selectCountryRef?.current.close();
  };

  return (
    <>
      <AllLiveComponents.Wrapper>
        <SearchBar
          navigation={navigation}
          openSelectCountryModalHandler={openSelectCountryModal}
          openSelectLanguageModalHandler={openSelectLanguageModal}
        />

        <List navigation={navigation} />
      </AllLiveComponents.Wrapper>

      {/* Select language modal */}
      <ModalBottomSheet ref={selectLanguageRef} snapPoints={snapPoints}>
        <View
          ref={innerSelectLanguageBottomSheet}
          style={{
            marginBottom: 200,
            flex: 1,
            height: 1000,
          }}
        >
          <SelectLanguageBottomSheet
            isFocused={isFocused}
            setSelectedLanguage={setSelectedLanguage}
          />
        </View>
      </ModalBottomSheet>

      {/* Select country modal */}
      <ModalBottomSheet ref={selectCountryRef} snapPoints={snapPoints}>
        <View
          ref={innerSelectCountryBottomSheet}
          style={{
            marginBottom: 200,
            flex: 1,
            height: 1000,
          }}
        >
          <SelectCountryBottomSheet
            isFocused={isFocused}
            setSelectedCountry={setSelectedCountry}
          />
        </View>
      </ModalBottomSheet>
    </>
  );
};

const List = ({ navigation }: { navigation: UseNavigationType }) => {
  const { search_params } = useSelector((state: RootState) => state.liveSlice);

  const { data, isLoading, isFetching } = useGetSearchLiveQuery({
    lang: search_params?.selectedLanguage?.toLowerCase() || null,
    country: search_params?.selectedCountry?.toLowerCase() || null,
  });
  const navigateToLivePage = (id: number) => {
    navigation.navigate(SINGLE_LIVE_SCREEN, {
      id,
    });
  };

  
  const renderItem = ({ item }: { item: Live }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigateToLivePage(item.id)}
      >
        <Box
          borderRadius={16}
          width="100%"
          marginBottom={8}
          backgroundColor="rgba(78, 78, 97, 0.50)"
          borderColor="#CFCFFC4D"
          position="relative"
          direction="row"
          alignItems="center"
          padding={16}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: 88, height: 48, borderRadius: 8 }}
          />
          <Box marginLeft={16}>
            <Text
              color={theme.color.light.WHITE}
              fontWeight={600}
              fontSize={16}
              lineHeight={16}
            >
              {item.title}
            </Text>

            <Text
              marginTop={8}
              color={theme.color.light.TEXT}
              fontWeight={400}
              fontSize={12}
              lineHeight={16}
            >
              {item.country}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = useCallback((item: Live) => item.id.toString(), []);

  return (
    <Box width="100%" flex={1}>
      <Box
        id="title"
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop={28}
      >
        <ICON_LIVE_CHANNELS
          style={{
            marginRight: 8,
          }}
        />
        <Text
          color={theme.color.light.WHITE}
          fontWeight={600}
          fontSize={16}
          lineHeight={16}
        >
          live channel
        </Text>
      </Box>
      <Box id="list" marginTop={32}>
        <PaddingContainer>
          <RenderIf condition={isLoading || isFetching}>
            {data?.length ? (
              <FlashList
                data={data}
                keyExtractor={_keyExtractor}
                renderItem={renderItem}
                estimatedItemSize={25}
              />
            ) : null}
            <Box width='100%' height={150}></Box>
          </RenderIf>
        </PaddingContainer>
      </Box>
    </Box>
  );
};

const seatch_input_width = Math.floor(WINDOW_WIDTH) - 48 - 22 - 48 - 32;

type SearchBarProps = {
  openSelectLanguageModalHandler: () => void;
  openSelectCountryModalHandler: () => void;
  navigation: UseNavigationType;
};

const SearchBar = ({
  openSelectCountryModalHandler,
  navigation,
  openSelectLanguageModalHandler,
}: SearchBarProps) => {
  const { search_params } = useSelector((state: RootState) => state.liveSlice);

  const [showModifyWiew, setShowModifyWiew] = useState(false);

  const goBackHandler = () => {
    navigation.goBack();
  };

  const toggleModifyView = () => {
    setShowModifyWiew((prev) => !prev);
  };

  return (
    <Box
      width="100%"
      height={!showModifyWiew ? 96 : 210}
      backgroundColor="#4E4E6180"
    >
      <Box
        direction="row"
        height={96}
        paddingTop={24}
        paddingRight={24}
        paddingLeft={24}
        justifyContent="space-between"
      >
        <Box paddingTop={17}>
          <TouchableOpacity activeOpacity={1} onPress={goBackHandler}>
            <ICON_ARROW_LEFT_SVG width={22} height={16.88} />
          </TouchableOpacity>
        </Box>
        <Box
          width={seatch_input_width}
          height={48}
          paddingLeft={8}
          id="main-search-input"
          position="relative"
        >
          <TextInput
            style={searchInput}
            placeholderTextColor={theme.color.light.LIGHT_TEXT}
          />
          <ICON_SEARCH_WHITE style={magnetIcon} />
        </Box>
        <TouchableOpacity activeOpacity={1} onPress={toggleModifyView}>
          <Box
            width={48}
            height={48}
            borderColor={theme.color.light.INPUT_PLACEHOLDER}
            borderRadius={16}
            backgroundColor={theme.color.light.ALL_LIVE_SEARCH_INPUT_BG}
            alignItems="center"
            justifyContent="center"
          >
            {!showModifyWiew ? <ICON_FILTER /> : <ICON_ARROW_UP />}
          </Box>
        </TouchableOpacity>
      </Box>
      <RenderIfWithoutLoading condition={showModifyWiew}>
        <Box id="modify-view" position="relative" top={-16} width="100%">
          <MetaSearchItem
            title={search_params?.selectedCountry || "Country"}
            pressHandler={openSelectCountryModalHandler}
          />
          <MetaSearchItem
            title={search_params?.selectedLanguage || "Language"}
            pressHandler={openSelectLanguageModalHandler}
          />
        </Box>
      </RenderIfWithoutLoading>
    </Box>
  );
};

type MetaSearchItemProps = { title: string; pressHandler: () => void };

const MetaSearchItem = ({ title, pressHandler }: MetaSearchItemProps) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
      activeOpacity={1}
      onPress={pressHandler}
    >
      <Box
        width={seatch_input_width - 8}
        height={49}
        borderRadius={16}
        backgroundColor="#0E0E1280"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingRight={12}
        paddingLeft={12}
        // position="absolute"
        marginBottom={8}
        right={88}
      >
        <Text color="#fff" lineHeight={16.94} fontSize={14}>
          {title}
        </Text>
        <ICON_ARROW_UP style={{ transform: [{ rotate: "180deg" }] }} />
      </Box>
    </TouchableOpacity>
  );
};
