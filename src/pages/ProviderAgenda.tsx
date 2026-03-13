import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle2,
  CalendarCheck,
  Loader2
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ProviderAgenda() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("Marcados"); // Marcados, Finalizados

  const [mySchedule, setMySchedule] = useState<any[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingClient, setBookingClient] = useState("");
  const [bookingDesc, setBookingDesc] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [proId, setProId] = useState("");

  const fetchAgenda = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: pro } = await supabase
        .from("professionals")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!pro) return;
      setProId(pro.id);

      const { data, error } = await supabase
        .from("bookings")
        .select("*, client:profiles(full_name, username)")
        .eq("professional_id", pro.id)
        .order("date", { ascending: true });

      if (error) throw error;
      setMySchedule(data || []);
    } catch (error) {
      console.error("Error fetching agenda:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualBooking = async () => {
    if (!bookingClient || !bookingDate || !bookingTime) return;
    try {
      const { error } = await supabase
        .from("bookings")
        .insert({
          professional_id: proId,
          user_id: null, // Manual bookings might not link to registered users via ID initially, or use a "placeholder" logic
          description: `${bookingDesc} (Cliente: ${bookingClient})`,
          date: `${bookingDate}, ${bookingTime}`,
          status: "Confirmado",
          price: "A combinar",
          address: "Conforme combinado"
        });
      
      if (error) throw error;
      setIsBookingModalOpen(false);
      setBookingClient("");
      setBookingDesc("");
      fetchAgenda();
    } catch (error) {
      console.error("Error manual booking:", error);
    }
  };

  useEffect(() => {
    fetchAgenda();
  }, []);

  const handleComplete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "Finalizado" })
        .eq("id", id);
      
      if (error) throw error;
      fetchAgenda();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredSchedule = mySchedule.filter((item) => {
    if (statusFilter === "Marcados") {
      return item.status === "Confirmado" || item.status === "Pendente" || item.status === "Aceito";
    }
    return item.status === "Finalizado";
  });

  if (loading) {
    return (
      <div className="screen fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" color="var(--orange)" size={32} />
      </div>
    );
  }

  return (
    <div className="screen fade-in">
      <div className="profile-header">
        <div className="back-header" onClick={() => navigate("/app")} style={{ cursor: "pointer" }}>
          <ArrowLeft size={18} /> Voltar
        </div>
        <div
          className="booking-title"
          style={{ marginTop: "12px", fontSize: "1.4rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          Minha Agenda
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            style={{ fontSize: "0.8rem", padding: "8px 16px", borderRadius: "100px", background: "var(--orange)", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer" }}
          >
            + Agendar
          </button>
        </div>
        <div className="booking-sub">
          Gerencie seus serviços por período e status
        </div>
      </div>

      <div style={{ padding: "16px 24px 10px" }}>
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
                  item.status !== "Finalizado"
                    ? "1px solid var(--orange)"
                    : "1px solid var(--card-border)",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "16px",
                opacity: item.status === "Finalizado" ? 0.6 : 1,
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
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                    Cliente: {item.client?.full_name || item.client?.username || "Desconhecido"}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--tx2)" }}>
                    {item.description || "Serviço solicitado"}
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
                      item.status !== "Finalizado"
                        ? "rgba(255,152,0,0.15)"
                        : "rgba(255,255,255,0.08)",
                    color:
                      item.status !== "Finalizado"
                        ? "var(--orange)"
                        : "var(--tx3)",
                  }}
                >
                  {item.status}
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
                <div style={{ fontWeight: 600, color: "var(--orange)" }}>
                   {item.price}
                </div>
              </div>

              {item.status !== "Finalizado" && (
                <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => navigate(`/app/reschedule/${item.id}`)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "var(--dark2)",
                      border: "1px solid var(--card-border)",
                      borderRadius: "12px",
                      color: "var(--tx1)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Remarcar
                  </button>
                  <button
                    onClick={() => handleComplete(item.id)}
                    style={{
                      flex: 2,
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
                    <CheckCircle2 size={18} /> Concluir
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {isBookingModalOpen && (
        <div className="modal-overlay" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px" }}>
          <div className="modal-content" style={{ background: "var(--dark3)", borderRadius: "24px", padding: "24px", width: "100%", maxWidth: "400px", border: "1px solid var(--card-border)" }}>
            <h3 style={{ marginBottom: "20px" }}>Novo Agendamento</h3>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.8rem", color: "var(--tx3)", display: "block", marginBottom: "8px" }}>Nome do Cliente</label>
              <input type="text" value={bookingClient} onChange={(e) => setBookingClient(e.target.value)} placeholder="Nome completo" style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "var(--dark2)", border: "1px solid var(--card-border)", color: "#fff" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--tx3)", display: "block", marginBottom: "8px" }}>Data</label>
                <input type="text" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} placeholder="Ex: 12/12" style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "var(--dark2)", border: "1px solid var(--card-border)", color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--tx3)", display: "block", marginBottom: "8px" }}>Hora</label>
                <input type="text" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} placeholder="Ex: 09:00" style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "var(--dark2)", border: "1px solid var(--card-border)", color: "#fff" }} />
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "0.8rem", color: "var(--tx3)", display: "block", marginBottom: "8px" }}>Serviço / Nota</label>
              <textarea value={bookingDesc} onChange={(e) => setBookingDesc(e.target.value)} placeholder="Ex: Pintura sala" style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "var(--dark2)", border: "1px solid var(--card-border)", color: "#fff", minHeight: "80px", fontFamily: "inherit" }} />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                style={{ flex: 1, padding: "14px", borderRadius: "14px", border: "1px solid var(--card-border)", background: "transparent", color: "var(--tx2)", fontWeight: 600 }}
              >
                Cancelar
              </button>
              <button 
                onClick={handleManualBooking}
                style={{ flex: 1, padding: "14px", borderRadius: "14px", border: "none", background: "var(--orange)", color: "#fff", fontWeight: 700 }}
              >
                Criar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
