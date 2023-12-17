import { FC, useContext, useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Box } from '../../../../components/box';
import { windowSize } from '../../../../utils/window-size';
import { Text } from '../../../../components/text';
import { theme } from '../../../../constaints/theme';
import { AppDispatch, RootState } from '../../../../store';
import { PaddingContainer } from '../../../../styles/grid';
import { retriveToken } from '../../../../utils/retrive-token';
import { tokenContext } from '../../../../context/token';
import {
  cleanupCreatedAssetInputs,
  navigateToAddMetaDataView,
} from '../../../../slices/plus.slice';
import { UseNavigationType } from '../../../../types/use-navigation';
import { REDIRECTED_FROM_CREATE_ASSET, SINGLE_TEXT_SCREEN } from '../../../../constaints/consts';

type Props = {
  createdAssetData: { id: number; assetId: number };
  cleanupCreatedAssetId?: () => void;
};

const { width, height } = windowSize();

export const UploadLoader: FC<Props> = ({ createdAssetData }) => {
  if (!createdAssetData?.id) {
    return;
  }

  return <UploadLoaderInner createdAssetData={createdAssetData} />;
};

const UploadLoaderInner: FC<Props> = ({ createdAssetData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<number>(0);

  const { ThumbnailCover, fileBase64 } = useSelector((state: RootState) => state.plusSlice);

  const tokenCtx = useContext(tokenContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<UseNavigationType>();
  const isFocused = useIsFocused();

  const routeHistory = navigation?.getState()?.history?.[1];


  useEffect(() => {
    if (!routeHistory?.key?.includes('addAssetMetadata')) {
      navigation?.navigate('createText');
      navigateToAddMetaDataViewHandler();
    }
  }, [routeHistory, isFocused]);

  useEffect(() => {
    if (fileBase64) {
      uplodMainFile();
    }
  }, [createdAssetData?.assetId, ThumbnailCover, fileBase64]);

  const getToken = async () => {
    return await retriveToken(tokenCtx);
  };

  const navigateToAddMetaDataViewHandler = () => {
    dispatch(navigateToAddMetaDataView());
  };


  const uplodMainFile = async () => {
    const formData = new FormData();

    formData.append('asset', createdAssetData?.assetId?.toString());
    formData.append('file', fileBase64);

    const token = await getToken();

    const [status] = await submitHandler(formData, token);



    if (!ThumbnailCover && status === 'success') {
      dispatch(cleanupCreatedAssetInputs());

      // navigation?.navigate(SINGLE_TEXT_SCREEN, {
      //   id: createdAssetData?.id,
      //   asset_id: createdAssetData?.assetId,
      //   ORIGIN: REDIRECTED_FROM_CREATE_ASSET,
      // });
      setIsLoading(false);
    }


    if (status === 'success') {
      if (ThumbnailCover) {
        const [thumbnailStatus] = await uplodThumbnailFile(token);
        if (thumbnailStatus === 'success') {
          dispatch(cleanupCreatedAssetInputs());

          navigation?.navigate(SINGLE_TEXT_SCREEN, {
            id: createdAssetData?.id,
            asset_id: createdAssetData?.assetId,
            ORIGIN: REDIRECTED_FROM_CREATE_ASSET,
          });
          setIsLoading(false);
        }
      }
    }
  };

  const uplodThumbnailFile = async (token: string) => {
    const formData = new FormData();

    formData.append('asset', createdAssetData?.assetId?.toString());
    formData.append('is_thumbnail', '1');
    formData.append('file', ThumbnailCover);

    return await submitHandler(formData, token);
  };

  const submitHandler = async (requestBody: any, token: string) => {
    try {
      const result = await axios.post(`${process.env.EXPO_APPBASE_URL}/files`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-App': '_Android',
          Authorization: `Bearer ${token}`,
          'Accept-Language': 'en-US',
        },
        onUploadProgress: uploadProgress,
      });
      if (result) {
        setProgress(0);
        return ['success'];
      }
    } catch (err: any) {
      setIsLoading(false);
      console.log(err?.response?.data)
      setProgress(0);
      return ['error'];
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
