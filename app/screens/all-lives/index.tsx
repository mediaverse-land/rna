import React, { useEffect, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useClickOutside } from 'react-native-click-outside';
import { AllLiveComponents } from './components';
import SelectLanguageBottomSheet from '../../components/select-language';
import SelectCountryBottomSheet from '../../components/select-country';
import { ModalBottomSheet } from '../../components/bottom-sheet-modal';
import { AppDispatch } from '../../store';
import { clearSearchParams, setSearchParams } from '../../slices/live.slice';
import { UseNavigationType } from '../../types/use-navigation';

export const AllSLivescreen = () => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const navigation = useNavigation<UseNavigationType>();

  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      dispatch(clearSearchParams());
    }
  }, [isFocused]);

  const selectLanguageRef = useRef(null);
  const selectCountryRef = useRef(null);

  const innerSelectLanguageBottomSheet = useClickOutside<View>(() => {
    selectLanguageRef?.current.close();
  });
  const innerSelectCountryBottomSheet = useClickOutside<View>(() => {
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
        <AllLiveComponents.SearchBar
          navigation={navigation}
          openSelectCountryModalHandler={openSelectCountryModal}
          openSelectLanguageModalHandler={openSelectLanguageModal}
        />

        <AllLiveComponents.List navigation={navigation} />
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
          <SelectCountryBottomSheet isFocused={isFocused} setSelectedCountry={setSelectedCountry} />
        </View>
      </ModalBottomSheet>
    </>
  );
};
