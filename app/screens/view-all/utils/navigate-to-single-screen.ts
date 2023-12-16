import {
  SINGLE_IMAGE_SCREEN,
  SINGLE_SOUND_SCREEN,
  SINGLE_TEXT_SCREEN,
  SINGLE_VIDEO_SCREEN,
} from '../../../constaints/consts';

type NavigateToSingleScreen = {
  navigate: (...args: any) => void;
  id: number;
};

export const navigateTo = {
  singleSound({ navigate, id }: NavigateToSingleScreen) {
    navigate(SINGLE_SOUND_SCREEN, { id });
  },
  singleVideo({ navigate, id }: NavigateToSingleScreen) {
    navigate(SINGLE_VIDEO_SCREEN, { id });
  },
  singleText({ navigate, id }: NavigateToSingleScreen) {
    navigate(SINGLE_TEXT_SCREEN, { id });
  },
  singleImage({ navigate, id }: NavigateToSingleScreen) {
    navigate(SINGLE_IMAGE_SCREEN, { id });
  },
};
