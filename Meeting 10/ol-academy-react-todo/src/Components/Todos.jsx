import React from "react";
import Todo from "./Todo";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      error: false,
    };
  }

  handleNewTodoInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleAdd = () => {
    this.setState({ error: false });

    if (this.state.newTodo === "") {
      this.setState({ newTodo: "" });
      return;
    }

    if (this.state.todos.includes(this.state.newTodo)) {
      this.setState({ error: true });
      this.setState({ newTodo: "" });
      return;
    }

    var newTodo = {
      name: this.state.newTodo,
      isDone: false,
      editToggle: false,
      newName: this.state.newTodo,
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
    this.setState({ newTodo: "" });
  };


  handleDelete = (deletedTodoName) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.name !== deletedTodoName),
    });
  };

  handleDone = (todo) => {
    this.setState([...this.state.todos, (todo.isDone = !todo.isDone)]);
  };

  render() {
    return (
      <>
        <div>
          <h1>Todo</h1>
          <input
            id="newTodo"
            type="text"
            value={this.state.newTodo}
            onChange={this.handleNewTodoInputChange}
          />
          <button onClick={this.handleAdd}>Add</button>
          <label style={{ color: "red" }} hidden={!this.state.error}>
            Todo already exists
          </label>
        </div>

        <div>
          <label>List of tasks:</label>
          <ul>
            {this.state.todos.map((todo, idx) => (
              <li key={idx}>
                <Todo data={todo} functions={[this.handleDelete, this.handleDone]}></Todo>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default Todos;
