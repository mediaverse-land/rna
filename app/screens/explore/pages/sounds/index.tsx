import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SoundsPageBestInMonth } from "./best-in-moth";
import { SoundsPageRecently } from "./recently";
import { VirtualizedList } from "../../../../components/virtualized-list";
import { RenderIf } from "../../../../components/render-if";
import { IfNoItem } from "../../../../components/if-no-item";
import { getSoundPageDatApiHandler } from "./service";
import { Sound } from "../../../../types/sound";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { UseNavigationType } from "../../../../types/use-navigation";
import { ExploreGradientWrapper } from "../../components/gradient-wrapper";

export function SoundsPage() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<UseNavigationType>();

  const [isSoundsDataLoading, setIsSoundsDataLoading] = useState(true);
  const [soundsData, setSoundsData] = useState<Sound[]>([]);

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    await getSoundsData();
  };

  const getSoundsData = async () => {
    const { isError, res } = await getSoundPageDatApiHandler();

    if (isError) {
      setIsSoundsDataLoading(false);
      return;
    }

    const { data } = res;
    if (data) setSoundsData(data.data);

    setIsSoundsDataLoading(false);
  };

  const _onRefreshHandler = async () => {
    setIsSoundsDataLoading(true);
    setSoundsData([]);
    await getData();
  };

  return (
    <>
      <ExploreGradientWrapper>
        <VirtualizedList paddingTop={197} onRefresh={_onRefreshHandler}>
          <RenderIf condition={isSoundsDataLoading}>
            <IfNoItem dataLength={soundsData.length}>
              <SoundsPageBestInMonth
                navigation={navigation}
                isLoading={isSoundsDataLoading}
                data={soundsData}
              />
              <SoundsPageRecently
                isLoading={isSoundsDataLoading}
                data={soundsData}
                navigate={navigation.navigate}
              />
            </IfNoItem>
          </RenderIf>
          <View style={styles.seperator}></View>
        </VirtualizedList>
      </ExploreGradientWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 350,
  },
  scrollView: {
    backgroundColor: "transparent",
    paddingTop: 196,
  },
});
