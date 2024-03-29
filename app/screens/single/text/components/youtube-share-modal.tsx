import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Box } from '../../../../components/box';
import { useKeyboard } from '../../../../hooks/use-keyboard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { BackdropComponent } from '../../../../components/modal-backdrop';
import { theme } from '../../../../constaints/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetBodyWrapper } from '../../../../components/bottom-sheet-body-wrapper';
import { ModalTitle } from '../../../../components/modal-title';
import { isIos } from '../../../../controllers/platform.controller';
import { closeYoutubeShareBottomSheet } from '../../../../slices/single-asset.slice';
import { Input, RadioButton } from '../../../../components/form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '../../../../components/button';
import { ChannelsList } from '../../../channel-management/components/channel-list';
import { Text } from '../../../../components/text';
import { useYoutubeShareMutation } from '../../../../services/asset.service';
import { useToken } from '../../../../hooks/use-token';
import { alertContext } from '../../../../context/alert';

const IS_IOS = isIos();

export const YoutubeShareBottomSheet = () => {
  const [keyboardHeight, isKeyboardOpen] = useKeyboard();

  const [modalIndex, setModalIndex] = useState<number>(null);

  const [token]: string[] = useToken();


  // const { assetId, id, token, isYoutubeShareBottomSheetOpen } = useSelector(
  const { isYoutubeShareBottomSheetOpen, assetId } = useSelector(
    (state: RootState) => state.singleAssetSlice,
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
    dispatch(closeYoutubeShareBottomSheet());
  };

  const renderBackdrop = useCallback(() => {
    if (modalIndex === -1 || modalIndex === null) {
      return;
    }

    return <BackdropComponent />;
  }, [modalIndex]);

  const MODAL_BG = useMemo(() => {
    return IS_IOS ? 'transparent' : '#474755f5';
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
      {isYoutubeShareBottomSheetOpen ? (
        <BottomSheet {...BOTTOM_SHEET_OPTIONS}>
          <BottomSheetScrollView>
            <BottomSheetBodyWrapper minHeight={500}>
              <ModalTitle closerHandler={closeBottomSheetHandler} title="Share yo youtube" />
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
  const [shareMetaData, setShareMetaData] = useState<{ title: string; description: string }>({
    title: null,
    description: null,
  });

  const alertCtx = useContext(alertContext);


  const [_shareYoutubeApiHandler, { isLoading, isFetching }] = useYoutubeShareMutation();

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
    if (!shareMetaData?.title) {
      alertCtx.fire('Please fill title','warning');
      return;
    }
    if (!shareMetaData?.description) {
      alertCtx.fire('Please fill description','warning');
      return;
    }
    if (!selectedChannelId) {
      alertCtx.fire('Please choose a channel to continue','warning');
      return;
    }
    if (shareTime === 'later' && !selectedDate) {
      alertCtx.fire('Please choose a date to continue','warning');
      return;
    }

    const requestBody: Record<string, any> = {
      account: selectedChannelId,
      asset: assetId,
      title: shareMetaData.title,
      description: shareMetaData.description,
      privacy: 'private',
    };


    if (shareTime === 'later') {
      requestBody['times'] = [selectedDate];
    }

    const response = await _shareYoutubeApiHandler({ token, body: requestBody });
    if(response?.error){
      // console.log(response?.error)
      alertCtx.fire('Share on youtube failed','warning')
    }
  };

  return (
    <Box width="100%" marginTop={24}>
      <Input
        varient="flat-dark"
        placeholder="Title"
        onChangeText={(text: string) => {
          setShareMetaData((prev: any) => {
            return {
              ...prev,
              title: text,
            };
          });
        }}
      />
      <Box marginTop={16}>
        <Input
          varient="flat-dark"
          placeholder="Description"
          onChangeText={(text: string) => {
            setShareMetaData((prev: any) => {
              return {
                ...prev,
                description: text,
              };
            });
          }}
        />
      </Box>

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
