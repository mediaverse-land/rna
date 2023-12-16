import { memo, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import SelectLanguageBottomSheet from './../../../components/select-language';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../components/box';
import { AppDispatch, RootState } from '../../../store';
import { closeSelectLanguageBottomSheet, setSelectedLanguage } from '../../../slices/plus.slice';

const SelectLanguageMemo = () => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch<AppDispatch>();

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const { isSelectLanguageBottomSheetOpen } = useSelector((state: RootState) => state.plusSlice);

  const selectLanguageRef = useRef(null);

  const closeBottomSheetHandler = () => {
    dispatch(closeSelectLanguageBottomSheet());
  };

  const _selectLanguageHandler = (lang: string) => {
    dispatch(setSelectedLanguage(lang));
    dispatch(closeSelectLanguageBottomSheet());
  };

  return (
    <>
      {isSelectLanguageBottomSheetOpen ? (
        <BottomSheet
          snapPoints={snapPoints}
          ref={selectLanguageRef}
          onClose={closeBottomSheetHandler}
          enablePanDownToClose
          handleComponent={null}
          backgroundStyle={{
            backgroundColor: theme.color.light.ADD_ACCOUNT_MODAL_BAKGROUND,
          }}
        >
          <BottomSheetView>
            <Box width="100%" height={400}>
              <SelectLanguageBottomSheet
                isFocused={isFocused}
                setSelectedLanguage={_selectLanguageHandler}
              />
            </Box>
          </BottomSheetView>
        </BottomSheet>
      ) : null}
    </>
  );
};

const SelectLanguage = memo(SelectLanguageMemo);
export default SelectLanguage;
