import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { CustomSafeArea } from '../../../components/custom-safe-area';
import { FocusedStatusBar } from '../../../components/focused-statusbar';
import { ScreenGradient } from '../../../components/screen-gradient';
import { Spacer } from '../../../components/spacer';
import { VirtualizedList } from '../../../components/virtualized-list';
import { VideoScreenComponents } from './components';
import { useToken } from '../../../hooks/use-token';
import { UseNavigationType } from '../../../types/use-navigation';
import { useGetSingleVideoQuery } from '../../../services/single.video.service';
import { RenderIf } from '../../../components/render-if';
import { AppDispatch, RootState } from '../../../store';
import { setDataToState } from '../../../slices/single-asset.slice';
import { ToolbarOptions } from '../components/toolbar-woindow';

export function SingleVideoScreen({ route }: any) {
  const isFocused = useIsFocused();
  const [token, currentUserId]: any = useToken();

  if (!isFocused || !token) {
    return (
      <ScreenGradient>
        <></>
      </ScreenGradient>
    );
  }

  return <Wrapper params={route.params} token={token} currentUserId={currentUserId} />;
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

  const video_position = params?.video_position || 0;

  const dispatch = useDispatch<AppDispatch>();
  const { takeScreenShotMethod, isOwner, forkability_status } = useSelector(
    (state: RootState) => state.singleAssetSlice,
  );

  const { data, isLoading, isFetching } = useGetSingleVideoQuery({
    token,
    id,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    saveDataToState();
  }, [data]);

  const saveDataToState = useCallback(() => {
    dispatch(setDataToState({ ...data, currentUserId: currentUserId }));
  }, [data]);

  const takeScreenShotMethodHandler = async () => {
    await takeScreenShotMethod();
  };

  const toolbarOptions = useMemo<ToolbarOptions>(
    () => [
      forkability_status
        ? {
            id: 1,
            title: 'Take screenshot',
            function: takeScreenShotMethodHandler,
            shouldCloseModalAfterClick: true,
          }
        : null,
      isOwner
        ? {
            id: 3,
            function: null,
            title: 'Convert to audio',
          }
        : null,
      isOwner
        ? {
            id: 2,
            function: null,
            title: 'Share to youtube',
          }
        : null,
    ],
    [takeScreenShotMethod, isOwner, forkability_status],
  );

  const videoComponentRenderer = useMemo(() => {
    return <VideoScreenComponents.Header video_position={video_position} />;
  }, [data, video_position]);

  const footerComponentRenderer = useMemo(() => {
    return <VideoScreenComponents.FooterCard />;
  }, [data]);

  return (
    <>
      <FocusedStatusBar showOnAndroid />
      <CustomSafeArea>
        <ScreenGradient>
          <RenderIf condition={isLoading || isFetching}>
            <VirtualizedList>
              {videoComponentRenderer}
              <VideoScreenComponents.ToolbarWindow toolbarOptions={toolbarOptions} />
              <VideoScreenComponents.Title />
              <VideoScreenComponents.Description />
              <VideoScreenComponents.UsernameCard />

              <VideoScreenComponents.MetaData />
              <VideoScreenComponents.CommentsCard />

              <Spacer margin={200} />
            </VirtualizedList>
            {footerComponentRenderer}
            <VideoScreenComponents.CommentsBottomSheet />
          </RenderIf>
        </ScreenGradient>
      </CustomSafeArea>
    </>
  );
};
