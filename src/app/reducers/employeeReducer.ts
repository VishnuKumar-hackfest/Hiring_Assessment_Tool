import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { EmployeeActions } from 'app/actions/emp';
import { EmployeeModel } from 'app/models';

const initialState: RootState.EmpState = [
  {
    id: 1,
    name: 'Use Redux',
    completed: false
  }
];

export const empReducer = handleActions<RootState.EmpState, EmployeeModel>(
  {
    [EmployeeActions.Type.ADD_EMP]: (state, action) => {
      if (action.payload && action.payload.name) {
        return [
          {
            id: state.reduce((max, emp) => Math.max(emp.id || 1, max), 0) + 1,
            completed: false,
            name: action.payload.name
          },
          ...state
        ];
      }
      return state;
    },
    [EmployeeActions.Type.DELETE_EMP]: (state, action) => {
      return state.filter((emp) => emp.id !== (action.payload as any));
    },
    [EmployeeActions.Type.EDIT_EMP]: (state, action) => {
      return state.map((emp) => {
        if (!emp || !action || !action.payload) {
          return emp;
        }
        return (emp.id || 0) === action.payload.id ? { ...emp, name: action.payload.name } : emp;
      });
    },
    [EmployeeActions.Type.COMPLETE_EMP]: (state, action) => {
      return state.map((emp) =>
        emp.id === (action.payload as any) ? { ...emp, completed: !emp.completed } : emp
      );
    },
    [EmployeeActions.Type.COMPLETE_ALL]: (state, action) => {
      return state.map((emp) => ({ ...emp, completed: true }));
    },
    [EmployeeActions.Type.CLEAR_COMPLETED]: (state, action) => {
      return state.filter((emp) => emp.completed === false);
    }
  },
  initialState
);
