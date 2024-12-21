import { combineReducers } from '@reduxjs/toolkit';
import { tasksSlice } from './slices/surfaceSlice/tasksSlice';

export const rootReducer = combineReducers({
  tasks: tasksSlice.reducer,
});
