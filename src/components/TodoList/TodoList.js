import React from 'react';
import PropTypes from 'prop-types';
import { todosShape } from '../Shape/Shape';

export class TodoList extends React.Component {
  state = {
    editText: '',
  }

  editStart = (event) => {
    const todo = event.currentTarget;
    const input = event.currentTarget.children[1];

    input.value = event.target.innerText;

    if (!todo.className) {
      todo.className = 'editing';
    }
  }

  addEditText = (event) => {
    this.setState({
      editText: event.target.value,
    });
  }

  editEnd = id => (event) => {
    const input = event.target;

    if (event.keyCode === 13) {
      if (this.state.editText) {
        this.props.edit(this.state.editText, id);
        input.parentElement.className = '';
      } else {
        input.parentElement.className = '';
      }
    }
  }

  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map(todo => (
          <li
            className={todo.isDone ? 'completed' : ''}
            onDoubleClick={this.editStart}
            key={todo.id}
          >
            <div className="view">
              <input
                type="checkbox"
                checked={todo.isDone}
                readOnly
                className="toggle"
                id={todo.id}
                onClick={() => this.props.todoCheck(todo.id)}
              />
              <span htmlFor={todo.id}>{todo.todo}</span>
              <button
                type="button"
                className="destroy"
                onClick={() => this.props.remove(todo.id)}
              />
            </div>
            <input
              type="text"
              className="edit"
              onChange={this.addEditText}
              onKeyDown={this.editEnd(todo.id)}
            />
          </li>
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todoCheck: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  todos: todosShape.isRequired,
};
