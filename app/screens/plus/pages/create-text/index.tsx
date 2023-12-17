import { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenGradient } from '../../../../components/screen-gradient';
import { FileSystemController } from '../../../../controllers/file-system.controller';
import { CustomSafeArea } from '../../../../components/custom-safe-area';
import { windowSize } from '../../../../utils/window-size';
import { TopToolbar } from '../../component/top-toolbar';
import { Box } from '../../../../components/box';
import { PaddingContainer } from '../../../../styles/grid';
import { Input } from '../../../../components/form';
import { NoteBook } from '../../component/notebook';
import { VirtualizedList } from '../../../../components/virtualized-list';
import { BottomTabBar } from '../../component/bottom-tab-bar';
import { CREATE_TEXT } from '../../constaints';
import { UseNavigationType } from '../../../../types/use-navigation';
import { theme } from '../../../../constaints/theme';
import { AppDispatch, RootState } from '../../../../store';
import { cleanupCreatedAssetInputs, setFileBase64, setTitle } from '../../../../slices/plus.slice';

const _fileSystemController = new FileSystemController();

const { width } = windowSize();

export const CreateTextScreen = () => {
  const [contentText, setContetText] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const noteBookRef = useRef<any>(null);

  const navigation = useNavigation<UseNavigationType>();
  const dispatch = useDispatch<AppDispatch>();

  const { title } = useSelector((state: RootState) => state.plusSlice);

  const { top } = useSafeAreaInsets();

  const _submitButtonHandler = async () => {
    if (!contentText || !title) {
      return;
    }
    setIsLoading(true);

    const base64Content = await convertTextToBase64(contentText);

    if (!base64Content) {
      setIsLoading(false);
      return;
    }

    const base64ContentDataUri = `data:text/plain;base64,${base64Content}`;
    dispatch(setFileBase64(base64ContentDataUri));

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('addAssetMetadata', {
        redirectedFromPage: CREATE_TEXT,
      });
    }, 1000);
  };

  const goBackHandler = () => {
    dispatch(cleanupCreatedAssetInputs());
    setContetText(null);
    noteBookRef?.current?.clear();
    navigation.goBack();
  };

  const convertTextToBase64 = async (str: string) => {
    try {
      return await _fileSystemController.convertTextToBase64(str);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitleHandler = (str: string) => {
    dispatch(setTitle(str));
  };

  const input = (
    <Input
      placeholder="your title"
      varient="flat-dark"
      defaultValue={title}
      onChangeText={updateTitleHandler}
    />
  );

  return (
    <CustomSafeArea>
      <ScreenGradient colors={theme.gradients.PLUS_PAGE_GRADIENT}>
        <VirtualizedList>
          <Box id="scroll-wrapper" flex={1} width={width} marginTop={top}>
            <TopToolbar goBackHandler={goBackHandler} />
            <PaddingContainer>
              <Box id="main" marginTop={76}>
                {input}
                <NoteBook setCaptionText={setContetText} ref={noteBookRef} />
              </Box>
            </PaddingContainer>
          </Box>
        </VirtualizedList>
        <BottomTabBar
          currentPage={CREATE_TEXT}
          navigation={navigation}
          submitButtonHandler={_submitButtonHandler}
          isLoading={isLoading}
        />
      </ScreenGradient>
    </CustomSafeArea>
  );
};
