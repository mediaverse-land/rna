import { memo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Box } from '../box';
import { theme } from '../../constaints/theme';
import { ICON_ADD_IMAGE } from '../../constaints/icons';
import { Text } from '../text';
import { DocumentController } from '../../controllers/document.controller';
import { FileSystemController } from '../../controllers/file-system.controller';
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setThumbnailCover } from '../../slices/plus.slice';

const _documentController = new DocumentController();
const _fileSystemController = new FileSystemController();

const ACCEPTABLE_TYPES = ['image/png', 'image/jpeg', 'image/png'];

const convertImageToBase64 = async (uri: string) => {
  return await _fileSystemController.convertTextToBase64(uri);
};

const FileUploadFieldMemo = ({ progressBarWidth }: { progressBarWidth: number }) => {
  const [progress] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  // const submitHandler = async (file: string) => {
  //   try {
  //     const requestBody = {
  //       asset: 91,
  //       is_thumbnail: true,
  //       file: file,
  //     };

  //     const result = await axios.post(
  //       "${process.env.EXPO_APPBASE_URL}/files",
  //       requestBody,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onUploadProgress: uploadProgress,
  //       }
  //     );
  //   } catch (err: any) {
  //     console.log(err?.response?.data);
  //   }
  // };

  // const uploadProgress = (progressEvent: any) => {
  //   var Percentage = Math.round(
  //     (progressEvent.loaded / progressEvent.total) * 100
  //   );
  //   setProgress(Percentage);
  // };

  const pickDocument = async () => {
    try {
      const result: any = await _documentController.pick(ACCEPTABLE_TYPES);

      if (result.type === 'success') {
        if (!result.uri) {
          return;
        }

        const content = await convertImageToBase64(result.uri);

        if (content) {
          dispatch(setThumbnailCover(content));
        }
      } else {
        //
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={pickDocument}>
      <Box
        width={'100%'}
        backgroundColor="rgba(14, 14, 18, 0.50)"
        height={'100%'}
        hasBlackBorder
        borderColor={theme.color.light.DARK_INPUT_BORDER}
        borderRadius={8}
        alignItems="center"
        justifyContent="center"
      >
        <ICON_ADD_IMAGE />
        <Text
          fontSize={12}
          fontWeight={400}
          color={theme.color.light.DARK_INPUT_PLACEHOLDER}
          marginTop={16}
        >
          your cover...
        </Text>
        {/* {progress !== 0 ? ( */}
        <Box
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginTop={progress === 0 ? -10 : 10}
        >
          <Progress.Bar
            progress={progress}
            width={progressBarWidth - 32}
            color={theme.color.light.PRIMARY}
            style={{
              borderRadius: 4,
            }}
            borderColor={progress ? theme.color.light.PRIMARY : 'transparent'}
          />
          {progress !== 0 ? (
            <Box marginLeft={8}>
              <ActivityIndicator />
            </Box>
          ) : null}
        </Box>
        {/* ) : null} */}
      </Box>
    </TouchableOpacity>
  );
};

export const FileUploadField = memo(FileUploadFieldMemo);
