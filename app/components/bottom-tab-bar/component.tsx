import React, { memo, useContext, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import {
  ICON_APPS_ACTIVE_SVG,
  ICON_APPS_SVG,
  ICON_EXPLORE_ACTIVE_SVG,
  ICON_EXPLORE_SVG,
  ICON_PLUS_SVG,
  ICON_PROFILE_ACTIVE_SVG,
  ICON_PROFILE_SVG,
  ICON_WALLET_ACTIVE_SVG,
  ICON_WALLET_SVG,
} from "./../../constaints/icons";
import { alertContext } from "../../context/alert";
import { Box } from "../box";

import { StorageService } from "../../services/storage.service";

import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
import { BackgroundSvg } from "./background-svg";
import { USER_HAS_SEEN_BOTTOM_TAB_GUIDE } from "../../constaints/consts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  activeDisableOnIntractions,
  seeButtomNavigationTour,
} from "../../slices/tour.slice";
import { PLUS_BUTTON_BG } from "../../constaints/images";

const icons: any = {
  explore: {
    path: <ICON_EXPLORE_SVG width={20} height={20} style={{ marginTop: 10 }} />,
    activePath: (
      <ICON_EXPLORE_ACTIVE_SVG
        width={20}
        height={20}
        style={{ marginTop: 10 }}
      />
    ),
    styles: {
      width: 20,
      height: 20,
      marginTop: 10,
    },
  },
  apps: {
    path: <ICON_APPS_SVG width={20} height={20} style={{ marginTop: 10 }} />,
    activePath: (
      <ICON_APPS_ACTIVE_SVG width={20} height={20} style={{ marginTop: 10 }} />
    ),
    styles: {
      width: 20,
      height: 20,
      marginTop: 10,
    },
  },
  wallet: {
    path: <ICON_WALLET_SVG width={20} height={16} style={{ marginTop: 10 }} />,
    activePath: (
      <ICON_WALLET_ACTIVE_SVG
        width={20}
        height={16}
        style={{ marginTop: 10 }}
      />
    ),
    styles: {
      width: 20,
      height: 16,
      marginTop: 10,
    },
  },
  profile: {
    path: <ICON_PROFILE_SVG width={16} height={20} style={{ marginTop: 10 }} />,
    activePath: (
      <ICON_PROFILE_ACTIVE_SVG
        width={16}
        height={20}
        style={{ marginTop: 10 }}
      />
    ),
    styles: {
      width: 16,
      height: 20,
      marginTop: 10,
    },
  },
};

const tourGuides: Record<number, string> = {
  0: "In the explorer, you will see a different collection of digital content that can be purchased and used",
  1: "In the Apps, you will find a set of social TV management tools to help you do the most complicated tasks easily",
  2: "Just press +, select the type of digital content, generate the asset and it's ready to publish and sell with one button",
  3: "In Mediaverse, the world of digital content, your every action is a financial transaction, some transactions are income and some are expenses, you can see your transactions in this section",
  4: "In your profile, you can see all your user information, messages, digital assets, etc",
};

const CoachmarkWrapper: any = Coachmark;
const _storageService = new StorageService();

function BottomTabBarComponent({ state, navigation }: any) {
  const { DISABLE_INTRACTION } = useSelector(
    (state: RootState) => state.tourSlice
  );

  const tabBarItemClickNavigateHandler = (screenName: string) => {
    if (DISABLE_INTRACTION) {
      return;
    }
    navigation?.navigate(screenName);
  };

  const plusNavigationHandler = () => {
    navigation?.navigate("Plus");
  };

  const alertCtx: any = useContext(alertContext);
  const dispatch = useDispatch<AppDispatch>();

  const isAlertModalOpen = alertCtx.isOpen() || false;

  const exploreBtnRef = useRef();
  const appsBtnRef = useRef();
  const plusBtnRef = useRef();
  const walletBtnRef = useRef();
  const profileBtnRef = useRef();

  const returnRef = (index: number) => {
    const refs: Record<number, any> = {
      0: exploreBtnRef,
      1: appsBtnRef,
      2: plusBtnRef,
      3: walletBtnRef,
      4: profileBtnRef,
    };

    return refs[index];
  };

  const setStateOfUserSeenTour = () => {
    dispatch(seeButtomNavigationTour());
  };

  const hasUserSeenTour = async () => {
    const hasUserSeen = await _storageService.get(
      USER_HAS_SEEN_BOTTOM_TAB_GUIDE
    );
    const result = hasUserSeen ? true : false;

    if (result) {
      setStateOfUserSeenTour();
    }
    return result;
  };

  const setUserSeenTour = async () => {
    await _storageService.set(
      USER_HAS_SEEN_BOTTOM_TAB_GUIDE,
      USER_HAS_SEEN_BOTTOM_TAB_GUIDE
    );
  };

  const setupTourShow = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (
      exploreBtnRef?.current &&
      appsBtnRef?.current &&
      plusBtnRef?.current &&
      walletBtnRef?.current &&
      profileBtnRef?.current
    ) {
      setTimeout(() => {
        dispatch(activeDisableOnIntractions());
        const composer = new CoachmarkComposer([
          exploreBtnRef,
          appsBtnRef,
          plusBtnRef,
          walletBtnRef,
          profileBtnRef,
        ]);
        composer.show().then(async () => {
          setStateOfUserSeenTour();
          await setUserSeenTour();
          // dispatch(deActivrDisableOnIntractions());
        });
      }, 3000);
    }
  };

  useEffect(() => {
    setupTourShow();
  }, [
    exploreBtnRef,
    appsBtnRef,
    plusBtnRef,
    walletBtnRef,
    profileBtnRef,
    exploreBtnRef?.current,
    appsBtnRef?.current,
    plusBtnRef?.current,
    walletBtnRef?.current,
    profileBtnRef?.current,
  ]);

  return (
    <View style={[styles.container]}>
      {!isAlertModalOpen ? (
        <View style={[styles.content]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.plusButton}
            onPress={plusNavigationHandler}
          >
            <PLUS_BUTTON_BG style={styles.plusButtonBg} 
            width={110} height={110}
            />
            <ICON_PLUS_SVG width={20} height={20} />
          </TouchableOpacity>

          <View style={styles.subContent}>
            {state.routes.map((route: any, i: number) => {
              const isFocused = state.index === i;
              const icon = icons[route.name.toLowerCase()];

              const currentIcon: any = isFocused
                ? icon?.activePath
                : icon?.path;

              const buttonRef = returnRef(i);

              const tourMessage = tourGuides[i];

              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={1}
                  onPress={() => tabBarItemClickNavigateHandler(route.name)}
                  style={[
                    {
                      height: 64,
                      borderWidth: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderColor: "transparent",
                    },
                    i === 0 && {
                      width: "17.5%",
                    },
                    i === 1 && {
                      width: "17.5%",
                    },
                    i === 2 && {
                      width: "30%",
                    },
                    i === 3 && {
                      width: "17.5%",
                    },
                    i === 4 && {
                      width: "17.5%",
                    },
                  ]}
                >
                  <CoachmarkWrapper
                    allowBackgroundInteractions={false}
                    ref={buttonRef}
                    message={tourMessage}
                  >
                    <Box>{currentIcon ? currentIcon : null}</Box>
                  </CoachmarkWrapper>
                </TouchableOpacity>
              );
            })}
          </View>
          <Box>
            <BackgroundSvg />
          </Box>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "column",
    zIndex: 1,
    height: 100,
    width: Dimensions.get("window").width - 30,
    maxWidth: 326,
    marginBottom: "4%",
    position: "absolute",
    bottom: "1%",
  },
  subContent: {
    flexDirection: "row",
    marginBottom: 10,
    position: "absolute",
    bottom: 5,
    justifyContent: "space-between",
    zIndex: 2,
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 100,
    position: "absolute",
    top: 13,
    zIndex: 10,
    left: "41.4%",
    justifyContent: "center",
    alignItems: "center",
    borderColor:'transparent',
    backgroundColor:'transparent',
  },
  plusButtonBg: {
    width: 56,
    height: 56,
    position:'absolute',
    top: -19
  },
});


export default memo(BottomTabBarComponent)