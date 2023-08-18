import { useEffect, useState } from "react";
import { useTourGuideController } from "rn-tourguide";
import { StorageService } from "../services/storage.service";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { USER_HAS_SEEN_BOTTOM_TAB_GUIDE, USER_HAS_SEEN_TOP_TAB_GUIDE } from "../constaints/consts";

const _storageService = new StorageService();

const hasUserSeenBottomTabGuide = async () => {
  const res = await _storageService.get(USER_HAS_SEEN_BOTTOM_TAB_GUIDE);

  return res ? true : false;
};

const hasUserSeenTopTabGuide = async () => {
  const res = await _storageService.get(USER_HAS_SEEN_TOP_TAB_GUIDE);

  return res ? true : false;
};

const _userSeenBottomTabGuideHandler = async () => {
  await _storageService.set(
    USER_HAS_SEEN_BOTTOM_TAB_GUIDE,
    USER_HAS_SEEN_BOTTOM_TAB_GUIDE
  );
};

const _userSeenTopTabGuideHandler = async () => {
  await _storageService.set(
    USER_HAS_SEEN_TOP_TAB_GUIDE,
    USER_HAS_SEEN_TOP_TAB_GUIDE
  );
};

export const useTourGuide = () => {
  const [tourState, setTourState] = useState(null);

  useEffect(() => {
    const _setup = async () => {
      const seen_bottom_tab = await hasUserSeenBottomTabGuide();
      if (!seen_bottom_tab) {
        setTourState(1);
        // await _userSeenBottomTabGuideHandler();
        return;
      }
      const seen_top_tab = await hasUserSeenTopTabGuide();
      if (!seen_top_tab) {
      }
    };
  }, [_storageService]);

  const { is_buy_button_tour, is_owned_video_tour, is_apps_tour } = useSelector(
    (state: RootState) => state.tourSlice
  );

  const { canStart, start, stop, eventEmitter } = useTourGuideController();

  useEffect(() => {
    const setupTour = async () => {
      if (canStart) {
        // if (is_buy_button_tour) {
        //   start(11);
        //   return;
        // } else {
          const hasUserSeen = await hasUserSeenBottomTabGuide();

          console.log({hasUserSeen})

          if (!hasUserSeen) {
            start();
          }
        // }
      }
    };

    setupTour();
  }, [canStart, is_buy_button_tour]);

  //   useEffect(() => {
  //     if (is_apps_tour) {
  //       start(30);
  //     }
  //   }, [is_apps_tour]);

  const handleOnStart = () => console.log("start");
  const handleOnStop = async () => {
    await _userSeenBottomTabGuideHandler();
  };
  const handleOnStepChange = () => console.log(`stepChange`);

  useEffect(() => {
    eventEmitter.on("start", handleOnStart);
    eventEmitter.on("stop", handleOnStop);
    eventEmitter.on("stepChange", handleOnStepChange);

    return () => {
      eventEmitter.off("start", handleOnStart);
      eventEmitter.off("stop", handleOnStop);
      eventEmitter.off("stepChange", handleOnStepChange);
    };
  }, []);

  return {};
};
