import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";

export default function ProviderAgenda() {
  const navigate = useNavigate();

  const [timeFilter, setTimeFilter] = useState("Dia"); // Dia, Semana, Mes
  const [statusFilter, setStatusFilter] = useState("Marcados"); // Marcados, Finalizados

  const [mySchedule, setMySchedule] = useState([
    {
      id: 1,
      clientName: "Maria Silva",
      service: "Vazamento na pia",
      date: "Hoje, 11:30",
      timeCategory: "Dia",
      status: "Marcados",
      address: "Rua João Pinto, 42",
      income: "R$ 150",
    },
    {
      id: 2,
      clientName: "Fernando Gomes",
      service: "Troca de sifão",
      date: "Amanhã, 14:00",
      timeCategory: "Semana",
      status: "Marcados",
      address: "Av. Paulista, 1000",
      income: "R$ 90",
    },
    {
      id: 3,
      clientName: "Juliana T.",
      service: "Instalação de aquecedor",
      date: "14 Mar, 09:00",
      timeCategory: "Mês",
      status: "Marcados",
      address: "Moema, 203",
      income: "R$ 350",
    },
    {
      id: 4,
      clientName: "Ricardo S.",
      service: "Troca de resistência",
      date: "Ontem, 16:00",
      timeCategory: "Semana",
      status: "Finalizados",
      address: "Pinheiros, 55",
      income: "R$ 90",
    },
  ]);

  const handleComplete = (id: number) => {
    setMySchedule(
      mySchedule.map((item) =>
        item.id === id ? { ...item, status: "Finalizados" } : item,
      ),
    );
  };

  const filteredSchedule = mySchedule.filter((item) => {
    // Se "Dia", mostra só dia. Se "Semana", mostra Dia e Semana. Se "Mês", mostra todos (Dia, Semana, Mes).
    // Pra simplificar visualmente o filtro fictício:
    const matchesTime =
      timeFilter === "Mês"
        ? true
        : timeFilter === "Semana"
          ? item.timeCategory === "Dia" || item.timeCategory === "Semana"
          : item.timeCategory === timeFilter;

    const matchesStatus = item.status === statusFilter;

    return matchesTime && matchesStatus;
  });

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
          Minha Agenda
        </div>
        <div className="booking-sub">
          Gerencie seus serviços por período e status
        </div>
      </div>

      <div style={{ padding: "16px 24px 10px" }}>
        {/* Status Tab Toggle */}
        <div
          style={{
            display: "flex",
            background: "var(--dark3)",
            borderRadius: "12px",
            padding: "4px",
            marginBottom: "16px",
          }}
        >
          {["Marcados", "Finalizados"].map((status) => (
            <div
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                background:
                  statusFilter === status ? "var(--dark2)" : "transparent",
                color: statusFilter === status ? "var(--orange)" : "var(--tx3)",
                boxShadow:
                  statusFilter === status
                    ? "0 2px 8px rgba(0,0,0,0.2)"
                    : "none",
              }}
            >
              {status}
            </div>
          ))}
        </div>

        {/* Time Filters */}
        <div
          className="filter-row"
          style={{ padding: "0", marginBottom: "16px" }}
        >
          {["Dia", "Semana", "Mês"].map((time) => (
            <div
              key={time}
              className={`filter-chip ${timeFilter === time ? "active" : ""}`}
              onClick={() => setTimeFilter(time)}
            >
              {time}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 24px 120px" }}>
        {filteredSchedule.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "var(--tx3)",
            }}
          >
            <CalendarCheck
              size={40}
              style={{ margin: "0 auto 16px", opacity: 0.2 }}
            />
            <p>Nenhum serviço encontrado para este filtro.</p>
          </div>
        ) : (
          filteredSchedule.map((item) => (
            <div
              key={item.id}
              style={{
                background: "var(--dark3)",
                border:
                  item.status === "Marcados"
                    ? "1px solid var(--orange)"
                    : "1px solid var(--card-border)",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "16px",
                opacity: item.status === "Finalizados" ? 0.6 : 1,
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
                    {item.clientName}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--tx2)" }}>
                    {item.service}
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
                      item.status === "Marcados"
                        ? "rgba(255,92,26,0.15)"
                        : "rgba(255,255,255,0.08)",
                    color:
                      item.status === "Marcados"
                        ? "var(--orange)"
                        : "var(--tx3)",
                  }}
                >
                  {item.status === "Marcados" ? "Confirmado" : "Finalizado"}
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
                  <Clock size={14} color="var(--orange)" /> {item.date}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <MapPin size={14} color="var(--tx3)" /> {item.address}
                </div>
              </div>

              {item.status === "Marcados" && (
                <div style={{ marginTop: "16px" }}>
                  <button
                    onClick={() => handleComplete(item.id)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "var(--green)",
                      border: "none",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <CheckCircle2 size={18} /> Marcar como Concluído
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
