import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box } from '../../../../components/box';
import { useKeyboard } from '../../../../hooks/use-keyboard';
import { AppDispatch, RootState } from '../../../../store';
import { BackdropComponent } from '../../../../components/modal-backdrop';
import { theme } from '../../../../constaints/theme';
import { BottomSheetBodyWrapper } from '../../../../components/bottom-sheet-body-wrapper';
import { ModalTitle } from '../../../../components/modal-title';
import { isIos } from '../../../../controllers/platform.controller';
import { closeGoogleDriveShareBottomSheet } from '../../../../slices/single-text.slice';
import { RadioButton } from '../../../../components/form';
import { Button } from '../../../../components/button';
import { ChannelsList } from '../../../channel-management/components/channel-list';
import { Text } from '../../../../components/text';
import { useGoogleDriveShareMutation } from '../../../../services/asset.service';

const IS_IOS = isIos();

export const GoogleDriveShareBottomSheet = () => {
  const [keyboardHeight, isKeyboardOpen] = useKeyboard();

  const [modalIndex, setModalIndex] = useState<number>(null);

  // const { assetId, id, token, isYoutubeShareBottomSheetOpen } = useSelector(
  const { isGoogleDriveShareBottomSheetOpen, token, assetId } = useSelector(
    (state: RootState) => state.singelTextSlice,
  );

  const dispatch = useDispatch<AppDispatch>();

  const snapPoints = useMemo(() => {
    if (IS_IOS && keyboardHeight) {
      return ['80%'];
    }

    return ['70%'];
  }, [keyboardHeight, isKeyboardOpen]);

  const selectLanguageRef = useRef(null);

  const closeBottomSheetHandler = () => {
    dispatch(closeGoogleDriveShareBottomSheet());
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

  const BOTTOM_SHEET_OPTIONS = useMemo<any>(() => {
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
      {isGoogleDriveShareBottomSheetOpen ? (
        <BottomSheet {...BOTTOM_SHEET_OPTIONS}>
          <BottomSheetScrollView>
            <BottomSheetBodyWrapper minHeight={500}>
              <ModalTitle closerHandler={closeBottomSheetHandler} title="Share yo google drive" />
              <Body token={token} assetId={assetId} />
            </BottomSheetBodyWrapper>
          </BottomSheetScrollView>
        </BottomSheet>
      ) : null}
    </>
  );
};

const TIME_RADIO_BUTTON_OPTIONS = ['now', 'later'];

const Body = ({ token, assetId }: { token: string; assetId: number }) => {
  const [show, setShow] = useState(false);
  const [shareTime, setShareTime] = useState<'later' | 'now'>('now');

  const [date, setDate] = useState<Date>(null);
  const [mode, setMode] = useState<any>('date');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedChannelId, setSelectedChannelId] = useState<number>(null);

  const [_shareGoogleDriveApiHandler, { isLoading, isFetching }] = useGoogleDriveShareMutation();

  const [__selectedDate, __selectedTime, _year, _hours] = printTime(date);

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const setSelectedShareTime = (item: string | any) => {
    if (item === 'now') {
      setSelectedDate(null);
    }
    setShareTime(item);
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;

    if (!IS_IOS) {
      setShow(false);
    }

    setDate(currentDate);

    const formattedTime = manipulateTime(currentDate);
    formattedTime && setSelectedDate(formattedTime);
  };

  const onShareSubmitHandler = async () => {
    if (!selectedChannelId) {
      console.log('Please choose a channel to continue');
      return;
    }
    if (shareTime === 'later' && !selectedDate) {
      console.log('Please choose a date to continue');
      return;
    }

    const requestBody: Record<string, any> = {
      account: selectedChannelId,
      asset: assetId,
    };

    if (shareTime === 'later') {
      requestBody['times'] = [selectedDate];
    }

    const response = await _shareGoogleDriveApiHandler({ token, body: requestBody });
    console.log(response?.error);
  };

  return (
    <Box width="100%">
      <Box id="conductor" marginTop={32}>
        <RadioButton
          labelText="When to share asset?"
          dataList={TIME_RADIO_BUTTON_OPTIONS}
          defaultOption={'now'}
          getSelectedOption={setSelectedShareTime}
        />
        {shareTime === 'later' ? (
          <>
            <Button
              varient="dark"
              onpressHandler={showDatepicker}
              text={`${_year ? __selectedDate : 'Choose date'}`}
              borderRadius={8}
              marginTop={8}
            />
            <Button
              varient="dark"
              onpressHandler={showTimepicker}
              text={`${_hours ? __selectedTime : 'Choose time'}`}
              borderRadius={8}
              marginTop={8}
            />
          </>
        ) : null}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            minimumDate={new Date()}
            themeVariant="dark"
          />
        )}

        <Box height={45} width="100%" marginTop={32} marginBottom={-50}>
          <Text color={theme.color.light.WHITE} fontSize={14} fontWeight={600}>
            Choose share channel
          </Text>
        </Box>

        <ChannelsList
          token={token}
          cardsBackgroundColor="#1212478c"
          getSelectedChannel={setSelectedChannelId}
          hideEditOpetations
          activateSelectedChannel
        />

        <Button
          varient="primary"
          text="Share"
          marginTop={32}
          onpressHandler={onShareSubmitHandler}
          isLoading={isLoading || isFetching}
        />
      </Box>
    </Box>
  );
};

function manipulateTime(currentDate: Date): string | null {
  if (!currentDate) {
    return null;
  }

  const year = currentDate.getFullYear() || 0;
  const month = currentDate.getMonth() + 1 || 0;
  const day = currentDate.getDate();
  const hours = currentDate.getHours() || 0;
  const minutes = currentDate.getMinutes() || 0;
  const seconds = currentDate.getSeconds() || 0;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function printTime(date: Date) {
  const _year = date?.getFullYear() || '';
  const _month = date?.getMonth() + 1 || '';
  const _day = date?.getDate() || '';
  const _hours = date?.getHours() || '';
  const _minutes = date?.getMinutes() || '';

  const __selectedDate = `${_year}-${_month}-${_day}`;
  const __selectedTime = `${_hours}:${_minutes}`;

  return [__selectedDate, __selectedTime, _year, _hours];
}
