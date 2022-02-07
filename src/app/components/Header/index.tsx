import React from 'react';
import { EmployeeTextInput } from '../EmployeeTextInput';
import { EmployeeActions } from 'app/actions/emp';

export namespace Header {
  export interface Props {
    addEmp: typeof EmployeeActions.addEmp;
  }
}

export const Header = ({ addEmp }: Header.Props): JSX.Element => {
  const handleSave = React.useCallback(
    (name: string) => {
      if (name.length) addEmp({ name });
    },
    [addEmp]
  );

  return (
    <header>
      <h1>Add Emp</h1>
      <EmployeeTextInput newEmp onSave={handleSave} placeholder="Add Employee" />
    </header>
  );
};
