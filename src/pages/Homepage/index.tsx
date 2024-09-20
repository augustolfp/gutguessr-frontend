import { Link } from "react-router-dom";
import CreateSinglePlayerSession from "../../components/CreateSinglePlayerSession";

export default function Homepage() {
    return (
        <div className="container mx-auto h-screen mt-12 p-6 flex flex-col justify-center items-center">
            <p className="py-8 font-semibold text-primary text-center">Só um aviso: a primeira rodada pode demorar alguns segundinhos para carregar! Abraços :)</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
                <CreateSinglePlayerSession />
            </div>
        </div>
    );
}
