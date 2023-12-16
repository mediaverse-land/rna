import { useState, useContext, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SoundsPageBestInMonth } from './best-in-month';
import { VirtualizedList } from '../../../../components/virtualized-list';
import { Spacer } from '../../../../components/spacer';
import { tokenContext } from '../../../../context/token';
import { tokenStringResolver } from '../../../../utils/token-string-resolver';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';
import { getTextDataApiHandler } from './service';
import { UseNavigationType } from '../../../../types/use-navigation';
import { SoundsPageRecently } from './recently';
import { ExploreGradientWrapper } from '../../components/gradient-wrapper';

export function TextsPage() {
  const isFocused = useIsFocused();
  const tokenCtx = useContext(tokenContext);
  const navigation = useNavigation<UseNavigationType>();

  const [bestInMonthData, setBestInMothData] = useState<any>([]);
  const [isBestInMonthLoading, setIsBestInMonthLoading] = useState(true);

  const [recentlyData, setRecentlyData] = useState<any>([]);
  const [isRecentlyLoading, setIsRecentlyLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      getData();
    }

    if (!isFocused) {
      setBestInMothData([]);
      setRecentlyData([]);
    }
  }, [isFocused]);

  const getData = async () => {
    Promise.all([
      await getApiDataData('/texts/newest', setBestInMothData, setIsBestInMonthLoading),
      await getApiDataData('/texts', setRecentlyData, setIsRecentlyLoading),
    ]);
  };

  async function getApiDataData(
    url: string,
    setter: (...args: any) => void,
    loadSetter: (isLoading: boolean) => void,
  ): Promise<void> {
    loadSetter(true);
    const token = await tokenCtx.getToken();

    if (token === null) {
      loadSetter(false);
      return null;
    }

    const formattedToken = tokenStringResolver(token);

    const { isError, res } = await getTextDataApiHandler(url, formattedToken);

    if (isError) {
      loadSetter(false);
      return;
    }

    if (res) {
      const { data } = res;
      setter(data);
    }

    loadSetter(false);
  }

  const _onRefreshHandler = async () => {
    setRecentlyData([]);
    setBestInMothData([]);
    await getData();
  };

  return (
    <>
      <ExploreGradientWrapper>
        <VirtualizedList paddingTop={197} onRefresh={_onRefreshHandler}>
          <RenderIf condition={isBestInMonthLoading}>
            <IfNoItem dataLength={bestInMonthData.length}>
              <SoundsPageBestInMonth data={bestInMonthData} />
              {/* <TextPageSwiper data={data} />
              <TextPageBestWriters /> */}
            </IfNoItem>
          </RenderIf>
          <RenderIf condition={isRecentlyLoading}>
            <IfNoItem dataLength={recentlyData?.data?.length}>
              <SoundsPageRecently data={recentlyData?.data} navigation={navigation} />
            </IfNoItem>
          </RenderIf>
          <Spacer />
          <Spacer />
          <Spacer />
        </VirtualizedList>
      </ExploreGradientWrapper>
    </>
  );
}
