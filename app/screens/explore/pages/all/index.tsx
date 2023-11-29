import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { AllPageMostViewed } from "./most-viewed";
import { AllPageTopTenText } from "./top-ten-texts";
import { AllPageChillSongs } from "./chill-songs";
import { VirtualizedList } from "../../../../components/virtualized-list";
import { AllPageLives } from "./lives";
import { RootState } from "../../../../store";
import {
  useGetBestVideosQuery,
  useGetChillSongsQuery,
  useGetLivesQuery,
  useGetMostViewdImagesQuery,
  useGetTopTenTextsQuery,
} from "../../../../services/explore.service";
import { UseNavigationType } from "../../../../types/use-navigation";
import { ExplorePageBestVideos } from "./best-videos";
import { ExploreGradientWrapper } from "../../components/gradient-wrapper";
import { useCallback } from "react";

export function AllPage({ navigation }: { navigation: UseNavigationType }) {
  const { DISABLE_INTRACTION }: { DISABLE_INTRACTION: boolean } = useSelector(
    (state: RootState) => state.tourSlice
  );

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


  const onRefreshHandler = useCallback(async () => {
    refreshLives();
    refetchImages();
    refetchTopTenText();
    regreshChillSongs();
    refreshBestVideos();
  }, []);

  return (
    <>
      <ExploreGradientWrapper>
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
            data={_topTenTextData?.data || []}
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
      </ExploreGradientWrapper>
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
