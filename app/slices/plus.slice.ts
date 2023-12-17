import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type InitialState = {
  params: any;
  isSelectLanguageBottomSheetOpen: boolean;
  isSelectPlanBottomSheetOpen: boolean;
  isForkabilityBottomSheetOpen: boolean;
  forkabilityStatus: boolean;
  selectedLanguage: string;
  selectedPlan: string;
  price: number;
  createAssetActiveView: 'add-metadata' | 'save-and-publish' | 'upload-loder';
  subscriptionPriod: number;
  ThumbnailCover: string;

  fileBase64: string;

  title: string;
  description: string;
};

const initialState: InitialState = {
  params: null,
  isSelectLanguageBottomSheetOpen: false,
  isSelectPlanBottomSheetOpen: false,
  isForkabilityBottomSheetOpen: false,
  selectedLanguage: null,
  selectedPlan: null,
  createAssetActiveView: 'add-metadata',
  forkabilityStatus: null,
  price: null,
  subscriptionPriod: null,
  ThumbnailCover: null,

  fileBase64: null,

  title: null,
  description: null,
};

const plusSlice = createSlice({
  name: 'plus_slice',
  initialState,
  reducers: {
    setParam: (state, action: PayloadAction<any>) => {
      state.params = action.payload;
    },
    removeParam: (state) => {
      state.params = null;
    },
    openSelectLanguageBottomSheet: (state) => {
      state.isSelectLanguageBottomSheetOpen = true;
    },
    closeSelectLanguageBottomSheet: (state) => {
      state.isSelectLanguageBottomSheetOpen = false;
    },

    openSelectPlanBottomSheet: (state) => {
      state.isSelectPlanBottomSheetOpen = true;
    },
    closeSelectPlanBottomSheet: (state) => {
      state.isSelectPlanBottomSheetOpen = false;
    },
    setSelectedPlan: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload;
    },

    openForkabilityBottomSheet: (state) => {
      state.isForkabilityBottomSheetOpen = true;
    },
    closeForkabilityBottomSheet: (state) => {
      state.isForkabilityBottomSheetOpen = false;
    },
    setForkability: (state, action: PayloadAction<boolean>) => {
      state.forkabilityStatus = action.payload;
    },

    setSelectedLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
    navigateToAddMetaDataView: (state) => {
      state.createAssetActiveView = 'add-metadata';
    },
    navigateToSaveAndPublishView: (state) => {
      state.createAssetActiveView = 'save-and-publish';
    },
    navigateToUploadAssetView: (state) => {
      state.createAssetActiveView = 'upload-loder';
    },

    setThumbnailCover: (state, action: PayloadAction<string>) => {
      state.ThumbnailCover = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setSubscriptionPriod: (state, action: PayloadAction<number>) => {
      state.subscriptionPriod = action.payload;
    },

    setFileBase64: (state, action: PayloadAction<string>) => {
      state.fileBase64 = action.payload;
    },

    cleanupCreatedAssetInputs: (state) => {
      state.selectedLanguage = null;
      state.forkabilityStatus = null;
      state.selectedPlan = null;
      state.fileBase64 = null;
      state.subscriptionPriod = null;
      state.title = null;
      state.description = null;
      state.price = null;
      state.ThumbnailCover = null;
    },
  },
});

export const {
  setThumbnailCover,
  setPrice,
  setSubscriptionPriod,

  setTitle,
  setDescription,

  setParam,
  removeParam,
  openSelectLanguageBottomSheet,
  closeSelectLanguageBottomSheet,
  setSelectedLanguage,

  openSelectPlanBottomSheet,
  closeSelectPlanBottomSheet,
  setSelectedPlan,

  openForkabilityBottomSheet,
  closeForkabilityBottomSheet,
  setForkability,

  navigateToAddMetaDataView,
  navigateToSaveAndPublishView,
  navigateToUploadAssetView,

  setFileBase64,

  cleanupCreatedAssetInputs,
} = plusSlice.actions;

export const getParamsFromPlusSlice = (state: InitialState) => state.params;

export default plusSlice.reducer;
