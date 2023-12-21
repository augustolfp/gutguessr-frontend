import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar absolute top-0 z-30 h-16 flex justify-between items-center">
            <Link
                to="/"
                className="btn btn-ghost normal-case text-3xl font-bold flex gap-0"
            >
                <span className="text-[#1AD1A5]">Gut</span>
                <span className="text-neutral-content">Guessr</span>
            </Link>
            <a
                href="https://github.com/augustolfp"
                target="_blank"
                className="link link-secondary px-4"
            >
                Made by augustolfp
            </a>
        </div>
    );
}
