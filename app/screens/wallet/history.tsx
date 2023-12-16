import { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native';
import { Box } from '../../components/box';
import { PaddingContainer } from '../../styles/grid';
import { SettingsScreenTitle } from '../settings/components/title';
import { ScreenGradient } from '../../components/screen-gradient';
import { ICON_CHECK_SQUARE_WHITE, ICON_DOWNLOAD, ICON_X_WHITE } from '../../constaints/icons';
import { Transaction } from '../../types/transaction';
import { getHistoryApiHandler } from './service';
import { tokenContext } from '../../context/token';
import { tokenStringResolver } from '../../utils/token-string-resolver';
import { HistoryListItem } from './components/history-list-item';
import { FocusedStatusBar } from '../../components/focused-statusbar';
import { RenderIf } from '../../components/render-if';
import { IfNoItem } from '../../components/if-no-item';

export function HistoryPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [dataList, setDataList] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloadActive, setIsDownloadActive] = useState(false);

  const tokenCtx = useContext(tokenContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await tokenCtx.getToken();
    if (token === null) {
      stopLoad();
      return;
    }

    const formattedToken = tokenStringResolver(token);

    await getHistoryData(formattedToken);
  };

  const getHistoryData = async (token: string) => {
    const { isError, res } = await getHistoryApiHandler(token);

    if (isError) {
      stopLoad();
      return;
    }

    const { data } = res.data;
    setDataList(data);
    stopLoad();
  };

  const stopLoad = () => {
    setIsLoading(false);
  };

  const activeRemoveHandler = () => {
    setIsDownloadActive(!isDownloadActive);
  };

  const toggleAddToDownloadItem = (id: number) => {
    const checkIfExists = selectedItems.find((f) => f === id);

    if (checkIfExists) {
      const filteredItem = selectedItems.filter((f) => f !== id);
      setSelectedItems(filteredItem);
      return;
    }

    const selectedItemsList = [...selectedItems, id];
    setSelectedItems(selectedItemsList);
  };

  const removeDownloadItems = () => {
    setSelectedItems([]);
    setIsDownloadActive(false);
  };

  const renderMessageItem = ({ item }: { item: Transaction }) => {
    const isSelected = selectedItems.find((f) => f === item.id) ? true : false;

    return (
      <HistoryListItem
        isDownloadActive={isDownloadActive}
        data={item}
        toggleAddToDownloadItem={toggleAddToDownloadItem}
        isSelected={isSelected}
      />
    );
  };

  const keyExtractor = (item: Transaction): string => item.id.toString();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <ScreenGradient>
        <Box width="100%" flex={1}>
          <Box marginBottom={48}>
            <PaddingContainer>
              <Box direction="row" alignItems="center" justifyContent="space-between">
                <Box width={150}>
                  <SettingsScreenTitle title="History" />
                </Box>
                <Box direction="row" alignItems="center">
                  {isDownloadActive ? (
                    <>
                      <TouchableOpacity activeOpacity={1} onPress={removeDownloadItems}>
                        <Box paddingTop={38}>
                          <ICON_X_WHITE width={13} height={13} />
                        </Box>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={1}>
                        <Box paddingTop={38} marginRight={15} marginLeft={15}>
                          <ICON_CHECK_SQUARE_WHITE width={16} height={16} />
                        </Box>
                      </TouchableOpacity>
                    </>
                  ) : null}
                  <TouchableOpacity activeOpacity={1} onPress={activeRemoveHandler}>
                    <Box paddingTop={36}>
                      <ICON_DOWNLOAD width={20} height={20} />
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            </PaddingContainer>
          </Box>
          <RenderIf condition={isLoading}>
            <IfNoItem dataLength={dataList.length}>
              <FlatList
                data={dataList}
                renderItem={renderMessageItem}
                keyExtractor={keyExtractor}
              />
            </IfNoItem>
          </RenderIf>
        </Box>
      </ScreenGradient>
    </SafeAreaView>
  );
}
