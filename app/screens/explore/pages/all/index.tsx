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
import { RootState } from "../../../../store";
import { ImagesPageComponents } from "./style";
import {
  useGetBestVideosQuery,
  useGetChillSongsQuery,
  useGetLivesQuery,
  useGetMostViewdImagesQuery,
  useGetTopTenTextsQuery,
} from "../../../../services/explore.service";
import { UseNavigationType } from "../../../../types/use-navigation";
import { ExplorePageBestVideos } from "./best-videos";

const { ContainerStyles } = ImagesPageComponents;

export function AllPage({ navigation }: { navigation: UseNavigationType }) {
  const {
    data: _livesData,
    isError: _isLivesError,
    isSuccess: _isLivesSuccess,
    isLoading: _isLivesLoading,
    refetch: refreshLives,
  } = useGetLivesQuery();

  const {
    data: _bestVideosData,
    isError: _isBestVideosError,
    isSuccess: _isBestVideosSuccess,
    isLoading: _isBestVideosLoading,
    refetch: refreshBestVideos,
  } = useGetBestVideosQuery();

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

  const { DISABLE_INTRACTION }: { DISABLE_INTRACTION: boolean } = useSelector(
    (state: RootState) => state.tourSlice
  );

  const onRefreshHandler = async () => {
    refreshLives();
    refetchImages();
    refetchTopTenText();
    regreshChillSongs();
    refreshBestVideos();
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
          <AllPageLives
            navigation={navigation}
            isLoading={_isLivesLoading}
            data={_livesData || []}
            disableOnIntractions={DISABLE_INTRACTION}
          />
          <ExplorePageBestVideos
            navigation={navigation}
            isLoading={_isBestVideosLoading}
            data={_bestVideosData || []}
            disableOnIntractions={DISABLE_INTRACTION}
          />
          <AllPageMostViewed
            isLoading={_isImagesLoading}
            data={_imagesData || []}
            disableOnIntractions={DISABLE_INTRACTION}
            navigation={navigation}
          />
          <AllPageTopTenText
            isLoading={_isTopTenTextLoading}
            data={_topTenTextData || []}
            disableOnIntractions={DISABLE_INTRACTION}
            navigation={navigation}
          />
          <AllPageChillSongs
            isLoading={_isChillSongsLoading}
            data={_chillSongsData || []}
            navigation={navigation}
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
    height: 280,
  },
});
