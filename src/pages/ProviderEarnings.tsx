import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, DollarSign, Download } from "lucide-react";

export default function ProviderEarnings() {
  const navigate = useNavigate();

  return (
    <div className="screen fade-in">
      <div className="profile-header">
        <div className="back-header" onClick={() => navigate("/app")}>
          <ArrowLeft size={18} /> Voltar
        </div>
        <div
          className="booking-title"
          style={{ marginTop: "12px", fontSize: "1.4rem" }}
        >
          Meus Ganhos
        </div>
        <div className="booking-sub">
          Acompanhe seu rendimento e histórico financeiro
        </div>
      </div>

      <div style={{ padding: "16px 24px 100px" }}>
        {/* Main Card */}
        <div
          style={{
            background: "linear-gradient(135deg,#1a0800,#2d1200)",
            border: "1px solid rgba(255,92,26,0.25)",
            borderRadius: "20px",
            padding: "24px",
            position: "relative",
            overflow: "hidden",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--tx3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Saldo Disponível
          </div>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "2.4rem",
              fontWeight: 800,
              color: "var(--orange)",
              margin: "8px 0",
            }}
          >
            R$ 1.250,00
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <button
              style={{
                flex: 1,
                padding: "12px",
                background: "var(--orange)",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Sacar
            </button>
          </div>
        </div>

        <div
          className="dash-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "var(--dark3)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <div style={{ marginBottom: "8px", color: "var(--tx3)" }}>
              <TrendingUp size={20} />
            </div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "1.2rem",
                fontWeight: 800,
              }}
            >
              R$ 4.850
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--tx3)",
                marginTop: "2px",
              }}
            >
              Total no Mês
            </div>
          </div>
          <div
            style={{
              background: "var(--dark3)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <div style={{ marginBottom: "8px", color: "var(--tx3)" }}>
              <DollarSign size={20} />
            </div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "1.2rem",
                fontWeight: 800,
              }}
            >
              R$ 151
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--tx3)",
                marginTop: "2px",
              }}
            >
              Média por serviço
            </div>
          </div>
        </div>

        <div
          className="section-title"
          style={{
            marginTop: "8px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Histórico Recente</span>
          <Download
            size={16}
            color="var(--orange)"
            style={{ cursor: "pointer" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            {
              name: "Maria Silva",
              desc: "Vazamento na pia",
              val: "+ R$ 150,00",
              date: "Hoje",
            },
            {
              name: "Roberto Alves",
              desc: "Troca de resistência",
              val: "+ R$ 90,00",
              date: "Ontem",
            },
            {
              name: "Saque Banco",
              desc: "Transferência TED",
              val: "- R$ 800,00",
              date: "10 Mar",
              type: "out",
            },
          ].map((tr, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px",
                borderBottom: "1px solid var(--card-border)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  {tr.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--tx3)" }}>
                  {tr.desc} • {tr.date}
                </div>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: tr.type === "out" ? "var(--text)" : "var(--green)",
                }}
              >
                {tr.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
