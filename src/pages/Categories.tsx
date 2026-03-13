import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("name");
        
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryClick = (catName: string) => {
    navigate(`/app/search?cat=${encodeURIComponent(catName)}`);
  };

  if (loading) {
    return (
      <div className="screen fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" color="var(--orange)" size={32} />
      </div>
    );
  }

  return (
    <div className="screen fade-in">
      <div className="profile-header" style={{ paddingBottom: "20px" }}>
        <div className="back-header" onClick={() => navigate("/app")} style={{ cursor: "pointer" }}>
          <ArrowLeft size={18} /> Voltar para Home
        </div>
        <div className="booking-title" style={{ marginTop: "12px", fontSize: "1.6rem" }}>Todas Categorias</div>
        <div className="booking-sub">
          Explore todos os serviços disponíveis no ChamaOFix.
        </div>
      </div>

      <div className="section-content" style={{ padding: "12px 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="category-card-interactive"
              style={{
                background: "var(--dark)",
                border: "1px solid var(--card-border)",
                borderRadius: "20px",
                padding: "24px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Subtle background glow */}
              <div style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "60px",
                  height: "60px",
                  background: "var(--orange)",
                  filter: "blur(40px)",
                  opacity: 0.1,
                  borderRadius: "50%"
              }}></div>

              <div style={{ 
                fontSize: "2.4rem", 
                marginBottom: "12px",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" 
              }}>
                {cat.icon}
              </div>
              
              <div style={{ 
                fontWeight: 700, 
                fontSize: "0.95rem", 
                color: "var(--text)",
                marginBottom: "4px"
              }}>
                {cat.name}
              </div>

              <div style={{
                fontSize: "0.7rem",
                color: "var(--tx3)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "2px"
              }}>
                Ver profissionais <ChevronRight size={10} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
