import React, { useContext, useMemo, useRef, useState } from 'react';
import { Box } from '../../../components/box';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { ICON_DOWNLOAD_WHITE } from '../../../constaints/icons';
import { tokenStringResolver } from '../../../utils/token-string-resolver';
import { useGoogleDriveShareMutation } from '../../../services/asset.service';
import ExternalAccountBottomSheet from '../../../components/external-account-bottom-sheet';
import { ModalBottomSheet } from '../../../components/bottom-sheet-modal';
import { useClickOutside } from 'react-native-click-outside';
import { ExternalAccount } from '../../../types/external-account';
import { LoadingSpinner } from '../../../components/loader-spinner';
import {
  DOWNLOAD_BTN_BG_GTADIENT,
  EDIT_BTN_BG_GTADIENT,
  SINGLE_ASSET_FOOTER_BG_PNG_GRADIENT,
} from '../../../constaints/images';
import { alertContext } from '../../../context/alert';

type Props = {
  fileName: string;
  asset_Id: number;
  parent_Id: number;
  editorHandler: () => void;
  tokenCtx: any;
  token: string;
};

// const _toaster = new Toaster();

export const SingleAssetFooter = ({
  fileName,
  editorHandler,
  asset_Id,
  tokenCtx,
  token,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectAccountRef = useRef(null);
  const alertCtx = useContext(alertContext);

  const innerSelectAccountRef = useClickOutside<View>(() => {
    selectAccountRef?.current.close();
  });

  const [downalodHandler, { isLoading, isFetching }] = useGoogleDriveShareMutation();

  const getToken = async () => {
    const token = await tokenCtx.getToken();
    return await tokenStringResolver(token);
  };

  const openDownloadModal = async () => {
    selectAccountRef?.current?.open();
  };

  const closeDownoadModal = () => {
    selectAccountRef?.current?.close();
  };

  const downalodToGoogleDriveHandler = async (accounId: number, time: string) => {
    const requestBody: Record<string, any> = {
      asset: asset_Id,
      account: accounId,
    };

    if (time) {
      requestBody['times'] = [time];
    }

    const token = await getToken();

    const result = await downalodHandler({ body: requestBody, token });
    if (result?.error) {
      alertCtx.fire('Error while saving asset to your google drive','warning');
    }
    if (result?.data) {
      alertCtx.fire('Asset saved to your google drive successfully','warning');
    }
  };

  const getExternalAccountHandler = async (_account: ExternalAccount, time: string) => {
    const accounId: number = _account?.id;

    await downalodToGoogleDriveHandler(accounId, time);
    closeDownoadModal();
  };

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  if (!token) {
    return;
  }

  return (
    <>
      {!isOpen ? (
        <Box width="100%" height={160} position="relative">
          <GradientBg />
          <Box
            width="100%"
            height="100%"
            position="absolute"
            top={0}
            left={0}
            padding={24}
            zIndex={10}
          >
            <DownloadButton handler={openDownloadModal} fileName={fileName} />
            <EditButton handler={editorHandler} />
          </Box>
        </Box>
      ) : null}
      <ModalBottomSheet
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={(e) => {
          if (e !== 1) {
            setIsOpen(true);
          }
          if (e === -1) {
            setIsOpen(false);
          }
        }}
        ref={selectAccountRef}
        snapPoints={snapPoints}
      >
        <View
          ref={innerSelectAccountRef}
          style={{
            marginBottom: 200,
            flex: 1,
            height: 1000,
          }}
        >
          {isLoading || isFetching ? (
            <LoadingSpinner />
          ) : (
            <ExternalAccountBottomSheet
              setSelectedAccount={getExternalAccountHandler}
              token={token}
            />
          )}
        </View>
      </ModalBottomSheet>
    </>
  );
};

const DownloadButton = ({ handler, fileName }: any) => {
  return (
    <TouchableOpacity onPress={handler} activeOpacity={1}>
      <Box
        width="100%"
        height={48}
        borderRadius={8}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={16}
      >
        <Image
          source={{
            uri: DOWNLOAD_BTN_BG_GTADIENT,
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          resizeMode="stretch"
        />
        <Text
          color={theme.color.light.WHITE}
          fontWeight={400}
          fontSize={14}
          // lineHeight={14}
          marginLeft={16}
        >
          {fileName}
        </Text>
        <Box marginRight={16}>
          <ICON_DOWNLOAD_WHITE />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const EditButton = ({ handler }: any) => {
  return (
    <TouchableOpacity onPress={handler} activeOpacity={1}>
      <Box width="100%" height={48} borderRadius={8} justifyContent="center" alignItems="center">
        <Image
          source={{
            uri: EDIT_BTN_BG_GTADIENT,
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          resizeMode="stretch"
        />
        <Box
          alignItems="center"
          justifyContent="center"
          width="90%"
          height="90%"
          backgroundColor="#333355"
        >
          <Text
            color={theme.color.light.LIGHT_DESCRIPTION}
            fontWeight={600}
            fontSize={14}
            // lineHeight={20}
          >
            Edit information
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const GradientBg = () => {
  return (
    <Image
      source={{
        uri: SINGLE_ASSET_FOOTER_BG_PNG_GRADIENT,
      }}
      style={{
        width: '101%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1,
      }}
      resizeMode="stretch"
    />
  );
};
