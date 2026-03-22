import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search as SearchIcon, AlertTriangle, Loader2 } from "lucide-react";
import CategoryPill from "../components/CategoryPill";
import ProCard from "../components/ProCard";
import { supabase } from "../lib/supabase";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [pros, setPros] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          setUserProfile(profile);
        }

        const { data: catData, error: catError } = await supabase
          .from("categories")
          .select("*")
          .order("name");
        
        const { data: proData, error: proError } = await supabase
          .from("professionals")
          .select("*")
          .eq("status", "approved")
          .order("rating", { ascending: false });

        if (catError) throw catError;
        if (proError) throw proError;

        setCategories(catData || []);
        setPros(proData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="screen fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader2 className="animate-spin" color="var(--orange)" size={32} />
      </div>
    );
  }

  const firstName = userProfile?.full_name?.split(" ")[0] || userProfile?.username || "Usuário";

  return (
    <div className="screen fade-in">
      <div className="top-bar">
        <div className="greeting">Boa tarde,</div>
        <div className="greeting-name">
          {firstName} <span>👋</span>
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
      >
        Categorias <span className="see-all" onClick={() => navigate("/app/categories")}>ver todas</span>
      </div>
      <div className="cats-scroll">
        {categories.map((cat, idx) => (
          <CategoryPill 
            key={cat.id} 
            icon={cat.icon} 
            label={cat.name} 
            selected={idx === 0} 
          />
        ))}
      </div>

      <div className="section-title">
        Próximos a você{" "}
        <span className="see-all" onClick={() => navigate("/app/search")}>
          ver todos
        </span>
      </div>
      <div className="pros-scroll">
        {pros.slice(0, 3).map((pro) => (
          <ProCard
            key={pro.id}
            id={pro.id}
            name={pro.name}
            spec={pro.specialty}
            price={pro.price_min.toString()}
            rating={pro.rating}
            reviews={pro.reviews}
            distance={pro.distance}
            icon={pro.icon}
            bgGradient={pro.bg_gradient}
            isOnline={pro.is_online}
            orientation="horizontal"
          />
        ))}
      </div>

      <div className="section-title" style={{ marginTop: "8px" }}>
        Mais bem avaliados
      </div>
      <div style={{ padding: "0 24px 100px" }}>
        {pros.map((pro) => (
          <ProCard
            key={pro.id}
            id={pro.id}
            name={pro.name}
            spec={pro.specialty}
            price={`${pro.price_min}–${pro.price_max}`}
            rating={pro.rating}
            reviews={pro.reviews}
            distance={pro.distance}
            icon={pro.icon}
            bgGradient={pro.bg_gradient}
            isOnline={pro.is_online}
            orientation="vertical"
          />
        ))}
      </div>
    </div>
  );
}
