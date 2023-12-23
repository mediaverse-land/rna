import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Text } from '../types/text';
import { Video } from '../types/video';
import { Image } from '../types/image';
import { Sound } from '../types/sound';
import { File } from '../types/file';

export type InitialState = {
  currentUserId: number;

  asset: Video | Text | Image | Sound;
  thumnails: Record<string, string>;

  name: string;
  description: string;

  file: File;

  isToolbarOpen: boolean;
  selectedLanguage: string;
  token: string;
  isOwner: boolean;
  isSubscriber: boolean;
  // BottomSheets
  isCommentsBottomSheetOpen: boolean;
  isSelectLanguageBottomSheetOpen: boolean;
  isConvertTextToTextBottomSheetOpen: boolean;
  isYoutubeShareBottomSheetOpen: boolean;

  isConvertTextToAudioViewOpen: boolean;

  isGoogleDriveShareBottomSheetOpen: boolean;

  // methods
  takeScreenShotMethod: () => void;
};

const initialState: InitialState = {
  asset: null,
  token: null,
  name: null,
  description: null,
  thumnails: null,
  isOwner: null,
  file: null,
  isSubscriber: null,

  currentUserId: null,

  isToolbarOpen: false,

  selectedLanguage: null,

  // View
  isConvertTextToAudioViewOpen: false,

  //BottomSeet
  isCommentsBottomSheetOpen: false,
  isConvertTextToTextBottomSheetOpen: false,
  isSelectLanguageBottomSheetOpen: false,
  isYoutubeShareBottomSheetOpen: false,
  isGoogleDriveShareBottomSheetOpen: false,

  // Methods
  takeScreenShotMethod: null,
};

const singleAssetSlice = createSlice({
  name: 'single_asset_slice',
  initialState,
  reducers: {
    setDataToState: (state, action: PayloadAction<any>) => {
      if (!action.payload) {
        return;
      }

      state.asset = action.payload;

      if (action.payload.asset.file) {
        if (action.payload.asset.file?.user_id === action.payload.currentUserId) {
          state.isOwner = true;
        } else {
          state.isSubscriber = true;
        }
      }

      if (!action.payload.asset.file) {
        state.isOwner = false;
        state.isSubscriber = false;
      }

      state.file = action.payload.asset?.file;

      state.currentUserId = action.payload.currentUserId;

      state.thumnails = action.payload.asset.thumbnails;
      state.name = action.payload.name;
      state.description = action.payload.description;
    },

    setTokenToState: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    openCommentsBottomSheet: (state) => {
      state.isCommentsBottomSheetOpen = true;
    },

    closeCommentsBottomSheet: (state) => {
      state.isCommentsBottomSheetOpen = false;
    },

    openToolbarHandler: (state) => {
      state.isToolbarOpen = true;
    },
    closeToolbarHandler: (state) => {
      state.isToolbarOpen = false;
    },

    // BottomSheets
    openConvertTextToTextBottomSheet: (state) => {
      state.isConvertTextToTextBottomSheetOpen = true;
    },
    closeConvertTextToTextBottomSheet: (state) => {
      state.isConvertTextToTextBottomSheetOpen = false;
    },

    // openTranslateAssetBottomSheet: (state) => {
    //   state.isSelectLanguageBottomSheetOpen = true;
    // },
    // closeTranslateAssetBottomSheet: (state) => {
    //   state.isSelectLanguageBottomSheetOpen = false;
    // },

    openConvertTextToAudioView: (state) => {
      state.isConvertTextToAudioViewOpen = true;
    },
    closeConvertTextToAudioView: (state) => {
      state.isConvertTextToAudioViewOpen = false;
    },

    openSelectLanguageBottomSheet: (state) => {
      state.isSelectLanguageBottomSheetOpen = true;
    },
    closeSelectLanguageBottomSheet: (state) => {
      state.isSelectLanguageBottomSheetOpen = false;
    },

    openYoutubeShareBottomSheet: (state) => {
      state.isYoutubeShareBottomSheetOpen = true;
    },
    closeYoutubeShareBottomSheet: (state) => {
      state.isYoutubeShareBottomSheetOpen = false;
    },

    openGoogleDriveShareBottomSheet: (state) => {
      state.isGoogleDriveShareBottomSheetOpen = true;
    },
    closeGoogleDriveShareBottomSheet: (state) => {
      state.isGoogleDriveShareBottomSheetOpen = false;
    },

    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },

    clearState: (state) => {
      state.asset = null;
      state.token = null;
      state.isOwner = null;
      state.selectedLanguage = null;

      state.isToolbarOpen = false;

      // Views
      state.isSelectLanguageBottomSheetOpen = false;
      state.isConvertTextToAudioViewOpen = false;
      // BottomSeet
      state.isCommentsBottomSheetOpen = false;
      state.isConvertTextToTextBottomSheetOpen = false;
      state.isSelectLanguageBottomSheetOpen = false;
      state.isYoutubeShareBottomSheetOpen = false;
      state.isGoogleDriveShareBottomSheetOpen = false;
    },

    // Methods

    setTakeScreenShotMethodHandler: (state, action: PayloadAction<() => void>) => {
      state.takeScreenShotMethod = action.payload;
    },
  },
});

export const {
  setDataToState,
  openCommentsBottomSheet,
  closeCommentsBottomSheet,
  setTokenToState,

  openToolbarHandler,
  closeToolbarHandler,
  openConvertTextToTextBottomSheet,
  closeConvertTextToTextBottomSheet,

  // openTranslateAssetBottomSheet,
  // closeTranslateAssetBottomSheet,

  openConvertTextToAudioView,
  closeConvertTextToAudioView,

  openSelectLanguageBottomSheet,
  closeSelectLanguageBottomSheet,

  openYoutubeShareBottomSheet,
  closeYoutubeShareBottomSheet,

  openGoogleDriveShareBottomSheet,
  closeGoogleDriveShareBottomSheet,

  setSelectedLanguage,

  clearState,

  setTakeScreenShotMethodHandler
} = singleAssetSlice.actions;

// export const getImagesDataFromSlice = (state: UserInitialState) => state.data;

export default singleAssetSlice.reducer;
