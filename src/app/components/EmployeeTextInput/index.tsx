import React, { useState } from 'react';
import classNames from 'classnames';
import style from './style.css';

export namespace EmployeeTextInput {
  export interface Props {
    placeholder?: string;
    newEmp?: boolean;
    onSave: (text: string) => void;
  }

  export interface State {
    text: string;
  }
}

export const EmployeeTextInput = ({ placeholder, newEmp, onSave }: EmployeeTextInput.Props): JSX.Element => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const text = event.currentTarget.value.trim();
      if (event.which === 13) {
        onSave(text);
        setInputText('');
      }
    },
    [onSave, setInputText]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(event.target.value);
    },
    [setInputText]
  );

  const handleBlur = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.currentTarget.value.trim();
      if (!newEmp) {
        onSave(text);
      }
    },
    [onSave]
  );

  const classes = classNames(
    {
      [style.edit]: !newEmp,
      [style.new]: newEmp
    },
    style.normal
  );

  return (
    <input
      className={classes}
      type="text"
      autoFocus
      placeholder={placeholder}
      value={inputText}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleSubmit}
    />
  );
};
