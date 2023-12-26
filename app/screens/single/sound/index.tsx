import { FC, useCallback, useContext, useEffect, useMemo } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomSafeArea } from '../../../components/custom-safe-area';
import { FocusedStatusBar } from '../../../components/focused-statusbar';
import { RenderIf } from '../../../components/render-if';
import { ScreenGradient } from '../../../components/screen-gradient';
import { Spacer } from '../../../components/spacer';
import { VirtualizedList } from '../../../components/virtualized-list';
import { SoundComponents } from './components';
import { useToken } from '../../../hooks/use-token';
import { UseNavigationType } from '../../../types/use-navigation';
import { ToolbarOptions } from '../components/toolbar-woindow';
import {
  closeToolbarHandler,
  openTranlateView,
  openYoutubeShareBottomSheet,
  setDataToState,
} from '../../../slices/single-asset.slice';
import { AppDispatch, RootState } from '../../../store';
import {
  useConvertAudioToTextMutation,
  useGetSingleSoundDataQuery,
} from '../../../services/single-sound.service';
import { RenderIfWithoutLoading } from '../../../components/render-if-without-loading';
import { alertContext } from '../../../context/alert';

export function SingleSoundScreen({ navigation, route }: any) {
  const isFocused = useIsFocused();
  const [token, currentUserId]: any = useToken();

  if (!isFocused || !token) {
    return (
      <ScreenGradient>
        <></>
      </ScreenGradient>
    );
  }
  return (
    <Wrapper
      params={route.params}
      token={token}
      currentUserId={currentUserId}
      navigation={navigation}
    />
  );
}

type WrapperProps = {
  params: {
    id: number;
    ORIGIN?: string;
  };
  navigation?: UseNavigationType;
  token: string;
  currentUserId: number;
};

const Wrapper: FC<WrapperProps> = ({ params, token, currentUserId }: any) => {
  const { id } = params;

  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, isFetching } = useGetSingleSoundDataQuery({
    token,
    id,
  });

  const [_convertAudioToTextApi] = useConvertAudioToTextMutation();

  const alertCtx = useContext(alertContext);

  const { file, assetId, forkability_status, isOwner } = useSelector(
    (state: RootState) => state.singleAssetSlice,
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    saveDataToState();
  }, [data]);

  const saveDataToState = () => {
    dispatch(setDataToState({ ...data, currentUserId: currentUserId }));
  };

  const openShareToYoutubeBottomSheetHandler = useCallback(() => {
    dispatch(openYoutubeShareBottomSheet());
  }, [dispatch]);

  const openTranslateBottomSheet = useCallback(() => {
    dispatch(openTranlateView());
  }, [dispatch]);

  const toolbarCloser = () => {
    dispatch(closeToolbarHandler());
  };

  const convertAudioToTextHandler = useCallback(async () => {
    const response = await _convertAudioToTextApi({
      token,
      body: {
        audio: assetId,
      },
    });

    console.log(response)

    if (response?.error?.data?.message) {
      alertCtx.fire(response?.error?.data?.message, 'warning');
      toolbarCloser();
    }
    if (response?.data) {
      alertCtx.fire('Asset converted to text successfully', 'warning');
      toolbarCloser();
    }
  }, [assetId]);

  const toolbarOptions = useMemo<ToolbarOptions>(() => {
    return [
      isOwner
        ? {
            id: 1,
            title: 'Share to youtube',
            function: openShareToYoutubeBottomSheetHandler,
            shouldCloseModalAfterClick: true,
          }
        : null,
      forkability_status === 2
        ? {
            id: 2,
            title: 'Convert audio to text',
            function: convertAudioToTextHandler,
          }
        : null,
      forkability_status === 2
        ? {
            id: 3,
            title: 'Translate',
            function: openTranslateBottomSheet,
            shouldCloseModalAfterClick: true,
          }
        : null,
    ];
  }, [forkability_status, isOwner]);

  console.log(forkability_status)

  const memoWrapper = useMemo(() => {
    return (
      <VirtualizedList>
        <SoundComponents.Header>
          <RenderIfWithoutLoading condition={isOwner}>
            <SoundComponents.ToolbarWindow customTopDistance={10} toolbarOptions={toolbarOptions} />
          </RenderIfWithoutLoading>
          <SoundComponents.Title />
          <SoundComponents.UsernameCard />
          <RenderIfWithoutLoading condition={!file ? false : true}>
            <SoundComponents.MusicPlayer fileUri={file?.url} />
          </RenderIfWithoutLoading>
          <RenderIfWithoutLoading condition={file ? false : true}>
            <Spacer margin={32} />
          </RenderIfWithoutLoading>
        </SoundComponents.Header>
        <SoundComponents.Description />
        <SoundComponents.MetaData />
        <SoundComponents.CommentsCard />
        <Spacer margin={200} />
      </VirtualizedList>
    );
  }, [data, file, file?.url, toolbarOptions, isOwner]);

  return (
    <>
      <FocusedStatusBar showOnAndroid />
      <CustomSafeArea>
        <ScreenGradient>
          <RenderIf condition={isLoading || isFetching}>
            {memoWrapper}
            <SoundComponents.FooterCard />
            <SoundComponents.YoutubeShareBottomSheet />
            <SoundComponents.TranslateView />
          </RenderIf>
        </ScreenGradient>
      </CustomSafeArea>
    </>
  );
};
