export const getRoute = (item) => {
  switch (item) {
    case "Dashboard":
      return "/dashboard";
    case "Modelos":
      return "/modelosPage";
    case "Envios":
      return "/enviar";
    case "Relatórios":
      return "/apiConsuming";
    default:
      return "/";
  }
};
