import { useLocation, Link } from "react-router-dom";
import { Home, CalendarCheck, DollarSign, User } from "lucide-react";

export default function ProviderNav() {
  const location = useLocation();

  const navItems = [
    { name: "Início", path: "/app", icon: <Home size={22} /> },
    {
      name: "Agenda",
      path: "/app/provider-agenda",
      icon: <CalendarCheck size={22} />,
    },
    {
      name: "Ganhos",
      path: "/app/provider-earnings",
      icon: <DollarSign size={22} />,
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
