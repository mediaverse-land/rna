import { useState, useEffect, useRef } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Box } from "../../../components/box";
import { theme } from "../../../constaints/theme";
import { UseNavigationType } from "../../../types/use-navigation";
import { CREATE_IMAGE, CREATE_SOUND, CREATE_TEXT } from "../constaints";
import { windowSize } from "../../../utils/window-size";
import { StorageService } from "../../../services/storage.service";
import { HAS_USER_SEEN_PLUS_TOUR } from "../../../constaints/consts";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
import { isAndroid } from "../../../controllers/platform.controller";
import { TabbarBackground } from "./tabbar-background";
import {
  menuOrdersIfImageScreen,
  menuOrdersIfSoundScreen,
  menuOrdersIfTextScreen,
} from "../models";
import { CurrentPage } from "../types";
import { msg } from "../msg";

type Props = {
  navigation: UseNavigationType;
  descriptors?: any;
  state?: any;
  submitButtonHandler?: (args?: any) => void;
  longPressSubmitButtonHandler?: (args?: any) => void;
  longressOutSubmitButtonHandler?: (args?: any) => void;
  currentPage: CurrentPage;
  isLoading: boolean;
};

const _isAndroid = isAndroid();

const { height } = windowSize();

const _storageService = new StorageService();

const CoachmarkWrapper: any = Coachmark;

export function BottomTabBar({
  navigation,
  submitButtonHandler,
  longPressSubmitButtonHandler,
  longressOutSubmitButtonHandler,
  currentPage,
  isLoading,
}: Props) {
  let currentIcons;

  if (currentPage === CREATE_IMAGE) {
    currentIcons = menuOrdersIfImageScreen;
  }

  if (currentPage === CREATE_SOUND) {
    currentIcons = menuOrdersIfSoundScreen;
  }

  if (currentPage === CREATE_TEXT) {
    currentIcons = menuOrdersIfTextScreen;
  }

  const isFocused = useIsFocused();

  const [menuOrder] = useState(currentIcons);

  const tabBarItemClickNavigateHandler = (screenName: string) => {
    if (isLoading) {
      return;
    }
    // Prevent intreactions if user has not seen tour guide
    navigation?.navigate(screenName);
  };

  /**
   * Checks if user has seen the tour before or not,
   * if has seen, return true else false
   * @returns {boolean}
   */
  const hasUserSeenTour = async () => {
    const hasUserSeen = await _storageService.get(HAS_USER_SEEN_PLUS_TOUR);
    const res = hasUserSeen ? true : false;
    // if (res) {
    //   setPreventIntractions(false);
    // }
    return res;
  };

  const setUserSeenTour = async () => {
    await _storageService.set(HAS_USER_SEEN_PLUS_TOUR, HAS_USER_SEEN_PLUS_TOUR);
  };

  const imageButtonRef = useRef();
  const textButtonRef = useRef();
  const soundButtonRef = useRef();

  const setupTour = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (
      imageButtonRef?.current &&
      textButtonRef?.current &&
      soundButtonRef?.current
    ) {
      setTimeout(() => {
        const composer = new CoachmarkComposer([
          imageButtonRef,
          soundButtonRef,
          textButtonRef,
        ]);
        composer.show().then(async () => {
          await setUserSeenTour();
          // setPreventIntractions(false);
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (!_isAndroid) {
      return;
    }
    if (isFocused) {
      setupTour();
    }
  }, [imageButtonRef, textButtonRef, soundButtonRef]);

  return (
    <>
      <Box width="100%" height={200} position="absolute" bottom={1}>
        <TabbarBackground />
        <Box
          width="100%"
          height={height / 7}
          bottom={-2}
          position="absolute"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            id="buttons-wrapper"
            width="100%"
            height={118}
            position="absolute"
            bottom={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            paddingLeft={64}
            paddingRight={64}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                tabBarItemClickNavigateHandler(menuOrder?.next.screen)
              }
            >
              <CoachmarkWrapper
                allowBackgroundInteractions={false}
                ref={textButtonRef}
                message={msg.TEXT_GUIDE}
              >
                <Box
                  width={40}
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  {menuOrder?.next.icon}
                </Box>
              </CoachmarkWrapper>
            </TouchableOpacity>
            <Box position="relative" top={20} height="100%">
              <TouchableOpacity
                activeOpacity={1}
                onPress={submitButtonHandler}
                onLongPress={longPressSubmitButtonHandler}
                onPressOut={longressOutSubmitButtonHandler}
              >
                <CoachmarkWrapper
                  allowBackgroundInteractions={false}
                  ref={imageButtonRef}
                  message={msg.CAMERA_GUIDE}
                >
                  <Box
                    id="selected-content-button-blue-border"
                    width={72}
                    height={72}
                    backgroundColor={theme.color.light.PRIMARY}
                    borderRadius={100}
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    top={-25}
                  >
                    <Box
                      id="selected-content-button-dark-body"
                      width={56}
                      height={56}
                      backgroundColor="#030340"
                      borderRadius={100}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {isLoading ? (
                        <ActivityIndicator />
                      ) : (
                        menuOrder?.center.icon
                      )}
                    </Box>
                  </Box>
                </CoachmarkWrapper>
              </TouchableOpacity>
            </Box>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                tabBarItemClickNavigateHandler(menuOrder?.prev.screen)
              }
            >
              <CoachmarkWrapper
                allowBackgroundInteractions={false}
                ref={soundButtonRef}
                message={msg.AUDIO_GUIDE}
              >
                <Box
                  width={40}
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  {menuOrder?.prev.icon}
                </Box>
              </CoachmarkWrapper>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </>
  );
}
