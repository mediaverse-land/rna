import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserInitialState = {
  ACTIVE_PAGE: "subscribe" | "ownership";
};

const initialState: UserInitialState = {
  ACTIVE_PAGE: "subscribe",
};

const profileSlice = createSlice({
  name: "profile_slice",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<"subscribe" | "ownership">) => {
      state.ACTIVE_PAGE = action.payload;
    },
  },
});

export const { setPage } = profileSlice.actions;

export default profileSlice.reducer;
