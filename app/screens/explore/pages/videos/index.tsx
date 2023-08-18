import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { VideoPageBestInMonth } from "./best-in-month";
import { VideoPageList } from "./list";
import { VideoPageComponents } from "./style";
import { VirtualizedList } from "../../../../components/virtualized-list";
import { getVideosPageDatApiHandler } from "./service";
import { Asset } from "../../../../types/asset";
import { FocusedStatusBar } from "../../../../components/focused-statusbar";
import { Live } from "../../../../types/live";
import { getLivesApiHandler } from "../all/service";
import { VideosPageLives } from "./lives";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
import { StorageService } from "../../../../services/storage.service";
import { HAS_USER_SEEN_EXPLORE_ALL_TOUR } from "../../../../constaints/consts";
import {
  activeDisableOnIntractions,
  deActivrDisableOnIntractions,
} from "../../../../slices/tour.slice";

const { ContainerStyles } = VideoPageComponents;

const LIVE_TOUR =
  "Click on these icons and enjoy watching your favorite TV channel to create better content!";

const CoachmarkWrapper: any = Coachmark;

const _storageService = new StorageService();

export function VideosPage() {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [videoListData, setVideoListData] = useState<Asset[]>([]);
  const [livesData, setLivesData] = useState<any>([]);
  const [isDisabledOnIntractions, setIsDisabledOnIntractions]=useState(false)

  const { EXPLORE_TOP_BAR_TOUR_HAS_SEEN } = useSelector(
    (state: RootState) => state.tourSlice
  );

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async (): Promise<void> => {
    setIsLoading(true);

    const [lives, videos] = await Promise.allSettled([
      getLivesApiHandler(),
      getVideosPageDatApiHandler(),
    ]);

    await setValue(lives, setLivesData);
    await setValue(videos, setVideoListData);

    setIsLoading(false);
  };

  const dispatch = useDispatch<AppDispatch>();

  const setValue = async (
    promiseData: PromiseSettledResult<{
      isSuccess: boolean;
      isError: boolean;
      res: any;
    }>,
    dataSetter: (data: Asset[] | Live[] | any) => void
  ) => {
    if (promiseData.status !== "fulfilled") {
      return;
    }

    const { isError, res, isSuccess } = promiseData.value;

    if (isError || !isSuccess) {
      return;
    }

    const { data } = res.data;

    dataSetter(data || res.data);
  };

  /**
   * Checks if user has seen the tour before or not,
   * if has seen, return true else false
   * @returns {boolean}
   */
  const hasUserSeenTour = async () => {
    if (!EXPLORE_TOP_BAR_TOUR_HAS_SEEN) {
      return;
    }
    const hasUserSeen = await _storageService.get(
      HAS_USER_SEEN_EXPLORE_ALL_TOUR
    );
    return hasUserSeen ? true : false;
  };

  const setUserSeenTour = async () => {
    await _storageService.set(
      HAS_USER_SEEN_EXPLORE_ALL_TOUR,
      HAS_USER_SEEN_EXPLORE_ALL_TOUR
    );
  };

  const firstLiveText = useRef<Coachmark>(null);
  const mostViewdRef = useRef<Coachmark>(null);

  const setupTour = async () => {
    if (!EXPLORE_TOP_BAR_TOUR_HAS_SEEN) {
      
      // dispatch(deActivrDisableOnIntractions());
      return;
    }
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }
    if (livesData?.length && firstLiveText?.current && mostViewdRef?.current) {
      setIsDisabledOnIntractions(true)
      setTimeout(() => {
        const composer = new CoachmarkComposer([firstLiveText, mostViewdRef]);
        composer.show().then(async () => {
          await setUserSeenTour();
          // dispatch(deActivrDisableOnIntractions());
          setIsDisabledOnIntractions(false)
        });
      }, 3000);
    }
  };

  useEffect(() => {
    // dispatch(activeDisableOnIntractions());
  }, [])

  useEffect(() => {
    setupTour();
  }, [livesData?.length, EXPLORE_TOP_BAR_TOUR_HAS_SEEN]);

  const _onRefreshHandler = async () => {
    setIsLoading(true)
    setLivesData([]);
    setVideoListData([]);
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
          <CoachmarkWrapper
            allowBackgroundInteractions={false}
            ref={firstLiveText}
            message={LIVE_TOUR}
          >
            <VideosPageLives
              disableOnIntractions={isDisabledOnIntractions}
              data={livesData}
              isLoading={isLoading}
            />
          </CoachmarkWrapper>
          <CoachmarkWrapper
            allowBackgroundInteractions={false}
            ref={mostViewdRef}
            message="most viewd tour guide"
          >
            <VideoPageBestInMonth disableOnIntractions={isDisabledOnIntractions} isLoading={isLoading} data={videoListData} />
          </CoachmarkWrapper>
          <VideoPageList
            isLoading={isLoading}
            data={videoListData}
            disableOnIntractions={isDisabledOnIntractions}
            onEndReached={() => {
              // console.log('end')
            }}
          />
          <View style={{ width: "100%", height: 320 }}></View>
        </VirtualizedList>
      </LinearGradient>
    </>
  );
}
