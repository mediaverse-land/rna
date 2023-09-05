import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Item = {
  startTime: number;
  endTime: number;
  liveId: number;
};

type SearchParams = {
  selectedCountry?: string;
  selectedLanguage?: string;
  title?: string;
};

export type InitialState = {
  recordingItems: Item[];
  has_current_live_record: boolean;
  search_params: SearchParams;
};

const initialState: InitialState = {
  recordingItems: [],
  has_current_live_record: null,
  search_params: null,
};

const liveSlice = createSlice({
  name: "live_slice",
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<{ lang?: string, country?:string }>) => {
      if (action.payload.lang) {
        const _newState = {
          ...state.search_params,
          selectedLanguage: action.payload.lang,
        };
        state.search_params = _newState;
      }
      if(action.payload.country){
        const _newState = {
          ...state.search_params,
          selectedCountry: action.payload.country,
        };
        state.search_params = _newState;
      }
    },
    clearSearchParams: (state) => {
      state.search_params = null
    } ,
    addRecordLive: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      const filteredRecords = state.recordingItems.filter(
        (f) => f.liveId !== item.liveId
      );
      if (filteredRecords) {
        state.recordingItems = [...filteredRecords, item];
      } else {
        state.recordingItems = [...state.recordingItems, item];
      }
    },
    getRecordById: (state, action: PayloadAction<{ liveId: number }>) => {
      const live = state.recordingItems.find(
        (f) => f.liveId === action.payload.liveId
      );

      if (live) {
        state.has_current_live_record = true;
      } else {
        state.has_current_live_record = false;
      }
    },
    removeRecordById: (state, action: PayloadAction<{ liveId: number }>) => {
      const filteredRecords = state.recordingItems.filter(
        (f) => f.liveId === action.payload.liveId
      );
      state.recordingItems = filteredRecords;
    },
  },
});

export const {
  addRecordLive,
  clearSearchParams,
  removeRecordById,
  getRecordById,
  setSearchParams,
} = liveSlice.actions;

export default liveSlice.reducer;
