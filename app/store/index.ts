import { configureStore } from "@reduxjs/toolkit";
import { singleImageService } from "../services/single-image.service";
import { singleSoundService } from "../services/single-sound.service";
import { uploadService } from "../services/create-asset";
import { singleTextService } from "../services/single-text.service";
import singleImageSlice from "../slices/single-image.slice";
import { singleVideoService } from "../services/single.video.service";
import plusSlice from "../slices/plus.slice";
import tourSlice from "../slices/tour.slice";
import { exploreService } from "../services/explore.service";
import profileSlicer from "../slices/profile.slicer";
import { profileService } from "../services/profile.service";
import { viewAllService } from "../services/view-all.service";
import { languageService } from "../services/language.service";
import { liveService } from "../services/live.service";
import liveSlice from "../slices/live.slice";
import { assetService } from "../services/asset.service";
import { authService } from "../services/auth.service";
import { paymentService } from "../services/payment.service";
// import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
  reducer: {
    [singleImageService.reducerPath]: singleImageService.reducer,
    [singleSoundService.reducerPath]: singleSoundService.reducer,
    [singleTextService.reducerPath]: singleTextService.reducer,
    [singleVideoService.reducerPath]: singleVideoService.reducer,
    [exploreService.reducerPath]: exploreService.reducer,
    [uploadService.reducerPath]: uploadService.reducer,
    [uploadService.reducerPath]: uploadService.reducer,
    [profileService.reducerPath]: profileService.reducer,
    [viewAllService.reducerPath]: viewAllService.reducer,
    [languageService.reducerPath]: languageService.reducer,
    [liveService.reducerPath]: liveService.reducer,
    [assetService.reducerPath]: assetService.reducer,
    [authService.reducerPath]: authService.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    imageSlice: singleImageSlice,
    tourSlice: tourSlice,
    plusSlice: plusSlice,
    profileSlice: profileSlicer,
    liveSlice: liveSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({immutableCheck: false}).concat([
      singleImageService.middleware,
      singleSoundService.middleware,
      singleTextService.middleware,
      profileService.middleware,
      languageService.middleware,
      exploreService.middleware,
      singleVideoService.middleware,
      liveService.middleware,
      assetService.middleware,
      viewAllService.middleware,
      uploadService.middleware,
      authService.middleware,
      paymentService.middleware,
    ]),
});

// setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {};

export default store;
