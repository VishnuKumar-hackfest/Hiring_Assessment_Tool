import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { EmployeeModel } from 'app/models';

export namespace EmployeeActions {
  export enum Type {
    ADD_EMP = 'ADD_EMP',
    EDIT_EMP = 'EDIT_EMP',
    DELETE_EMP = 'DELETE_EMP',
    COMPLETE_EMP = 'COMPLETE_EMP',
    COMPLETE_ALL = 'COMPLETE_ALL',
    CLEAR_COMPLETED = 'CLEAR_COMPLETED'
  }

  export const addEmp = createAction<PartialPick<EmployeeModel, 'name'>>(Type.ADD_EMP);
  export const editEmp = createAction<PartialPick<EmployeeModel, 'id'>>(Type.EDIT_EMP);
  export const deleteEmp = createAction<EmployeeModel['id']>(Type.DELETE_EMP);
  export const completeEmp = createAction<EmployeeModel['id']>(Type.COMPLETE_EMP);
  export const completeAll = createAction(Type.COMPLETE_ALL);
  export const clearCompleted = createAction(Type.CLEAR_COMPLETED);
}

export type EmployeeActions = Omit<typeof EmployeeActions, 'Type'>;
export const useEmployeeActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = EmployeeActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as EmployeeActions;
};
