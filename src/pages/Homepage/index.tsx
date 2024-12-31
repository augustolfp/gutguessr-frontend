import CreateSinglePlayerSession from "../../components/CreateSinglePlayerSession";
import Background from "./Background";

export default function Homepage() {
  return (
    <div className="container mx-auto h-[calc(100vh-64px)] mt-12 p-6 flex flex-col justify-center items-center">
      <Background />
      <p className="py-8 font-semibold text-primary text-center">
        Só um aviso: a primeira rodada pode demorar alguns segundinhos para
        carregar! Abraços :)
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <CreateSinglePlayerSession />
      </div>
    </div>
  );
}
