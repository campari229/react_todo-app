import React from 'react';
import PropTypes from 'prop-types';

export class Header extends React.Component {
  state = {
    tempoToto: '',
    tempoId: 1,
  }

  addTempoTodo = (event) => {
    this.setState({
      tempoToto: event.target.value,
    });
  }

  todoMaker = (event) => {
    const text = this.state.tempoToto;
    const id = this.state.tempoId + 1;
    const input = event.target;

    if (event.key === 'Enter') {
      this.props.addTodo(text, id);

      this.setState(prevState => ({
        tempoId: prevState.tempoId + 1,
        tempoToto: '',
      }));

      input.value = '';
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          onChange={this.addTempoTodo}
          onKeyDown={this.todoMaker}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
