import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Save, Clock, Check } from "lucide-react";
import { supabase } from "../lib/supabase";

const DAYS = [
  { id: "0", name: "Domingo" },
  { id: "1", name: "Segunda-feira" },
  { id: "2", name: "Terça-feira" },
  { id: "3", name: "Quarta-feira" },
  { id: "4", name: "Quinta-feira" },
  { id: "5", name: "Sexta-feira" },
  { id: "6", name: "Sábado" },
];

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

export default function ProviderAvailability() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [selectedDay, setSelectedDay] = useState("1"); // Default: Segunda
  const [proId, setProId] = useState<string | null>(null);

  useEffect(() => {
    async function loadAvailability() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return navigate("/app/login");

        const { data: pro, error } = await supabase
          .from("professionals")
          .select("id, availability")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Erro ao carregar:", error);
          if (error.code === 'PGRST116') {
             alert("Apenas prestadores podem acessar essa página.");
             navigate("/app");
          }
          return;
        }

        setProId(pro.id);
        if (pro.availability) {
          setAvailability(pro.availability as Record<string, string[]> || {});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAvailability();
  }, [navigate]);

  const toggleTimeSlot = (time: string) => {
    setAvailability((prev) => {
      const currentDaySlots = prev[selectedDay] || [];
      const isSelected = currentDaySlots.includes(time);
      
      let nextSlots;
      if (isSelected) {
        nextSlots = currentDaySlots.filter(t => t !== time);
      } else {
        nextSlots = [...currentDaySlots, time].sort();
      }

      return {
        ...prev,
        [selectedDay]: nextSlots
      };
    });
  };

  const setAllSlots = (active: boolean) => {
    setAvailability((prev) => ({
      ...prev,
      [selectedDay]: active ? [...TIME_SLOTS] : []
    }));
  };

  const handleSave = async () => {
    if (!proId) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("professionals")
        .update({ availability })
        .eq("id", proId);
        
      if (error) throw error;
      alert("Horários atualizados com sucesso!");
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="screen fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" color="var(--orange)" size={48} />
      </div>
    );
  }

  const activeSlots = availability[selectedDay] || [];

  return (
    <div className="screen fade-in">
      <div className="profile-header" style={{ paddingBottom: "16px" }}>
        <div className="back-header" onClick={() => navigate(-1)} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <ArrowLeft size={18} /> Voltar
        </div>
        <div className="booking-title" style={{ marginTop: "16px" }}>Horários de Atendimento</div>
        <div className="booking-sub">
          Selecione os dias da semana e os horários em que você está disponível para serviços.
        </div>
      </div>

      <div className="profile-section" style={{ paddingTop: "24px" }}>
        
        {/* Day Selector */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "16px", scrollbarWidth: "none" }}>
          {DAYS.map(day => (
            <div 
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              style={{
                padding: "8px 16px",
                borderRadius: "100px",
                whiteSpace: "nowrap",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                background: selectedDay === day.id ? "var(--orange)" : "var(--dark3)",
                color: selectedDay === day.id ? "white" : "var(--text)",
                border: selectedDay === day.id ? "1px solid var(--orange)" : "1px solid var(--card-border)",
              }}
            >
              {day.name}
            </div>
          ))}
        </div>

        {/* Action Buttons for current day */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", marginTop: "8px" }}>
          <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>Horários ({DAYS.find(d => d.id === selectedDay)?.name})</span>
          <div style={{ display: "flex", gap: "10px" }}>
             <button onClick={() => setAllSlots(true)} style={{ background:"transparent", border:"none", color:"var(--orange)", fontSize:"0.8rem", cursor:"pointer", fontWeight:600 }}>Todos</button>
             <button onClick={() => setAllSlots(false)} style={{ background:"transparent", border:"none", color:"var(--tx3)", fontSize:"0.8rem", cursor:"pointer", fontWeight:600 }}>Nenhum</button>
          </div>
        </div>

        {/* Time Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "12px" }}>
          {TIME_SLOTS.map(time => {
            const isSelected = activeSlots.includes(time);
            return (
              <div
                key={time}
                onClick={() => toggleTimeSlot(time)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 8px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: isSelected ? "rgba(255, 92, 26, 0.1)" : "var(--dark3)",
                  border: isSelected ? "1px solid var(--orange)" : "1px solid var(--card-border)",
                  color: isSelected ? "var(--orange)" : "var(--text)"
                }}
              >
                {isSelected ? <Check size={16} style={{ marginBottom: "4px" }} /> : <Clock size={16} style={{ marginBottom: "4px", opacity: 0.5 }} />}
                <span style={{ fontSize: "0.85rem", fontWeight: isSelected ? 700 : 500 }}>{time}</span>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: saving ? "var(--dark3)" : "var(--orange)",
            color: saving ? "var(--tx3)" : "white",
            border: "none",
            borderRadius: "16px",
            padding: "18px",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: saving ? "not-allowed" : "pointer",
            marginTop: "40px",
            transition: "all 0.2s"
          }}
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? "Salvando..." : "Salvar Horários"}
        </button>
      </div>
    </div>
  );
}
