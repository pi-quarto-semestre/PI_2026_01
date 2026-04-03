import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Dashboard");

  const getRoute = (item) => {
    switch (item) {
      case "Dashboard":
        return "/dashboard";
      case "Modelos":
        return "/modelosPage";
      case "Envios":
        return "/enviar";
      case "Relatórios":
        return "/";
      default:
        return "/";
    }
  };

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">JD</div>
      <button
        className={`sidebar-icon ${activeNav === "Dashboard" ? "active" : ""}`}
        onClick={() => handleNavClick("Dashboard")}
      >
        <GridIcon size={18} />
      </button>
      <button
        className={`sidebar-icon ${activeNav === "Modelos" ? "active" : ""}`}
        onClick={() => handleNavClick("Modelos")}
      >
        <ListIcon size={18} />
      </button>
      <button
        className={`sidebar-icon ${activeNav === "Envios" ? "active" : ""}`}
        onClick={() => handleNavClick("Envios")}
      >
        <SendIcon size={18} />
      </button>
      <button
        className={`sidebar-icon ${activeNav === "Relatórios" ? "active" : ""}`}
        onClick={() => handleNavClick("Relatórios")}
      >
        <BarChartIcon size={18} />
      </button>
      <div className="sidebar-spacer" />
      <button className="sidebar-icon">
        <GearIcon size={18} />
      </button>
    </aside>
  );
}
export default Sidebar;
