import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <nav className="landing-nav">
      <div className="logo">
        Chama<span>OFix</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#como-funciona">Como funciona</a>
        </li>
        <li>
          <a href="#servicos">Serviços</a>
        </li>
        <li>
          <a href="#depoimentos">Depoimentos</a>
        </li>
        <li>
          <a href="#prestadores" className="nav-cta">
            Sou prestador
          </a>
        </li>
      </ul>
      <Link
        to="/app"
        className="btn-primary"
        style={{ fontSize: "0.9rem", padding: "10px 22px" }}
      >
        Acessar App
      </Link>
    </nav>
  );
}
