import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Booking() {
  const navigate = useNavigate();
  // We'll use day numbers directly for the calendar logic
  const [selectedDate, setSelectedDate] = useState<number | null>(
    new Date().getDate(),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate a basic 30-day view for the current month
  const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  // Dynamic times to simulate different availability per day
  const getTimesForDate = (date: number | null) => {
    if (!date) return [];
    if (date % 2 === 0) {
      return ["09:00", "10:00 (Ocupado)", "13:00", "15:30"];
    } else {
      return ["11:30", "14:00 (Ocupado)", "16:00", "17:30"];
    }
  };

  const times = getTimesForDate(selectedDate);

  return (
    <div className="screen fade-in">
      <div className="profile-header" style={{ paddingBottom: "16px" }}>
        <div className="back-header" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Voltar para o Perfil
        </div>
        <div className="booking-title">Agendar Serviço</div>
        <div className="booking-sub">
          Escolha a data e o horário para a visita.
        </div>
      </div>

      <div className="profile-section" style={{ paddingTop: "16px" }}>
        <div
          className="booking-pro-mini"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "var(--dark3)",
            border: "1px solid var(--card-border)",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            className="pro-avatar"
            style={{
              width: "48px",
              height: "48px",
              fontSize: "1.4rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#1a2a1a,#0d1a0d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            🔧
          </div>
          <div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              Carlos Silva
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--tx2)" }}>
              Encanador Profissional
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <label
              className="form-label"
              style={{
                fontSize: "0.78rem",
                color: "var(--tx3)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: 0,
              }}
            >
              Data da visita
            </label>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--orange)",
                fontWeight: 600,
              }}
            >
              Novembro, 2026
            </div>
          </div>

          <div
            className="calendar-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "8px",
              padding: "16px",
              background: "var(--dark3)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
            }}
          >
            {/* Weekdays header */}
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
              <div
                key={`header-${i}`}
                style={{
                  textAlign: "center",
                  fontSize: "0.7rem",
                  color: "var(--tx3)",
                  fontWeight: 600,
                }}
              >
                {day}
              </div>
            ))}

            {/* Empty slots for month start offset (e.g., starts on Tuesday) */}
            <div />
            <div />

            {currentMonthDays.map((day) => {
              const isPast = day < new Date().getDate() - 2; // Simulate some past days being unclickable
              const isSelected = selectedDate === day;

              return (
                <div
                  key={day}
                  onClick={() =>
                    !isPast && (setSelectedDate(day), setSelectedTime(null))
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "1/1",
                    borderRadius: "50%",
                    fontSize: "0.85rem",
                    fontWeight: isSelected ? 800 : 500,
                    cursor: isPast ? "not-allowed" : "pointer",
                    background: isSelected ? "var(--orange)" : "transparent",
                    color: isSelected
                      ? "white"
                      : isPast
                        ? "var(--tx3)"
                        : "var(--text)",
                    opacity: isPast ? 0.3 : 1,
                    border: isSelected
                      ? "1px solid var(--orange)"
                      : "1px solid transparent",
                    transition: "all 0.2sease",
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label
            className="form-label"
            style={{
              fontSize: "0.78rem",
              color: "var(--tx3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Horário
          </label>
          <div
            className="times-row"
            style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
          >
            {times.map((time) => {
              const isOccupied = time.includes("(Ocupado)");
              const displayTime = time.replace(" (Ocupado)", "");
              const isSelected = selectedTime === displayTime && !isOccupied;

              return (
                <div
                  key={time}
                  className={`time-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => !isOccupied && setSelectedTime(displayTime)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "12px",
                    border: isSelected
                      ? "1px solid var(--orange)"
                      : "1px solid var(--card-border)",
                    background: isSelected
                      ? "rgba(255,92,26,0.15)"
                      : "var(--dark3)",
                    color: isSelected ? "var(--orange)" : "inherit",
                    fontSize: "0.85rem",
                    cursor: isOccupied ? "not-allowed" : "pointer",
                    opacity: isOccupied ? 0.35 : 1,
                  }}
                >
                  {time}
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label
            className="form-label"
            style={{
              fontSize: "0.78rem",
              color: "var(--tx3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px",
              display: "block",
            }}
          >
            Descreva o que precisa (opcional)
          </label>
          <textarea
            className="form-textarea"
            placeholder="Ex: Torneira da pia pingando muito, precisa trocar o reparo."
            style={{
              width: "100%",
              background: "var(--dark3)",
              border: "1px solid var(--card-border)",
              borderRadius: "14px",
              padding: "14px",
              color: "var(--text)",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.9rem",
              resize: "none",
              outline: "none",
              minHeight: "90px",
            }}
          ></textarea>
        </div>
      </div>

      <div className="book-bar" style={{ padding: "16px 24px 32px" }}>
        <button
          className="confirm-btn"
          disabled={!selectedDate || !selectedTime}
          onClick={() => {
            navigate("/app/success");
          }}
          style={{
            width: "100%",
            background:
              !selectedDate || !selectedTime ? "var(--dark3)" : "var(--orange)",
            color: !selectedDate || !selectedTime ? "var(--tx3)" : "white",
            border: "none",
            borderRadius: "16px",
            padding: "18px",
            fontFamily: "Syne, sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: !selectedDate || !selectedTime ? "not-allowed" : "pointer",
            boxShadow:
              !selectedDate || !selectedTime
                ? "none"
                : "0 4px 24px rgba(255,92,26,0.4)",
          }}
        >
          Confirmar Agendamento
        </button>
      </div>
    </div>
  );
}
