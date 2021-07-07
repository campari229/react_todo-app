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

  setFilter = (filter) => {
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
    switch (shownTodos) {
      case 'completed':
        return this.state.todos.filter(todo => todo.isDone === true);

      case 'inProces':
        return this.state.todos.filter(todo => todo.isDone === false);

      default:
        return this.state.todos;
    }
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
          {Boolean(todos.length)
            && (
              <TodoList
                todos={this.todosToShow(this.state.todosToShow)}
                todoCheck={this.todoCheck}
                remove={this.removeTodo}
                edit={this.todoEdit}
              />
            )
          }
        </section>
        {Boolean(todos.length)
          && (
            <Footer
              todos={this.state.todos}
              setFilter={this.setFilter}
              clear={this.clearCompleted}
            />
          )
        }
      </section>
    );
  }
}

export default App;
