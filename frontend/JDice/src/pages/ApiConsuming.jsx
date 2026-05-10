import { useErrorHandler } from "../hooks/useErrorHandler";
import { useTemplateLibrary } from "../hooks/useTemplateLibrary";
import LoadingSpinner from "../components/LoadingSpinner";

function ApiConsuming() {
  const { handleError } = useErrorHandler();
  const { templates, rawTree, loading, error } = useTemplateLibrary({
    onError: handleError,
  });

  if (loading) {
    return (
      <div>
        <h1>Templates</h1>
        <LoadingSpinner label="Carregando..." minHeight={120} stack />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Templates</h1>
        <p>Erro: {error}</p>
        <p>Redirecionando para pagina de erro...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Templates</h1>
      <p>{templates.length} modelos carregados da biblioteca do usuario.</p>
      <pre>{JSON.stringify({ templates, rawTree }, null, 2)}</pre>
    </div>
  );
}

export default ApiConsuming;
