/* eslint-disable react/prop-types */
import "./ContextMenu.css";

const ContextMenu = ({ coordinates }) => {
  return (
    <ul
      className="context-menu"
      style={{
        left: coordinates.x,
        top: coordinates.y,
      }}
    >
      <li>
        <button
          className="button context-menu-item"
          type="button"
          onClick={() => console.log("edit")}
        >
          edit
        </button>
      </li>
      <li>
        <button
          className="button context-menu-item"
          type="button"
          onClick={() => console.log("delete")}
        >
          delete
        </button>
      </li>
    </ul>
  );
}

export default ContextMenu;