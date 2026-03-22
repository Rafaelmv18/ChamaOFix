import { useState, useEffect } from "react";
import { Loader2, TrendingUp, CheckCircle, Star } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function ProviderDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [proProfile, setProProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    earnings: 0,
    completed: 0,
    rating: 0
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Get the professional record associated with this user
        const { data: proData, error: proError } = await supabase
          .from("professionals")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (proError && proError.code !== "PGRST116") throw proError;
        
        if (!proData) {
          setProProfile({ status: "not_found" });
          setLoading(false);
          return;
        }

        setProProfile(proData);

        if (proData.status !== "approved") {
           setLoading(false);
           return;
        }

        // 2. Fetch bookings for this professional, joining with profiles for client info
        const { data: bookingsData, error: bookingsError } = await supabase
          .from("bookings")
          .select("*, client:profiles(full_name, username)")
          .eq("professional_id", proData.id)
          .order("created_at", { ascending: false });

        if (bookingsError) throw bookingsError;

        setRequests(bookingsData || []);

        // 3. Calculate stats
        const completed = bookingsData?.filter(b => b.status === "Finalizado" || b.status === "Concluído") || [];
        const earnings = completed.reduce((acc, b) => {
          const val = parseInt(b.price.replace(/\D/g, ""));
          return acc + (isNaN(val) ? 0 : val);
        }, 0);

        setStats({
          earnings,
          completed: completed.length,
          rating: proData.rating || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const handleAction = async (id: string, action: "Aceito" | "Recusado") => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: action })
        .eq("id", id);
      
      if (error) throw error;

      setRequests(requests.map(req => 
        req.id === id ? { ...req, status: action } : req
      ));
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (loading) {
    return (
      <div className="screen fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" color="var(--orange)" size={32} />
      </div>
    );
  }

  if (proProfile?.status === "pending") {
    return (
      <div className="screen fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", height: "100vh" }}>
        <div style={{ padding: "24px", background: "rgba(255, 152, 0, 0.1)", borderRadius: "100px", marginBottom: "20px" }}>
           <Loader2 className="animate-spin" color="var(--orange)" size={48} />
        </div>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "12px" }}>Perfil em Análise</h2>
        <p style={{ color: "var(--tx2)", fontSize: "0.95rem", lineHeight: "1.5" }}>
          Recebemos o seu cadastro! Nossa equipe está conferindo as informações. Você será notificado assim que puder começar a atender.
        </p>
      </div>
    );
  }

  if (proProfile?.status === "rejected") {
    return (
      <div className="screen fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", height: "100vh" }}>
        <div style={{ padding: "24px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "100px", marginBottom: "20px", color: "var(--red)" }}>
           ❌
        </div>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "12px" }}>Cadastro Recusado</h2>
        <p style={{ color: "var(--tx2)", fontSize: "0.95rem", lineHeight: "1.5" }}>
          Infelizmente não pudemos aprovar o seu perfil profissional no momento. Entre em contato com o suporte para mais detalhes.
        </p>
      </div>
    );
  }

  if (proProfile?.status === "not_found") {
    return (
      <div className="screen fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", height: "100vh" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "12px" }}>Acesso Negado</h2>
        <p style={{ color: "var(--tx2)", fontSize: "0.95rem", lineHeight: "1.5" }}>
          Você ainda não é um prestador. Cadastre-se pelo menu principal para acessar esta área.
        </p>
      </div>
    );
  }

  return (
    <div className="screen fade-in">
      <div className="dash-header" style={{ padding: "50px 24px 24px" }}>
        <div className="dash-title" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
          Painel do Profissional
        </div>
        <div className="dash-sub" style={{ fontSize: "0.85rem", color: "var(--tx2)", marginTop: "4px" }}>
          Olá, {proProfile?.name.split(" ")[0] || "Profissional"}! Veja o resumo do seu desempenho.
        </div>
      </div>

      <div className="earnings-card" style={{ margin: "0 24px 20px", background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "20px", padding: "24px", position: "relative", overflow: "hidden" }}>
        <div className="earn-label" style={{ fontSize: "0.75rem", color: "var(--tx2)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Ganhos do Mês
        </div>
        <div className="earn-val" style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--orange)", margin: "6px 0" }}>
          R$ {stats.earnings.toLocaleString("pt-BR")}
        </div>
        <div className="earn-change" style={{ fontSize: "0.8rem", color: "var(--green)", display: "flex", alignItems: "center", gap: "4px" }}>
          <TrendingUp size={14} /> Total acumulado de serviços finalizados
        </div>
      </div>

      <div className="dash-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "0 24px 20px" }}>
        <div className="dash-stat-card" style={{ background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "16px", padding: "16px" }}>
          <CheckCircle size={20} color="var(--green)" style={{ marginBottom: "8px" }} />
          <div className="ds-val" style={{ fontSize: "1.4rem", fontWeight: 800 }}>{stats.completed}</div>
          <div className="ds-label" style={{ fontSize: "0.72rem", color: "var(--tx3)", marginTop: "2px" }}>Serviços feitos</div>
        </div>
        <div className="dash-stat-card" style={{ background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "16px", padding: "16px" }}>
          <Star size={20} color="var(--orange)" style={{ marginBottom: "8px" }} />
          <div className="ds-val" style={{ fontSize: "1.4rem", fontWeight: 800 }}>{stats.rating}</div>
          <div className="ds-label" style={{ fontSize: "0.72rem", color: "var(--tx3)", marginTop: "2px" }}>Avaliação média</div>
        </div>
      </div>

      <div className="requests-list" style={{ padding: "0 24px 100px" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "12px", fontWeight: 700 }}>Solicitações Recentes</h3>

        {requests.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--tx3)" }}>Nenhuma solicitação no momento.</div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="req-item" style={{ background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "16px", padding: "16px", marginBottom: "12px", opacity: req.status === "Recusado" ? 0.6 : 1 }}>
              <div className="req-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div className="req-client" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Cliente: {req.client?.full_name || req.client?.username || "Desconhecido"}</div>
                <div className={`req-status`} style={{ fontSize: "0.68rem", fontWeight: 700, padding: "4px 10px", borderRadius: "100px", background: req.status === "Aceito" || req.status === "Confirmado" ? "rgba(34,197,94,0.15)" : req.status === "Pendente" ? "rgba(255,152,0,0.15)" : "rgba(255,255,255,0.08)", color: req.status === "Aceito" || req.status === "Confirmado" ? "var(--green)" : req.status === "Pendente" ? "var(--orange)" : "var(--tx3)" }}>{req.status}</div>
              </div>
              <div className="req-desc" style={{ fontSize: "0.8rem", color: "var(--tx2)", marginBottom: "10px" }}>{req.description || "Sem descrição adicional."}</div>
              <div className="req-meta" style={{ display: "flex", gap: "10px" }}>
                <span className="tag" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "100px", padding: "3px 10px", fontSize: "0.7rem", color: "var(--tx2)" }}>{req.date}</span>
                <span className="tag" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "100px", padding: "3px 10px", fontSize: "0.7rem", color: "var(--tx2)" }}>{req.price}</span>
              </div>

              {req.status === "Pendente" && (
                <div className="req-actions" style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <button onClick={() => handleAction(req.id, "Recusado")} style={{ flex: 1, background: "var(--dark2)", color: "var(--muted)", border: "1px solid var(--card-border)", borderRadius: "10px", padding: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Recusar</button>
                  <button onClick={() => handleAction(req.id, "Aceito")} style={{ flex: 1, background: "rgba(34,197,94,0.15)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "10px", padding: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Aceitar</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
