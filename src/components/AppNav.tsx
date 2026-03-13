import { Home, Search, Calendar, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export default function AppNav() {
  const location = useLocation();

  const navItems = [
    { name: "Início", path: "/app", icon: <Home size={22} /> },
    { name: "Buscar", path: "/app/search", icon: <Search size={22} /> },
    {
      name: "Agenda",
      path: "/app/bookings-list",
      icon: <Calendar size={22} />,
    },
    { name: "Perfil", path: "/app/user-profile", icon: <User size={22} /> },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <Link
          to={item.path}
          key={item.name}
          className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
}
