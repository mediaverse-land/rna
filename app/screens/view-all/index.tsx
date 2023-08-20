import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import ViewAllImageList from "./components/image-list";
import ViewAllTextsList from "./components/texts-list";
import ViewAllVideoList from "./components/video-list";
import ViewAllSoundList from "./components/sound-list";
import { FocusedStatusBar } from "../../components/focused-statusbar";
import { Box } from "../../components/box";
import { viewAllStyles } from "./styles";
import { UseNavigationType } from "../../types/use-navigation";
import { Text } from "../../components/text";
import { ViewAllTitle } from "./components/view-all-title";
import { VirtualizedList } from "../../components/virtualized-list";
import { useGetAssetListQuery } from "../../services/view-all.service";
import { tokenContext } from "../../context/token";
import { retriveToken } from "../../utils/retrive-token";
import { Logger } from "../../utils/logger";
import { LoadingSpinner } from "../../components/loader-spinner";
import {
  ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG,
  ICON_TOP_TABBAR_SOUND_ACTIVE_SVG,
  ICON_TOP_TABBAR_TEXT_ACTIVE_SVG,
  ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG,
} from "../../constaints/icons";

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
  "RECENTLY_IMAGES" = "RECENTLY_IMAGES",
  "RECENTLY_VIDEOS" = "RECENTLY_VIDEOS",
  "RECENTLY_SOUNDS" = "RECENTLY_SOUNDS",
  "RECENTLY_TEXTS" = "RECENTLY_TEXTS",
}

const _logger = new Logger();

const viewAllPages: Record<
  string,
  {
    icon: any;
    title: string;
    url?: string;
    ListComponent?: any;
  }
> = {
  VIEW_ALL_LIVE_CHANNELS: {
    icon: null,
    title: "",
  },
  BEST_VIDEOS: {
    icon: (
      <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "",
    url: "videos/most-viewed",
    ListComponent: ViewAllVideoList,
  },
  MOST_VIEWD_IMAGES: {
    icon: (
      <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Most viewed",
    url: "images/most-viewed",
    ListComponent: ViewAllImageList,
  },
  TOP_TEXTS: {
    icon: (
      <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Top texts",
    url: "texts/daily-recommended",
    ListComponent: ViewAllTextsList,
  },
  BEST_SONGS: {
    icon: (
      <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Best songs",
    url: "audios/daily-recommended",
    ListComponent: ViewAllSoundList,
  },
  BEST_IN_MONTH_IMAGES: {
    icon: (
      <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Best in month",
    url: "audios/daily-recommended",
    ListComponent: ViewAllImageList,
  },
  RECENTLY_IMAGES: {
    icon: (
      <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Recently images",
    url: "images",
    ListComponent: ViewAllImageList,
  },
  RECENTLY_VIDEOS: {
    icon: (
      <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Recently videos",
    url: "videos",
    ListComponent: ViewAllVideoList,
  },
  RECENTLY_SOUNDS: {
    icon: (
      <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Recently sounds",
    url: "audios",
    ListComponent: ViewAllSoundList,
  },
  RECENTLY_TEXTS: {
    icon: (
      <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Recently texts",
    url: "texts",
    ListComponent: ViewAllImageList,
  },
};

const ViewAllScreen = ({ navigation, route }: Props) => {
  const { params } = route;

  const current_page = viewAllPages[params?.pageDirection || ""];

  if (!current_page) {
    return (
      <Box>
        <Text color="red">No current page</Text>
      </Box>
    );
  }

  const tokenCtx = useContext(tokenContext);
  const isFocused = useIsFocused();

  const [preventDataFetching, setPreventDataFetching] = useState(true);
  const [token, setToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [assetList, setAssetList] = useState<any>([]);
  const [randomNumber, setRandomNumber] = useState(Math.random());

  const { icon, title, url, ListComponent } = current_page;

  const { data, isError, isSuccess, error, isLoading, isFetching } =
    useGetAssetListQuery(
      {
        url: `${url}?page=${currentPage}`,
        token,
        sessionId: randomNumber,
      },
      {
        skip: preventDataFetching,
      },
      false
    );

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setRandomNumber(Math.random());
      setPreventDataFetching(false);
    }
    if (!isFocused) {
      setAssetList([]);
    }
  }, [isFocused]);

  useEffect(() => {
    copyDataToAssetList();
  }, [data]);

  const copyDataToAssetList = () => {
    if (isFetching) {
      return;
    }

    if (!isError) {
      if (data?.length === undefined && data?.data?.length) {
        if (currentPage !== 1) {
          setAssetList([...assetList, ...data?.data]);
          return;
        }
        setAssetList(data?.data);
        return;
      }
      if (data?.length !== undefined) {
        if (currentPage !== 1) {
          setAssetList([...assetList, ...data]);
          return;
        }
        setAssetList(data);
      }
    }
  };

  const getToken = async () => {
    const token = await retriveToken(tokenCtx);
    if (!token) {
      _logger.logErro("no token at view-all.tsx line 105");
    }
    setToken(token);
  };

  if (isError) {
    <Box>
      <Text color="red">Error while fetching list</Text>
    </Box>;
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
              <ListComponent data={assetList} navigate={navigation.navigate} />
            </Box>
          ) : null}
          {isFetching ? (
            <Box height={100}>
              <LoadingSpinner />
            </Box>
          ) : null}
          {/* <ViewAllImageList data={assetList} navigate={navigation.navigate} /> */}
        </VirtualizedList>
      </LinearGradient>
    </>
  );
};

export default ViewAllScreen;
