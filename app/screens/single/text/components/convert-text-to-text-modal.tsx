import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AppDispatch, RootState } from '../../../../store';
import { theme } from '../../../../constaints/theme';
import { Box } from '../../../../components/box';
import { closeConvertTextToTextBottomSheet } from '../../../../slices/single-text.slice';
import { isIos } from '../../../../controllers/platform.controller';
import { BottomSheetBodyWrapper } from '../../../../components/bottom-sheet-body-wrapper';
import { ModalTitle } from '../../../../components/modal-title';
import { BackdropComponent } from '../../../../components/modal-backdrop';
import { Input } from '../../../../components/form';
import { useKeyboard } from '../../../../hooks/use-keyboard';
import { Button } from '../../../../components/button';
import { useConvertTextToTextMutation } from '../../../../services/single-text.service';

const IS_IOS = isIos();

const ConvertTextToTextModal = () => {
  const [keyboardHeight, isKeyboardOpen] = useKeyboard();

  const [modalIndex, setModalIndex] = useState<number>(null);
  const [inputValue, setInputValue] = useState<string>(null);

  const [_convertApiHandler, { isLoading, isFetching }] = useConvertTextToTextMutation();

  const { assetId,id,  token, isConvertTextToTextBottomSheetOpen } = useSelector(
    (state: RootState) => state.singelTextSlice,
  );

  const dispatch = useDispatch<AppDispatch>();

  const snapPoints = useMemo(() => {
    if (IS_IOS && keyboardHeight) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const height = keyboardHeight + 150;
      return [height];
    }

    return [250];
  }, [keyboardHeight, isKeyboardOpen]);

  const selectLanguageRef = useRef(null);

  const closeBottomSheetHandler = () => {
    dispatch(closeConvertTextToTextBottomSheet());
  };

  const onpressHandler = async () => {
    const requestBody = {
      text: id,
      prefix: `Write an article for following content: ${inputValue}`,
    };

    const response = await _convertApiHandler({ body: requestBody, token });
    console.log(assetId, token, response);
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
      onChange: setModalIndex,
      backdropComponent: renderBackdrop,
      handleComponent: null,
      backgroundStyle: {
        backgroundColor: MODAL_BG,
      },
    };
  }, [snapPoints]);

  return (
    <>
      {isConvertTextToTextBottomSheetOpen ? (
        <BottomSheet {...BOTTOM_SHEET_OPTIONS}>
          <BottomSheetScrollView>
            <Box width="100%">
              <BottomSheetBodyWrapper minHeight={snapPoints[0]}>
                <ModalTitle closerHandler={closeBottomSheetHandler} title="Convert text to text" />
                <Box width="100%" marginTop={24}>
                  <Input
                    varient="bordered-light"
                    placeholder="Prefix"
                    onChangeText={(text: string) => setInputValue(text)}
                  />
                  <Button
                    varient="primary"
                    text="Start Converting"
                    marginTop={32}
                    onpressHandler={onpressHandler}
                    isLoading={isLoading || isFetching}
                  />
                </Box>
              </BottomSheetBodyWrapper>
            </Box>
          </BottomSheetScrollView>
        </BottomSheet>
      ) : null}
    </>
  );
};

export default ConvertTextToTextModal;
