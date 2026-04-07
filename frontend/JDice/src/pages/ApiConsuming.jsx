import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useErrorHandler } from "../hooks/useErrorHandler";

function ApiConsuming() {
  const [nodes, setNodes] = useState(null);
  const [loading, setLoading] = useState(true);
  const { error, handleError } = useErrorHandler();

  useEffect(() => {
    api
      .get("/api/templates/list")
      .then((resp) => {
        setNodes(resp.data);
      })
      .catch((err) => {
        handleError(err);
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
    return (
      <div>
        <h1>Templates</h1>
        <p>Erro: {error}</p>
        <p>Redirecionando para página de erro...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Templates</h1>
      <pre>{JSON.stringify(nodes, null, 2)}</pre>
    </div>
  );
}

export default ApiConsuming;