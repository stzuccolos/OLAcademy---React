import { useState, useRef, useEffect } from "react";
import "./popup.css";

export default function Popup() {
  const [open, setOpen] = useState(false);
  const outsidePopupRef = useRef(null);
  const insidePopupRef = useRef(null);

  function handleClickOutside(event) {
    console.log(event.target)
    if (
      outsidePopupRef.current?.contains(event.target) &&
      !insidePopupRef.current?.contains(event.target)
    ) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[]);

  return (
    <div>
      <button className="popup-button" onClick={() => setOpen(!open)}>
        popup
      </button>
      <div className="popup" hidden={!open} ref={outsidePopupRef}>
        <div className="popup-content" ref={insidePopupRef}>
          <p>this is a popup</p>
          <button onClick={() => setOpen(!open)}>close</button>
        </div>
      </div>
    </div>
  );
}
