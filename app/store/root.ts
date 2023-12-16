import { combineReducers } from '@reduxjs/toolkit';
import imageSlice from '../slices/single-image.slice';
import userSlice from '../slices/user.slice';
import tourSlice from '../slices/tour.slice';

const rootReducer = combineReducers({
  imageSlice: imageSlice,
  userSlice: userSlice,
  tourSlice: tourSlice,
});

export default rootReducer;
