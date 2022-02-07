import React, { useState } from 'react';
import classNames from 'classnames';
import style from './style.css';
import { EmployeeModel } from 'app/models';
import { EmployeeActions } from 'app/actions';
import { EmployeeTextInput } from '../EmployeeTextInput';

export namespace Employee {
  export interface Props {
    emp: EmployeeModel;
    editEmp: typeof EmployeeActions.editEmp;
    deleteEmp: typeof EmployeeActions.deleteEmp;
    completeEmp: typeof EmployeeActions.completeEmp;
  }
}

export const Employee = ({ emp, editEmp, deleteEmp, completeEmp }: Employee.Props) => {
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = React.useCallback(() => {
    setEditing(true);
  }, [setEditing]);

  const handleSave = React.useCallback(
    (id: number, name: string) => {
      if (name.length === 0) {
        deleteEmp(id);
      } else {
        editEmp({ id, name });
      }
      setEditing(false);
    },
    [editEmp, deleteEmp, setEditing]
  );

  const classes = classNames({
    [style.completed]: emp.completed,
    [style.editing]: editing,
    [style.normal]: !editing
  });

  return (
    <li className={classes}>
      {editing ? (
        <EmployeeTextInput onSave={(text) => emp.id && handleSave(emp.id, text)} />
      ) : (
        <div className={style.view}>
          <input
            type="checkbox"
            className={style.toggle}
            checked={emp.completed}
            onChange={() => emp.id && completeEmp(emp.id)}
          />
          <label onDoubleClick={() => handleDoubleClick()}>{emp.name}</label>
          <button
            className={style.destroy}
            onClick={() => {
              if (emp.id) deleteEmp(emp.id);
            }}
          />
        </div>
      )}
    </li>
  );
};
