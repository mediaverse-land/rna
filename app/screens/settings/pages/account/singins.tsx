import { useState, useEffect, useContext } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenGradient } from '../../../../components/screen-gradient';
import { PaddingContainer } from '../../../../styles/grid';
import { SettingsScreenTitle } from '../../components/title';
import { Box } from '../../../../components/box';
import { Text } from '../../../../components/text';
import { SIGNINS_LIST_ITEM_GRADIET } from '../../../../constaints/images';
import { theme } from '../../../../constaints/theme';
import { getSinginsApiHandler } from '../../service';
import { tokenStringResolver } from '../../../../utils/token-string-resolver';
import { tokenContext } from '../../../../context/token';
import { Signin } from '../../../../types/signin';
import { VirtualizedList } from '../../../../components/virtualized-list';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';
import { FocusedStatusBar } from '../../../../components/focused-statusbar';

// type SignInsData = {
//     id: number;
//     date: string;
//     device_id: number;
// };

// const signInsData: SignInsData[] = [
//     {
//         id: 1,
//         date: '2020/03/26 13:23',
//         device_id: 84568305
//     },
//     {
//         id: 2,
//         date: '2020/03/26 13:23',
//         device_id: 84568305
//     },
//     {
//         id: 3,
//         date: '2020/03/26 13:23',
//         device_id: 84568305
//     }
// ];

const renderSigninItems = ({ item }: { item: Signin }) => {
  return (
    <PaddingContainer>
      <Box
        width="100%"
        height={63}
        paddingTop={22}
        paddingBottom={22}
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        marginBottom={8}
        borderRadius={16}
      >
        <Image
          source={{ uri: SIGNINS_LIST_ITEM_GRADIET }}
          style={{
            width: '100%',
            height: 62,
            position: 'absolute',
            left: 0,
            top: 0,
            borderRadius: 16,
          }}
          resizeMode="stretch"
        />
        <Text color={theme.color.light.WHITE} marginLeft={16}>
          {item.created_at}
        </Text>
        <Text color={theme.color.light.WHITE} marginRight={16}>
          {item.ip}
        </Text>
      </Box>
    </PaddingContainer>
  );
};

const pageHeaderComponent = (
  <PaddingContainer>
    <Box marginBottom={32}>
      <SettingsScreenTitle title="Sessions" />
    </Box>
  </PaddingContainer>
);

const keyExtractor = (item: Signin): string => item.id.toString();

export function SignInsPage() {
  const [data, setData] = useState<Signin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tokenCtx = useContext(tokenContext);

  const getSessions = async () => {
    setIsLoading(true);
    const token = await tokenCtx.getToken();

    if (token !== null) {
      const formattedToken = await tokenStringResolver(token);

      const { isSuccess, isError, res } = await getSinginsApiHandler(formattedToken);

      if (isError || !isSuccess) {
        setIsLoading(false);
        return;
      }

      if (res) {
        setData(res.data.data);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* {isFocused ? (
                <StatusBar
                    backgroundColor={'#030340'}
                    barStyle="light-content"
                />
            ) : null} */}
      <FocusedStatusBar />
      <ScreenGradient>
        <Box width="100%" flex={1}>
          <VirtualizedList>
            {pageHeaderComponent}
            <RenderIf condition={isLoading}>
              <IfNoItem dataLength={data.length}>
                <FlatList data={data} renderItem={renderSigninItems} keyExtractor={keyExtractor} />
              </IfNoItem>
            </RenderIf>
          </VirtualizedList>
        </Box>
      </ScreenGradient>
    </SafeAreaView>
  );
}
