import React, { FC, lazy, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { useKeyboard } from '../../../hooks/use-keyboard';
import { useToken } from '../../../hooks/use-token';
import { isIos } from '../../../controllers/platform.controller';
import { closeCommentsBottomSheet } from '../../../slices/single-asset.slice';
import { BackdropComponent } from '../../../components/modal-backdrop';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BottomSheetBodyWrapper } from '../../../components/bottom-sheet-body-wrapper';
import { ModalTitle } from '../../../components/modal-title';
import { Box } from '../../../components/box';
import { CommentsBox } from './comments-box';
import { windowSize } from '../../../utils/window-size';
import { useCreateCommentMutation } from '../../../services/asset.service';

const CommentsList = lazy(() => import('../../../components/comment-list'));

const IS_IOS = isIos();

const CommentsModalComponentMemo = () => {
  const [keyboardHeight, isKeyboardOpen] = useKeyboard();
  const [modalIndex, setModalIndex] = useState<number>(null);

  const [token]: string[] = useToken();

  const { isCommentsBottomSheetOpen, assetId } = useSelector(
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
    dispatch(closeCommentsBottomSheet());
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

  if (!isCommentsBottomSheetOpen || !token) {
    return null;
  }

  return (
    <>
      {isCommentsBottomSheetOpen ? (
        <BottomSheet {...BOTTOM_SHEET_OPTIONS}>
          <BottomSheetScrollView>
            <BottomSheetBodyWrapper minHeight={500} paddingLeft={32} paddingRight={32}>
              <ModalTitle title="Comments" closerHandler={() => {}} />
              <Body token={token} assetId={assetId} />
            </BottomSheetBodyWrapper>
          </BottomSheetScrollView>
        </BottomSheet>
      ) : null}
    </>
  );
};

type BodyProps = {
  token: string;
  assetId: number;
};

const { width } = windowSize();

const Body: FC<BodyProps> = ({ assetId, token }) => {
  const [_assetCreateApi] = useCreateCommentMutation();

  const createCommentHandler = async (commentText: string) => {
    if (!commentText) {
      return;
    }
    const requestBody: any = {
      parent_id: null,
      asset_id: assetId,
      body: commentText,
    };

    const response = await _assetCreateApi({ token, body: requestBody });
    console.log(response)
  };

  return (
    <Box width={width - 32} position="relative" right={16}>
      <CommentsBox
        assetId={assetId}
        hasBackground={false}
        showTitle={false}
        setCommetnTextValue={createCommentHandler}
      />
      <CommentsList assetId={assetId} />
    </Box>
  );
};

export const CommentsModalComponent = memo(CommentsModalComponentMemo);
