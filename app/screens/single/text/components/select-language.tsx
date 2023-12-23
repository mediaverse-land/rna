import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import { AppDispatch, RootState } from '../../../../store';
import { theme } from '../../../../constaints/theme';
import { Box } from '../../../../components/box';
import SelectLanguageBottomSheet from '../../../../components/select-language';
import { closeSelectLanguageBottomSheet } from '../../../../slices/single-text.slice';
import { BottomSheetBodyWrapper } from '../../../../components/bottom-sheet-body-wrapper';
import { BackdropComponent } from '../../../../components/modal-backdrop';
import { isIos } from '../../../../controllers/platform.controller';
import { ModalTitle } from '../../../../components/modal-title';

type Props = {
  setSelectedLanguage: (lang: string) => void;
  onModalChange?: (index: number) => void
};

const IS_IOS = isIos();

const SelectLanguageMemo: FC<Props> = ({ setSelectedLanguage, onModalChange }) => {
  const isFocused = useIsFocused();
  const [modalIndex, setModalIndex] = useState<number>(null);

  const dispatch = useDispatch<AppDispatch>();

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const { isSelectLanguageBottomSheetOpen } = useSelector(
    (state: RootState) => state.singelTextSlice,
  );

  const selectLanguageRef = useRef(null);

  const closeBottomSheetHandler = () => {
    dispatch(closeSelectLanguageBottomSheet());
  };

  const _selectLanguageHandler = (lang: string) => {
    if (setSelectedLanguage) {
      setSelectedLanguage(lang);
    }
    
    dispatch(closeSelectLanguageBottomSheet());
  };

  const renderBackdrop = useCallback(() => {
    if (modalIndex === -1 || modalIndex === null) {
      return;
    }

    return <BackdropComponent />;
  }, [modalIndex]);

  const MODAL_BG = useMemo(() => {
    return IS_IOS ? 'transparent' : theme.color.light.ADD_ACCOUNT_MODAL_BAKGROUND;
  }, []);

  const BOTTOM_SHEET_OPTIONS = useMemo(() => {
    return {
      snapPoints: snapPoints,
      ref: selectLanguageRef,
      onClose: closeBottomSheetHandler,
      enablePanDownToClose: true,
      onChange: (_index:number) => {
        setModalIndex(_index)
        if(onModalChange){
          onModalChange(_index)
        }
      },
      backdropComponent: renderBackdrop,
      handleComponent: null,
      backgroundStyle: {
        backgroundColor: MODAL_BG,
      },
    };
  }, [snapPoints]);
  return (
    <>
      {isSelectLanguageBottomSheetOpen ? (
        <BottomSheet {...BOTTOM_SHEET_OPTIONS}>
          <BottomSheetBodyWrapper minHeight={420}>
            <Box width="100%" height={400}>
              <ModalTitle closerHandler={closeBottomSheetHandler} title="Convert text to text" />
              <Box marginTop={32} />
              <SelectLanguageBottomSheet
                showTitle={false}
                isFocused={isFocused}
                setSelectedLanguage={_selectLanguageHandler}
              />
            </Box>
          </BottomSheetBodyWrapper>
        </BottomSheet>
      ) : null}
    </>
  );
};

const SelectLanguage = memo(SelectLanguageMemo);
export default SelectLanguage;
