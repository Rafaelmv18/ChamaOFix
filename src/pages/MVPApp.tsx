import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import Reschedule from "./Reschedule";
import Categories from "./Categories";
import RegisterProvider from "./RegisterProvider";
import MobileAdmin from "./MobileAdmin";
import ProviderNav from "../components/ProviderNav";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { useAppMode } from "../context/AppModeContext";
import { supabase } from "../lib/supabase";
import { Loader2 } from "lucide-react";

export default function MVPApp() {
  const { mode, setMode, loading: modeLoading } = useAppMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/register");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session && !isAuthPage) {
        navigate("/app/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && !isAuthPage) {
        navigate("/app/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, isAuthPage]);

  if (loading || modeLoading) {
    return (
      <div className="app-container" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loader2 className="animate-spin" color="var(--orange)" size={48} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* SIDE INFO */}
      <div className="side-info desktop-only">
        <div className="side-title">📱 ChamaOFix MVP</div>
        {session?.user && (
          <div style={{ marginBottom: "20px", padding: "12px", background: "var(--dark3)", borderRadius: "12px", border: "1px solid var(--card-border)" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--tx3)", textTransform: "uppercase", fontWeight: 700 }}>Logado como</div>
            <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--orange)" }}>@{session.user.email?.split("@")[0]}</div>
          </div>
        )}
        <div className="side-step">
          <div className="side-step-num">1</div>
          <div className="side-step-text"><strong>Home</strong>Busque por categoria ou profissional próximo</div>
        </div>
        <div className="side-step">
          <div className="side-step-num">2</div>
          <div className="side-step-text"><strong>Resultados</strong>Filtre e compare profissionais</div>
        </div>
        <div className="side-step">
          <div className="side-step-num">3</div>
          <div className="side-step-text"><strong>Perfil</strong>Veja detalhes e avaliações</div>
        </div>
        <div className="side-step">
          <div className="side-step-num">4</div>
          <div className="side-step-text"><strong>Agendamento</strong>Escolha data e confirme</div>
        </div>
        <hr className="side-divider" />
        <div className="side-mode">
          <div className={`mode-btn ${mode === "client" ? "active" : ""}`} onClick={() => setMode("client")}>👤 Cliente</div>
          <div className={`mode-btn ${mode === "provider" ? "active" : ""}`} onClick={() => setMode("provider")}>🔧 Prestador</div>
        </div>
        {session && (
          <div style={{ marginTop: "20px" }}>
              <button 
                  onClick={() => supabase.auth.signOut()}
                  style={{ background: "transparent", border: "1px solid var(--card-border)", color: "var(--tx3)", padding: "10px 20px", borderRadius: "10px", cursor: "pointer", fontSize: "0.85rem" }}
              >
                  Sair da Conta
              </button>
          </div>
        )}
      </div>

      {/* PHONE/APP CONTAINER */}
      <div className="phone fade-in">
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-notch"></div>
          <div className="status-icons"><span style={{ fontSize: "0.7rem", fontWeight: 600 }}>100%</span></div>
        </div>

        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {mode === "client" ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<ProviderDashboard />} />
          )}
          <Route path="search" element={<Search />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="success" element={<Success />} />
          <Route path="bookings-list" element={<BookingsList />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="reschedule/:id" element={<Reschedule />} />
          <Route path="categories" element={<Categories />} />
          <Route path="register-provider" element={<RegisterProvider />} />
          <Route path="admin-mobile" element={<MobileAdmin />} />
          <Route path="provider-agenda" element={<ProviderAgenda />} />
          <Route path="provider-earnings" element={<ProviderEarnings />} />
        </Routes>

        {!isAuthPage && mode === "client" && <AppNav />}
        {!isAuthPage && mode === "provider" && <ProviderNav />}
      </div>
    </div>
  );
}
