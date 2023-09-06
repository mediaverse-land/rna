import { useState, useEffect, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  ICON_CREATE_TEXT_ACTIVE,
  ICON_CREATE_TEXT_LIGHT,
  ICON_RECORD_VOICE_LIGHT,
  ICON_RECORD_VOIC_ACTIVE,
  ICON_TAKE_PHOTO,
  ICON_TAKE_PHOTO_LIGHT,
} from "./../../../constaints/icons";
import { Box } from "../../../components/box";
import { PLUS_SCREEN_FOOTER_BACKGROUND } from "../../../constaints/images";
import { theme } from "../../../constaints/theme";
import { UseNavigationType } from "../../../types/use-navigation";
import { CREATE_IMAGE, CREATE_SOUND, CREATE_TEXT } from "../constaints";
import { windowSize } from "../../../utils/window-size";
import { useIsFocused } from "@react-navigation/native";
import { StorageService } from "../../../services/storage.service";
import { HAS_USER_SEEN_PLUS_TOUR } from "../../../constaints/consts";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";

type CurrentPage = "CREATE_SOUND" | "CREATE_TEXT" | "CREATE_IMAGE";

type Props = {
  navigation: UseNavigationType;
  descriptors?: any;
  state?: any;
  submitButtonHandler?: (args?: any) => void;
  longPressSubmitButtonHandler?: (args?: any) => void;
  longressOutSubmitButtonHandler?: (args?: any) => void;
  currentPage: CurrentPage;
};

const menuOrdersIfImageScreen = {
  prev: {
    icon: <ICON_RECORD_VOICE_LIGHT />,
    screen: "createSound",
  },
  center: {
    icon: <ICON_TAKE_PHOTO />,
    screen: "createImage",
  },
  next: {
    icon: <ICON_CREATE_TEXT_LIGHT />,
    screen: "createText",
  },
};

const menuOrdersIfSoundScreen = {
  prev: {
    icon: <ICON_CREATE_TEXT_LIGHT />,
    screen: "createText",
  },
  center: {
    icon: <ICON_RECORD_VOIC_ACTIVE />,
    screen: "createSound",
  },
  next: {
    icon: <ICON_TAKE_PHOTO_LIGHT />,
    screen: "createImage",
  },
};

const menuOrdersIfTextScreen = {
  prev: {
    icon: <ICON_TAKE_PHOTO />,
    screen: "createImage",
  },
  center: {
    icon: <ICON_CREATE_TEXT_ACTIVE />,
    screen: "createText",
  },
  next: {
    icon: <ICON_RECORD_VOICE_LIGHT />,
    screen: "createSound",
  },
};

const WINDOW_HEIGHT = Math.floor(windowSize().height);
const WINDOW_WIDTH = Math.floor(windowSize().width);

const CAMERA_GUIDE =
  "Put your thumb on the plus and start creating digital assets. Here the image is created";
const AUDIO_GUIDE = "Here is the sound";
const TEXT_GUIDE = "َAnd finally the text";

const _storageService = new StorageService();

const CoachmarkWrapper: any = Coachmark;

export function BottomTabBar({
  state,
  descriptors,
  navigation,
  submitButtonHandler,
  longPressSubmitButtonHandler,
  longressOutSubmitButtonHandler,
  currentPage,
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

  const [menuOrder, setMenuOrder] = useState(currentIcons);
  const [preventIntractions, setPreventIntractions] = useState(true);

  const tabBarItemClickNavigateHandler = (screenName: string) => {
    // Prevent intreactions if user has not seen tour guide
    if(preventIntractions){
      return;
    }
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
    if (res) {
      setPreventIntractions(false);
    }
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
          setPreventIntractions(false);
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setupTour();
    }
  }, [imageButtonRef, textButtonRef, soundButtonRef]);

  return (
    <>
      <Box
        id="plus__bottom-tab-bar"
        width="100%"
        height={200}
        position="absolute"
        top={WINDOW_HEIGHT - 200}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <PLUS_SCREEN_FOOTER_BACKGROUND
          width={
            WINDOW_WIDTH > 700
              ? `${(WINDOW_WIDTH / 400) * 100}%`
              : windowSize().width
          }
          height={WINDOW_WIDTH > 700 ? "160%" : "100%"}
          style={{
            position: "relative",
            top: 40,
          }}
        />
        <Box
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
              message={TEXT_GUIDE}
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
          <Box height="100%">
            <TouchableOpacity
              activeOpacity={1}
              onPress={submitButtonHandler}
              onLongPress={longPressSubmitButtonHandler}
              onPressOut={longressOutSubmitButtonHandler}
            >
              <CoachmarkWrapper
                allowBackgroundInteractions={false}
                ref={imageButtonRef}
                message={CAMERA_GUIDE}
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
                    {menuOrder?.center.icon}
                  </Box>
                </Box>
              </CoachmarkWrapper>
              {/* </TourGuideZone> */}
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
              message={AUDIO_GUIDE}
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
    </>
  );
}
