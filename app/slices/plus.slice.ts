import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type InitialState = {
    params: any
};

const initialState: InitialState = {
    params: null,
};

const plusSlice = createSlice({
  name: "plus_slice",
  initialState,
  reducers: {
    setParam: (state, action: PayloadAction<any>) => {
      state.params = action.payload;
    },
    removeParam: (state) => {
      state.params = null;
    },
  },
});

export const { setParam, removeParam } = plusSlice.actions;

export const getParamsFromPlusSlice = (state: InitialState) =>
  state.params

export default plusSlice.reducer;
