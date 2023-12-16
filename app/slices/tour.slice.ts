import { createSlice } from '@reduxjs/toolkit';

export type InitialState = {
  DISABLE_INTRACTION: boolean;
  BOTTOM_NAVIGATION_TOUR_HAS_SEEN: boolean;
  EXPLORE_TOP_BAR_TOUR_HAS_SEEN: boolean;
  PROFILE_HEADER_TOUR_HAS_SEEN: boolean;
  PROFILE_ASSET_ITEMS_TOUR_HAS_SEEN: boolean;
};

const initialState: InitialState = {
  DISABLE_INTRACTION: true,

  BOTTOM_NAVIGATION_TOUR_HAS_SEEN: false,
  EXPLORE_TOP_BAR_TOUR_HAS_SEEN: false,
  // Profile
  PROFILE_HEADER_TOUR_HAS_SEEN: false,
  PROFILE_ASSET_ITEMS_TOUR_HAS_SEEN: false,
};

const tourSlice = createSlice({
  name: 'tour_slice',
  initialState,
  reducers: {
    // Active DISABLE_INTRACTION
    activeDisableOnIntractions: (state) => {
      state.DISABLE_INTRACTION = true;
    },
    deActivrDisableOnIntractions: (state) => {
      state.DISABLE_INTRACTION = false;
    },
    // Stack bottom tab
    seeButtomNavigationTour: (state) => {
      state.BOTTOM_NAVIGATION_TOUR_HAS_SEEN = true;
    },
    removeButtomNavitationTour: (state) => {
      state.BOTTOM_NAVIGATION_TOUR_HAS_SEEN = false;
    },
    // Explore topbar
    seeExploreTopBarTour: (state) => {
      state.EXPLORE_TOP_BAR_TOUR_HAS_SEEN = true;
    },
    removeExploreTopBarTour: (state) => {
      state.EXPLORE_TOP_BAR_TOUR_HAS_SEEN = false;
    },
    // Profile
    seeProfileHeaderTour: (state) => {
      state.PROFILE_HEADER_TOUR_HAS_SEEN = true;
    },
    removeProfileHeaderTour: (state) => {
      state.PROFILE_HEADER_TOUR_HAS_SEEN = false;
    },
    seeProfileAssetItemTour: (state) => {
      state.PROFILE_ASSET_ITEMS_TOUR_HAS_SEEN = true;
    },
    removeProfileAssetItemTour: (state) => {
      state.PROFILE_ASSET_ITEMS_TOUR_HAS_SEEN = false;
    },
  },
});

export const {
  seeButtomNavigationTour,
  seeExploreTopBarTour,
  removeButtomNavitationTour,
  removeExploreTopBarTour,
  // Profile methods
  seeProfileHeaderTour,
  removeProfileHeaderTour,
  seeProfileAssetItemTour,
  removeProfileAssetItemTour,
  // DisableOnIntractions
  activeDisableOnIntractions,
  deActivrDisableOnIntractions,
} = tourSlice.actions;

// export const getParamsFromPlusSlice = (state: InitialState) =>
//   state.should_show_tour_of_explore_navigation;

export default tourSlice.reducer;
