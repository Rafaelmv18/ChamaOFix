import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="screen fade-in">
      <div className="profile-header">
        <div className="back-header" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Voltar
        </div>
        <div className="profile-top">
          <div
            className="profile-avatar"
            style={{ background: "linear-gradient(135deg,#1a2a1a,#0d1a0d)" }}
          >
            🔧
            <div className="verified-badge">
              <CheckCircle2 size={12} color="white" />
            </div>
          </div>
          <div className="profile-meta">
            <div className="profile-name">Carlos Silva</div>
            <div className="profile-spec">Encanador Profissional</div>
            <div className="profile-stats">
              <div className="pstat">
                <div className="pstat-val">4.9</div>
                <div className="pstat-lbl">★ Avaliação</div>
              </div>
              <div className="pstat">
                <div className="pstat-val">87</div>
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
          "Trabalho com hidráulica há 12 anos, especializado em detecção de
          vazamentos ocultos e instalação de aquecedores. Serviço limpo e
          pontual."
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-section-title">Serviços e Valores Basis</div>
        <div className="services-list">
          <div className="service-item">
            <div className="service-item-name">Visita técnica / Orçamento</div>
            <div className="service-item-price">Grátis*</div>
          </div>
          <div className="service-item">
            <div className="service-item-name">
              Troca de reparos (torneira/descarga)
            </div>
            <div className="service-item-price">R$ 90,00</div>
          </div>
          <div className="service-item">
            <div className="service-item-name">Desentupimento simples</div>
            <div className="service-item-price">R$ 150,00</div>
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
            R$90<span className="price-unit">/h</span>
          </div>
        </div>
        <button className="btn-book" onClick={() => navigate("/app/booking")}>
          Agendar Agora
        </button>
      </div>
    </div>
  );
}
