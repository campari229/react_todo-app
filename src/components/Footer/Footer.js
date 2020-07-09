import React from 'react';
import PropTypes from 'prop-types';
import { todosShape } from '../Shape/Shape';

export class Footer extends React.Component {
  state = {

  }

  render() {
    const { todos, useFilter, clear } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${todos.filter(todo => todo.isDone === false).length} items left`}
        </span>
        <ul className="filters">
          <li>
            <button
              onClick={() => useFilter('all')}
              type="button"
            >
              All
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => useFilter('inProces')}
            >
              Active
            </button>
          </li>
          <li>
            <button
              onClick={() => useFilter('completed')}
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
  }
}

Footer.propTypes = {
  todos: todosShape.isRequired,
  useFilter: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};
