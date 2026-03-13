import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Calendar } from "lucide-react";

export default function BookingsList() {
  const navigate = useNavigate();

  const myBookings = [
    {
      id: 1,
      proName: "Carlos Silva",
      proType: "Encanador",
      date: "Hoje, 11:30",
      status: "Confirmado",
      address: "Rua das Flores, 123",
      price: "R$ 90/h",
    },
    {
      id: 2,
      proName: "Ana Pinturas",
      proType: "Pintora",
      date: "12 Mar, 09:00",
      status: "Finalizado",
      address: "Rua das Flores, 123",
      price: "R$ 450",
    },
  ];

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
          Meus Agendamentos
        </div>
      </div>

      <div style={{ padding: "16px 24px" }}>
        {myBookings.map((b) => (
          <div
            key={b.id}
            style={{
              background: "var(--dark3)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "16px",
              opacity: b.status === "Finalizado" ? 0.6 : 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {b.proName}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--tx2)" }}>
                  {b.proType}
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  padding: "4px 8px",
                  borderRadius: "100px",
                  height: "fit-content",
                  background:
                    b.status === "Confirmado"
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(255,255,255,0.08)",
                  color:
                    b.status === "Confirmado" ? "var(--green)" : "var(--tx3)",
                }}
              >
                {b.status}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "0.85rem",
                color: "var(--tx2)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Calendar size={14} color="var(--orange)" /> {b.date}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <MapPin size={14} color="var(--tx3)" /> {b.address}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Clock size={14} color="var(--tx3)" /> Estimativa: {b.price}
              </div>
            </div>

            {b.status === "Confirmado" && (
              <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "10px",
                    color: "var(--text)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Remarcar
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "10px",
                    color: "var(--red)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
              </div>
            )}
            {b.status === "Finalizado" && (
              <div style={{ marginTop: "16px" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "var(--card-bg)",
                    border: "1px solid var(--orange)",
                    borderRadius: "10px",
                    color: "var(--orange)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Avaliar Serviço
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
