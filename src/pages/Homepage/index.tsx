import { Link } from "react-router-dom";

export default function Homepage() {
    return (
        <div className="container mx-auto">
            <h1>Homepage</h1>
            <Link className="btn btn-primary" to="/single-player">
                Single Player mode
            </Link>
        </div>
    );
}
