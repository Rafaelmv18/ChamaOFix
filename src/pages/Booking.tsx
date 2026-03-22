import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pro, setPro] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const [existingBookings, setExistingBookings] = useState<any[]>([]);

  const [selectedDate, setSelectedDate] = useState<number | null>(
    new Date().getDate(),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          setUserProfile(profile);
        }

        const { data, error } = await supabase
          .from("professionals")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setPro(data);

        // Fetch existing bookings to block out unavailable times
        const { data: bookingsData } = await supabase
          .from("bookings")
          .select("date")
          .eq("professional_id", id);
          
        if (bookingsData) {
          setExistingBookings(bookingsData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const getTimesForDate = (date: number | null) => {
    if (!date || !pro) return [];
    
    // Determine the day of the week (0 = Sunday, 1 = Monday...)
    const now = new Date();
    const probeDate = new Date(now.getFullYear(), now.getMonth(), date);
    const dayOfWeek = probeDate.getDay().toString();
    
    const providerAvail = pro.availability || {};
    const daySlots: string[] = providerAvail[dayOfWeek] || [];
    
    if (daySlots.length === 0) return [];

    // Find out which slots are already booked on this exact day
    const datePrefix = `${date}/${now.getMonth() + 1}, `;
    const bookedTimes = existingBookings
      .filter((b: any) => b.date && b.date.startsWith(datePrefix))
      .map((b: any) => b.date.split(", ")[1]);

    return daySlots.map(time => bookedTimes.includes(time) ? `${time} (Ocupado)` : time);
  };

  const times = getTimesForDate(selectedDate);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !pro) return;
    
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado.");

      const { error } = await supabase.from("bookings").insert({
        professional_id: pro.id,
        user_id: user.id,
        date: `${selectedDate}/${new Date().getMonth() + 1}, ${selectedTime}`,
        status: "Pendente",
        address: userProfile?.address || "Endereço não informado",
        price: `R$ ${pro.price_min}`,
        description: description
      });

      if (error) throw error;
      navigate("/app/success");
    } catch (error: any) {
      console.error("Error saving booking:", error);
      alert(error.message || "Erro ao realizar agendamento. Tente novamente.");
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

  if (!pro) return <div className="screen">Profissional não encontrado.</div>;

  return (
    <div className="screen fade-in">
      <div className="profile-header" style={{ paddingBottom: "16px" }}>
        <div className="back-header" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
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
            <div style={{ fontSize: "0.75rem", color: "var(--tx2)" }}>{pro.specialty}</div>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <label className="form-label" style={{ fontSize: "0.78rem", color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
              Data da visita
            </label>
            <div style={{ fontSize: "0.8rem", color: "var(--orange)", fontWeight: 600 }}>Novembro, 2026</div>
          </div>

          <div className="calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", padding: "16px", background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "16px" }}>
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

        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label className="form-label" style={{ fontSize: "0.78rem", color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", display: "block" }}>Horário</label>
          <div className="times-row" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {times.length === 0 && (
              <div style={{ fontSize: "0.85rem", color: "var(--tx3)", padding: "8px 0", fontStyle: "italic" }}>
                Nenhum horário disponível para esta data.
              </div>
            )}
            {times.map((time) => {
              const isOccupied = time.includes("(Ocupado)");
              const displayTime = time.replace(" (Ocupado)", "");
              const isSelected = selectedTime === displayTime && !isOccupied;
              return (
                <div key={time} className={`time-chip ${isSelected ? "selected" : ""}`} onClick={() => !isOccupied && setSelectedTime(displayTime)} style={{ padding: "10px 16px", borderRadius: "12px", border: isSelected ? "1px solid var(--orange)" : "1px solid var(--card-border)", background: isSelected ? "rgba(255,92,26,0.15)" : "var(--dark3)", color: isSelected ? "var(--orange)" : "inherit", fontSize: "0.85rem", cursor: isOccupied ? "not-allowed" : "pointer", opacity: isOccupied ? 0.35 : 1 }}>{time}</div>
              );
            })}
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label className="form-label" style={{ fontSize: "0.78rem", color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px", display: "block" }}>Descreva o que precisa (opcional)</label>
          <textarea className="form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ex: Torneira da pia pingando muito, precisa trocar o reparo." style={{ width: "100%", background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "14px", color: "var(--text)", fontFamily: "inherit", fontSize: "0.9rem", resize: "none", outline: "none", minHeight: "90px" }}></textarea>
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
          {submitting ? "Confirmando..." : "Confirmar Agendamento"}
        </button>
      </div>
    </div>
  );
}
