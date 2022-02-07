import React from 'react';
import style from './style.css';
import { EmployeeActions} from 'app/actions/emp';
import { Employee } from '../Employee';
import { EmployeeModel } from 'app/models/EmployeeModel';

export namespace EmployeeList {
  export interface Props {
    employee: EmployeeModel[];
    actions: EmployeeActions
  }
}

export const EmployeeList = ({ employee, actions }: EmployeeList.Props): JSX.Element => {
  const hasIncompleted = React.useMemo(() => employee.some((todo) => !todo.completed), []);
  return (
    <section className={style.main}>
      {hasIncompleted && (
        <input className={style.toggleAll} type="checkbox" checked={hasIncompleted} onChange={actions.completeAll} />
      )}
      <ul className={style.normal}>
        {employee.map((emp) => (
          <Employee
            key={emp.id}
            emp={emp}
            completeEmp={actions.completeEmp}
            deleteEmp={actions.deleteEmp}
            editEmp={actions.editEmp}
          />
        ))}
      </ul>
    </section>
  );
};
