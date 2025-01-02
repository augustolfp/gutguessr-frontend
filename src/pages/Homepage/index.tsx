import { useState } from "react";
import CreateSinglePlayerSession from "../../components/CreateSinglePlayerSession";
import HowToPlay from "../../components/HowToPlay";
import HomepageContainer from "./HomepageContainer";

export default function Homepage() {
  const [menu, setMenu] = useState("DEFAULT");

  return (
    <HomepageContainer>
      <div className="container mx-auto pt-16 flex flex-col justify-center items-center relative">
        <h1 className="text-5xl font-extrabold">
          <span className="text-primary">Gut</span>Guessr
        </h1>
        <p className="text-7xl font-black mt-12">Leve Suas Viagens</p>
        <span>
          <div className="relative text-7xl font-black tracking-wider">
            <span className="bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent blur-3xl opacity-50 absolute">
              para um novo nível
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent">
              para um novo nível
            </span>
          </div>
        </span>
        <p className="text-center text-2xl font-light text-base-content text-opacity-70 leading-8 mt-4">
          No GutGuessr você será transportado para <br /> qualquer lugar do
          mundo: <br /> desde Paris na França, até Barro Duro no Piauí.
        </p>
        <p className="text-2xl font-light text-base-content text-opacity-70 mt-4">
          Tudo isso de graça e sem sair de casa!
        </p>
        {menu === "DEFAULT" && (
          <>
            <button
              onClick={(_e) => {
                setMenu("SINGLE_PLAYER_SESSION_FORM");
              }}
              className="btn btn-primary btn-lg mt-8"
            >
              Jogar Agora!
            </button>
            <button
              onClick={(_e) => {
                setMenu("HOW_TO_PLAY");
              }}
              className="btn btn-neutral btn-lg mt-6"
            >
              Como Jogar?
            </button>
          </>
        )}
        {menu !== "DEFAULT" && (
          <button
            onClick={(_e) => {
              setMenu("DEFAULT");
            }}
            className="btn btn-secondary"
          >
            Voltar
          </button>
        )}
        {menu === "SINGLE_PLAYER_SESSION_FORM" && <CreateSinglePlayerSession />}
        {menu === "HOW_TO_PLAY" && <HowToPlay />}
      </div>
    </HomepageContainer>
  );
}
