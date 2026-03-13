import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, AlertTriangle } from "lucide-react";
import CategoryPill from "../components/CategoryPill";
import ProCard from "../components/ProCard";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="screen fade-in">
      <div className="top-bar">
        <div className="greeting">Boa tarde,</div>
        <div className="greeting-name">
          João <span>👋</span>
        </div>
        <div className="search-box" onClick={() => navigate("/app/search")}>
          <SearchIcon size={18} />
          <span className="search-placeholder">Que serviço você precisa?</span>
        </div>
      </div>

      <div className="emergency-banner" onClick={() => navigate("/app/search")}>
        <div className="em-icon">
          <AlertTriangle size={28} color="#ff6b6b" />
        </div>
        <div className="em-text">
          <h4>Emergência? Estamos aqui</h4>
          <p>Profissionais disponíveis agora no seu bairro</p>
        </div>
        <div className="em-arrow">›</div>
      </div>

      <div
        className="section-title"
        onClick={() => navigate("/app/search")}
        style={{ cursor: "pointer" }}
      >
        Categorias <span className="see-all">ver todas</span>
      </div>
      <div className="cats-scroll">
        <CategoryPill icon="🔧" label="Encanamento" selected />
        <CategoryPill icon="⚡" label="Elétrica" />
        <CategoryPill icon="🎨" label="Pintura" />
        <CategoryPill icon="🪚" label="Marcenaria" />
        <CategoryPill icon="🧹" label="Limpeza" />
        <CategoryPill icon="🚚" label="Mudança" />
      </div>

      <div className="section-title">
        Próximos a você{" "}
        <span className="see-all" onClick={() => navigate("/app/search")}>
          ver todos
        </span>
      </div>
      <div className="pros-scroll">
        <ProCard
          name="Carlos Silva"
          spec="Encanador"
          price="90"
          rating={4.9}
          reviews={87}
          distance="1.2km"
          icon="🔧"
          bgGradient="linear-gradient(135deg,#1a2a1a,#0d1a0d)"
          isOnline
          orientation="horizontal"
        />
        <ProCard
          name="Marcos Elétrica"
          spec="Eletricista"
          price="120"
          rating={4.8}
          reviews={54}
          distance="0.8km"
          icon="⚡"
          bgGradient="linear-gradient(135deg,#1a1a2a,#0d0d1a)"
          isOnline
          orientation="horizontal"
        />
        <ProCard
          name="Ana Pinturas"
          spec="Pintora"
          price="80"
          rating={5.0}
          reviews={32}
          distance="2.1km"
          icon="🎨"
          bgGradient="linear-gradient(135deg,#2a1a1a,#1a0d0d)"
          orientation="horizontal"
        />
      </div>

      <div className="section-title" style={{ marginTop: "8px" }}>
        Mais bem avaliados
      </div>
      <div style={{ padding: "0 24px 100px" }}>
        <ProCard
          name="Carlos Silva"
          spec="Encanador • Vila Madalena"
          price="90–150"
          rating={4.9}
          reviews={87}
          distance="1.2km"
          icon="🔧"
          bgGradient="linear-gradient(135deg,#1a2a1a,#0d1a0d)"
          isOnline
          orientation="vertical"
        />
        <ProCard
          name="Marcos Elétrica"
          spec="Eletricista • Pinheiros"
          price="120–200"
          rating={4.8}
          reviews={54}
          distance="0.8km"
          icon="⚡"
          bgGradient="linear-gradient(135deg,#1a1a2a,#0d0d1a)"
          isOnline
          orientation="vertical"
        />
      </div>
    </div>
  );
}
