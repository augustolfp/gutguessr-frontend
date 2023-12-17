import { useState } from "react";
import { createSession } from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import { Link } from "react-router-dom";

export default function CreateSinglePlayerSession() {
    const [username, setUsername] = useState<string>("");
    const [numOfRounds, setNumOfRounds] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { session, updateSession } = useAppContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (numOfRounds) {
            setIsLoading(true);
            setIsError(false);

            try {
                const result = await createSession(username, numOfRounds);

                updateSession({
                    ...result.data,
                });
                return;
            } catch (err) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="card bg-neutral text-neutral-content">
            <form
                className="gap-2 card-body items-center text-center"
                onSubmit={handleSubmit}
            >
                <h2>Single-player Session</h2>
                {!session && (
                    <div>
                        <div>
                            <label htmlFor="username" className="label">
                                Username:
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
                        <div>
                            <label htmlFor="numOfRounds" className="label">
                                Number of Rounds:
                            </label>
                            <input
                                id="numOfRounds"
                                name="numOfRounds"
                                placeholder="Number of rounds"
                                type="number"
                                className="input input-bordered"
                                value={numOfRounds || ""}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setNumOfRounds(
                                            parseInt(e.target.value)
                                        );
                                    }
                                }}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full"
                        >
                            {isLoading ? "Loading..." : "Start!"}
                        </button>
                    </div>
                )}
                {isError && (
                    <p className="text-error">
                        An error occurred while creating the section. Try again!
                    </p>
                )}
                {session && (
                    <div>
                        <h3 className="text-success">
                            Your game is ready, {session.username}!
                        </h3>
                        <Link to="/single-player" className="btn btn-primary">
                            Go to first round!
                        </Link>
                    </div>
                )}
            </form>
        </div>
    );
}
