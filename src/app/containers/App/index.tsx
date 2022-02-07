import React from 'react';
import style from './style.css';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEmployeeActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { EmployeeModel } from 'app/models';
import { Header, EmployeeList, Footer } from 'app/components';

const FILTER_VALUES = (Object.keys(EmployeeModel.Filter) as (keyof typeof EmployeeModel.Filter)[]).map(
  (key) => EmployeeModel.Filter[key]
);

const FILTER_FUNCTIONS: Record<EmployeeModel.Filter, (emp: EmployeeModel) => boolean> = {
  [EmployeeModel.Filter.SHOW_ALL]: () => true,
  [EmployeeModel.Filter.SHOW_ACTIVE]: (emp) => !emp.completed,
  [EmployeeModel.Filter.SHOW_COMPLETED]: (emp) => emp.completed
};

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export const App = ({ history, location }: App.Props) => {
  const dispatch = useDispatch();
  const empActions = useEmployeeActions(dispatch);
  const { employees, filter } = useSelector((state: RootState) => {
    const hash = location?.hash?.replace('#', '');
    return {
      employees: state.employees,
      filter: FILTER_VALUES.find((value) => value === hash) ?? EmployeeModel.Filter.SHOW_ALL
    };
  });

  const handleClearCompleted = React.useCallback((): void => {
    empActions.clearCompleted();
  }, [empActions]);

  const handleFilterChange = React.useCallback(
    (filter: EmployeeModel.Filter): void => {
      history.push(`#${filter}`);
    },
    [history]
  );

  const filteredEmp = React.useMemo(() => (filter ? employees.filter(FILTER_FUNCTIONS[filter]) : employees), [employees, filter]);
  const activeCount = React.useMemo(() => employees.filter((todo) => !todo.completed).length, [employees]);
  const completedCount = React.useMemo(() => employees.filter((todo) => todo.completed).length, [employees]);

  return (
    <div className={style.normal}>
      <Header addEmp={empActions.addEmp} />
      <EmployeeList employee={filteredEmp} actions={empActions} />
      <Footer
        filter={filter}
        activeCount={activeCount}
        completedCount={completedCount}
        onClickClearCompleted={handleClearCompleted}
        onClickFilter={handleFilterChange}
      />
    </div>
  );
};
