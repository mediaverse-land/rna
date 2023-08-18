import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type SingleImageInitialState = {
  latest_image_uri: string;
};

const initialState: SingleImageInitialState = {
  latest_image_uri: null,
};

const imageSlice = createSlice({
  name: "image_slice",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<any>) => {
      state.latest_image_uri = action.payload;
    },
    removeImage: (state) => {
      state.latest_image_uri = null;
    },
  },
});

export const { addImage, removeImage } = imageSlice.actions;

export const getImagesDataFromSlice = (state: SingleImageInitialState) =>
  state.latest_image_uri

export default imageSlice.reducer;
