import { FC, useContext, useEffect, useState } from 'react';
import { Box } from '../../../../components/box';
import { windowSize } from '../../../../utils/window-size';
import { Text } from '../../../../components/text';
import { ActivityIndicator } from 'react-native';
import { theme } from '../../../../constaints/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import axios from 'axios';
import { PaddingContainer } from '../../../../styles/grid';
import * as Progress from 'react-native-progress';
import { retriveToken } from '../../../../utils/retrive-token';
import { tokenContext } from '../../../../context/token';

type Props = {
  assetId: number;
  cleanupCreatedAssetId: () => void;
};

const { width, height } = windowSize();

export const UploadLoader: FC<Props> = ({ assetId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<number>(0);

  const { ThumbnailCover, fileBase64 } = useSelector((state: RootState) => state.plusSlice);

  const tokenCtx = useContext(tokenContext);

  useEffect(() => {
    if (fileBase64) {
      uplodMainFile();
    }
  }, [assetId, ThumbnailCover, fileBase64]);

  const getToken = async () => {
    return await retriveToken(tokenCtx);
  };

  const uplodMainFile = async () => {
    const requestBody = {
      asset: assetId,
      is_thumbnail: false,
      file: fileBase64,
    };

    console.log(requestBody);

    const token = await getToken();

    await submitHandler(requestBody, token);

    if (ThumbnailCover) {
      // await uplodThumbnailFile(token);
    }
  };

  // const uplodThumbnailFile = async (token: string) => {
  //   const requestBody = {
  //     asset: assetId,
  //     is_thumbnail: true,
  //     file: ThumbnailCover,
  //   };

  //   await submitHandler(requestBody, token);
  // };

  const submitHandler = async (requestBody: any, token: string) => {
    console.log(requestBody);
    try {
      const result = await axios.post(`${process.env.EXPO_APPBASE_URL}/files`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-App': '_Android',
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: uploadProgress,
      });
      if (result) {
        setIsLoading(false);
      }
    } catch (err: any) {
      setIsLoading(false);
      console.log(err?.response?.data);
    }
  };

  const uploadProgress = (progressEvent: any) => {
    const Percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    setProgress(Percentage);
  };

  return (
    <Box width={width} height={height - 100} alignItems="center" justifyContent="center">
      <Text color={theme.color.light.ACTIVE_TEXT}>Asset is uploading</Text>
      <Text color={theme.color.light.ACTIVE_TEXT} marginTop={16}>
        Please wait
      </Text>
      <Box marginTop={24}>{isLoading ? <ActivityIndicator /> : null}</Box>

      <Box marginTop={32}>
        <PaddingContainer>
          <Progress.Bar
            progress={progress}
            width={width - 48}
            color={theme.color.light.PRIMARY}
            style={{
              borderRadius: 4,
            }}
            borderColor={progress ? theme.color.light.PRIMARY : 'transparent'}
          />
        </PaddingContainer>
      </Box>
    </Box>
  );
};
