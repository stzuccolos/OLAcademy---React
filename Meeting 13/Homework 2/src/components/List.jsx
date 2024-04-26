import { useState } from "react";
import ContextMenu from "./ContextMenu";
import "bootstrap/dist/css/bootstrap.min.css";

export default function List() {
  const data = ["ერთი", "ორი", "სამი", "ოთხი", "ხუთი"];

  const [isContextMenuOpen, toggleContextMenu] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useState(() => {
    document.addEventListener("click", () => {
        toggleContextMenu(false);
    });
  }, []);

  return (
    <>
      <ul className="list-group list-group-numbered">
        {data.map((item, index) => (
          <li
            key={index}
            className="list-group-item"
            onContextMenu={(event) => {
              event.preventDefault();
              setCoordinates({ x: event.clientX, y: event.clientY });
              toggleContextMenu(!isContextMenuOpen);
            }}
          >
            {item}
          </li>
        ))}
      </ul>

      {isContextMenuOpen && (
        <div>
          <ContextMenu coordinates={coordinates} />
        </div>
      )}
    </>
  );
}
