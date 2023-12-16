import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { windowSize } from '../../../../utils/window-size';
import { Box } from '../../../../components/box';
import { PaddingContainer } from '../../../../styles/grid';
import { FileUploadField } from '../../../../components/file-upload-field';
import { CreateAssetTitle } from '../../component/create-asset-title';
import { Text } from '../../../../components/text';
import { CreateAssetSelect } from '../../component/create-asset-select';
import { theme } from '../../../../constaints/theme';
import { Input } from '../../../../components/form';
import {
  openSelectLanguageBottomSheet,
  setDescription,
  setTitle,
} from '../../../../slices/plus.slice';
import { AppDispatch, RootState } from '../../../../store';
import { debounce } from '../../../../utils/debounce';

const { width } = windowSize();

const HALF_ROW_WIDTH = width / 2 - 34;

export const AssetDataView = () => {
  const { selectedLanguage, description, title } = useSelector(
    (state: RootState) => state.plusSlice,
  );

  const dispatch = useDispatch<AppDispatch>();

  const openSelectLanguageModal = useCallback(() => {
    dispatch(openSelectLanguageBottomSheet());
  }, []);

  const updateDescription = useMemo(
    () =>
      debounce((str: string) => {
        dispatch(setDescription(str));
      }, 500),
    [],
  );

  const updateTitle = useMemo(
    () =>
      debounce((str: string) => {
        dispatch(setTitle(str));
      }, 500),
    [],
  );

  return (
    <>
      <Box id="body">
        <PaddingContainer>
          <Box id="row" direction="row" marginTop={32} justifyContent="space-between">
            <Box width={HALF_ROW_WIDTH} height={HALF_ROW_WIDTH}>
              <FileUploadField progressBarWidth={HALF_ROW_WIDTH} />
            </Box>
            <Box width={HALF_ROW_WIDTH} height={HALF_ROW_WIDTH}>
              <CreateAssetTitle updateTitle={updateTitle} value={title} />
            </Box>
          </Box>
          <Box id="row" marginTop={32}>
            <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={400}>
              Language
            </Text>
            <Box marginTop={8}>
              <CreateAssetSelect
                onPress={openSelectLanguageModal}
                selectedItem={selectedLanguage}
                title="Choose language"
              />
            </Box>
          </Box>
          <Box id="row" marginTop={32}>
            <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={400}>
              Write a caption
            </Text>
            <Box marginTop={8}>
              <Input
                varient="flat-dark"
                isTextArea
                placeholder="your caption..."
                height={HALF_ROW_WIDTH - 27}
                onChangeText={updateDescription}
                defaultValue={description}
              />
            </Box>
          </Box>
        </PaddingContainer>
      </Box>
    </>
  );
};
