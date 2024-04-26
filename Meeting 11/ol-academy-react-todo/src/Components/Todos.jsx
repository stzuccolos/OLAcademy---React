import React, { useState } from "react";

export default function Todos() {
  const [newTodoName, setNewTodoName] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  const handleNewTodoInputChange = (event) => {
    setNewTodoName(event.target.value);
  };

  const handleAdd = () => {
    setError(false);

    if (newTodoName === "") {
      return;
    }

    if (todos.find((todo) => todo.name === newTodoName)) {
      setError(true);
      setNewTodoName("");
      return;
    }

    var newTodo = {
      name: newTodoName,
      isDone: false,
      toggleRename: false,
      newName: newTodoName,
      isMarked: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoName("");
  };

  const handleDelete = (todoToDelete) => {
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  };

  const handleRenameToggle = (todo) => {
    todo.toggleRename = !todo.toggleRename;
    setTodos([...todos]);
  
  };

  const handleDone = (todo) => {
    todo.isDone = !todo.isDone;
    setTodos([...todos]);
  };

  const handleRenameInputChange = (event, todo) => {
    todo.newName = event.target.value;
    setTodos([...todos]);
  };

  const handleRename = (todo) => {
    todo.name = todo.newName;
    todo.toggleRename = !todo.toggleRename;
    setTodos([...todos]);
  };

  const handleUp = (todo) => {
    const index = todos.indexOf(todo);
    if (index > 0) {
      [todos[index], todos[index - 1]] = [todos[index - 1], todos[index]];
      setTodos([...todos]);
    }
  };

  const handleDown = (todo) => {
    const index = todos.indexOf(todo);
    console.log(index);
    console.log(todos.length);
    if (index < todos.length - 1) {
      [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]];
      setTodos([...todos]);
    }
  };

  const handleMark = (todo) => {
    todo.isMarked = !todo.isMarked;
    setTodos([...todos]);
  };

  return (
    <div className="bg-light container my-5">
      <div>
        <div className="input-group col-6">
          <input
            className="form-control"
            type="text"
            value={newTodoName}
            onChange={handleNewTodoInputChange}
          />
          <button className="btn btn-outline-secondary" onClick={handleAdd}>
            Add
          </button>
        </div>
        <label className="form-text text-danger" hidden={!error}>
          Todo already exists
        </label>
      </div>

      <div className="btn-group my-1">
        <button
          className="btn btn-outline-primary"
          onClick={() => setTodos([])}
        >
          Clear all
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setTodos(todos.filter((todo) => !todo.isDone))}
        >
          Clear done
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setTodos(todos.filter((todo) => !todo.isMarked))}
        >
          Clear marked
        </button>
      </div>

      <ul className="row row-cols-3 justify-content-around ">
        {todos.map((todo, idx) => (
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
                onChange={() => handleMark(todo)}
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
                  onClick={() => handleDelete(todo)}
                >
                  Delete task
                </button>

                <button
                  className="btn btn-outline-success col"
                  onClick={() => handleDone(todo)}
                >
                  Done
                </button>
              </div>

              <button
                className="btn btn-outline-primary mt-2 col-12"
                onClick={() => handleRenameToggle(todo)}
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
                    handleRenameInputChange(event, todo)
                  }
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleRename(todo)}
                >
                  Save
                </button>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleUp(todo)}
                >
                  Up
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleDown(todo)}
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
