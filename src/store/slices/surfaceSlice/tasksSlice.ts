import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DisplayMode, Task } from './models';

interface State {
  tasks: Task[];
  displayMode: DisplayMode;
}

const initialState: State = {
  tasks: [],
  displayMode: 'all',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks(state, { payload }: PayloadAction<Task[]>) {
      state.tasks = state.tasks.concat(payload);
    },
    removeTasks(state, { payload }: PayloadAction<string[]>) {
      state.tasks = state.tasks.filter((t) => !payload.includes(t.id));
    },
    updateTasks(state, { payload }: PayloadAction<Task[]>) {
      const notUpdated = state.tasks.filter((t) => !payload.some((updatingTask) => updatingTask.id === t.id));
      state.tasks = notUpdated.concat(payload);
    },
    setDisplayMode(state, { payload }: PayloadAction<DisplayMode>) {
      state.displayMode = payload;
    },
  },
});

export const { addTasks, removeTasks, updateTasks, setDisplayMode } = tasksSlice.actions;
