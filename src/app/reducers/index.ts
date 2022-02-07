import { combineReducers } from 'redux';
import { RootState } from './state';
import { empReducer } from './employeeReducer';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  employees: empReducer
});
