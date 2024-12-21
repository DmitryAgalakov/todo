import { combineEpics } from 'redux-observable';
import { RootState, TAction } from './models';


export const rootEpic = combineEpics<TAction, TAction, RootState>(

);
