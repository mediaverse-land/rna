import {
  ICON_CREATE_TEXT_ACTIVE,
  ICON_CREATE_TEXT_LIGHT,
  ICON_RECORD_VOICE_LIGHT,
  ICON_RECORD_VOIC_ACTIVE,
  ICON_TAKE_PHOTO,
  ICON_TAKE_PHOTO_LIGHT,
} from './../../constaints/icons';

export const menuOrdersIfImageScreen = {
  prev: {
    icon: <ICON_RECORD_VOICE_LIGHT />,
    screen: 'createSound',
  },
  center: {
    icon: <ICON_TAKE_PHOTO />,
    screen: 'createImage',
  },
  next: {
    icon: <ICON_CREATE_TEXT_LIGHT />,
    screen: 'createText',
  },
};

export const menuOrdersIfSoundScreen = {
  prev: {
    icon: <ICON_CREATE_TEXT_LIGHT />,
    screen: 'createText',
  },
  center: {
    icon: <ICON_RECORD_VOIC_ACTIVE />,
    screen: 'createSound',
  },
  next: {
    icon: <ICON_TAKE_PHOTO_LIGHT />,
    screen: 'createImage',
  },
};

export const menuOrdersIfTextScreen = {
  prev: {
    icon: <ICON_TAKE_PHOTO />,
    screen: 'createImage',
  },
  center: {
    icon: <ICON_CREATE_TEXT_ACTIVE />,
    screen: 'createText',
  },
  next: {
    icon: <ICON_RECORD_VOICE_LIGHT />,
    screen: 'createSound',
  },
};
