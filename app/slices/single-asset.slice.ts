import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Text } from '../types/text';
import { Video } from '../types/video';
import { Image } from '../types/image';
import { Sound } from '../types/sound';
import { File } from '../types/file';

export type InitialState = {
  currentUserId: number;

  id: number,
  asset: Video | Text | Image | Sound;
  assetId: number;
  thumnails: Record<string, string>;

  type: 1| 2| 3|4

  name: string;
  description: string;
  price: number;

  file: File;

  plan: number,

  assetUsername: string;
  assetUserProfile: string;

  isToolbarOpen: boolean;
  selectedLanguage: string;
  token: string;
  isOwner: boolean;
  isSubscriber: boolean;
  // BottomSheets
  isCommentsBottomSheetOpen: boolean;

  // 2 = forkable
  // 1 = forkability disabled
  forkability_status: 1 | 2,

  isSelectLanguageBottomSheetOpen: boolean;
  isConvertTextToTextBottomSheetOpen: boolean;
  isYoutubeShareBottomSheetOpen: boolean;

  isConvertTextToAudioViewOpen: boolean;

  isGoogleDriveShareBottomSheetOpen: boolean;

  isTranalateViewOpen: boolean,

  // methods
  takeScreenShotMethod: () => void;

  audio: { durationMilis: number };
};

const initialState: InitialState = {
  asset: null,
  id: null,
  token: null,
  name: null,
  description: null,
  thumnails: null,
  isOwner: null,
  file: null,
  isSubscriber: null,
  assetId: null,
  plan: null, 

  type: null,

  price: null,

  forkability_status: null,

  currentUserId: null,

  isToolbarOpen: false,

  selectedLanguage: null,

  // Audio specifics
  audio: { durationMilis: null },

  assetUsername: null,
  assetUserProfile: null,

  // View
  isConvertTextToAudioViewOpen: false,

  //BottomSeet
  isCommentsBottomSheetOpen: false,
  isConvertTextToTextBottomSheetOpen: false,
  isSelectLanguageBottomSheetOpen: false,
  isYoutubeShareBottomSheetOpen: false,
  isGoogleDriveShareBottomSheetOpen: false,

  isTranalateViewOpen: false,

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

      state.price = action.payload?.asset?.price;
      state.assetId = action.payload?.asset?.id

      state.type = action.payload?.asset?.type

      if (action.payload?.asset.file) {
        if (action.payload?.asset.file?.user_id === action.payload.currentUserId) {
          state.isOwner = true;
        } else {
          state.isSubscriber = true;
        }
      }

      if (!action.payload.asset.file) {
        state.isOwner = false;
        state.isSubscriber = false;
      }

      state.file = action.payload?.asset?.file;
      state.plan = action.payload?.asset?.plan
      state.forkability_status = action.payload?.asset?.forkability_status

      state.currentUserId = action.payload?.currentUserId;

      state.thumnails = action.payload?.asset?.thumbnails;
      state.name = action.payload?.name;
      state.description = action.payload?.description;
      state.id = action.payload?.id;

      if (action.payload?.asset?.user) {
        state.assetUsername = action.payload?.asset?.user?.username;
        state.assetUserProfile = action.payload?.asset?.user?.image_url;
      }
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
    
    openTranlateView: (state) => {
      state.isTranalateViewOpen = true;
    },
    closeTranslateView: (state) => {
      state.isTranalateViewOpen = false;
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

    // Audio methods
    setAudioDurationMillis: (state, action: PayloadAction<number>) => {
      state.audio.durationMilis = action.payload;
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

  openTranlateView,
  closeTranslateView,

  setSelectedLanguage,

  clearState,

  setTakeScreenShotMethodHandler,

  // Audio
  setAudioDurationMillis,
} = singleAssetSlice.actions;

// export const getImagesDataFromSlice = (state: UserInitialState) => state.data;

export default singleAssetSlice.reducer;
