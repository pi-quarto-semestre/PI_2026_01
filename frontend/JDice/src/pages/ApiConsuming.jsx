import { useErrorHandler } from "../hooks/useErrorHandler";
import { useTemplateLibrary } from "../hooks/useTemplateLibrary";

function ApiConsuming() {
  const { handleError } = useErrorHandler();
  const { templates, rawTree, loading, error } = useTemplateLibrary({
    onError: handleError,
  });

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
