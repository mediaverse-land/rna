import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import { FocusedStatusBar } from "../../components/focused-statusbar";
import { Box } from "../../components/box";
import { viewAllStyles } from "./styles";
import { UseNavigationType } from "../../types/use-navigation";
import { Text } from "../../components/text";
import { ViewAllTitle } from "./components/view-all-title";
import { VirtualizedList } from "../../components/virtualized-list";
import { tokenContext } from "../../context/token";
import { retriveToken } from "../../utils/retrive-token";
import { LoadingSpinner } from "../../components/loader-spinner";
import { getViewAllDataApiHandler } from "./service";
import { Logger } from "../../utils/logger";
import { viewAllPages } from "./models";

type Props = {
  navigation: UseNavigationType;
  route: {
    key: string;
    name: string;
    params: Record<string, string>;
  };
};

export enum ViewAllPageEnum {
  "VIEW_ALL_LIVE_CHANNELS" = "VIEW_ALL_LIVE_CHANNELS",
  "BEST_VIDEOS" = "BEST_VIDEOS",
  "MOST_VIEWD_IMAGES" = "MOST_VIEWD_IMAGES",
  "TOP_TEXTS" = "TOP_TEXTS",
  "BEST_SONGS" = "BEST_SONGS",
  "BEST_IN_MONTH_IMAGES" = "BEST_IN_MONTH_IMAGES",
  "BEST_IN_MONTH_TEXTS" = "BEST_IN_MONTH_TEXTS",
  "RECENTLY_IMAGES" = "RECENTLY_IMAGES",
  "RECENTLY_VIDEOS" = "RECENTLY_VIDEOS",
  "RECENTLY_SOUNDS" = "RECENTLY_SOUNDS",
  "RECENTLY_TEXTS" = "RECENTLY_TEXTS",
}

const _logger = new Logger();

const ViewAllScreen = ({ navigation, route }: Props) => {
  const { params } = route;
  const current_page = viewAllPages[params?.pageDirection || ""];

  const tokenCtx = useContext(tokenContext);
  const isFocused = useIsFocused();

  const [currentPage, setCurrentPage] = useState(1);
  const [assetList, setAssetList] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { icon, title, url, ListComponent } = current_page;

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getData();
    }
    if (!isFocused) {
      setAssetList([]);
    }
  }, [isFocused]);

  const getData = async () => {
    const token = await retriveToken(tokenCtx);
    if (!token) {
      _logger.logErro("no token at view-all.tsx line 105");
    }

    const { res, isSuccess, isError, errorRes } =
      await getViewAllDataApiHandler(`/${url}?page=${currentPage}`, token);

    if (isError) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const { data } = res;

    if (data?.length === undefined && data?.data?.length) {
      if (currentPage !== 1) {
        setAssetList([...assetList, ...data?.data]);
        return;
      }
      setAssetList(data?.data);
      setIsLoading(false);
      return;
    }
    if (data?.length !== undefined) {
      if (currentPage !== 1) {
        setAssetList([...assetList, ...data]);
        return;
      }

      setAssetList(data);
    }
    setIsLoading(false);
  };


  const handleNextPage = () => {
    if(isLoading){
      return;
    }
    setCurrentPage((pg) => pg + 1);
  };

  if (error) {
    <Box>
      <Text color="red">Error while fetching list</Text>
    </Box>;
  }

  if (!current_page) {
    return (
      <Box>
        <Text color="red">No current page</Text>
      </Box>
    );
  }

  return (
    <>
      <FocusedStatusBar color="#0c0c21" />
      <LinearGradient
        style={[viewAllStyles.container]}
        colors={["#030340", "#030340"]}
        start={{ x: 0.7, y: 0 }}
      >
        <VirtualizedList>
          <ViewAllTitle title={title} icon={icon} goBack={navigation.goBack} />
          {ListComponent ? (
            <Box paddingBottom={100}>
              <ListComponent
                data={assetList}
                navigate={navigation.navigate}
              />
            </Box>
          ) : null}
          {isLoading ? (
            <Box height={100}>
              <LoadingSpinner />
            </Box>
          ) : null}
        </VirtualizedList>
      </LinearGradient>
    </>
  );
};

export default ViewAllScreen;
