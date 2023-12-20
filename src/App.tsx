import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { MapProvider } from "./contexts/MapContext";
import { DataProvider } from "./contexts/DataContext";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import SessionResults from "./pages/SessionResults";

function App() {
    return (
        <Router>
            <MapProvider>
                <DataProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/single-player" element={<Dashboard />} />
                        <Route path="/results" element={<SessionResults />} />
                    </Routes>
                </DataProvider>
            </MapProvider>
        </Router>
    );
}

export default App;
