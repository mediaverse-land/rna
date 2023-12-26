/* eslint-disable @typescript-eslint/ban-ts-comment */
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { useClickOutside } from 'react-native-click-outside';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ShareItem } from '../types';
import { Box } from '../../../components/box';
import { LinearGradient } from 'expo-linear-gradient';
import { ICON_MENU_VERTICAL, ICON_SPEAKER_BLACK } from '../../../constaints/icons';
import { Text } from '../../../components/text';
import { RenderIfWithoutLoading } from '../../../components/render-if-without-loading';
import { ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { useGetShareListQuery, useRemoveShareItemMutation } from '../../../services/asset.service';
import { alertContext } from '../../../context/alert';

const gradientProps: any = {
  style: {
    width: '100%',
    height: 72,
    borderRadius: 16,
    padding: 1,
  },
  colors: ['rgba(207, 207, 252, 0)', 'rgba(207, 207, 252, 0.3)'],
  start: {
    x: 0.7,
    y: 0,
  },
};

const speakerIconGradientProps: any = {
  style: {
    width: 40,
    height: 40,
    borderRadius: 8,
    padding: 1,
  },
  colors: ['#8bb3ff', '#4484ff'],
  start: {
    x: 0.1,
    y: 0.7,
  },
};

const menuWindowGradientProps: any = {
  style: {
    width: 127,
    height: 50,
    borderRadius: 16,
    padding: 1,
    opacity: 0.5,
  },
  colors: ['#4b4b55', '#38383c'],
  start: {
    x: 0.1,
    y: 0.7,
  },
};

// const _toaster = new Toaster();

const MemoShareList = ({ token }: { token: string }) => {
  const [activeEditWindowId, setActiveEditWindowId] = useState<number>(null);

  const [setSelectedItem] = useState<number | any>(null);

  const [dataList, setDataList] = useState<ShareItem[]>([]);

  const [page, setPage] = useState(1);

  const alertCtx = useContext(alertContext);


  const openEditWindowHandler = (id: number) => setActiveEditWindowId(id);
  const closeEditWindowHandler = () => setActiveEditWindowId(null);

  const { data, isLoading, isFetching } = useGetShareListQuery({
    token,
    page,
  });

  const current_page = data?.current_page;
  const total = data?.total;

  useEffect(() => {
    if (data?.data?.length) {
      if (page === 1 || current_page === 1) {
        setDataList(data?.data);
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        setDataList((prev) => [...prev, ...data?.data]);
      }
    }
  }, [page, current_page, data?.data?.length]);

  const modalWrapperRef = useClickOutside<View>(() => {
    closeEditWindowHandler();
  });

  const [_removeItemHandler, { isLoading: isRremoveLoading, isFetching: isRremoveFetching }] =
    useRemoveShareItemMutation();

  const removeExternalAccountHandler = async (accountId: number) => {
    setSelectedItem(accountId);

    const resposne = await _removeItemHandler({
      token,
      id: accountId,
    });

    if (resposne && !resposne?.error) {
      alertCtx.fire('Item deleted successfully', 'warning');
      setSelectedItem(null);
      const filteredList = dataList?.filter((f) => f.id !== accountId);
      setDataList(filteredList);
      closeEditWindowHandler();
    }
    if (resposne?.error) {
      alertCtx.fire('Failed','warning');
    }
  };

  const nextPageHandler = () => {
    if (isLoading || isFetching) {
      return;
    }

    if (total <= dataList?.length) {
      return;
    }

    setPage((pg) => pg + 1);
  };

  const renderItem = ({ item }: { item: ShareItem }) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <Box width="100%" marginBottom={16} height={activeEditWindowId === item.id ? 95 : 72}>
          <Box position="relative" zIndex={10} width="100%">
            <LinearGradient {...gradientProps}>
              <Box
                width="100%"
                height="100%"
                borderRadius={16}
                backgroundColor="#121247"
                // backgroundColor="#121247a3"
                padding={16}
                direction="row"
                alignItems="center"
                position="relative"
                justifyContent="space-between"
              >
                <Box width="90%" height="100%" direction="row" alignItems="center">
                  <LinearGradient {...speakerIconGradientProps}>
                    <Box
                      id="speaker-icon"
                      width={40}
                      height={40}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <ICON_SPEAKER_BLACK />
                    </Box>
                  </LinearGradient>
                  <Box flex={1} height="100%" paddingLeft={16}>
                    <Text color="rgba(255, 255, 255, 1)" fontWeight={600} fontSize={16}>
                      {/* @ts-ignore */}
                      share to {item?.type}
                    </Text>
                    <Text color="rgba(102, 102, 128, 1)" fontWeight={400} fontSize={12}>
                      {item?.time}
                    </Text>
                  </Box>
                </Box>
                <Box width="10%" height="100%">
                  <TouchableOpacity
                    onPress={() => openEditWindowHandler(item.id)}
                    activeOpacity={1}
                  >
                    <Box alignItems="center" justifyContent="center" width={40} height={40}>
                      <ICON_MENU_VERTICAL />
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            </LinearGradient>
          </Box>
          {activeEditWindowId === item.id ? (
            <View ref={modalWrapperRef} style={styles.editViewWrapper}>
              <LinearGradient {...menuWindowGradientProps}>
                <BlurView style={styles.blur} tint="dark" intensity={80}>
                  <Box
                    width="100%"
                    paddingLeft={16}
                    paddingRight={16}
                    paddingTop={12}
                    height="100%"
                  >
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => removeExternalAccountHandler(item?.id)}
                    >
                      <Text color="#D9D9FF" marginBottom={16} fontSize={14} fontWeight={600}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </BlurView>
              </LinearGradient>
            </View>
          ) : null}
        </Box>
      </TouchableOpacity>
    );
  };

  const key = useCallback((item: ShareItem) => item?.id?.toString(), []);

  return (
    <Box id="channels-list" width="100%" marginTop={32}>
      {/* {data?.data?.length ? ( */}
      <FlatList
        data={dataList}
        renderItem={renderItem}
        keyExtractor={key}
        style={{
          overflow: 'visible',
          paddingBottom: 100,
        }}
        onEndReached={nextPageHandler}
      />
      {/* ) : null} */}
      <RenderIfWithoutLoading
        condition={isLoading || isFetching || isRremoveFetching || isRremoveLoading}
      >
        <Box marginTop={-100}>
          <ActivityIndicator color="#8A8AE5" />
        </Box>
      </RenderIfWithoutLoading>
    </Box>
  );
};
export const ShareList = memo(MemoShareList);

const styles = StyleSheet.create({
  editViewWrapper: {
    position: 'absolute',
    width: 124,
    height: 124,
    zIndex: 100000000,
    right: 16,
    top: 58,
  },
  blur: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});
