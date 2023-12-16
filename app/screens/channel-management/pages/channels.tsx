import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { Box } from '../../../components/box';
import BottomSheet from '@gorhom/bottom-sheet';
import { alertContext } from '../../../context/alert';
import { tokenContext } from '../../../context/token';
import { retriveToken } from '../../../utils/retrive-token';
import { RenderIfWithoutLoading } from '../../../components/render-if-without-loading';
import { AddChannelButton } from '../components/add-channel-button';
import { AddChannelBottomSheet } from '../components/add-channel-button-sheet';
import { ChannelsList } from '../components/channel-list';

const BOTTOM_SHEET_BLUR_BG = Platform.OS === 'android' ? 'rgba(78, 78, 97, 0.75)' : 'transparent';

export const ChannelsPage = ({ headerComponent }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState('');

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['100%'], []);

  const alrtCtx = useContext(alertContext);
  const tokenCtx = useContext(tokenContext);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const _token = await retriveToken(tokenCtx);
    setToken(_token);
  };

  const hideBottomTabbar = () => {
    alrtCtx?.open();
  };

  const showBottomSheet = () => {
    alrtCtx?.close();
  };

  const handleOnChangeBottomSheet = useCallback((index: number) => {
    if (index === -1) {
      showBottomSheet();
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleOpenPres = useCallback(() => {
    setIsOpen(true);
    hideBottomTabbar();

    sheetRef.current?.expand();
  }, []);

  const handleClosePres = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <>
      <FlatList
        data={[]}
        ListHeaderComponentStyle={styles.header}
        // estimatedItemSize={50}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={
          <>
            <Box
              id="wrapper"
              width="100%"
              paddingRight={24}
              paddingLeft={24}
              paddingTop={32}
              flex={1}
              paddingBottom={130}
            >
              <AddChannelButton modalOpener={handleOpenPres} />
              <RenderIfWithoutLoading condition={token ? true : false}>
                <ChannelsList token={token} />
              </RenderIfWithoutLoading>
            </Box>
          </>
        }
        renderItem={null}
      />

      {isOpen ? (
        <View style={styles.container}>
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose
            onChange={handleOnChangeBottomSheet}
            handleComponent={null}
            backgroundStyle={{
              backgroundColor: BOTTOM_SHEET_BLUR_BG,
            }}
          >
            <AddChannelBottomSheet modalCloser={handleClosePres} token={token} />
          </BottomSheet>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  header: {
    flex: 1,
    height: 200,
  },
  container: {
    flex: 1,
    height: 300,
    width: '100%',
    padding: 24,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
