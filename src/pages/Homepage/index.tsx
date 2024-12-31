import { useState } from "react";
import CreateSinglePlayerSession from "../../components/CreateSinglePlayerSession";

export default function Homepage() {
  const [menu, setMenu] = useState("DEFAULT");

  return (
    <div className="container mx-auto h-screen mt-12 p-6 flex flex-col justify-center items-center">
      <p className="py-8 font-semibold text-primary text-center">
        Só um aviso: a primeira rodada pode demorar alguns segundinhos para
        carregar! Abraços :)
      </p>
      <div className="flex flex-col items-center">
        <p>VOCÊ MANJA DE GEOGRAFIA?</p>
        <p>
          No GutGuessr você será transportado para qualquer lugar do mundo,
          desde Paris na França, até Barro Duro no Piauí.
        </p>
        {menu === "DEFAULT" && (
          <button
            onClick={(_e) => {
              setMenu("SINGLE_PLAYER_SESSION_FORM");
            }}
            className="btn btn-primary"
          >
            JOGAR AGORA!
          </button>
        )}
        {menu === "SINGLE_PLAYER_SESSION_FORM" && <CreateSinglePlayerSession />}
      </div>
    </div>
  );
}
