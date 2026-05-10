import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ApiConsuming from "./pages/ApiConsuming";
import ModelosPage from "./pages/ModelosPage";
import EnviarPage from "./pages/EnviarPage";
import NotFoundPage from "./pages/NotFoundPage";
import NovoTemplatePage from "./pages/NovoTemplatePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/erro" element={<NotFoundPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modelosPage" element={<ModelosPage />} />
          <Route path="/enviar" element={<EnviarPage />} />
          <Route path="/criarTemplate" element={<NovoTemplatePage />} />
          <Route path="/editarTemplate" element={<NovoTemplatePage />} />
          <Route path="/apiConsuming" element={<ApiConsuming />} />
        </Route>
        {/* Rota catch-all para páginas não encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
