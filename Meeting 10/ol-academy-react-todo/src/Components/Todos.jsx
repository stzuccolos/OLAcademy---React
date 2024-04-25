import React from "react";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodoName: "",
      error: false,
    };
  }

  handleNewTodoInputChange = (event) => {
    this.setState({ newTodoName: event.target.value });
  };

  handleAdd = () => {
    this.setState({ error: false });

    if (this.state.newTodoName === "") {
      this.setState({ newTodoName: "" });
      return;
    }

    if (this.state.todos.find((todo) => todo.name === this.state.newTodoName)){
      this.setState({ error: true });
      this.setState({ newTodoName: "" });
      return;
    }

    var newTodoName = {
      name: this.state.newTodoName,
      isDone: false,
      toggleRename: false,
      newName: this.state.newTodoName,
      isMarked: false,
    };
    this.setState({ todos: [...this.state.todos, newTodoName] });
    this.setState({ newTodoName: "" });
  };

  handleDelete = (todoToDelete) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo !== todoToDelete),
    });
  };

  handleRenameToggle = (todo) => {
    todo.toggleRename = !todo.toggleRename;
    this.setState([...this.state.todos, todo]);
  }

  handleDone = (todo) => {
    todo.isDone = !todo.isDone;
    this.setState([...this.state.todos, todo]);
  };

  handleRenameInputChange = (event,todo) => {
    todo.newName = event.target.value;
    this.setState([...this.state.todos, todo]);
  }

  handleRename = (todo) => {
    todo.name = todo.newName;
    todo.toggleRename = !todo.toggleRename;
    this.setState([...this.state.todos, todo]);
  }

  handleUp = (todo) => {
    const index = this.state.todos.indexOf(todo);
    if (index > 0) {
      const todos = [...this.state.todos];
      [todos[index], todos[index - 1]] = [todos[index - 1], todos[index]];
      this.setState({ todos });
    }
  }

  handleDown = (todo) => {
    const index = this.state.todos.indexOf(todo);
    if (index < this.state.todos.length - 1) {
      const todos = [...this.state.todos];
      [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]];
      this.setState({ todos });
    }
  }

  handleMark = (todo) => {
    todo.isMarked = !todo.isMarked;
    this.setState([...this.state.todos, todo]);
  }


  render() {
    return (
      <>
        <div>
          <h1>Todo</h1>
          <input
            id="newTodoName"
            type="text"
            value={this.state.newTodoName}
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
                <span>{idx + 1}.</span>
                <input
                  type="checkbox"
                  checked={todo.isMarked}
                  onChange={() => this.handleMark(todo)}
                />
                <span>{todo.name}</span>

                <button onClick={() => this.handleDelete(todo)}>
                  Delete task
                </button>

                <button onClick={() => this.handleDone(todo)}>
                  Mark as done
                </button>

                <button onClick={() => this.handleRenameToggle(todo)}>
                  Edit task
                </button>
                <div hidden={!todo.toggleRename}>
                  <input
                    placeholder={todo.name}
                    value={todo.newName}
                    onChange={(event) => this.handleRenameInputChange(event, todo)}
                  />
                  <button onClick={() => this.handleRename(todo)}>
                    save edited name
                  </button>
                </div>

                <span hidden={!todo.isDone} style={{ color: "green" }}>
                  Done
                </span>

                <button onClick={() => this.handleUp(todo)}>Up</button>

                <button onClick={() => this.handleDown(todo)}>Down</button>
              </li>
            ))}
          </ul>
          <button onClick={() => this.setState({ todos: [] })}>
            Clear all
          </button>
          <button
            onClick={() =>
              this.setState({
                todos: this.state.todos.filter((todo) => !todo.isDone),
              })
            }
          >
            Clear done
          </button>
          <button
            onClick={() =>
              this.setState({
                todos: this.state.todos.filter((todo) => !todo.isMarked),
              })
            }
          >
            Clear marked
          </button>
        </div>
      </>
    );
  }
}

export default Todos;
