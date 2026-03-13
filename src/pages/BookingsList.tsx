import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function BookingsList() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          professionals (
            name,
            specialty,
            icon
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("Deseja realmente cancelar este agendamento?")) return;
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "Cancelado" })
        .eq("id", id);
      if (error) throw error;
      fetchBookings();
    } catch (error) {
      console.error("Error canceling:", error);
    }
  };

  return (
    <div className="screen fade-in">
      <div className="profile-header">
        <div className="back-header" onClick={() => navigate("/app")} style={{ cursor: "pointer" }}>
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
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <Loader2 className="animate-spin" color="var(--orange)" />
          </div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--tx3)" }}>
            Nenhum agendamento encontrado.
          </div>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: "var(--dark3)",
                border: "1px solid var(--card-border)",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "16px",
                opacity: b.status === "Finalizado" || b.status === "Cancelado" ? 0.6 : 1,
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
                    {b.professionals?.name || "Profissional"}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--tx2)" }}>
                    {b.professionals?.specialty}
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
                      b.status === "Confirmado" || b.status === "Aceito"
                        ? "rgba(34,197,94,0.15)"
                        : b.status === "Pendente"
                        ? "rgba(255,152,0,0.15)"
                        : b.status === "Cancelado"
                        ? "rgba(220,38,38,0.15)"
                        : "rgba(255,255,255,0.08)",
                    color:
                      b.status === "Confirmado" || b.status === "Aceito"
                        ? "var(--green)" 
                        : b.status === "Pendente"
                        ? "var(--orange)"
                        : b.status === "Cancelado"
                        ? "#ef4444"
                        : "var(--tx3)",
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
                  <span style={{ fontWeight: 600, color: "var(--orange)" }}>{b.price}</span>
                </div>
              </div>

              {(b.status === "Confirmado" || b.status === "Pendente" || b.status === "Aceito") ? (
                <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => navigate(`/app/reschedule/${b.id}`)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                      borderRadius: "10px",
                      color: "var(--tx1)",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    Remarcar
                  </button>
                  <button
                    onClick={() => handleCancel(b.id)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "rgba(220, 38, 38, 0.08)",
                      border: "1px solid rgba(220, 38, 38, 0.3)",
                      borderRadius: "10px",
                      color: "#ef4444",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : b.status === "Finalizado" ? (
                <div style={{ marginTop: "16px" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: "var(--orange)",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(255, 92, 26, 0.3)",
                    }}
                  >
                    Avaliar Serviço
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
