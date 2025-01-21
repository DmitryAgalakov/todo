import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DisplayMode, Job } from './models';

interface State {
  jobs: Job[];
  displayMode: DisplayMode;
}

const initialState: State = {
  jobs: [],
  displayMode: 'all',
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJobs(state, { payload }: PayloadAction<Job[]>) {
      state.jobs = state.jobs.concat(payload.map((p) => ({ ...p, created: new Date(p.created).getTime() as unknown as number })));
    },
    removeJobs(state, { payload }: PayloadAction<string[]>) {
      state.jobs = state.jobs.filter((t) => !payload.includes(t.id));
    },
    updateJobs(state, { payload }: PayloadAction<Job[]>) {
      const notUpdated = state.jobs.filter((t) => !payload.some((updatingJob) => updatingJob.id === t.id));
      state.jobs = notUpdated.concat(payload.map((p) => ({ ...p, created: new Date(p.created).getTime() as unknown as number })));
    },
    setDisplayMode(state, { payload }: PayloadAction<DisplayMode>) {
      state.displayMode = payload;
    },
  },
});

export const { addJobs, removeJobs, updateJobs, setDisplayMode } = jobsSlice.actions;
