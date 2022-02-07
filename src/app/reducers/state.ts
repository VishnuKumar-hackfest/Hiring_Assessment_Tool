import { EmployeeModel } from 'app/models';

export interface RootState {
  employees: RootState.EmpState;
  router?: any;
}

export namespace RootState {
  export type EmpState = EmployeeModel[];
}
