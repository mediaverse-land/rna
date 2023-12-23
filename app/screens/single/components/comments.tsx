import { TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { PaddingContainer } from '../../../styles/grid';
import { CommentsBox } from './comments-box';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { openCommentsBottomSheet } from '../../../slices/single-text.slice';

export const CommentsCard = () => {

  const {id} = useSelector((state: RootState) => state.singelTextSlice);

  const dispatch = useDispatch<AppDispatch>();

  const openCommentsBottomSheetHandler = () => {
    dispatch(openCommentsBottomSheet());
  };

  return (
    <Box width='100%' marginTop={24}>
      <PaddingContainer>
        <TouchableOpacity onPress={openCommentsBottomSheetHandler} activeOpacity={1}>
          <CommentsBox editable={false} assetId={id}/>
        </TouchableOpacity>
      </PaddingContainer>
    </Box>
  );
};
