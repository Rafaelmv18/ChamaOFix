import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  Loader2,
  Briefcase,
  Shield,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function UserProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserEmail(user.email || "");
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="screen fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" color="var(--orange)" size={32} />
      </div>
    );
  }

  return (
    <div className="screen fade-in">
      <div className="profile-header" style={{ paddingBottom: "24px" }}>
        <div className="back-header" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Voltar
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--orange), #ff8a4c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
            }}
          >
            {profile?.full_name ? profile.full_name[0].toUpperCase() : "👤"}
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
              }}
            >
              {profile?.full_name || profile?.username || "Usuário"}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--tx2)" }}>
              {userEmail}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px" }}>
        <div
          className="section-title"
          style={{
            marginTop: "24px",
            marginBottom: "16px",
            fontSize: "0.9rem",
            color: "var(--tx3)",
          }}
        >
          Minha Conta
        </div>

        <div
          style={{
            background: "var(--dark3)",
            borderRadius: "16px",
            border: "1px solid var(--card-border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
              borderBottom: "1px solid var(--card-border)",
              cursor: "pointer",
            }}
          >
            <User size={18} color="var(--orange)" />
            <span style={{ fontSize: "0.95rem" }}>Dados Pessoais</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
              borderBottom: "1px solid var(--card-border)",
              cursor: "pointer",
            }}
          >
            <CreditCard size={18} color="var(--orange)" />
            <span style={{ fontSize: "0.95rem" }}>Métodos de Pagamento</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
              cursor: "pointer",
            }}
          >
            <Settings size={18} color="var(--orange)" />
            <span style={{ fontSize: "0.95rem" }}>Configurações do App</span>
          </div>
          {profile?.is_admin ? (
            <div
              onClick={() => navigate("/app/admin-mobile")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                borderTop: "1px solid var(--card-border)",
                cursor: "pointer",
                background: "rgba(59, 130, 246, 0.08)"
              }}
            >
              <Shield size={18} color="#3b82f6" />
              <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#3b82f6" }}>Painel de Administração</span>
            </div>
          ) : profile?.user_type === "client" ? (
            <div
              onClick={() => navigate("/app/register-provider")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px",
                borderTop: "1px solid var(--card-border)",
                cursor: "pointer",
                background: "rgba(255,92,26,0.05)"
              }}
            >
              <Briefcase size={18} color="var(--orange)" />
              <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>Seja um Prestador</span>
            </div>
          ) : null}
        </div>

        <div
          className="section-title"
          style={{
            marginTop: "32px",
            marginBottom: "16px",
            fontSize: "0.9rem",
            color: "var(--tx3)",
          }}
        >
          Suporte
        </div>

        <div
          style={{
            background: "var(--dark3)",
            borderRadius: "16px",
            border: "1px solid var(--card-border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
              cursor: "pointer",
            }}
          >
            <HelpCircle size={18} color="var(--tx2)" />
            <span style={{ fontSize: "0.95rem" }}>Central de Ajuda</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "transparent",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "var(--red)",
            padding: "16px",
            borderRadius: "16px",
            marginTop: "40px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <LogOut size={18} /> Sair da Conta
        </button>
      </div>
    </div>
  );
}
