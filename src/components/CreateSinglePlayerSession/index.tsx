import { useState } from "react";
import { createSession } from "../../config/axios";
import { useMapContext } from "../../contexts/MapContext";
import { Link } from "react-router-dom";
import Avatar from "boring-avatars";

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
    <form
      className="gap-2 card-body items-center text-center"
      onSubmit={handleSubmit}
    >
      {!session && (
        <div className="flex flex-col gap-3">
          <div className="flex">
            <Avatar name={username} variant="beam" />
            <div>
              <label htmlFor="username" className="label">
                INSIRA UM NICKNAME BACANA
              </label>
              <input
                id="username"
                name="username"
                placeholder="Username"
                type="string"
                className="input input-bordered"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex gap-1">
            <div className="bg-purple-900 p-1">
              <span>1 RODADA</span>
              <input
                type="checkbox"
                className="checkbox checkbox-lg"
                value="1"
                checked={numOfRounds === "1"}
                onChange={handleCheckBox}
                disabled={isLoading}
              />
            </div>
            <div className="bg-purple-900 p-1">
              <span>2 RODADAS</span>
              <input
                type="checkbox"
                className="checkbox checkbox-lg"
                value="2"
                checked={numOfRounds === "2"}
                onChange={handleCheckBox}
                disabled={isLoading}
              />
            </div>
            <div className="bg-purple-900 p-1">
              <span>3 RODADAS</span>
              <input
                type="checkbox"
                className="checkbox checkbox-lg"
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
            {isLoading ? "Loading..." : "COMEÇAR O JOGO!"}
          </button>
        </div>
      )}
      {isError && (
        <p className="text-error">
          An error occurred while creating the section. Try again!
        </p>
      )}
      {session && (
        <div className="w-full">
          <h3 className="text-success mb-6">
            Your game is ready, {session.username}!
          </h3>
          <Link to="/single-player" className="btn btn-primary w-full">
            Go to first round!
          </Link>
        </div>
      )}
    </form>
  );
}
