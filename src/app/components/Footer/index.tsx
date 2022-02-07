import React from 'react';
import style from './style.css';
import classNames from 'classnames';
import { EmployeeModel } from 'app/models';

export const FILTER_TITLES = {
  [EmployeeModel.Filter.SHOW_ALL]: 'All',
  [EmployeeModel.Filter.SHOW_ACTIVE]: 'Active',
  [EmployeeModel.Filter.SHOW_COMPLETED]: 'Completed'
};

export namespace Footer {
  export interface Props {
    filter: EmployeeModel.Filter;
    activeCount?: number;
    completedCount?: number;
    onClickFilter: (filter: EmployeeModel.Filter) => any;
    onClickClearCompleted: () => any;
  }
}

export const Footer = ({
  filter,
  activeCount,
  completedCount,
  onClickFilter,
  onClickClearCompleted
}: Footer.Props): JSX.Element => {
  const renderEmpCount = React.useCallback((): JSX.Element => {
    const itemWord = activeCount === 1 ? ' item' : 'items';
    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }, [activeCount]);

  const renderFilterLink = React.useCallback(
    (selectedFilter: EmployeeModel.Filter): JSX.Element => {
      return (
        <a
          className={classNames({ [style.selected]: filter === selectedFilter })}
          style={{ cursor: 'pointer' }}
          onClick={() => onClickFilter(selectedFilter)}
          children={FILTER_TITLES[selectedFilter]}
        />
      );
    },
    [filter, onClickFilter]
  );

  const renderClearButton = React.useCallback((): JSX.Element | void => {
    if (completedCount! > 0) {
      return <button className={style.clearCompleted} onClick={onClickClearCompleted} children={'Clear completed'} />;
    }
  }, [completedCount]);

  return (
    <footer className={style.normal}>
      {renderEmpCount()}
      <ul className={style.filters}>
        {(Object.keys(EmployeeModel.Filter) as (keyof typeof EmployeeModel.Filter)[]).map((key) => (
          <li key={key} children={renderFilterLink(EmployeeModel.Filter[key])} />
        ))}
      </ul>
      {renderClearButton()}
    </footer>
  );
};
