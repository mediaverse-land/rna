import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/user';

export type UserInitialState = {
  isLoading: boolean;
  data: User;
};

const initialState: UserInitialState = {
  isLoading: true,
  data: null,
};

const userSlice = createSlice({
  name: 'user_slice',
  initialState,
  reducers: {
    startLoad: (state) => {
      state.isLoading = true;
    },
    endLoad: (state) => {
      state.isLoading = false;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { startLoad, endLoad, setUser } = userSlice.actions;

export const getImagesDataFromSlice = (state: UserInitialState) => state.data;

export default userSlice.reducer;
