import { useEffect, useState } from "react";
import { api } from "../../services/api";

function ApiConsuming() {
  const [nodes, setNodes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/api/templates/list")
      .then((resp) => {
        setNodes(resp.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Erro ao buscar templates: ", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Não foi possivel carregar a lista.",
        );
        setNodes(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Templates</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    <div>
      <h1>Templates</h1>
      <p>Erro: {error}</p>
    </div>;
  }

  return (
    <div>
      <h1>Templates</h1>
      <pre>{JSON.stringify(nodes, null, 2)}</pre>
    </div>
  );
}

export default ApiConsuming;
