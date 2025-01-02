import Rio from "./Rio";

import "./background.css";

export default function Background() {
  return (
    <div className="absolute bottom-0 left-0">
      <div className="rio-container">
        <Rio />
      </div>
    </div>
  );
}
