import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ApiConsuming from "./pages/ApiConsuming";
import ModelosPage from "./pages/ModelosPage";
import EnviarPage from "./pages/EnviarPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApiConsuming />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modelosPage" element={<ModelosPage />} />
        <Route path="/enviar" element={<EnviarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
