import { useIsFocused } from '@react-navigation/native';
import { CustomSafeArea } from '../../../components/custom-safe-area';
import { FocusedStatusBar } from '../../../components/focused-statusbar';
import { ScreenGradient } from '../../../components/screen-gradient';
import { Spacer } from '../../../components/spacer';
import { VirtualizedList } from '../../../components/virtualized-list';
import { CommentsModalComponent } from '../components/comments-modal';
import { VideoScreenComponents } from './components';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useToken } from '../../../hooks/use-token';
import { UseNavigationType } from '../../../types/use-navigation';
import { useGetSingleVideoQuery } from '../../../services/single.video.service';
import { RenderIf } from '../../../components/render-if';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { setDataToState } from '../../../slices/single-asset.slice';
import { ToolbarOptions } from '../components/toolbar-woindow';

export function SingleVideoScreen({ route }: any) {
  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }

  const [token, currentUserId]: any = useToken();

  if (!token) {
    return null;
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
  const { takeScreenShotMethod } = useSelector((state: RootState) => state.singleAssetSlice);

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
      {
        id: 1,
        title: 'Take screenshot',
        function: takeScreenShotMethodHandler,
        shouldCloseModalAfterClick: true,
      },
      {
        id: 3,
        function: null,
        title:'Convert to audio',
      },
      {
        id: 2,
        function: null,
        title:'Share to youtube',
      },
    ],
    [takeScreenShotMethod],
  );

  return (
    <>
      <FocusedStatusBar showOnAndroid />
      <CustomSafeArea>
        <ScreenGradient>
          <RenderIf condition={isLoading || isFetching}>
            <VirtualizedList>
              <VideoScreenComponents.Header video_position={video_position} />
              <VideoScreenComponents.ToolbarWindow toolbarOptions={toolbarOptions} />
              <VideoScreenComponents.Title />
              <VideoScreenComponents.Description />

              <VideoScreenComponents.MetaData />
              <VideoScreenComponents.CommentsCard />

              <Spacer margin={200} />

              <CommentsModalComponent />
            </VirtualizedList>
            <VideoScreenComponents.FooterCard />
          </RenderIf>
        </ScreenGradient>
      </CustomSafeArea>
    </>
  );
};
