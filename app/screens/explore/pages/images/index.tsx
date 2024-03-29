import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ImagePageBestInMonth } from './bes-in-month';
import { VirtualizedList } from '../../../../components/virtualized-list';
import { Asset } from '../../../../types/asset';
import { ImagePageMasonryList } from './masonry-list';
import { Box } from '../../../../components/box';
import { LoadingSpinner } from '../../../../components/loader-spinner';
import { tokenContext } from '../../../../context/token';
import { tokenStringResolver } from '../../../../utils/token-string-resolver';
import { UseNavigationType } from '../../../../types/use-navigation';
import { ExploreGradientWrapper } from '../../components/gradient-wrapper';
import { getBestInMonthApiHandler, getImagesPageDatApiHandler } from './service';

export function ImagesPage() {
  const isFocused = useIsFocused();

  const tokenCtx = useContext(tokenContext);
  const navigation = useNavigation<UseNavigationType>();

  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const [imagesData, setImagesData] = useState<Asset[]>([]);
  const [nextPageUrl, _setNextPageUrl] = useState<string>('/images');
  const [isInfinitLoading, setIsInfinitLoading] = useState(false);

  const [bestInMonthData, setBestInMonthData] = useState([]);
  const [bestInMonthLoading, setBestInMonthLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    await getImagesData();

    const token = await tokenCtx.getToken();
    if (token === null) {
      return;
    }

    const formattedToken = tokenStringResolver(token);
    setBestInMonthLoading(true);
    await getBestInMonthImages(formattedToken);
    setBestInMonthLoading(false);
  };

  const getBestInMonthImages = async (token: string) => {
    const { isError, res } = await getBestInMonthApiHandler(token);
    if (isError) {
      return;
    }
    const { data } = res;
    setBestInMonthData(data);
  };

  const getImagesData = async () => {
    const { isError, res } = await getImagesPageDatApiHandler('/images');

    if (isError) {
      setIsImagesLoading(false);
      return;
    }

    const { data } = res;

    if (data) {
      setImagesData(data.data);
      if (data.data.length > 11) {
        const next_page_url = data?.next_page_url?.split('/')[4];

        next_page_url && _setNextPageUrl(`/${next_page_url}`);
      }
    }

    setIsImagesLoading(false);
  };

  const getNextPageData = async () => {
    const url = nextPageUrl;
    if (!url) {
      return;
    }
    setIsInfinitLoading(true);

    const { isError, res } = await getImagesPageDatApiHandler(url);

    if (isError) {
      setIsInfinitLoading(false);

      return;
    }

    const { data } = res;
    if (data) {
      setImagesData([...imagesData, ...data.data]);

      const next_page_url = data?.next_page_url?.split('/')[4];
      if (!next_page_url) {
        setIsInfinitLoading(false);
        _setNextPageUrl(null);
        return;
      }
      next_page_url && next_page_url !== nextPageUrl && _setNextPageUrl(`/${next_page_url}`);
    }
    setIsInfinitLoading(false);
  };

  const _onRefreshHandler = async () => {
    setImagesData([]);
    _setNextPageUrl('/images');
    await getData();
  };

  return (
    <>
      <ExploreGradientWrapper>
        <VirtualizedList paddingTop={197} onRefresh={_onRefreshHandler}>
          <ImagePageBestInMonth
            data={bestInMonthData}
            isLoading={bestInMonthLoading}
            navigate={navigation.navigate}
          />
          <VirtualizedList
            onEndReached={() => {
              getNextPageData();
            }}
          >
            <ImagePageMasonryList
              isLoading={isImagesLoading}
              data={imagesData}
              navigate={navigation.navigate}
            />
            {isInfinitLoading ? (
              <Box width="100%" alignItems="center" justifyContent="center">
                <LoadingSpinner color="red" />
              </Box>
            ) : null}
          </VirtualizedList>
          <View style={styles.seperator} />
        </VirtualizedList>
      </ExploreGradientWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  seperator: {
    width: '100%',
    height: 350,
  },
  scrollView: {
    backgroundColor: 'transparent',
    paddingTop: 196,
  },
});
