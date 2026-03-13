import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div
      className="screen fade-in"
      id="screen-success"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 32px",
      }}
    >
      <div
        className="success-icon"
        style={{
          width: "100px",
          height: "100px",
          background: "rgba(34,197,94,0.12)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          marginBottom: "24px",
          border: "2px solid rgba(34,197,94,0.3)",
          animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        <CheckCircle size={48} color="var(--green)" />
      </div>
      <div
        className="success-title"
        style={{
          fontSize: "1.8rem",
          fontWeight: 800,
          marginBottom: "8px",
        }}
      >
        Agendado!
      </div>
      <div
        className="success-sub"
        style={{
          color: "var(--tx2)",
          fontSize: "0.9rem",
          lineHeight: 1.6,
          maxWidth: "280px",
        }}
      >
        O profissional foi notificado e chegará no horário combinado.
      </div>

      <div
        className="success-card"
        style={{
          width: "100%",
          background: "var(--dark3)",
          border: "1px solid var(--card-border)",
          borderRadius: "20px",
          padding: "20px",
          margin: "28px 0",
          textAlign: "left",
        }}
      >
        <div
          className="success-card-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            padding: "8px 0",
            borderBottom: "1px solid var(--card-border)",
          }}
        >
          <span style={{ color: "var(--tx3)" }}>Profissional</span>
          <span style={{ fontWeight: 600 }}>Carlos Silva</span>
        </div>
        <div
          className="success-card-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            padding: "8px 0",
            borderBottom: "1px solid var(--card-border)",
          }}
        >
          <span style={{ color: "var(--tx3)" }}>Data</span>
          <span style={{ fontWeight: 600 }}>Hoje</span>
        </div>
        <div
          className="success-card-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            padding: "8px 0",
            borderBottom: "none",
          }}
        >
          <span style={{ color: "var(--tx3)" }}>Horário</span>
          <span style={{ fontWeight: 600 }}>11:30</span>
        </div>
      </div>

      <button
        className="btn-secondary"
        onClick={() => navigate("/app")}
        style={{
          width: "100%",
          background: "var(--card-bg)",
          color: "var(--text)",
          border: "1px solid var(--card-border)",
          borderRadius: "100px",
          padding: "16px",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        Voltar ao Início
      </button>
    </div>
  );
}
