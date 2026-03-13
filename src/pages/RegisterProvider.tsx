import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAppMode } from "../context/AppModeContext";

export default function RegisterProvider() {
  const { setMode } = useAppMode();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  const [formData, setFormData] = useState({
    categoryId: "",
    specialty: "",
    bio: "",
    priceMin: "",
    priceMax: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/app/login");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setUserProfile(profile);

        const { data: cats } = await supabase
          .from("categories")
          .select("*")
          .order("name");
        setCategories(cats || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId || !formData.specialty || !formData.priceMin) return;

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      // 1. Create professional record
      const selectedCat = categories.find(c => c.id === formData.categoryId);
      
      const { error: proError } = await supabase
        .from("professionals")
        .insert({
          user_id: user.id,
          name: userProfile?.full_name || user.email?.split("@")[0],
          specialty: formData.specialty,
          bio: formData.bio,
          price_min: parseInt(formData.priceMin),
          price_max: parseInt(formData.priceMax) || parseInt(formData.priceMin) * 2,
          category_id: formData.categoryId,
          icon: selectedCat?.icon || "🔧",
          bg_gradient: "linear-gradient(135deg, #1a2a1a, #0d1a0d)",
          rating: 0,
          reviews: 0,
          distance: "0.1 km",
          is_online: true
        });

      if (proError) throw proError;

      // 2. Update user profile type
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ user_type: "provider" })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // 3. Success!
      setMode("provider");
      alert("Parabéns! Agora você é um prestador ChamaOFix.");
      navigate("/app");
    } catch (error: any) {
      console.error("Error registering provider:", error);
      alert(error.message || "Erro ao cadastrar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
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
        <div className="back-header" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          <ArrowLeft size={18} /> Voltar
        </div>
        <div className="booking-title" style={{ marginTop: "12px", fontSize: "1.6rem" }}>Seja um Prestador</div>
        <div className="booking-sub">
          Preencha seus dados profissionais para começar a atender.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="section-content" style={{ padding: "16px 24px 100px" }}>
        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label className="form-label">Categoria Principal</label>
          <select 
            required
            className="form-input"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "var(--dark)", border: "1px solid var(--card-border)", color: "var(--text)", outline: "none" }}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label className="form-label">Especialidade (Ex: Eletricista Residencial)</label>
          <input 
            required
            type="text" 
            className="form-input"
            placeholder="Sua principal especialidade"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "var(--dark)", border: "1px solid var(--card-border)", color: "var(--text)", outline: "none" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "20px" }}>
          <label className="form-label">Bio / Descrição do seu trabalho</label>
          <textarea 
            className="form-textarea"
            placeholder="Conte um pouco sobre sua experiência e serviços..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "var(--dark)", border: "1px solid var(--card-border)", color: "var(--text)", outline: "none", minHeight: "100px", resize: "none" }}
          ></textarea>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
          <div className="form-group">
            <label className="form-label">Preço Min (R$)</label>
            <input 
              required
              type="number" 
              className="form-input"
              placeholder="Ex: 80"
              value={formData.priceMin}
              onChange={(e) => setFormData({ ...formData, priceMin: e.target.value })}
              style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "var(--dark)", border: "1px solid var(--card-border)", color: "var(--text)", outline: "none" }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Preço Max (R$)</label>
            <input 
              type="number" 
              className="form-input"
              placeholder="Ex: 200"
              value={formData.priceMax}
              onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })}
              style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "var(--dark)", border: "1px solid var(--card-border)", color: "var(--text)", outline: "none" }}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={submitting}
          style={{ 
            width: "100%", 
            background: "var(--orange)", 
            color: "#fff", 
            border: "none", 
            padding: "18px", 
            borderRadius: "16px", 
            fontSize: "1rem", 
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "0 4px 24px rgba(255,92,26,0.4)",
            cursor: submitting ? "not-allowed" : "pointer"
          }}
        >
          {submitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
          {submitting ? "Processando..." : "Finalizar Cadastro"}
        </button>
      </form>
    </div>
  );
}
