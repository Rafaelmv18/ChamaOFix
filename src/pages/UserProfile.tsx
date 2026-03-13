import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function UserProfile() {
  const navigate = useNavigate();

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
            👨
          </div>
          <div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
              }}
            >
              João Oliveira
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--tx2)" }}>
              joao.oliveira@email.com
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
          onClick={() => navigate("/")}
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
