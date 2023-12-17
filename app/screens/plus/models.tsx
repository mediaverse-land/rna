import {
  ICON_CREATE_TEXT_ACTIVE,
  ICON_CREATE_TEXT_LIGHT,
  ICON_RECORD_VOICE_LIGHT,
  ICON_RECORD_VOIC_ACTIVE,
  ICON_TAKE_PHOTO,
  ICON_TAKE_PHOTO_LIGHT,
} from './../../constaints/icons';
import { CREATE_IMAGE_SCREEN, CREATE_SOUND_SCREEN, CREATE_TEXT_SCREEN } from './types';

export const menuOrdersIfImageScreen = {
  prev: {
    icon: <ICON_RECORD_VOICE_LIGHT />,
    screen: CREATE_SOUND_SCREEN,
  },
  center: {
    icon: <ICON_TAKE_PHOTO />,
    screen: CREATE_IMAGE_SCREEN,
  },
  next: {
    icon: <ICON_CREATE_TEXT_LIGHT />,
    screen: CREATE_TEXT_SCREEN,
  },
};

export const menuOrdersIfSoundScreen = {
  prev: {
    icon: <ICON_CREATE_TEXT_LIGHT />,
    screen: CREATE_TEXT_SCREEN,
  },
  center: {
    icon: <ICON_RECORD_VOIC_ACTIVE />,
    screen: CREATE_SOUND_SCREEN,
  },
  next: {
    icon: <ICON_TAKE_PHOTO_LIGHT />,
    screen: CREATE_IMAGE_SCREEN,
  },
};

export const menuOrdersIfTextScreen = {
  prev: {
    icon: <ICON_TAKE_PHOTO />,
    screen: CREATE_IMAGE_SCREEN,
  },
  center: {
    icon: <ICON_CREATE_TEXT_ACTIVE />,
    screen: CREATE_TEXT_SCREEN,
  },
  next: {
    icon: <ICON_RECORD_VOICE_LIGHT />,
    screen: CREATE_SOUND_SCREEN,
  },
};
