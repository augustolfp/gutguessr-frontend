import { Link } from "react-router-dom";
import CreateSinglePlayerSession from "../../components/CreateSinglePlayerSession";

export default function Homepage() {
    return (
        <div className="container mx-auto h-screen mt-12 p-6 flex flex-col justify-center items-center">
            <div className="flex flex-wrap justify-center items-center gap-4">
                <CreateSinglePlayerSession />
            </div>
        </div>
    );
}
