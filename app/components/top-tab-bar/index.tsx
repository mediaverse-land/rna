/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ReactElement, useEffect, useMemo, useRef } from 'react';
// import { ImageStyle, Platform } from 'react-native';
// import { Box } from '../box';
// import { TabBarComponents } from './style';
// import { theme } from '../../constaints/theme';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store';
// import { StorageService } from '../../services/storage.service';
// import { Coachmark, CoachmarkComposer } from 'react-native-coachmark';
// import { deActivrDisableOnIntractions, seeExploreTopBarTour } from '../../slices/tour.slice';
// import { USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE } from '../../constaints/consts';
// import {
//   ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG,
//   ICON_TOP_TABBAR_IMAGE_SVG,
//   ICON_TOP_TABBAR_SOUND_ACTIVE_SVG,
//   ICON_TOP_TABBAR_SOUND_SVG,
//   ICON_TOP_TABBAR_TEXT_ACTIVE_SVG,
//   ICON_TOP_TABBAR_TEXT_SVG,
//   ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG,
//   ICON_TOP_TABBAR_VIDEO_SVG,
// } from '../../constaints/icons';
// import { View, StyleSheet } from 'react-native';
// import { BlurView } from 'expo-blur';

// function getTobBarItemsIcon(tobBarItemName: string, isFocused: boolean) {
//   let iconPath: ReactElement<SVGElement>;
//   let iconStyle: ImageStyle;

//   switch (tobBarItemName) {
//     case 'video':
//       iconPath = isFocused ? (
//         <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG width={19.76} height={16} />
//       ) : (
//         <ICON_TOP_TABBAR_VIDEO_SVG width={19.76} height={16} />
//       );
//       break;
//     case 'image':
//       iconPath = isFocused ? (
//         <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG width={19.76} height={16} />
//       ) : (
//         <ICON_TOP_TABBAR_IMAGE_SVG width={19.76} height={16} />
//       );
//       break;
//     case 'sound':
//       iconPath = isFocused ? (
//         <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG width={19.76} height={16} />
//       ) : (
//         <ICON_TOP_TABBAR_SOUND_SVG width={19.76} height={16} />
//       );
//       break;
//     case 'text':
//       iconPath = isFocused ? (
//         <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG width={19.76} height={16} />
//       ) : (
//         <ICON_TOP_TABBAR_TEXT_SVG width={19.76} height={16} />
//       );
//       break;
//     default:
//       break;
//   }

//   return { iconPath, iconStyle };
// }

// const _storageService = new StorageService();

// const tourGuides: Record<number, string> = {
//   0: 'This bar will help you put the application in explorer mode of different content formats, go ahead ',
//   1: 'In the image explorer mode, you can see a list of images shared by users and buy according to your needs ',
//   2: `By selecting video mode, you'll have access to a selection of 
//     live TV and recorded content`,
//   3: `In the audio mode, you will encounter a large number of music, 
//     podcasts, audio books, etc., and you can access any of them to 
//     produce the content you want`,
//   4: `In the texts mode, you can see a collection of stories, news, 
//     etc., which can be the basis for the production of many digital 
//     assets, either manually or with artificial intelligence!`,
// };

// const CoachmarkWrapper: any = Coachmark;

// function TopTabBar({
//   state,
//   descriptors,
//   navigation,
//   hasFullWidth = false,
//   isProfilePage = false,
//   hasBorderRadius = true,
// }: any) {
//   const topStyle = isProfilePage ? 8 : hasFullWidth ? 120 : Platform.OS === 'android' ? 104 : 84;
//   const dispatch = useDispatch<AppDispatch>();

//   const { BOTTOM_NAVIGATION_TOUR_HAS_SEEN, DISABLE_INTRACTION } = useSelector(
//     (state: RootState) => state.tourSlice,
//   );

//   const allRef = useRef(),
//     imagesRef = useRef(),
//     videosRef = useRef(),
//     soundsRef = useRef(),
//     textsRef = useRef();

//   // role 38 = admin

//   const refs: Record<number, any> = useMemo(() => {
//     return {
//       0: allRef,
//       1: imagesRef,
//       2: videosRef,
//       3: soundsRef,
//       4: textsRef,
//     };
//   }, []);

//   const returnRef = (index: number) => {
//     const currentRef = refs[index];
//     return currentRef || null;
//   };

//   const setStateOfUserSeenTour = () => {
//     dispatch(seeExploreTopBarTour());
//   };

//   const hasUserSeenTour = async () => {
//     const hasUserSeen = await _storageService.get(USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE);
//     const result = hasUserSeen ? true : false;

//     if (result) {
//       setStateOfUserSeenTour();
//     }
//     return result;
//   };

//   const setUserSeenTour = async () => {
//     await _storageService.set(
//       USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE,
//       USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE,
//     );
//   };

//   const setupTourShow = async () => {
//     const hasSeen = await hasUserSeenTour();
//     if (hasSeen) {
//       dispatch(deActivrDisableOnIntractions());
//       return;
//     }
//     if (
//       allRef?.current &&
//       imagesRef?.current &&
//       videosRef?.current &&
//       soundsRef?.current &&
//       textsRef?.current
//     ) {
//       setTimeout(() => {
//         // dispatch(activeDisableOnIntractions());
//         const composer = new CoachmarkComposer([allRef, imagesRef, videosRef, soundsRef, textsRef]);
//         composer.show().then(async () => {
//           setStateOfUserSeenTour();
//           await setUserSeenTour();
//           dispatch(deActivrDisableOnIntractions());
//         });
//       }, 1500);
//     }
//   };

//   useEffect(() => {
//     if (isProfilePage) {
//       return;
//     }
//     if (!BOTTOM_NAVIGATION_TOUR_HAS_SEEN) {
//       return;
//     }
//     setupTourShow();
//   }, [
//     isProfilePage,
//     BOTTOM_NAVIGATION_TOUR_HAS_SEEN,
//     allRef,
//     imagesRef,
//     videosRef,
//     soundsRef,
//     textsRef,
//     allRef?.current,
//     imagesRef?.current,
//     videosRef?.current,
//     soundsRef?.current,
//     textsRef?.current,
//   ]);

//   return (
//     <Box
//       paddingLeft={hasFullWidth ? 0 : 24}
//       paddingRight={hasFullWidth ? 0 : 24}
//       position="absolute"
//       top={topStyle}
//       zIndex={100}
//       width="100%"
//     >
//       <View
//         style={[styles.container, hasBorderRadius ? { borderRadius: 16 } : { borderRadius: 0 }]}
//       >
//         <View style={[styles.background]} />

//         <BlurView
//           renderToHardwareTextureAndroid
//           style={[styles.blurView]}
//           intensity={70}
//           tint="dark"
//         >
//           <TabBarComponents.TabBar
//             style={[
//               {
//                 flexDirection: 'row',
//               },
//               hasBorderRadius ? { borderRadius: 16 } : { borderRadius: 0 },
//             ]}
//           >
//             {state.routes.map((route: ReturnType<(typeof state.routes)[0]>, index: number) => {
//               const { options } = descriptors[route.key];

//               const label =
//                 options.tabBarLabel !== undefined
//                   ? options.tabBarLabel
//                   : options.title !== undefined
//                   ? options.title
//                   : route.name;

//               const isFocused = state.index === index;

//               const { iconPath } = getTobBarItemsIcon(options.title, isFocused);

//               const onPress = () => {
//                 if (DISABLE_INTRACTION) {
//                   return;
//                 }
//                 const event = navigation.emit({
//                   type: 'tabPress',
//                   target: route.key,
//                   canPreventDefault: true,
//                 });

//                 if (!isFocused && !event.defaultPrevented) {
//                   if (DISABLE_INTRACTION) {
//                     return;
//                   }
//                   navigation.navigate({
//                     name: route.name,
//                     merge: true,
//                   });
//                 }
//               };

//               const onLongPress = () => {
//                 navigation.emit({
//                   type: 'tabLongPress',
//                   target: route.key,
//                 });
//               };

//               const menuItemRef = returnRef(index);
//               const menuTourText = tourGuides[index];

//               return (
//                 <TabBarComponents.Container
//                   accessibilityRole="button"
//                   accessibilityState={isFocused ? { selected: true } : {}}
//                   accessibilityLabel={options.tabBarAccessibilityLabel}
//                   testID={options.tabBarTestID}
//                   onPress={onPress}
//                   onLongPress={onLongPress}
//                   key={index}
//                   style={{ flex: 1, top: 40 }}
//                 >
//                   <CoachmarkWrapper
//                     allowBackgroundInteractions={false}
//                     ref={menuItemRef}
//                     message={menuTourText}
//                   >
//                     <TabBarComponents.Wrapper>
//                       {iconPath ? iconPath : null}
//                       {label === 'All' ? (
//                         <TabBarComponents.Label
//                           style={{
//                             color: isFocused ? theme.color.light.WHITE : theme.color.light.TEXT,
//                           }}
//                         >
//                           {label}
//                         </TabBarComponents.Label>
//                       ) : null}
//                     </TabBarComponents.Wrapper>
//                   </CoachmarkWrapper>
//                   {isFocused ? <TabBarComponents.SpacerBorder /> : null}
//                 </TabBarComponents.Container>
//               );
//             })}
//           </TabBarComponents.TabBar>
//         </BlurView>
//       </View>
//     </Box>
//   );
// }

// export default TopTabBar;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 16,
//     height: 50,
//     overflow: 'hidden',
//   },
//   background: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   blurView: {
//     position: 'absolute',
//     width: '100%',
//     height: 50,
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 999999999999,
//     backgroundColor: 'rgba(14, 14, 18, 0.50)',

//     borderRadius: 10,
//   },
// });

////////////////////////////////////////


import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { ImageStyle, Platform } from 'react-native';
import { Box } from '../box';
import { TabBarComponents } from './style';
import { theme } from '../../constaints/theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { StorageService } from '../../services/storage.service';
import { Coachmark, CoachmarkComposer } from 'react-native-coachmark';
import { deActivrDisableOnIntractions, seeExploreTopBarTour } from '../../slices/tour.slice';
import { USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE } from '../../constaints/consts';
import {
  ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG,
  ICON_TOP_TABBAR_IMAGE_SVG,
  ICON_TOP_TABBAR_SOUND_ACTIVE_SVG,
  ICON_TOP_TABBAR_SOUND_SVG,
  ICON_TOP_TABBAR_TEXT_ACTIVE_SVG,
  ICON_TOP_TABBAR_TEXT_SVG,
  ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG,
  ICON_TOP_TABBAR_VIDEO_SVG,
} from '../../constaints/icons';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { isAndroid } from '../../controllers/platform.controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const IS_ANDROID = isAndroid();

function getTobBarItemsIcon(tobBarItemName: string, isFocused: boolean) {
  let iconPath: ReactElement<SVGElement>;
  let iconStyle: ImageStyle;

  switch (tobBarItemName) {
    case 'video':
      iconPath = isFocused ? (
        <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG width={19.76} height={16} />
      ) : (
        <ICON_TOP_TABBAR_VIDEO_SVG width={19.76} height={16} />
      );
      break;
    case 'image':
      iconPath = isFocused ? (
        <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG width={19.76} height={16} />
      ) : (
        <ICON_TOP_TABBAR_IMAGE_SVG width={19.76} height={16} />
      );
      break;
    case 'sound':
      iconPath = isFocused ? (
        <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG width={19.76} height={16} />
      ) : (
        <ICON_TOP_TABBAR_SOUND_SVG width={19.76} height={16} />
      );
      break;
    case 'text':
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
  0: 'This bar will help you put the application in explorer mode of different content formats, go ahead ',
  1: 'In the image explorer mode, you can see a list of images shared by users and buy according to your needs ',
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
  hasBorderRadius = true,
}: any) {
  const { top } = useSafeAreaInsets();

  const topStyle = isProfilePage ? 8 : hasFullWidth ? 120 : Platform.OS === 'android' ? 104 : 84;
  const dispatch = useDispatch<AppDispatch>();

  const [tapedItem, setTapedItem] = useState<any>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(null);

  const { BOTTOM_NAVIGATION_TOUR_HAS_SEEN, DISABLE_INTRACTION } = useSelector(
    (state: RootState) => state.tourSlice,
  );

  useEffect(() => {
    if (!tapedItem) {
      return;
    }
    const onPress = () => {
      if (DISABLE_INTRACTION) {
        return;
      }
      const event = navigation.emit({
        type: 'tabPress',
        target: tapedItem?.target,
        canPreventDefault: true,
      });

      if (!tapedItem.isFocused && !event?.defaultPrevented) {
        if (DISABLE_INTRACTION) {
          return;
        }
        navigation.navigate({
          name: tapedItem?.name,
          merge: true,
        });
      }
    };

    onPress();
  }, [focusedIndex]);

  const allRef = useRef(),
    imagesRef = useRef(),
    videosRef = useRef(),
    soundsRef = useRef(),
    textsRef = useRef();

  // role 38 = admin

  const refs: Record<number, any> = useMemo(() => {
    return {
      0: allRef,
      1: imagesRef,
      2: videosRef,
      3: soundsRef,
      4: textsRef,
    };
  }, []);

  const returnRef = (index: number) => {
    const currentRef = refs[index];
    return currentRef || null;
  };

  const setStateOfUserSeenTour = () => {
    dispatch(seeExploreTopBarTour());
  };

  const hasUserSeenTour = async () => {
    const hasUserSeen = await _storageService.get(USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE);
    const result = hasUserSeen ? true : false;

    if (result) {
      setStateOfUserSeenTour();
    }
    return result;
  };

  const setUserSeenTour = async () => {
    await _storageService.set(
      USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE,
      USER_HAS_SEEN_EXPLORE_TOP_BAR_TOUR_GUIDE,
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
        const composer = new CoachmarkComposer([allRef, imagesRef, videosRef, soundsRef, textsRef]);
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

  const setItemsToState = (...args: any) => {
    setTapedItem({
      isFocused: args[0].isFocused,
      is_DISABLE_INTRACTION: args[0].DISABLE_INTRACTION,
      type: 'tabPress',
      target: args[0].target,
      canPreventDefault: true,
      name: args[0].name,
      merge: true,
    });
  };

  return (
    <Box
      paddingLeft={hasFullWidth ? 0 : 24}
      paddingRight={hasFullWidth ? 0 : 24}
      position="absolute"
      top={topStyle + top}
      zIndex={100}
      width="100%"
    >
      <View
        style={[styles.container, hasBorderRadius ? { borderRadius: 16 } : { borderRadius: 0 }]}
      >
        <View style={[styles.background]} />

        <BlurView
          renderToHardwareTextureAndroid
          style={[styles.blurView]}
          intensity={IS_ANDROID ? 0:20}
          tint="dark"
        >
          <TabBarComponents.TabBar
            style={[
              {
                flexDirection: 'row',
              },
              hasBorderRadius ? { borderRadius: 16 } : { borderRadius: 0 },
            ]}
          >
            {state.routes.map((route: ReturnType<(typeof state.routes)[0]>, index: number) => {
              const { options } = descriptors[route.key];

              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;

              const { iconPath }: any = getTobBarItemsIcon(options.title, isFocused);

              const _setItemsToState = ({ name, target, _isFocused }: any) => {
                setItemsToState({
                  isFocused: _isFocused,
                  is_DISABLE_INTRACTION: DISABLE_INTRACTION,
                  type: 'tabPress',
                  target: target,
                  canPreventDefault: true,
                  name: name,
                  merge: true,
                });
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              const menuItemRef = returnRef(index);
              const menuTourText = tourGuides[index];

              return (
                <TabBarComponents.Container
                  accessibilityRole="button"
                  accessibilityState={focusedIndex === index ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={() => {
                    setFocusedIndex(state.index);
                    _setItemsToState({
                      name: route.name,
                      target: route.key,
                      _isFocused: isFocused,
                    });
                  }}
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
                      {label === 'All' ? (
                        <TabBarComponents.Label
                          style={{
                            color: isFocused ? theme.color.light.WHITE : theme.color.light.TEXT,
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
            })}
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    height: 50,
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: 50,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999999999,
    backgroundColor: 'rgba(14, 14, 18, 0.50)',

    borderRadius: 10,
  },
});

// ////////////////////////////////////////
