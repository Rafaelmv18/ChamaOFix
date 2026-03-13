import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, ArrowLeft } from "lucide-react";

export default function Search() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const filters = [
    "Todos",
    "Online agora",
    "Melhor avaliados",
    "Menor preço",
    "Mais próximos",
  ];

  return (
    <div className="screen fade-in">
      <div className="search-header">
        <button className="back-btn" onClick={() => navigate("/app")}>
          <ArrowLeft size={16} /> Voltar
        </button>
        <div className="search-input-wrap">
          <SearchIcon size={18} color="var(--orange)" />
          <input
            type="text"
            placeholder="Qual serviço você precisa?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-row">
        {filters.map((f) => (
          <div
            key={f}
            className={`filter-chip ${activeFilter === f ? "active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </div>
        ))}
      </div>

      <div className="results-list">
        <div className="result-count">Encontre os melhores profissionais</div>

        {("carlos silva encanador".includes(searchQuery.toLowerCase()) ||
          searchQuery === "") && (
          <div className="pro-card-v" onClick={() => navigate("/app/profile")}>
            <div
              className="pro-avatar"
              style={{ background: "linear-gradient(135deg,#1a2a1a,#0d1a0d)" }}
            >
              🔧<div className="online-dot"></div>
            </div>
            <div className="pro-info">
              <div className="pro-info-top">
                <div className="pro-info-name">Carlos Silva</div>
                <div className="pro-info-price">
                  <strong>R$90–150</strong>/h
                </div>
              </div>
              <div className="pro-info-spec">Encanador há 12 anos</div>
              <div className="pro-info-meta">
                <span className="tag green">● Online</span>
                <span className="tag">★ 4.9 (87)</span>
                <span className="tag">1.2km</span>
              </div>
            </div>
          </div>
        )}

        {("roberto santos encanador hidráulica".includes(
          searchQuery.toLowerCase(),
        ) ||
          searchQuery === "") && (
          <div className="pro-card-v" onClick={() => navigate("/app/profile")}>
            <div
              className="pro-avatar"
              style={{ background: "linear-gradient(135deg,#2a1a0a,#1a0d00)" }}
            >
              🔧
            </div>
            <div className="pro-info">
              <div className="pro-info-top">
                <div className="pro-info-name">Roberto Santos</div>
                <div className="pro-info-price">
                  <strong>R$80–120</strong>/h
                </div>
              </div>
              <div className="pro-info-spec">Encanador • Hidráulica geral</div>
              <div className="pro-info-meta">
                <span className="tag">● Ocupado</span>
                <span className="tag">★ 4.7 (43)</span>
                <span className="tag">2.0km</span>
              </div>
            </div>
          </div>
        )}

        {("pedro encanador aquecedor".includes(searchQuery.toLowerCase()) ||
          searchQuery === "") && (
          <div className="pro-card-v" onClick={() => navigate("/app/profile")}>
            <div
              className="pro-avatar"
              style={{ background: "linear-gradient(135deg,#1a1a2a,#0d0d1a)" }}
            >
              🔧<div className="online-dot"></div>
            </div>
            <div className="pro-info">
              <div className="pro-info-top">
                <div className="pro-info-name">Pedro Hidráulica</div>
                <div className="pro-info-price">
                  <strong>R$100–160</strong>/h
                </div>
              </div>
              <div className="pro-info-spec">
                Encanador • Especialista aquecedor
              </div>
              <div className="pro-info-meta">
                <span className="tag green">● Online</span>
                <span className="tag">★ 4.8 (61)</span>
                <span className="tag">3.5km</span>
              </div>
            </div>
          </div>
        )}

        {("marcos eletricista".includes(searchQuery.toLowerCase()) ||
          searchQuery === "eletricista") && (
          <div className="pro-card-v" onClick={() => navigate("/app/profile")}>
            <div
              className="pro-avatar"
              style={{ background: "linear-gradient(135deg,#1a1a2a,#0d0d1a)" }}
            >
              ⚡<div className="online-dot"></div>
            </div>
            <div className="pro-info">
              <div className="pro-info-top">
                <div className="pro-info-name">Marcos Elétrica</div>
                <div className="pro-info-price">
                  <strong>R$120–200</strong>/h
                </div>
              </div>
              <div className="pro-info-spec">Eletricista • Pinheiros</div>
              <div className="pro-info-meta">
                <span className="tag green">● Online</span>
                <span className="tag">★ 4.8 (54)</span>
                <span className="tag">0.8km</span>
              </div>
            </div>
          </div>
        )}

        {searchQuery !== "" &&
          !"carlos silva encanador roberto santos pedro aquecedor marcos eletricista".includes(
            searchQuery.toLowerCase(),
          ) && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "var(--tx3)",
              }}
            >
              <SearchIcon
                size={40}
                style={{ margin: "0 auto 16px", opacity: 0.2 }}
              />
              <p>Nenhum profissional encontrado para "{searchQuery}"</p>
            </div>
          )}
      </div>
    </div>
  );
}
