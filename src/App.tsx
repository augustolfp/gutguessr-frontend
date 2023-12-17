import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./contexts/AppContext";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import SessionResults from "./pages/SessionResults";

function App() {
    return (
        <Router>
            <AppProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/single-player" element={<Dashboard />} />
                    <Route path="/results" element={<SessionResults />} />
                </Routes>
            </AppProvider>
        </Router>
    );
}

export default App;
