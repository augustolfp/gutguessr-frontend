import RioDeJaneiro from "../../../assets/rioDeJaneiro.svg";

import "./background.css";

export default function Background() {
  return (
    <div>
      <img
        id="rio-de-janeiro"
        src={RioDeJaneiro}
        className="absolute bottom-1/4 left-0"
      />
      <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-[#FFD200] opacity-25"></div>
    </div>
  );
}
