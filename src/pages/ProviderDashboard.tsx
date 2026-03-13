import { useState } from "react";

export default function ProviderDashboard() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Maria Silva",
      status: "novo",
      desc: "Vazamento na pia da cozinha. Preciso de conserto urgente!",
      time: "Amanhã 11:30",
      dist: "1.5km",
    },
  ]);

  const handleAction = (id: number, action: "accept" | "decline") => {
    setRequests(
      requests.map((req) => {
        if (req.id === id) {
          return { ...req, status: action === "accept" ? "confirmed" : "done" };
        }
        return req;
      }),
    );
  };

  return (
    <div className="screen fade-in">
      <div className="dash-header" style={{ padding: "50px 24px 24px" }}>
        <div
          className="dash-title"
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "1.4rem",
            fontWeight: 800,
          }}
        >
          Painel do Profissional
        </div>
        <div
          className="dash-sub"
          style={{ fontSize: "0.85rem", color: "var(--tx2)", marginTop: "4px" }}
        >
          Resumo de desempenho e solicitações
        </div>
      </div>

      <div
        className="earnings-card"
        style={{
          margin: "0 24px 20px",
          background: "linear-gradient(135deg,#1a0800,#2d1200)",
          border: "1px solid rgba(255,92,26,0.25)",
          borderRadius: "20px",
          padding: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="earn-label"
          style={{
            fontSize: "0.75rem",
            color: "var(--tx3)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Ganhos do Mês
        </div>
        <div
          className="earn-val"
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "var(--orange)",
            margin: "6px 0",
          }}
        >
          R$ 4.850
        </div>
        <div
          className="earn-change"
          style={{ fontSize: "0.8rem", color: "var(--green)" }}
        >
          ↑ 12% em relação ao mês anterior
        </div>
      </div>

      <div
        className="dash-stats"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          margin: "0 24px 20px",
        }}
      >
        <div
          className="dash-stat-card"
          style={{
            background: "var(--dark3)",
            border: "1px solid var(--card-border)",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <div
            className="ds-icon"
            style={{ fontSize: "1.4rem", marginBottom: "8px" }}
          >
            ✅
          </div>
          <div
            className="ds-val"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "1.4rem",
              fontWeight: 800,
            }}
          >
            32
          </div>
          <div
            className="ds-label"
            style={{
              fontSize: "0.72rem",
              color: "var(--tx3)",
              marginTop: "2px",
            }}
          >
            Serviços feitos
          </div>
        </div>
        <div
          className="dash-stat-card"
          style={{
            background: "var(--dark3)",
            border: "1px solid var(--card-border)",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <div
            className="ds-icon"
            style={{ fontSize: "1.4rem", marginBottom: "8px" }}
          >
            ⭐️
          </div>
          <div
            className="ds-val"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "1.4rem",
              fontWeight: 800,
            }}
          >
            4.9
          </div>
          <div
            className="ds-label"
            style={{
              fontSize: "0.72rem",
              color: "var(--tx3)",
              marginTop: "2px",
            }}
          >
            Avaliação média
          </div>
        </div>
      </div>

      <div className="requests-list" style={{ padding: "0 24px 100px" }}>
        <h3
          style={{ fontFamily: "Syne", fontSize: "1rem", marginBottom: "12px" }}
        >
          Novas Solicitações
        </h3>

        {requests.map((req) => (
          <div
            key={req.id}
            className="req-item"
            style={{
              background: "var(--dark3)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "12px",
              opacity: req.status === "done" ? 0.6 : 1,
            }}
          >
            <div
              className="req-top"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "8px",
              }}
            >
              <div
                className="req-client"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                }}
              >
                {req.name}
              </div>
              <div
                className={`req-status ${req.status}`}
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: "100px",
                  background:
                    req.status === "confirmed"
                      ? "rgba(34,197,94,0.15)"
                      : req.status === "done"
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(59,130,246,0.15)",
                  color:
                    req.status === "confirmed"
                      ? "var(--green)"
                      : req.status === "done"
                        ? "var(--tx3)"
                        : "var(--blue)",
                }}
              >
                {req.status === "novo"
                  ? "Novo"
                  : req.status === "confirmed"
                    ? "Confirmado"
                    : "Recusado"}
              </div>
            </div>
            <div
              className="req-desc"
              style={{
                fontSize: "0.8rem",
                color: "var(--tx2)",
                marginBottom: "10px",
              }}
            >
              {req.desc}
            </div>
            <div className="req-meta" style={{ display: "flex", gap: "10px" }}>
              <span
                className="tag"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "100px",
                  padding: "3px 10px",
                  fontSize: "0.7rem",
                  color: "var(--tx2)",
                }}
              >
                {req.time}
              </span>
              <span
                className="tag"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "100px",
                  padding: "3px 10px",
                  fontSize: "0.7rem",
                  color: "var(--tx2)",
                }}
              >
                {req.dist}
              </span>
            </div>

            {req.status === "novo" && (
              <div
                className="req-actions"
                style={{ display: "flex", gap: "8px", marginTop: "10px" }}
              >
                <button
                  className="btn-decline"
                  onClick={() => handleAction(req.id, "decline")}
                  style={{
                    flex: 1,
                    background: "rgba(239,68,68,0.1)",
                    color: "var(--red)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "10px",
                    padding: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Recusar
                </button>
                <button
                  className="btn-accept"
                  onClick={() => handleAction(req.id, "accept")}
                  style={{
                    flex: 1,
                    background: "rgba(34,197,94,0.15)",
                    color: "var(--green)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    borderRadius: "10px",
                    padding: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Aceitar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
