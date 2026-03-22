import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "Todos";

  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [categories, setCategories] = useState<any[]>([]);
  const [pros, setPros] = useState<any[]>([]);
  const [filteredPros, setFilteredPros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    "Todos",
    "Online agora",
    "Melhor avaliados",
    "Menor preço",
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, proRes] = await Promise.all([
          supabase.from("categories").select("*").order("name"),
          supabase.from("professionals").select("*, categories(name)").eq("status", "approved")
        ]);
        
        if (catRes.error) throw catRes.error;
        if (proRes.error) throw proRes.error;

        setCategories(catRes.data || []);
        setPros(proRes.data || []);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let result = pros.filter(pro => 
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter by Category
    if (selectedCat !== "Todos") {
      result = result.filter(pro => pro.categories?.name === selectedCat);
    }

    // Sort/Filter by Quick Filters
    if (activeFilter === "Online agora") {
      result = result.filter(pro => pro.is_online);
    } else if (activeFilter === "Melhor avaliados") {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (activeFilter === "Menor preço") {
      result = result.sort((a, b) => a.price_min - b.price_min);
    }

    setFilteredPros(result);
  }, [searchQuery, activeFilter, selectedCat, pros]);

  const handleCatChange = (catName: string) => {
    setSelectedCat(catName);
    setSearchParams(catName === "Todos" ? {} : { cat: catName });
  };

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

      {/* Category Filter Scroll */}
      <div className="filter-row" style={{ borderBottom: "1px solid var(--card-border)" }}>
        <div
          className={`filter-chip ${selectedCat === "Todos" ? "active" : ""}`}
          onClick={() => handleCatChange("Todos")}
        >
          🍛 Todos
        </div>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`filter-chip ${selectedCat === cat.name ? "active" : ""}`}
            onClick={() => handleCatChange(cat.name)}
          >
            {cat.icon} {cat.name}
          </div>
        ))}
      </div>

      {/* Logic Filter Scroll */}
      <div className="filter-row" style={{ paddingTop: "8px" }}>
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
        <div className="result-count">
          {loading ? "Buscando profissionais..." : `Encontramos ${filteredPros.length} profissionais`}
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <Loader2 className="animate-spin" color="var(--orange)" />
          </div>
        ) : (
          filteredPros.map((pro) => (
            <div 
              key={pro.id} 
              className="pro-card-v" 
              onClick={() => navigate(`/app/profile/${pro.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="pro-avatar"
                style={{ background: pro.bg_gradient }}
              >
                {pro.icon}
                {pro.is_online && <div className="online-dot"></div>}
              </div>
              <div className="pro-info">
                <div className="pro-info-top">
                  <div className="pro-info-name">{pro.name}</div>
                  <div className="pro-info-price">
                    <strong>R${pro.price_min}–{pro.price_max}</strong>/h
                  </div>
                </div>
                <div className="pro-info-spec">{pro.specialty}</div>
                <div className="pro-info-meta">
                  <span className={`tag ${pro.is_online ? "green" : ""}`}>
                    ● {pro.is_online ? "Online" : "Ocupado"}
                  </span>
                  <span className="tag">★ {pro.rating} ({pro.reviews})</span>
                  <span className="tag">{pro.distance}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {!loading && filteredPros.length === 0 && (
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
            <p>Nenhum profissional encontrado de {selectedCat !== "Todos" ? selectedCat : "nesta categoria"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
