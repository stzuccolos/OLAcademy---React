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

    if (this.state.todos.find((todo) => todo.name === this.state.newTodoName)) {
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
  };

  handleDone = (todo) => {
    todo.isDone = !todo.isDone;
    this.setState([...this.state.todos, todo]);
  };

  handleRenameInputChange = (event, todo) => {
    todo.newName = event.target.value;
    this.setState([...this.state.todos, todo]);
  };

  handleRename = (todo) => {
    todo.name = todo.newName;
    todo.toggleRename = !todo.toggleRename;
    this.setState([...this.state.todos, todo]);
  };

  handleUp = (todo) => {
    const index = this.state.todos.indexOf(todo);
    if (index > 0) {
      const todos = [...this.state.todos];
      [todos[index], todos[index - 1]] = [todos[index - 1], todos[index]];
      this.setState({ todos });
    }
  };

  handleDown = (todo) => {
    const index = this.state.todos.indexOf(todo);
    if (index < this.state.todos.length - 1) {
      const todos = [...this.state.todos];
      [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]];
      this.setState({ todos });
    }
  };

  handleMark = (todo) => {
    todo.isMarked = !todo.isMarked;
    this.setState([...this.state.todos, todo]);
  };

  render() {
    return (
      <div className="bg-light container my-5">
        <div>
          <div className="input-group col-6">
            <input
              className="form-control"
              type="text"
              value={this.state.newTodoName}
              onChange={this.handleNewTodoInputChange}
            />
            <button
              className="btn btn-outline-secondary"
              onClick={this.handleAdd}
            >
              Add
            </button>
          </div>
          <label className="form-text text-danger" hidden={!this.state.error}>
            Todo already exists
          </label>
        </div>

        <div className="btn-group my-1">
          <button
            className="btn btn-outline-primary"
            onClick={() => this.setState({ todos: [] })}
          >
            Clear all
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() =>
              this.setState({
                todos: this.state.todos.filter((todo) => !todo.isDone),
              })
            }
          >
            Clear done
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() =>
              this.setState({
                todos: this.state.todos.filter((todo) => !todo.isMarked),
              })
            }
          >
            Clear marked
          </button>
        </div>

        <ul className="row row-cols-3 justify-content-around ">
          {this.state.todos.map((todo, idx) => (
            <li
              key={idx}
              className={`card col-3 m-2 ${
                todo.isDone ? "border-2 border-success" : ""
              }`}
            >
              <div className="card-header d-flex justify-content-between align-middle">
                <span className="card-title align-middle">{todo.name}</span>
                <input
                  id={`markCheck-${idx}`}
                  className="btn-check"
                  type="checkbox"
                  checked={todo.isMarked}
                  onChange={() => this.handleMark(todo)}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor={`markCheck-${idx}`}
                >
                  Mark
                </label>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between gap-4">
                  <button
                    className="btn btn-outline-danger col"
                    onClick={() => this.handleDelete(todo)}
                  >
                    Delete task
                  </button>

                  <button
                    className="btn btn-outline-success col"
                    onClick={() => this.handleDone(todo)}
                  >
                    Done
                  </button>
                </div>

                <button
                  className="btn btn-outline-primary mt-2 col-12"
                  onClick={() => this.handleRenameToggle(todo)}
                >
                  Edit task
                </button>
                <div
                  className="input-group border border-success rounded border-top-0 bg-secondary-subtle p-2"
                  hidden={!todo.toggleRename}
                >
                  <input
                    className="form-control"
                    placeholder={todo.name}
                    value={todo.newName}
                    onChange={(event) =>
                      this.handleRenameInputChange(event, todo)
                    }
                  />
                  <button
                    className="btn btn-outline-success"
                    onClick={() => this.handleRename(todo)}
                  >
                    Save
                  </button>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => this.handleUp(todo)}
                  >
                    Up
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => this.handleDown(todo)}
                  >
                    Down
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}


export default Todos;
