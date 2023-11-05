import { useState, useContext, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SoundsPageBestInMonth } from "./best-in-month";
import { VirtualizedList } from "../../../../components/virtualized-list";
import { Spacer } from "../../../../components/spacer";
import { tokenContext } from "../../../../context/token";
import { tokenStringResolver } from "../../../../utils/token-string-resolver";
import { RenderIf } from "../../../../components/render-if";
import { IfNoItem } from "../../../../components/if-no-item";
import { FocusedStatusBar } from "../../../../components/focused-statusbar";
import { getTextDataApiHandler } from "./service";
import { ImagesPageComponents } from "../all/style";
import { UseNavigationType } from "../../../../types/use-navigation";
import { SoundsPageRecently } from "./recently";

const { ContainerStyles } = ImagesPageComponents;

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
      await getApiDataData(
        "/texts/newest",
        setBestInMothData,
        setIsBestInMonthLoading
      ),
      await getApiDataData("/texts", setRecentlyData, setIsRecentlyLoading),
    ]);

  };

  async function getApiDataData(
    url: string,
    setter: (...args: any) => void,
    loadSetter: (isLoading: boolean) => void
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
    // setIsLoading(true);
    // setData([]);
    setRecentlyData([]);
    setBestInMothData([]);
    await getData();
  };

  return (
    <>
      <FocusedStatusBar color="#0c0c21" />
      <LinearGradient
        style={[ContainerStyles]}
        colors={["#030340", "#030340"]}
        start={{ x: 0.7, y: 0 }}
      >
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
              <SoundsPageRecently
                data={recentlyData?.data}
                navigation={navigation}
              />
              {/* <TextPageSwiper data={data} />
              <TextPageBestWriters /> */}
            </IfNoItem>
          </RenderIf>
          <Spacer />
          <Spacer />
          <Spacer />
        </VirtualizedList>
      </LinearGradient>
    </>
  );
}
