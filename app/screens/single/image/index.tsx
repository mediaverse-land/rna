import { FC, useCallback, useEffect, useMemo } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomSafeArea } from '../../../components/custom-safe-area';
import { FocusedStatusBar } from '../../../components/focused-statusbar';
import { RenderIf } from '../../../components/render-if';
import { ScreenGradient } from '../../../components/screen-gradient';
import { Spacer } from '../../../components/spacer';
import { VirtualizedList } from '../../../components/virtualized-list';
import { ImageComponents } from './components';
import { useToken } from '../../../hooks/use-token';
import { UseNavigationType } from '../../../types/use-navigation';
import { AppDispatch, RootState } from '../../../store';
import { useGetSingleImageQuery } from '../../../services/single-image.service';
import { setDataToState } from '../../../slices/single-asset.slice';
import { ToolbarOptions } from '../components/toolbar-woindow';

export function SingleImageScreen({ navigation, route }: any) {
  const isFocused = useIsFocused();
  const [token, currentUserId]: any = useToken();


  if (!isFocused) {
    return null;
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

  const { isOwner, forkability_status } = useSelector((state: RootState) => state.singleAssetSlice);

  const { data, isLoading, isFetching } = useGetSingleImageQuery({
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

  const toolbarOptions = useMemo<ToolbarOptions>(() => {
    if (!isOwner) {
      return;
    }
    return [
      forkability_status === 2
        ? {
            id: 1,
            title: 'Share to youtube',
            function: () => {},
            shouldCloseModalAfterClick: true,
          }
        : null,
    ];
  }, [isOwner, forkability_status]);

  return (
    <>
      <FocusedStatusBar showOnAndroid />
      <CustomSafeArea>
        <ScreenGradient>
          <RenderIf condition={isLoading || isFetching}>
            <VirtualizedList>
              <ImageComponents.Header />

              <ImageComponents.ToolbarWindow toolbarOptions={toolbarOptions} />
              <ImageComponents.Title />
              <ImageComponents.Description />
              <ImageComponents.UsernameCard />
              <ImageComponents.MetaData />
              <ImageComponents.CommentsCard />

              <Spacer margin={200} />

              {/* <CommentsModalComponent /> */}
            </VirtualizedList>
            <ImageComponents.FooterCard />
            <ImageComponents.YoutubeShareBottomSheet />
          </RenderIf>
        </ScreenGradient>
      </CustomSafeArea>
    </>
  );
};
