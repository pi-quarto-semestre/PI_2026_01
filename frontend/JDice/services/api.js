import axios from "axios";
import { clearAuthSession, getAuthToken, hasActiveSession } from "./auth";

// Criar instância do axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token && hasActiveSession()) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de resposta para tratar erros globalmente
api.interceptors.response.use(
  (response) => response, // Retornar resposta normal
  (error) => {
    // Verificar se é erro de rede ou servidor
    if (!error.response) {
      // Erro de rede - redirecionar para página de erro
      console.error("Erro de rede:", error.message);
      // Como estamos em um interceptor, não podemos usar hooks diretamente
      // Vamos lançar o erro para que seja tratado pelos componentes
      throw error;
    }

    // Erros do servidor (4xx, 5xx)
    const status = error.response.status;
    const requestUrl = error.config?.url ?? "";
    const isAuthRequest =
      requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");

    if ((status === 401 || status === 403) && !isAuthRequest) {
      clearAuthSession();
      window.location.assign("/");
      throw error;
    }

    // Para erros 5xx (servidor), redirecionar automaticamente
    if (status >= 500) {
      console.error(`Erro do servidor (${status}):`, error.response.data);
      // Disparar evento customizado para redirecionamento
      window.dispatchEvent(
        new CustomEvent("api-error", {
          detail: {
            status,
            message: error.response.data?.message || "Erro interno do servidor",
          },
        }),
      );
    }

    // Para erros 4xx (cliente), deixar o componente decidir
    throw error;
  },
);
