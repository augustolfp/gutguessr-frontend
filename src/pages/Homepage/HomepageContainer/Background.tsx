import RioDeJaneiro from "../../../assets/rioDeJaneiro.svg";

import "./background.css";

export default function Background() {
  return (
    <div>
      <img
        id="rio-de-janeiro"
        src={RioDeJaneiro}
        className="absolute bottom-0 left-0"
      />
    </div>
  );
}