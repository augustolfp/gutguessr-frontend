import "./App.css";
import { AppProvider } from "./contexts/AppContext";

import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <AppProvider>
            <Dashboard />
        </AppProvider>
    );
}

export default App;
