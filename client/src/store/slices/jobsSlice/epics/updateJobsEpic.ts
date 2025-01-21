import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { EMPTY, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RootState, TAction } from '../../../models';
import { updateJobs } from '../jobsSlice';
import { Job } from '../models';

interface Payload {
  jobs: Pick<Job, 'id' | 'title' | 'description' | 'completed'>[];
}

export const updateJobsAction = createAction<Payload>('jobs/updateJobsEpicAction');

export const updateJobsEpic: Epic<TAction, TAction, RootState> = (action$) =>
  action$.pipe(
    ofType(updateJobsAction.type),
    mergeMap(({ payload }: PayloadAction<Payload>) =>
      forkJoin(payload.jobs.map(({ id, ...body }) => ajax.put<Job>(`https://localhost:7039/jobs/${id}`, body))),
    ),
    map((responses) => responses.map((resObj) => resObj.response)),
    map((updatedJobs) => updateJobs(updatedJobs)),
    catchError((e) => {
      console.error(`Произошла ошибка при обновлении задачи: ${e.message}`);
      return EMPTY;
    }),
  );
