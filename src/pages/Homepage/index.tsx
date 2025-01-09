import { useState } from "react";
import CreateSinglePlayerSession from "../../components/CreateSinglePlayerSession";
import HowToPlay from "../../components/HowToPlay";
import HomepageContainer from "./HomepageContainer";

export default function Homepage() {
  const [menu, setMenu] = useState("DEFAULT");

  return (
    <HomepageContainer>
      <div className="container mx-auto pt-16 flex flex-col justify-center items-center relative">
        <h1 className="text-2xl font-extrabold md:text-4xl lg:text-5xl">
          <span className="text-primary">Gut</span>Guessr
        </h1>
        <p className="text-4xl font-black mt-12 md:text-5xl lg:text-7xl">
          Explore o Mundo
        </p>
        <span>
          <div className="relative text-4xl font-black tracking-wider md:text-5xl lg:text-7xl">
            <span className="bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent blur-3xl opacity-50 absolute">
              em um novo nível
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent">
              em um novo nível
            </span>
          </div>
        </span>
        <p className="text-center text-base font-light text-base-content text-opacity-70 mt-4 md:text-lg lg:text-2xl lg:leading-8">
          No GutGuessr você será transportado para <br /> qualquer lugar do
          planeta: <br /> desde Paris na França, até Barro Duro no Piauí.
        </p>
        <p className="text-base font-light text-base-content text-opacity-70 mt-4 md:text-lg lg:text-2xl">
          Tudo isso de graça e sem sair de casa!
        </p>
        {menu === "DEFAULT" && (
          <>
            <button
              onClick={(_e) => {
                setMenu("SINGLE_PLAYER_SESSION_FORM");
              }}
              className="btn btn-primary mt-8 lg:btn-lg"
            >
              Jogar Agora!
            </button>
            <button
              onClick={(_e) => {
                setMenu("HOW_TO_PLAY");
              }}
              className="btn btn-neutral mt-2 lg:btn-lg"
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
