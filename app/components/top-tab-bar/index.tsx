/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useEffect, useRef } from "react";
import { ImageStyle } from "react-native";
import { Box } from "../box";
import { TabBarComponents } from "./style";
import { theme } from "../../constaints/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { StorageService } from "../../services/storage.service";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
import {
  activeDisableOnIntractions,
  deActivrDisableOnIntractions,
  seeExploreTopBarTour,
} from "../../slices/tour.slice";
import { USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE } from "../../constaints/consts";
import {
  ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG,
  ICON_TOP_TABBAR_IMAGE_SVG,
  ICON_TOP_TABBAR_SOUND_ACTIVE_SVG,
  ICON_TOP_TABBAR_SOUND_SVG,
  ICON_TOP_TABBAR_TEXT_ACTIVE_SVG,
  ICON_TOP_TABBAR_TEXT_SVG,
  ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG,
  ICON_TOP_TABBAR_VIDEO_SVG,
} from "../../constaints/icons";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

function getTobBarItemsIcon(tobBarItemName: string, isFocused: boolean) {
  let iconPath: ReactElement<SVGElement>;
  let iconStyle: ImageStyle;

  switch (tobBarItemName) {
    case "video":
      iconPath = isFocused ? (
        <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG width={19.76} height={16} />
      ) : (
        <ICON_TOP_TABBAR_VIDEO_SVG width={19.76} height={16} />
      );
      break;
    case "image":
      iconPath = isFocused ? (
        <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG width={19.76} height={16} />
      ) : (
        <ICON_TOP_TABBAR_IMAGE_SVG width={19.76} height={16} />
      );
      break;
    case "sound":
      iconPath = isFocused ? (
        <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG width={19.76} height={16} />
      ) : (
        <ICON_TOP_TABBAR_SOUND_SVG width={19.76} height={16} />
      );
      break;
    case "text":
      iconPath = isFocused ? (
        <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG width={19.76} height={16} />
      ) : (
        <ICON_TOP_TABBAR_TEXT_SVG width={19.76} height={16} />
      );
      break;
    default:
      break;
  }

  return { iconPath, iconStyle };
}

const _storageService = new StorageService();

const tourGuides: Record<number, string> = {
  0: "This bar will help you put the application in explorer mode of different content formats, go ahead ",
  1: "In the image explorer mode, you can see a list of images shared by users and buy according to your needs ",
  2: `By selecting video mode, you'll have access to a selection of 
    live TV and recorded content`,
  3: `In the audio mode, you will encounter a large number of music, 
    podcasts, audio books, etc., and you can access any of them to 
    produce the content you want`,
  4: `In the texts mode, you can see a collection of stories, news, 
    etc., which can be the basis for the production of many digital 
    assets, either manually or with artificial intelligence!`,
};

const CoachmarkWrapper: any = Coachmark;

function TopTabBar({
  state,
  descriptors,
  navigation,
  hasFullWidth = false,
  isProfilePage = false,
}: any) {
  const topStyle = isProfilePage ? 8 : hasFullWidth ? 120 : 104;
  const dispatch = useDispatch<AppDispatch>();

  const { BOTTOM_NAVIGATION_TOUR_HAS_SEEN, DISABLE_INTRACTION } = useSelector(
    (state: RootState) => state.tourSlice
  );

  const allRef = useRef(),
    imagesRef = useRef(),
    videosRef = useRef(),
    soundsRef = useRef(),
    textsRef = useRef();

  // role 38 = admin

  const refs: Record<number, any> = {
    0: allRef,
    1: imagesRef,
    2: videosRef,
    3: soundsRef,
    4: textsRef,
  };

  const returnRef = (index: number) => {
    const currentRef = refs[index];
    return currentRef || null;
  };

  const setStateOfUserSeenTour = () => {
    dispatch(seeExploreTopBarTour());
  };

  const hasUserSeenTour = async () => {
    const hasUserSeen = await _storageService.get(
      USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE
    );
    const result = hasUserSeen ? true : false;

    if (result) {
      setStateOfUserSeenTour();
    }
    return result;
  };

  const setUserSeenTour = async () => {
    await _storageService.set(
      USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE,
      USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE
    );
  };

  const setupTourShow = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      dispatch(deActivrDisableOnIntractions());
      return;
    }
    if (
      allRef?.current &&
      imagesRef?.current &&
      videosRef?.current &&
      soundsRef?.current &&
      textsRef?.current
    ) {
      setTimeout(() => {
        // dispatch(activeDisableOnIntractions());
        const composer = new CoachmarkComposer([
          allRef,
          imagesRef,
          videosRef,
          soundsRef,
          textsRef,
        ]);
        composer.show().then(async () => {
          setStateOfUserSeenTour();
          await setUserSeenTour();
          dispatch(deActivrDisableOnIntractions());
        });
      }, 1500);
    }
  };

  useEffect(() => {
    if (isProfilePage) {
      return;
    }
    if (!BOTTOM_NAVIGATION_TOUR_HAS_SEEN) {
      return;
    }
    setupTourShow();
  }, [
    isProfilePage,
    BOTTOM_NAVIGATION_TOUR_HAS_SEEN,
    allRef,
    imagesRef,
    videosRef,
    soundsRef,
    textsRef,
    allRef?.current,
    imagesRef?.current,
    videosRef?.current,
    soundsRef?.current,
    textsRef?.current,
  ]);

  return (
    <Box
      paddingLeft={hasFullWidth ? 0 : 24}
      paddingRight={hasFullWidth ? 0 : 24}
      position="absolute"
      top={topStyle}
      zIndex={100}
      width="100%"
      backgroundColor="transparent"
    >
      <View style={styles.container}>
      <View style={styles.background} />

        <BlurView
          renderToHardwareTextureAndroid
          style={styles.blurView}
          intensity={90} // Adjust the intensity value to control the blur effect
          tint="dark" // Set the tint color ('light' or 'dark')
        >
          <TabBarComponents.TabBar
            style={{
              flexDirection: "row",
              borderRadius: hasFullWidth ? 0 : 16,
            }}
          >
            {state.routes.map(
              (route: ReturnType<(typeof state.routes)[0]>, index: number) => {
                const { options } = descriptors[route.key];

                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const { iconPath } = getTobBarItemsIcon(
                  options.title,
                  isFocused
                );

                const onPress = () => {
                  if (DISABLE_INTRACTION) {
                    return;
                  }
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    if (DISABLE_INTRACTION) {
                      return;
                    }
                    navigation.navigate({
                      name: route.name,
                      merge: true,
                    });
                  }
                };

                const onLongPress = () => {
                  navigation.emit({
                    type: "tabLongPress",
                    target: route.key,
                  });
                };

                const menuItemRef = returnRef(index);
                const menuTourText = tourGuides[index];

                return (
                  <TabBarComponents.Container
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    key={index}
                    style={{ flex: 1, top: 40 }}
                  >
                    <CoachmarkWrapper
                      allowBackgroundInteractions={false}
                      ref={menuItemRef}
                      message={menuTourText}
                    >
                      <TabBarComponents.Wrapper>
                        {iconPath ? iconPath : null}
                        {label === "All" ? (
                          <TabBarComponents.Label
                            style={{
                              color: isFocused
                                ? theme.color.light.WHITE
                                : theme.color.light.TEXT,
                            }}
                          >
                            {label}
                          </TabBarComponents.Label>
                        ) : null}
                      </TabBarComponents.Wrapper>
                    </CoachmarkWrapper>
                    {isFocused ? <TabBarComponents.SpacerBorder /> : null}
                  </TabBarComponents.Container>
                );
              }
            )}
          </TabBarComponents.TabBar>
        </BlurView>
      </View>
    </Box>
  );
}

export default TopTabBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Adjust the opacity and color as needed
  },
  blurView: {
    position: "absolute",
    width: "100%",
    height: 50,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999999999,
    borderRadius: 10,
  },
});
