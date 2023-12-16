import { useDispatch, useSelector } from 'react-redux';
import { UseNavigationType } from '../../../types/use-navigation';
import { screenSize } from '../../../utils/screen-size';
import { AppDispatch, RootState } from '../../../store';
import { useMemo, useState } from 'react';
import { debounce } from '../../../utils/debounce';
import { setSearchParams } from '../../../slices/live.slice';
import { Box } from '../../../components/box';
import { TextInput, TouchableOpacity } from 'react-native';
import {
  ICON_ARROW_LEFT_SVG,
  ICON_ARROW_UP,
  ICON_FILTER,
  ICON_SEARCH_WHITE,
} from '../../../constaints/icons';
import { AllLiveStyles } from '../styles';
import { theme } from '../../../constaints/theme';
import { RenderIfWithoutLoading } from '../../../components/render-if-without-loading';
import { AllLiveComponents } from '.';

const { width: WINDOW_WIDTH } = screenSize();
const { searchInput, magnetIcon } = AllLiveStyles;

const seatch_input_width = Math.floor(WINDOW_WIDTH) - 48 - 22 - 48 - 32;

type SearchBarProps = {
  openSelectLanguageModalHandler: () => void;
  openSelectCountryModalHandler: () => void;
  navigation: UseNavigationType;
};

export const AllLivesSearchBar = ({
  openSelectCountryModalHandler,
  navigation,
  openSelectLanguageModalHandler,
}: SearchBarProps) => {
  const { search_params } = useSelector((state: RootState) => state.liveSlice);

  const dispatch = useDispatch<AppDispatch>();

  const [showModifyWiew, setShowModifyWiew] = useState(false);

  const goBackHandler = () => {
    navigation.goBack();
  };

  const toggleModifyView = () => {
    setShowModifyWiew((prev) => !prev);
  };

  const handleTextChange = useMemo(
    () =>
      debounce((title: string) => {
        dispatch(setSearchParams({ title: title }));
      }, 1000),
    [],
  );

  return (
    <Box width="100%" height={!showModifyWiew ? 96 : 210} backgroundColor="#4E4E6180">
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
            onChangeText={handleTextChange}
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
          <AllLiveComponents.MetaSearchItem
            title={search_params?.selectedCountry || 'Country'}
            pressHandler={openSelectCountryModalHandler}
          />
          <AllLiveComponents.MetaSearchItem
            title={search_params?.selectedLanguage || 'Language'}
            pressHandler={openSelectLanguageModalHandler}
          />
        </Box>
      </RenderIfWithoutLoading>
    </Box>
  );
};
