import { useCallback, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FlatList, StyleSheet } from "react-native";
import { ScreenGradient } from "../../components/screen-gradient";
import { AppItemType, appItemListMockData } from "./mock-data/apps-mock-data";
import { AppItem } from "./components/apps-list";
import { Box } from "../../components/box";
import { PaddingContainer } from "../../styles/grid";
import { StorageService } from "../../services/storage.service";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
import { HAS_USER_SEEN_APPS_TOUR } from "../../constaints/consts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  activeDisableOnIntractions,
  deActivrDisableOnIntractions,
} from "../../slices/tour.slice";
import { UseNavigationType } from "../../types/use-navigation";

const TOUR_GUIDE =
  "You are the manager of a social TV and this is your TV channel, you have your conductor, playout, control room, etc. and this section is right here";

const _storageService = new StorageService();

export function AppsPageAllScreen({
  navigation,
}: {
  navigation: UseNavigationType;
}) {
  // const { DISABLE_INTRACTION } = useSelector(
  //   (state: RootState) => state.tourSlice
  // );

  const dispatch = useDispatch<AppDispatch>();

  const isFocused = useIsFocused();

  const firstAppItemRef = useRef();

  /**
   * Checks if user has seen the tour before or not,
   * if has seen, return true else false
   * @returns {boolean}
   */
  const hasUserSeenTour = async () => {
    const hasUserSeen = await _storageService.get(HAS_USER_SEEN_APPS_TOUR);
    const res = hasUserSeen ? true : false;
    if (res) {
      dispatch(deActivrDisableOnIntractions());
    }
    return res;
  };

  const setUserSeenTour = async () => {
    await _storageService.set(HAS_USER_SEEN_APPS_TOUR, HAS_USER_SEEN_APPS_TOUR);
  };

  const setupTour = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (firstAppItemRef?.current) {
      setTimeout(() => {
        const composer = new CoachmarkComposer([firstAppItemRef]);
        composer.show().then(async () => {
          await setUserSeenTour();
          dispatch(deActivrDisableOnIntractions());
        });
      }, 3000);
    }
  };

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(activeDisableOnIntractions());
      setupTour();
    }
  }, [firstAppItemRef, isFocused]);

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const __memorizedRenderItem = useCallback(
    ({ item, index }: { item: AppItemType; index: number }) => {
      const showTour = index === 0 ? true : false;

      return (
        <CoachmarkWrapper
          allowBackgroundInteractions={false}
          ref={showTour ? firstAppItemRef : null}
          message={TOUR_GUIDE}
        >
          <AppItem
            title={item.title}
            category={item.category}
            navigateToScreen={navigateToScreen}
            isDisable={item.isDisable}
            screenName={item.screenName}
            imagePath={item.imagePath}
          />
        </CoachmarkWrapper>
      );
    },
    []
  );

  // const keyExtractor = (item: AppItemType) => item.id.toString()
  const __memorizedKeyExtractor = useCallback((item: AppItemType) => item.id.toString(), [])

  return (
    <>
      <ScreenGradient>
        <PaddingContainer>
          <Box width="100%">
            <FlatList
              contentContainerStyle={styles.list}
              data={appItemListMockData}
              renderItem={__memorizedRenderItem}
              keyExtractor={__memorizedKeyExtractor}
            />
          </Box>
        </PaddingContainer>
      </ScreenGradient>
    </>
  );
}

const CoachmarkWrapper: any = Coachmark;

const styles = StyleSheet.create({
  list: {
    paddingTop: 40,
    paddingBottom: 100,
  },
});
