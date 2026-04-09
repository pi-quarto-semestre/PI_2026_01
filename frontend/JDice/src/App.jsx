import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ApiConsuming from "./pages/ApiConsuming";
import ModelosPage from "./pages/ModelosPage";
import EnviarPage from "./pages/EnviarPage";
import NotFoundPage from "./pages/NotFoundPage";
import NovoTemplatePage from "./pages/NovoTemplatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApiConsuming />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modelosPage" element={<ModelosPage />} />
        <Route path="/enviar" element={<EnviarPage />} />
        <Route path="/criarTemplate" element={<NovoTemplatePage />} />
        <Route path="/erro" element={<NotFoundPage />} />
        {/* Rota catch-all para páginas não encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
