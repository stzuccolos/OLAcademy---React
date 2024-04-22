import React, { Component } from "react";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tasks: [],
      error: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleAddButton = () => {
    const newTask = {
      name: this.state.input,
      done: false,
    };

    if (this.state.tasks.some((task) => task.name === newTask.name)) {
      this.setState({ error: "task already exists" });
      return;
    }

    this.setState({
      tasks: [...this.state.tasks, newTask],
      input: "",
      error: "",
      checked: false,
    });
  };

  handleDelete = (name) => {
    this.setState({
      tasks: this.state.tasks.filter((task) => task.name !== name),
    });
  };

  handleDone = (name) => {
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.name === name) {
          return { ...task, isDone: true };
        }
        return task;
      }),
    });
  };

  handleEdit = (name) => {
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.name === name) {
          return { ...task, isEditing: true };
        }
        return task;
      }),
    });
  };

  handleCheck = (name) => {
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.name === name) {
          return { ...task, isChecked: !task.isChecked };
        }
        return task;
      }),
    });
  };

  handleSave = (name) => {};
  handleUp = (name) => {
    const index = this.state.tasks.findIndex((task) => task.name === name);
    if (index === 0) {
      return;
    }

    [this.state.tasks[index], this.state.tasks[index - 1]] = [this.state.tasks[index - 1],this.state.tasks[index]];
    this.setState({ tasks: this.state.tasks });
  };

  handleDown = (name) => {
    const index = this.state.tasks.findIndex((task) => task.name === name);
    if (index === this.state.tasks.length - 1) {
      return;
    }

    [this.state.tasks[index], this.state.tasks[index + 1]] = [this.state.tasks[index + 1],this.state.tasks[index]];

    this.setState({ tasks: this.state.tasks });
  };

  render() {
    return (
      <>
        <div>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={this.state.input}
          />
          <button onClick={this.handleAddButton}>Add</button>
          <span style={{ color: "red" }}>{this.state.error}</span>
        </div>
        <div>
          <ul>
            {this.state.tasks.map((task, index) => (
              <li key={index}>
                <span>{task.name}</span>
                <button onClick={() => this.handleDelete(task.name)}>
                  Delete
                </button>
                <button
                  onClick={() => this.handleDone(task.name)}
                  disabled={task.isDone}
                >
                  Done
                </button>
                <button onClick={this.handleEdit}>Edit</button>
                {/* <div hidden={!task.isEditing}>
                  <input type="text" value={task.name}></input>
                  <button onClick={() => this.handleSave(task.name)}>Save</button>
                </div> */}
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={() => this.handleCheck(task.name)}
                />
                <button onClick={() => this.handleUp(task.name)}>Up</button>
                <button onClick={() => this.handleDown(task.name)}>Down</button>
              </li>
            ))}
          </ul>
        </div>
        <div></div>
      </>
    );
  }
}

export default Tasks;
