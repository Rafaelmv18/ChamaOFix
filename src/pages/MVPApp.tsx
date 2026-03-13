import { Routes, Route } from "react-router-dom";
import AppNav from "../components/AppNav";
import "../styles/app.css";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Booking from "./Booking";
import Success from "./Success";
import ProviderDashboard from "./ProviderDashboard";
import ProviderAgenda from "./ProviderAgenda";
import ProviderEarnings from "./ProviderEarnings";
import BookingsList from "./BookingsList";
import UserProfile from "./UserProfile";
import ProviderNav from "../components/ProviderNav";
import { useAppMode } from "../context/AppModeContext";

export default function MVPApp() {
  const { mode, setMode } = useAppMode();
  return (
    <div className="app-container">
      {/* SIDE INFO - Only on desktop initially, or can be adapted */}
      <div className="side-info desktop-only">
        <div className="side-title">📱 ChamaOFix MVP</div>
        <div className="side-step">
          <div className="side-step-num">1</div>
          <div className="side-step-text">
            <strong>Home</strong>Busque por categoria ou profissional próximo
          </div>
        </div>
        <div className="side-step">
          <div className="side-step-num">2</div>
          <div className="side-step-text">
            <strong>Resultados</strong>Filtre e compare profissionais com preço
            e avaliação
          </div>
        </div>
        <div className="side-step">
          <div className="side-step-num">3</div>
          <div className="side-step-text">
            <strong>Perfil</strong>Veja detalhes, galeria e avaliações reais
          </div>
        </div>
        <div className="side-step">
          <div className="side-step-num">4</div>
          <div className="side-step-text">
            <strong>Agendamento</strong>Escolha data, horário e confirme
          </div>
        </div>
        <hr className="side-divider" />
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--tx3)",
            marginBottom: "10px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Navegação Web
        </div>
        <div className="side-mode">
          <div
            className={`mode-btn ${mode === "client" ? "active" : ""}`}
            onClick={() => setMode("client")}
          >
            👤 Cliente
          </div>
          <div
            className={`mode-btn ${mode === "provider" ? "active" : ""}`}
            onClick={() => setMode("provider")}
          >
            🔧 Prestador
          </div>
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--tx3)",
            lineHeight: "1.5",
          }}
        >
          Alterne para ver o dashboard do prestador de serviços.
        </div>
      </div>

      {/* PHONE/APP CONTAINER */}
      <div className="phone fade-in">
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-notch"></div>
          <div className="status-icons">
            <span style={{ fontSize: "0.7rem", fontWeight: 600 }}>100%</span>
          </div>
        </div>

        <Routes>
          {mode === "client" ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<ProviderDashboard />} />
          )}
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
          <Route path="booking" element={<Booking />} />
          <Route path="success" element={<Success />} />
          <Route path="bookings-list" element={<BookingsList />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="provider-agenda" element={<ProviderAgenda />} />
          <Route path="provider-earnings" element={<ProviderEarnings />} />
        </Routes>

        {mode === "client" && <AppNav />}
        {mode === "provider" && <ProviderNav />}
      </div>
    </div>
  );
}
