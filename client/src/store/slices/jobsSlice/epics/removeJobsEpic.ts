import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { EMPTY, forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RootState, TAction } from '../../../models';
import { removeJobs } from '../jobsSlice';

interface Payload {
  ids: string[];
}

export const removeJobsAction = createAction<Payload>('jobs/removeJobsEpicAction');

export const removeJobsEpic: Epic<TAction, TAction, RootState> = (action$) =>
  action$.pipe(
    ofType(removeJobsAction.type),
    mergeMap(({ payload }: PayloadAction<Payload>) =>
      forkJoin(payload.ids.map((id) => ajax.delete<string>(`https://localhost:7039/jobs/${id}`))),
    ),
    map((responses) => responses.map((resObj) => resObj.response)),
    map((removedJobsIds) => removeJobs(removedJobsIds)),
    catchError((e) => {
      console.error(`Произошла ошибка при удалении задачи: ${e.message}`);
      return EMPTY;
    }),
  );
