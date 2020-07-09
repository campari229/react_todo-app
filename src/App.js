import React from 'react';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    todosToShow: 'all',
  }

  addTodo = (text, todoId) => {
    if (text.trim().length) {
      this.setState(prevState => ({
        todos: [
          ...prevState.todos,
          {
            todo: text,
            isDone: false,
            id: todoId,
          },
        ],
      }));
    }
  }

  todoCheck = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        }

        return item;
      }),
    }));
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== id),
    }));
  }

  todoEdit = (editedTodo, id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            todo: editedTodo,
          };
        }

        return item;
      }),
    }));
  }

  useFilter = (tempoTodos) => {
    this.setState({
      todos: tempoTodos,
    });
  }

  useFilter = (filter) => {
    this.setState({
      todosToShow: filter,
    });
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.isDone === false),
    }));
  }

  makeAllChecked = () => {
    if (this.state.todos.every(todo => todo.isDone === true)) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          isDone: false,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          isDone: true,
        })),
      }));
    }
  }

  todosToShow(shownTodos) {
    if (shownTodos === 'all') {
      return this.state.todos;
    }

    if (shownTodos === 'completed') {
      return this.state.todos.filter(todo => todo.isDone === true);
    }

    if (shownTodos === 'inProces') {
      return this.state.todos.filter(todo => todo.isDone === false);
    }

    return null;
  }

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.makeAllChecked}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          {todos.length
            ? (
              <TodoList
                todos={this.todosToShow(this.state.todosToShow)}
                todoCheck={this.todoCheck}
                remove={this.removeTodo}
                edit={this.todoEdit}
              />
            )
            : <></>
          }
        </section>
        {todos.length
          ? (
            <Footer
              todosLength={this.state.todos}
              useFilter={this.useFilter}
              clear={this.clearCompleted}
            />
          )
          : <></>
        }
      </section>
    );
  }
}

export default App;
