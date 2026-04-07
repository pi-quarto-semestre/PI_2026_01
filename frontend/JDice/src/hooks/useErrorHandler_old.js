import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleError = useCallback(
    (err, redirectDelay = 2000) => {
      console.error("Erro capturado: ", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Ocorreu um erro inesperado.";

      setError(errorMessage);

      // Redirecionar para página de erro após o delay especificado
      setTimeout(() => {
        navigate("/erro");
      }, redirectDelay);

      return errorMessage;
    },
    [navigate],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
};
