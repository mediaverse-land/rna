import React from 'react';
// import CommentsModal from './comments-modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
// import { closeCommentsBottomSheet } from '../../../slices/single-text.slice';

export const CommentsModalComponent = () => {
  const { isCommentsBottomSheetOpen, assetId, token } = useSelector(
    (state: RootState) => state.singelTextSlice,
  );

  if (!isCommentsBottomSheetOpen || !token) {
    return null;
  }

  return (
    <>
      {/* <CommentsModal
        isOpenCondition={isCommentsBottomSheetOpen}
        closerHandler={closeCommentsBottomSheet}
        assetId={assetId}
        token={token}
      /> */}
    </>
  );
};
