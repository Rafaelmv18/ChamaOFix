import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Calendar } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Reschedule() {
  const navigate = useNavigate();
  const { id } = useParams(); // bookingId
  const [booking, setBooking] = useState<any>(null);
  const [pro, setPro] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        // Fetch booking details
        const { data: bookingData, error: bookingError } = await supabase
          .from("bookings")
          .select("*, professionals(*)")
          .eq("id", id)
          .single();

        if (bookingError) throw bookingError;
        setBooking(bookingData);
        setPro(bookingData.professionals);

        // Pre-parse current date if possible (optional)
        // const parts = bookingData.date.split(", ");
        // ... set defaults ...
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const getTimesForDate = (date: number | null) => {
    if (!date) return [];
    if (date % 2 === 0) {
      return ["09:00", "10:00 (Ocupado)", "13:00", "15:30"];
    } else {
      return ["11:30", "14:00 (Ocupado)", "16:00", "17:30"];
    }
  };

  const times = getTimesForDate(selectedDate);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !booking) return;
    
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado.");

      // Check if the user is the client or the professional
      const isClient = user.id === booking.user_id;
      
      const { error } = await supabase
        .from("bookings")
        .update({
          date: `${selectedDate}/${new Date().getMonth() + 1}, ${selectedTime}`,
          status: isClient ? "Pendente" : booking.status // If client reschedules, reset to Pendente
        })
        .eq("id", id);

      if (error) throw error;
      
      // Navigate back based on context
      if (isClient) {
        navigate("/app/bookings-list");
      } else {
        navigate("/app/provider-agenda");
      }
    } catch (error: any) {
      console.error("Error updating booking:", error);
      alert(error.message || "Erro ao remarcar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="screen fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" color="var(--orange)" size={32} />
      </div>
    );
  }

  if (!booking || !pro) return <div className="screen">Agendamento não encontrado.</div>;

  return (
    <div className="screen fade-in">
      <div className="profile-header" style={{ paddingBottom: "16px" }}>
        <div className="back-header" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          <ArrowLeft size={18} /> Voltar
        </div>
        <div className="booking-title">Remarcar Serviço</div>
        <div className="booking-sub">
          Escolha uma nova data e horário.
        </div>
      </div>

      <div className="profile-section" style={{ paddingTop: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "var(--dark)",
            border: "1px solid var(--card-border)",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              fontSize: "1.4rem",
              borderRadius: "12px",
              background: pro.bg_gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pro.icon}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{pro.name}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--tx2)", display: "flex", alignItems: "center", gap: "4px" }}>
              Atual: <Calendar size={12} /> {booking.date}
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <label className="form-label" style={{ fontSize: "0.78rem", color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
              Nova data
            </label>
            <div style={{ fontSize: "0.8rem", color: "var(--orange)", fontWeight: 600 }}>Novembro, 2026</div>
          </div>

          <div className="calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", padding: "16px", background: "var(--dark)", border: "1px solid var(--card-border)", borderRadius: "16px" }}>
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
              <div key={`header-${i}`} style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--tx3)", fontWeight: 600 }}>{day}</div>
            ))}
            <div /><div />
            {currentMonthDays.map((day) => {
              const isPast = day < new Date().getDate();
              const isSelected = selectedDate === day;
              return (
                <div key={day} onClick={() => !isPast && (setSelectedDate(day), setSelectedTime(null))} style={{ display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "1/1", borderRadius: "50%", fontSize: "0.85rem", fontWeight: isSelected ? 800 : 500, cursor: isPast ? "not-allowed" : "pointer", background: isSelected ? "var(--orange)" : "transparent", color: isSelected ? "white" : isPast ? "var(--tx3)" : "var(--text)", opacity: isPast ? 0.3 : 1, border: isSelected ? "1px solid var(--orange)" : "1px solid transparent", transition: "all 0.2s" }}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "40px" }}>
          <label className="form-label" style={{ fontSize: "0.78rem", color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", display: "block" }}>Novo Horário</label>
          <div className="times-row" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {times.map((time) => {
              const isOccupied = time.includes("(Ocupado)");
              const displayTime = time.replace(" (Ocupado)", "");
              const isSelected = selectedTime === displayTime && !isOccupied;
              return (
                <div key={time} className={`time-chip ${isSelected ? "selected" : ""}`} onClick={() => !isOccupied && setSelectedTime(displayTime)} style={{ padding: "10px 16px", borderRadius: "12px", border: isSelected ? "1px solid var(--orange)" : "1px solid var(--card-border)", background: isSelected ? "rgba(255,92,26,0.15)" : "var(--dark)", color: isSelected ? "var(--orange)" : "var(--text)", fontSize: "0.85rem", cursor: isOccupied ? "not-allowed" : "pointer", opacity: isOccupied ? 0.35 : 1 }}>{time}</div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="book-bar" style={{ padding: "16px 24px 32px" }}>
        <button
          className="confirm-btn"
          disabled={!selectedDate || !selectedTime || submitting}
          onClick={handleConfirm}
          style={{
            width: "100%",
            background: (!selectedDate || !selectedTime || submitting) ? "var(--dark3)" : "var(--orange)",
            color: (!selectedDate || !selectedTime || submitting) ? "var(--tx3)" : "white",
            border: "none",
            borderRadius: "16px",
            padding: "18px",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: (!selectedDate || !selectedTime || submitting) ? "not-allowed" : "pointer",
            boxShadow: (!selectedDate || !selectedTime || submitting) ? "none" : "0 4px 24px rgba(255,92,26,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}
        >
          {submitting && <Loader2 size={18} className="animate-spin" />}
          {submitting ? "Atualizando..." : "Confirmar Alteração"}
        </button>
      </div>
    </div>
  );
}
