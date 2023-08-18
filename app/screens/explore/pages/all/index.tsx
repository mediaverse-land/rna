import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { AllPageMostViewed } from "./most-viewed";
import { AllPageTopTenText } from "./top-ten-texts";
import { AllPageChillSongs } from "./chill-songs";
import { VirtualizedList } from "../../../../components/virtualized-list";
import { FocusedStatusBar } from "../../../../components/focused-statusbar";
import { AllPageLives } from "./lives";
import { AppDispatch, RootState } from "../../../../store";
import { ImagesPageComponents } from "./style";
import {
  useGetChillSongsQuery,
  useGetLivesQuery,
  useGetMostViewdImagesQuery,
  useGetTopTenTextsQuery,
} from "../../../../services/explore.service";

const { ContainerStyles } = ImagesPageComponents;

export function AllPage() {
  const {
    data: _livesData,
    isError: _isLivesError,
    isSuccess: _isLivesSuccess,
    isLoading: _isLivesLoading,
    refetch: refreshLives,
  } = useGetLivesQuery();

  const {
    data: _imagesData,
    isError: _isImagesError,
    isSuccess: _isImagesSuccess,
    isLoading: _isImagesLoading,
    error: _imagesError,
    refetch: refetchImages,
  } = useGetMostViewdImagesQuery();

  const {
    data: _topTenTextData,
    isError: _isTopTenTextError,
    isSuccess: _isTopTenTextSuccess,
    isLoading: _isTopTenTextLoading,
    error: _topTenTextError,
    refetch: refetchTopTenText,
  } = useGetTopTenTextsQuery();

  const {
    data: _chillSongsData,
    isError: _isChillSongsError,
    isSuccess: _isChillSongsSuccess,
    isLoading: _isChillSongsLoading,
    error: _chillSongsError,
    refetch: regreshChillSongs,
  } = useGetChillSongsQuery();

  const { DISABLE_INTRACTION } = useSelector(
    (state: RootState) => state.tourSlice
  );

  const onRefreshHandler = async () => {
    refreshLives();
    refetchImages();
    refetchTopTenText();
    regreshChillSongs();
  };

  return (
    <>
      <FocusedStatusBar color="#0c0c21" />
      <LinearGradient
        style={[ContainerStyles]}
        colors={["#030340", "#030340"]}
        start={{ x: 0.7, y: 0 }}
      >
        <VirtualizedList paddingTop={160} onRefresh={onRefreshHandler}>
          {/* Lives  */}

          <AllPageLives
            isLoading={_isLivesLoading}
            data={_livesData || []}
            disableOnIntractions={DISABLE_INTRACTION}
          />
          <AllPageMostViewed
            isLoading={_isImagesLoading}
            data={_imagesData || []}
            disableOnIntractions={DISABLE_INTRACTION}
          />
          <AllPageTopTenText
            isLoading={_isTopTenTextLoading}
            data={_topTenTextData || []}
            disableOnIntractions={DISABLE_INTRACTION}
          />
          <AllPageChillSongs
            isLoading={_isChillSongsLoading}
            data={_chillSongsData || []}
          />
          <View style={styles.space}></View>
        </VirtualizedList>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 196,
    backgroundColor: "transparent",
  },
  space: {
    width: "100%",
    height: 350,
  },
});

// import { useEffect, useState, useRef } from "react";
// import { View, StyleSheet } from "react-native";
// import { useIsFocused } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useDispatch, useSelector } from "react-redux";
// import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
// import { AllPageMostViewed } from "./most-viewed";
// import { AllPageTopTenText } from "./top-ten-texts";
// import { AllPageChillSongs } from "./chill-songs";
// import { VirtualizedList } from "../../../../components/virtualized-list";
// import { FocusedStatusBar } from "../../../../components/focused-statusbar";
// import { AllPageLives } from "./lives";
// import { StorageService } from "../../../../services/storage.service";
// import { Box } from "../../../../components/box";
// import { AppDispatch, RootState } from "../../../../store";
// import {
//   getExploreImagesApiHandler,
//   getExploreSongsApiHandler,
//   getExploreTopTenTextApiHandler,
//   getLivesApiHandler,
// } from "./service";
// import type { Asset } from "../../../../types/asset";
// import type { Live } from "../../../../types/live";
// import type { Text } from "../../../../types/text";
// import { Logger } from "../../../../utils/logger";
// import { ImagesPageComponents } from "./style";
// import { Image } from "react-native";
// import { TOP_BAR_BACKGROUND, TOP_BAR_BG } from "../../../../constaints/images";

// const LIVE_TOUR =
//   "Click on these icons and enjoy watching your favorite TV channel to create better content!";

// const CoachmarkWrapper: any = Coachmark;

// const { ContainerStyles } = ImagesPageComponents;

// const _storageService = new StorageService();
// const _loggerService = new Logger();

// export function AllPage() {
//   const [isLivesLoading, setIsLivesLoading] = useState(true);
//   const [isMostViewdLoading, setIsMostViewdLoading] = useState(true);
//   const [isTextsLoading, setIsTextsLoading] = useState(true);
//   const [isSongsLoading, setIsSongsLoading] = useState(true);

//   const [topTenTextData, setTopTenTextData] = useState<Text[]>([]);
//   const [songsData, setSongsData] = useState<Asset[]>([]);
//   const [imagesData, setImagesData] = useState<Asset[]>([]);
//   const [livesData, setLivesData] = useState<Live[]>(null);

//   const { DISABLE_INTRACTION } = useSelector(
//     (state: RootState) => state.tourSlice
//   );

//   const isFocused = useIsFocused();
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     if (isFocused) {
//       getData();
//     }
//   }, [isFocused]);

//   const getMostViewdData = async () => {
//     setIsMostViewdLoading(true);
//     const { isError, res } = await getExploreImagesApiHandler();

//     if (isError) {
//       setIsMostViewdLoading(false);
//       return;
//     }

//     const data = res.data.data;
//     setImagesData(data);

//     setIsMostViewdLoading(false);
//   };

//   const getSongsData = async () => {
//     setIsSongsLoading(true);
//     const { isError, res } = await getExploreSongsApiHandler();

//     if (isError) {
//       setIsSongsLoading(false);
//       return;
//     }

//     const data = res?.data?.data;
//     setSongsData(data);

//     setIsSongsLoading(false);
//   };

//   const getData = async () => {
//     const [lives, images, topTenText, songs] = await Promise.allSettled([
//       getLivesApiHandler(),
//       getMostViewdData(),
//       getExploreTopTenTextApiHandler(),
//       getSongsData(),
//     ]);

//     await setValue(lives, setLivesData, setIsLivesLoading);
//     await setValue(topTenText, setTopTenTextData, setIsTextsLoading);
//   };

//   const setValue = async (
//     promiseData: PromiseSettledResult<{
//       isSuccess: boolean;
//       isError: boolean;
//       res: any;
//     }>,
//     dataSetter: (data: Asset[] | Live[] | any) => void,
//     setIsLoading?: (isLoading: boolean) => void
//   ) => {
//     setIsLoading(true);
//     if (promiseData.status !== "fulfilled") {
//       _loggerService.logErro(
//         `an error occured in <ExploreAllPage>: getData>setValue func, while fetching data`
//       );
//       setIsLoading(false);

//       return;
//     }

//     const { isError, res } = promiseData.value;

//     if (isError) {
//       return;
//     }

//     const data = res.data.data || res.data;

//     dataSetter(data);
//     setIsLoading(false);
//   };

//   const onRefreshHandler = async () => {
//     // Clear data
//     setImagesData([]);
//     setLivesData([]);
//     setTopTenTextData([]);
//     setSongsData([]);

//     // Start loadings
//     setIsLivesLoading(true);
//     setIsMostViewdLoading(true);
//     setIsTextsLoading(true);
//     setIsSongsLoading(true);

//     // Re-get data
//     await getData();

//     // Stop loadings
//     setIsLivesLoading(false);
//     setIsMostViewdLoading(false);
//     setIsTextsLoading(false);
//     setIsSongsLoading(false);
//   };

//   return (
//     <>
//       <FocusedStatusBar color="#0c0c21" />
//       <LinearGradient
//         style={[ContainerStyles]}
//         colors={["#030340", "#030340"]}
//         start={{ x: 0.7, y: 0 }}
//       >
//         <VirtualizedList paddingTop={160} onRefresh={onRefreshHandler}>
//           {/* Lives  */}

//           <AllPageLives
//             isLoading={isLivesLoading}
//             data={livesData}
//             disableOnIntractions={DISABLE_INTRACTION}
//           />
//           {/* Most Viewd */}

//           <Box position="relative" top={-20}>
//             <AllPageMostViewed
//               isLoading={isMostViewdLoading}
//               data={imagesData}
//               disableOnIntractions={DISABLE_INTRACTION}
//             />
//           </Box>
//           {/* Top ten text */}
//           <AllPageTopTenText
//             isLoading={isTextsLoading}
//             data={topTenTextData}
//             disableOnIntractions={DISABLE_INTRACTION}
//           />

//           {/* Chill songs */}
//           <AllPageChillSongs isLoading={isSongsLoading} data={songsData} />
//           <View style={styles.space}></View>
//         </VirtualizedList>
//       </LinearGradient>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   scrollView: {
//     paddingTop: 196,
//     backgroundColor: "transparent",
//   },
//   space: {
//     width: "100%",
//     height: 350,
//   },
// });
