import { memo, useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { Input } from '../../../components/form';
import { Button } from '../../../components/button';
import { Select } from '../../../components/form/select';
import { useAddExternalAccountMutation } from '../../../services/asset.service';
import { getUserEmailByAccessToken } from '../../accounts/service';
import {
  EXTERNAL_ACCOUNT_CREATION_SUCCESS_MSG,
  ERROR_EXTERNAL_ACCOUNT_CREATION_MSG,
  ERROR_FETCH_GOOGLE_DATA,
} from '../../../constaints/errors-and-messages';
import { Logger } from '../../../utils/logger';
import {
  EXTERNAL_ACCOUNT_GOOGLE_TYPE,
  EXTERNAL_ACCOUNT_STREAM_TYPE,
} from '../../../constaints/consts';
import { Toaster } from '../../../utils/toaster';
import { useGetExternalAccountsListQuery } from '../../../services/auth.service';
import { useGoogleSignin } from '../../../hooks/use-google-singin';

type CreateAccount = {
  accessToken: string;
  refreshToken: string;
  email: string;
};

type ChannelAccountType = 'Google' | 'Twitter' | 'Facebook' | 'Stream';

const BOTTOM_SHEET_BLUR_PERCENT = Platform.OS === 'android' ? 50 : 80;

const MemoSelect = memo(Select);
const MemoInput = memo(Input);

const _logger = new Logger();
const _toaster = new Toaster();

export const AddChannelBottomSheet = ({
  modalCloser,
  token,
}: {
  modalCloser: () => void;
  token: string;
}) => {
  const [response, promptAsync] = useGoogleSignin();
  const [channelType, setChannelType] = useState<ChannelAccountType>('Google');
  const [streamData, setStreamData] = useState<{
    email: string;
    stream_key: string;
    stream_url: string;
  }>(null);

  const [_createAccountApiHandler, { isLoading, isFetching }] = useAddExternalAccountMutation();

  const { refetch } = useGetExternalAccountsListQuery({
    token,
    page: 1,
  });

  useEffect(() => {
    if (response?.authentication) {
      registerGoogleAccountHandler();
    }
  }, [response]);

  // Register google account
  const registerGoogleAccountHandler = async () => {
    if (response?.authentication) {
      const accessToken = response?.authentication?.accessToken;
      const refreshToken = response?.authentication?.refreshToken || null;

      const userGoogleData = await getUserEmailByAccessToken(accessToken);
      if (!userGoogleData) {
        _logger.log(ERROR_FETCH_GOOGLE_DATA);
        return;
      }

      await _createAccountMiddleware({
        email: userGoogleData?.email,
        accessToken,
        refreshToken,
      });
    }
  };

  const _createAccountMiddleware = async ({ email, accessToken, refreshToken }: CreateAccount) => {
    const requestBody = {
      body: {
        type: EXTERNAL_ACCOUNT_GOOGLE_TYPE,
        title: email,
        refresh_token: refreshToken,
        access_token: accessToken,
      },
      token,
    };

    const response = await _createAccountApiHandler(requestBody);

    if (response?.error) {
      _toaster.show(
        response?.error?.data?.errors?.title?.[0] ||
          response?.error?.data?.error ||
          ERROR_EXTERNAL_ACCOUNT_CREATION_MSG,
      );
    }
    if (response?.data) {
      refetch();
      _toaster.show(EXTERNAL_ACCOUNT_CREATION_SUCCESS_MSG);
      modalCloser();
    }
  };

  const createGoogleAccount = async () => {
    await promptAsync();
  };

  const createStreamAccount = async () => {
    if (channelType !== 'Stream') {
      return;
    }
    if (!streamData?.email || !streamData?.stream_key || !streamData?.stream_url) {
      _toaster.show('Please fill all inputs');
    }

    const { stream_key, stream_url, email } = streamData;

    const requestBody = {
      body: {
        // Stream type
        type: EXTERNAL_ACCOUNT_STREAM_TYPE,
        title: email,
        stream_url,
        stream_key,
      },
      token,
    };

    const response = await _createAccountApiHandler(requestBody);
    if (response?.error) {
      _toaster.show(
        response?.error?.data?.message ||
          response?.error?.data?.error ||
          ERROR_EXTERNAL_ACCOUNT_CREATION_MSG,
      );
    }
    if (response?.data) {
      refetch();
      modalCloser();
      _toaster.show(EXTERNAL_ACCOUNT_CREATION_SUCCESS_MSG);
    }
  };

  const createAccountSubmitHandler = async () => {
    switch (channelType) {
      case 'Google':
        createGoogleAccount();
        break;
      case 'Stream':
        await createStreamAccount();
        break;
    }
  };

  const updateStreamInputs = (key: string, value: string) => {
    setStreamData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <BottomSheetScrollView style={styles.bottomSheetScrollView}>
      <BlurView
        style={[styles.bottomSheetBlurView]}
        tint="dark"
        intensity={BOTTOM_SHEET_BLUR_PERCENT}
      >
        <Box width="100%" paddingTop={24} paddingBottom={32} paddingRight={32} paddingLeft={32}>
          <MemoTitle modalCloser={modalCloser} />
          <Box id="form" marginTop={24}>
            <MemoInput showBorder={false} labelText="Username" placeholder="Insert username..." />
            <Box marginTop={16}></Box>
            <MemoSelect
              options={['Google', 'Twitter', 'Facebook', 'Stream']}
              value={'Google'}
              setSelected={setChannelType}
              labelText="Type"
              placeholder="Choose type"
            />

            {channelType === 'Stream' ? (
              <>
                <Box marginTop={16}></Box>
                <MemoInput
                  showBorder={false}
                  labelText="Email"
                  placeholder="Insert Email..."
                  onChangeText={(text: string) => {
                    updateStreamInputs('email', text);
                  }}
                />
                <Box marginTop={16}></Box>
                <MemoInput
                  showBorder={false}
                  labelText="Stream key"
                  placeholder="Insert stream key..."
                  onChangeText={(text: string) => {
                    updateStreamInputs('stream_key', text);
                  }}
                />
                <Box marginTop={16}></Box>
                <MemoInput
                  showBorder={false}
                  labelText="Stream url"
                  placeholder="rtmp://..."
                  onChangeText={(text: string) => {
                    updateStreamInputs('stream_url', text);
                  }}
                />
                <Box marginTop={16}></Box>
              </>
            ) : null}

            <Box marginTop={24}></Box>
            <Button
              varient="dark"
              text="Add"
              isLoading={isLoading || isFetching}
              onpressHandler={createAccountSubmitHandler}
            />
          </Box>
        </Box>
      </BlurView>
    </BottomSheetScrollView>
  );
};

// Email, Stream URL, stream key

const Title = ({ modalCloser }: { modalCloser: () => void }) => {
  return (
    <Box id="title" direction="row" alignItems="center" justifyContent="space-between">
      <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
        Add channel
      </Text>
      <Box>
        <TouchableOpacity onPress={modalCloser}>
          <Text fontSize={14} fontWeight={300} color={theme.color.light.LIGHT_TEXT}>
            Cancel
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

const MemoTitle = memo(Title);

const styles = StyleSheet.create({
  bottomSheetScrollView: {
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    flex: 1,
  },
  bottomSheetBlurView: {
    width: '100%',
    flex: 1,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});
