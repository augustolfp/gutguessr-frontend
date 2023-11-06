import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./contexts/AppContext";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Router>
            <AppProvider>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/single-player" element={<Dashboard />} />
                </Routes>
            </AppProvider>
        </Router>
    );
}

export default App;
