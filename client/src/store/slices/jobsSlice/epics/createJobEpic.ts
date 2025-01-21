import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RootState, TAction } from '../../../models';
import { Job } from '../models';
import { addJobs } from '../jobsSlice';

type Payload = Pick<Job, 'title' | 'description' | 'completed'>;

export const createJob = createAction<Payload>('jobs/createJobEpicAction');

export const createJobEpic: Epic<TAction, TAction, RootState> = (action$) =>
  action$.pipe(
    ofType(createJob.type),
    switchMap(({ payload }: PayloadAction<Payload>) => {
      return ajax.post<Job>(`https://localhost:7039/jobs`, payload);
    }),
    map(({ response }) => addJobs([response])),
    catchError((e) => {
      console.error(`Произошла ошибка при создании задачи: ${e.message}`);
      return EMPTY;
    }),
  );
