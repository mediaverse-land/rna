import { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenGradient } from "../../../components/screen-gradient";
import { tokenContext } from "../../../context/token";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import { VirtualizedList } from "../../../components/virtualized-list";
import { RenderIf } from "../../../components/render-if";
import { MetaDataType, SingleItemMetaData } from "../components/item-metadata";
import { getLiveDataApiHandler } from "../service";
import { Live } from "../../../types/live";
import { SingleLiveHeader } from "./header";
import { PaddingContainer } from "../../../styles/grid";
import { FocusedStatusBar } from "../../../components/focused-statusbar";

export function SingleLiveScreen({ navigation, route }: any) {
  const { id } = route.params;

  const [data, setData] = useState<Live>(null);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<any>(null);

  const tokenCtx = useContext(tokenContext);

  useEffect(() => {
    if (id) {
      getLiveData();
    }
  }, []);

  const getLiveData = async () => {
    setIsLoading(true);
    const token = await tokenCtx.getToken();

    if (token === null) {
      setIsLoading(false);
      return;
    }

    const formattedToken = tokenStringResolver(token);

    const { isError, res } = await getLiveDataApiHandler(formattedToken, id);

    if (isError) {
      setIsLoading(false);
      return;
    }

    const response = res.data;
    setData(response);
    setIsLoading(false);
  };

  const thumbnail = data?.thumbnail;

  const goBackHandler = () => {
    navigation.goBack();
  };

  const metaDataList: MetaDataType[] =
    [
      {
        id: 2,
        key: "Country",
        value: data?.country,
      },
      {
        id: 3,
        key: "Lanuage",
        value: data?.language,
      },
    ] || [];

  const imageUrl = `https://api.mediaverse.land/storage/${data?.image}`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <ScreenGradient>
        <VirtualizedList>
          <RenderIf condition={isLoading}>
            {data ? (
              <>
                <SingleLiveHeader
                  videoRef={videoRef}
                  thumnailImageUri={thumbnail}
                  goBackHandler={goBackHandler}
                  contentName={data?.title}
                  videoUri={data?.link}
                  imageUrl={imageUrl}
                />
                <PaddingContainer>
                  <SingleItemMetaData data={metaDataList} />
                </PaddingContainer>
              </>
            ) : null}
          </RenderIf>
        </VirtualizedList>
      </ScreenGradient>
    </SafeAreaView>
  );
}
