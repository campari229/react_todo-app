import React from 'react';
import PropTypes from 'prop-types';
import { todosShape } from '../Shape/Shape';

export const Footer = ({ todos, setFilter, clear }) => (
  <footer className="footer">
    <span className="todo-count">
      {`${todos.filter(todo => todo.isDone === false).length} items left`}
    </span>
    <ul className="filters">
      <li>
        <button
          onClick={() => setFilter('all')}
          type="button"
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => setFilter('inProces')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => setFilter('completed')}
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
    <button
      type="button"
      className="clear-completed"
      onClick={clear}
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  todos: todosShape.isRequired,
  setFilter: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};
