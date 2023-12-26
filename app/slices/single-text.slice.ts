import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Text } from '../types/text';

export type InitialState = {
  name: string;
  username: string;
  description: string;
  id: number;
  assetId: number;
  token: string;
  isOwner: boolean;
  // 1: disalbed
  // 2: forkable
  forkability_status: 1 | 2;
  isToolbarOpen: boolean;
  selectedLanguage: string,

  // BottomSheets
  isCommentsBottomSheetOpen: boolean;
  isSelectLanguageBottomSheetOpen: boolean;
  isConvertTextToTextBottomSheetOpen: boolean;
  isYoutubeShareBottomSheetOpen: boolean;

  isConvertTextToAudioViewOpen: boolean

  isGoogleDriveShareBottomSheetOpen: boolean;
};

const initialState: InitialState = {
  id: null,
  assetId: null,
  name: null,
  username: null,
  description: null,
  token: null,
  isOwner: null,
  forkability_status: null,
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
};

const singelTextSlice = createSlice({
  name: 'single_text_slice',
  initialState,
  reducers: {
    setDataToState: (state, action: PayloadAction<Text>) => {
      if (!action.payload) {
        return;
      }

      const { payload } = action;

      const { name } = payload;

      if (payload?.asset?.file) {
        state.isOwner = true;
      } else {
        state.isOwner = false;
      }
      state.id = payload?.id;
      state.assetId = payload?.asset?.id;
      state.name = name;
      state.username = payload?.asset?.user?.username;
      state.description = payload?.description;
      state.forkability_status = payload?.asset?.forkability_status;
    },

    setTokenToState: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    // openCommentsBottomSheet: (state) => {
    //   state.isCommentsBottomSheetOpen = true;
    // },

    // closeCommentsBottomSheet: (state) => {
    //   state.isCommentsBottomSheetOpen = false;
    // },

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
      state.isConvertTextToAudioViewOpen = true 
    },
    closeConvertTextToAudioView: (state) => {
      state.isConvertTextToAudioViewOpen = false 
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
      state.selectedLanguage = action.payload
    },

    clearState: (state) => {
      state.id = null;
      state.assetId = null;
      state.name = null;
      state.username = null;
      state.description = null;
      state.token = null;
      state.isOwner = null;
      state.forkability_status = null;
      state.selectedLanguage = null;
      
      state.isToolbarOpen = false;

      // Views
      state.isSelectLanguageBottomSheetOpen = false;
      state.isConvertTextToAudioViewOpen= false;
      // BottomSeet
      state.isCommentsBottomSheetOpen = false;
      state.isConvertTextToTextBottomSheetOpen = false;
      state.isSelectLanguageBottomSheetOpen = false;
      state.isYoutubeShareBottomSheetOpen = false;
      state.isGoogleDriveShareBottomSheetOpen = false;
    },
  },
});

export const {
  setDataToState,
  // openCommentsBottomSheet,
  // closeCommentsBottomSheet,
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

  clearState
} = singelTextSlice.actions;

// export const getImagesDataFromSlice = (state: UserInitialState) => state.data;

export default singelTextSlice.reducer;
