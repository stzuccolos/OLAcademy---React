import React from "react";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      toggleEdit: false,
    };

    console.log(this.props.functions);
  }

  handleRenameChange = (event) => {
    this.setState({ newName: event.target.value });
  };
  render() {
    const { data, functions } = this.props;

    return (
      <>
        <span>{data.name}</span>
        <button onClick={() => functions.handleDelete(data.name)}>
          Delete task
        </button>
        <button onClick={() => functions.handleDone(data.name)}>
          Mark as done
        </button>
        <button
          onClick={() => this.setState({ toggleEdit: !this.state.toggleEdit })}
        >
          Edit task
        </button>
        <div hidden={!this.state.toggleEdit}>
          <input
            placeholder={data.name}
            value={this.state.newName}
            onChange={this.handleRenameChange}
          />
          <button
            onClick={() => functions.renameToDo(data.name, this.state.newName)}
          >
            save edited name
          </button>
        </div>
        <span hidden={!data.isDone} style={{ color: "green" }}>
          Done
        </span>
      </>
    );
  }
}

export default Todo;
