import { useState, useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SoundsPageBestInMonth } from "./best-in-month";
import { TextPageSwiper } from "./swiper";
import { TextPageBestWriters } from "./best-writers";
import { VirtualizedList } from "../../../../components/virtualized-list";
import { Spacer } from "../../../../components/spacer";
import { tokenContext } from "../../../../context/token";
import { tokenStringResolver } from "../../../../utils/token-string-resolver";
import { RenderIf } from "../../../../components/render-if";
import { IfNoItem } from "../../../../components/if-no-item";
import { FocusedStatusBar } from "../../../../components/focused-statusbar";
import { getTextDataApiHandler } from "./service";
import { ImagesPageComponents } from "../all/style";
import type { Text } from "../../../../types/text";

const { ContainerStyles } = ImagesPageComponents;

export function TextsPage() {
  const isFocused = useIsFocused();
  const tokenCtx = useContext(tokenContext);

  const [data, setData] = useState<Text[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(isFocused){
        getData();
    }
}, [isFocused]);

  async function getData(): Promise<void> {
    const token = await tokenCtx.getToken();

    if (token === null) {
      setIsLoading(false);
      return null;
    }

    const formattedToken = tokenStringResolver(token);

    const { isError, res } = await getTextDataApiHandler(formattedToken);

    if (isError) {
      setIsLoading(false);
      return;
    }

    if (res) {
      const { data } = res;
      setData(data);
    }

    setIsLoading(false);
  }

  const _onRefreshHandler = async () => {
    setIsLoading(true)
    setData([]);
    await getData()
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
          <RenderIf condition={isLoading}>
            <IfNoItem dataLength={data.length}>
              <SoundsPageBestInMonth data={data} />
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
