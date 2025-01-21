import { combineReducers } from '@reduxjs/toolkit';
import { jobsSlice } from './slices/jobsSlice/jobsSlice';

export const rootReducer = combineReducers({
  jobs: jobsSlice.reducer,
});
