import { useState } from "react";
import { createSession } from "../../../config/axios";
import { useMapContext } from "../../../contexts/MapContext";
import { Link } from "react-router-dom";
import Avatar from "boring-avatars";
import ClipLoader from "react-spinners/ClipLoader";

export default function CreateSinglePlayerSession() {
  const [username, setUsername] = useState<string>("JorelDaSilva22");
  const [numOfRounds, setNumOfRounds] = useState<string>("2");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { session, updateSession } = useMapContext();

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumOfRounds(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setIsError(false);

    try {
      const result = await createSession(username, parseInt(numOfRounds));

      updateSession({
        ...result.data,
      });
      return;
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      {!session && (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-6">
            <Avatar name={username} variant="beam" size={76} />
            <div className="w-full">
              <label htmlFor="username" className="label">
                Insira um Nickname bacana:
              </label>
              <input
                id="username"
                name="username"
                placeholder="Username"
                type="string"
                className="input input-bordered w-full lg:input-lg"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex gap-1 justify-around">
            <div className="flex flex-col items-center gap-1 md:flex-row">
              <span>1 RODADA</span>
              <input
                type="checkbox"
                className="checkbox lg:checkbox-lg"
                value="1"
                checked={numOfRounds === "1"}
                onChange={handleCheckBox}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col items-center gap-1 md:flex-row">
              <span>2 RODADAS</span>
              <input
                type="checkbox"
                className="checkbox lg:checkbox-lg"
                value="2"
                checked={numOfRounds === "2"}
                onChange={handleCheckBox}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col items-center gap-1 md:flex-row">
              <span>3 RODADAS</span>
              <input
                type="checkbox"
                className="checkbox lg:checkbox-lg"
                value="3"
                checked={numOfRounds === "3"}
                onChange={handleCheckBox}
                disabled={isLoading}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? <ClipLoader color="white" /> : "COMEÇAR O JOGO!"}
          </button>
          {isLoading && (
            <p className="text-info text-xs lg:text-sm text-center">
              PS: às vezes o primeiro carregamento pode demorar uns segundinhos!
            </p>
          )}
        </div>
      )}
      {isError && (
        <p className="text-error text-center">
          Ocorreu um erro ao carregar o jogo. Tente novamente!
        </p>
      )}
      {session && (
        <div className="w-full">
          <h3 className="text-success mb-6">
            Seu jogo está pronto, {session.username}!
          </h3>
          <Link to="/single-player" className="btn btn-primary w-full">
            Ir para a primeira rodada!
          </Link>
        </div>
      )}
    </form>
  );
}
