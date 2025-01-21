import { combineEpics } from 'redux-observable';
import { RootState, TAction } from './models';
import { createJobEpic } from './slices/jobsSlice/epics/createJobEpic';
import { removeJobsEpic } from './slices/jobsSlice/epics/removeJobsEpic';
import { updateJobsEpic } from './slices/jobsSlice/epics/updateJobsEpic';

export const rootEpic = combineEpics<TAction, TAction, RootState>(createJobEpic, removeJobsEpic, updateJobsEpic);
