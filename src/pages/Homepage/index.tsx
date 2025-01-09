import { useState } from "react";
import CreateSinglePlayerSession from "./CreateSinglePlayerSession";
// import HowToPlay from "./HowToPlay";
import HomepageContainer from "./HomepageContainer";
import HomepageHero from "./HomepageHero";

export default function Homepage() {
  const [menu, setMenu] = useState("DEFAULT");

  return (
    <HomepageContainer>
      <div className="container mx-auto pt-16 flex flex-col justify-center items-center relative">
        <HomepageHero />
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
            {/* <button
              onClick={(_e) => {
                setMenu("HOW_TO_PLAY");
              }}
              className="btn btn-neutral mt-2 lg:btn-lg"
            >
              Como Jogar?
            </button> */}
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
        {/* {menu === "HOW_TO_PLAY" && <HowToPlay />} */}
      </div>
    </HomepageContainer>
  );
}
