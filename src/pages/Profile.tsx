import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pro, setPro] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPro() {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from("professionals")
          .select("*")
          .eq("id", id)
          .single();
        
        if (error) throw error;
        setPro(data);
      } catch (error) {
        console.error("Error fetching professional:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPro();
  }, [id]);

  if (loading) {
    return (
      <div className="screen fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" color="var(--orange)" size={32} />
      </div>
    );
  }

  if (!pro) {
    return (
      <div className="screen fade-in" style={{ padding: "40px", textAlign: "center" }}>
        <p>Profissional não encontrado.</p>
        <button className="btn-book" style={{ marginTop: "20px" }} onClick={() => navigate("/app")}>
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div className="screen fade-in">
      <div className="profile-header">
        <div className="back-header" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          <ArrowLeft size={18} /> Voltar
        </div>
        <div className="profile-top">
          <div
            className="profile-avatar"
            style={{ background: pro.bg_gradient }}
          >
            {pro.icon}
            <div className="verified-badge">
              <CheckCircle2 size={12} color="white" />
            </div>
          </div>
          <div className="profile-meta">
            <div className="profile-name">{pro.name}</div>
            <div className="profile-spec">{pro.specialty}</div>
            <div className="profile-stats">
              <div className="pstat">
                <div className="pstat-val">{pro.rating}</div>
                <div className="pstat-lbl">★ Avaliação</div>
              </div>
              <div className="pstat">
                <div className="pstat-val">{pro.reviews}</div>
                <div className="pstat-lbl">Serviços</div>
              </div>
              <div className="pstat">
                <div className="pstat-val">4h</div>
                <div className="pstat-lbl">Tempo Méd.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-section-title">Sobre o Profissional</div>
        <div className="profile-bio">
          "{pro.bio || "Este profissional ainda não adicionou uma biografia."}"
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-section-title">Serviços e Valores Base</div>
        <div className="services-list">
          <div className="service-item">
            <div className="service-item-name">Visita técnica / Orçamento</div>
            <div className="service-item-price">Grátis*</div>
          </div>
          <div className="service-item">
            <div className="service-item-name">
              Mão de obra especializada
            </div>
            <div className="service-item-price">A partir de R$ {pro.price_min},00</div>
          </div>
        </div>
        <p
          style={{ fontSize: "0.75rem", color: "var(--tx3)", marginTop: "8px" }}
        >
          *Caso o serviço seja fechado na hora.
        </p>
      </div>

      <div className="book-bar">
        <div className="price-info">
          <div className="price-from">Estimativa:</div>
          <div className="price-val">
            R${pro.price_min}<span className="price-unit">/h</span>
          </div>
        </div>
        <button className="btn-book" onClick={() => navigate(`/app/booking/${pro.id}`)}>
          Agendar Agora
        </button>
      </div>
    </div>
  );
}
