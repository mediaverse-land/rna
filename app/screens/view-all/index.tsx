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
import { getViewAllDataApiHandler } from "./service";
import {
  GDrive,
  MimeTypes,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import { enviroments } from "../../../enviroments/enviroments";
import * as Google from "expo-auth-session/providers/google";
import { Button } from "../../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GDriveApi from "@robinbobin/react-native-google-drive-api-wrapper/api/GDriveApi";
// import { GoogleSignin, GoogleDrive } from "react-native-google-drive-api";
import axios from "axios";

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
    title: "Best Videos",
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
    ListComponent: ViewAllTextsList,
  },
};

async function initializeGoogleDrive() {
  // try {
  //   await GoogleSignin.configure({
  //     scopes: ['https://www.googleapis.com/auth/drive.file'],
  //     webClientId: enviroments.REACT_APP_EXPO_CLIENT_ID
  //   });
  //   await GoogleSignin.signIn();
  //   console.log('Google Drive initialized successfully.');
  // } catch (error) {
  //   console.error('Failed to initialize Google Drive:', error);
  // }
}

// Call the initialization function when needed.
initializeGoogleDrive();

const getToken = async () => {
  return await AsyncStorage.getItem("GOOGLE_ACCESS_TOKEN");
};

const ViewAllScreen = ({ navigation, route }: Props) => {
  const { params } = route;
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: enviroments.REACT_APP_ANDROID_CLIENT_ID,
    iosClientId: enviroments.REACT_APP_IOS_CLIENT_ID,
    expoClientId: enviroments.REACT_APP_EXPO_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/drive.file']
  });

  useEffect(() => {
    if (response?.type === "success") {
      const res = response?.authentication;
      console.log(res)
      if (res?.accessToken) {
        AsyncStorage.setItem("GOOGLE_ACCESS_TOKEN", res?.accessToken);
        uploadFile(res?.accessToken)
      }
    }
  }, [response]);


  async function uploadFile(access: string) {
    try {
      const uploadUrl = "https://www.googleapis.com/upload/drive/v3/files";
      // console.log(AsyncStorage.getItem("GOOGLE_ACCESS_TOKEN"))
      const headers = {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      };

      const fileData = new FormData();
      fileData.append(
        "metadata",
        JSON.stringify({
          name: "example.txt",
          parents: [],
        })
      );
      fileData.append("file", {
        uri: "https://cdn.dribbble.com/users/4536274/screenshots/13988146/media/d079a6ca8b7f5db3229815799098a9b6.png?resize=1000x750&vertical=center",
        type: "text/plain",
        name: "example.txt",
      });

      const response = await axios.post(uploadUrl, fileData, { headers });
      console.log("File uploaded successfully. File ID:", response.data.id);
    } catch (error) {
      console.error(JSON.stringify(error?.response?.data));
    }
  }

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

  if (error) {
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
          <Button
            text="Signin"
            varient="primary"
            onpressHandler={() => promptAsync()}
          />
          <ViewAllTitle title={title} icon={icon} goBack={navigation.goBack} />
          {ListComponent ? (
            <Box paddingBottom={100}>
              <ListComponent data={assetList} navigate={navigation.navigate} />
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
