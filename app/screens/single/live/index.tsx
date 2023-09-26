import { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenGradient } from "../../../components/screen-gradient";
import { tokenContext } from "../../../context/token";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import { VirtualizedList } from "../../../components/virtualized-list";
import { RenderIf } from "../../../components/render-if";
import { getLiveDataApiHandler } from "../service";
import { Live } from "../../../types/live";
import { SingleLiveHeader } from "./header";
import { FocusedStatusBar } from "../../../components/focused-statusbar";
import { SingleLiveOtherLives } from "./other-lives";
import { useGetLivesQuery } from "../../../services/explore.service";
import { SingleLiveComponents } from "./components";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRecordLiveMutation } from "../../../services/live.service";
import { ToastAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addRecordLive, removeRecordById } from "../../../slices/live.slice";
import { SINGLE_LIVE_SCREEN } from "../../../constaints/consts";
import { Button } from "../../../components/button";
import { useIsFocused } from "@react-navigation/native";

export function SingleLiveScreen({ navigation, route }: any) {
  const { id } = route.params;

  const [data, setData] = useState<Live>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveRecording, setIsLiveRecording] = useState(false);

  const { recordingItems } = useSelector((store: RootState) => store.liveSlice);

  const videoRef = useRef<any>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  const tokenCtx = useContext(tokenContext);

  const {
    data: _livesData,
    isError: _isLivesError,
    isSuccess: _isLivesSuccess,
    isLoading: _isLivesLoading,
    refetch: refreshLives,
  } = useGetLivesQuery();

  const [
    recordHandler,
    { isLoading: _isRecordLiveLoading, isFetching: _isRedcordLiveFetching },
  ] = useRecordLiveMutation();

  useEffect(() => {
    if (isFocused && id) {
      getLiveData();
    }
  }, [id, isFocused]);

  useEffect(() => {
    if (recordingItems?.length) {
      detectIfLiveIsRecording();
    }
  }, [recordingItems]);

  const detectIfLiveIsRecording = () => {
    const currentLive = recordingItems?.find((f) => f.liveId === data?.id);
    if (currentLive) {
      if (currentLive.startTime >= currentLive.endTime) {
        dispatch(removeRecordById({ liveId: data?.id }));
      } else {
        setIsLiveRecording(true);
      }
    }
  };

  const getLiveData = async () => {
    setIsLoading(true);
    const token = await tokenCtx.getToken();

    if (token === null) {
      setIsLoading(false);
      return;
    }

    const formattedToken = tokenStringResolver(token);

    const { isError, res } = await getLiveDataApiHandler(formattedToken, id);

    if (isError) {
      setIsLoading(false);
      return;
    }

    const response = res.data;
    setData(response);
    setIsLoading(false);
  };

  const thumbnail = data?.thumbnail;

  const goBackHandler = () => {
    navigation.goBack();
  };

  const openRecordBottomSheetHandler = () => {
    if (bottomSheetRef) {
      bottomSheetRef?.current?.expand();
    }
  };
  const closeRecordBottomSheetHandler = () => {
    if (bottomSheetRef) {
      bottomSheetRef?.current?.close();
    }
  };

  const recoedLiveHandler = async (length: number) => {
    const requestBody = {
      // Live id
      live: data?.id,
      length: length * 60,
    };

    const token = tokenStringResolver(await tokenCtx.getToken());
    if (!token) {
      return;
    }

    const result = await recordHandler({ body: requestBody, token: token });
    if (result?.data) {
      ToastAndroid.show(
        `Recording live started for next ${length} minutes`,
        ToastAndroid.SHORT
      );
      closeRecordBottomSheetHandler();
      addRecordToStore(data?.id, length * 60);
    }
  };

  const addRecordToStore = (liveId: number, length: number) => {
    const startTime = new Date().getTime();
    const endTime = new Date().getTime() + length;

    const recordBody = {
      liveId,
      startTime: startTime,
      endTime: endTime,
    };
    dispatch(addRecordLive(recordBody));
  };

  const handleRedirect = (id: number) => {
    navigation.navigate(SINGLE_LIVE_SCREEN, { id });
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <FocusedStatusBar />
        <ScreenGradient>
          <VirtualizedList>
            <RenderIf condition={isLoading}>
              <SingleLiveHeader
                videoRef={videoRef}
                thumnailImageUri={thumbnail}
                goBackHandler={goBackHandler}
                contentName={data?.title}
                videoUri={data?.link}
                imageUrl={data?.thumbnail}
                description={data?.description}
                openRecordBottomSheetHandler={openRecordBottomSheetHandler}
                isLiveRecording={isLiveRecording}
              />
              <SingleLiveOtherLives
                data={_livesData}
                isLoading={_isLivesLoading}
                handleRedirect={handleRedirect}
              />
            </RenderIf>
          </VirtualizedList>
        </ScreenGradient>
      </SafeAreaView>
      <SingleLiveComponents.RecordBottomSheet
        recoedLiveHandler={recoedLiveHandler}
        bottomSheetRef={bottomSheetRef}
        isLoading={_isRecordLiveLoading || _isRedcordLiveFetching}
      />
    </>
  );
}
