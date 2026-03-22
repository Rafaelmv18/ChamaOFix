import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, CheckCircle, XCircle, ShieldCheck, Users, UserCheck, Plus, Grid, UserX } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function MobileAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filter, setFilter] = useState("pending"); // pending, approved, categories
  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("");
  const [creatingCat, setCreatingCat] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/app/login");
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .single();

        if (!profile?.is_admin) {
          navigate("/app");
          return;
        }

        const { data: proData, error: proError } = await supabase
          .from("professionals")
          .select("*, profile:profiles(full_name, email, cpf)")
          .order("created_at", { ascending: false });

        if (proError) throw proError;
        setProfessionals(proData || []);

        const { data: catData, error: catError } = await supabase
          .from("categories")
          .select("*")
          .order("name");
          
        if (catError) throw catError;
        setCategories(catData || []);

      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  const handleStatusChange = async (id: string, userId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("professionals")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      
      if (status === "rejected" && userId) {
        await supabase
          .from("profiles")
          .update({ user_type: "client" })
          .eq("id", userId);
      }
      setProfessionals(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Erro ao atualizar status");
    }
  };

  const handleRemoveProfessional = async (proId: string, userId: string) => {
    if (!window.confirm("Certeza que deseja remover este profissional? Ele voltará a ser apenas um cliente.")) return;
    
    try {
      const { error: delError } = await supabase
        .from("professionals")
        .delete()
        .eq("id", proId);

      if (delError) throw delError;

      if (userId) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ user_type: "client" })
          .eq("id", userId);
          
        if (profileError) console.error("Could not revert user_type:", profileError);
      }

      setProfessionals(prev => prev.filter(p => p.id !== proId));
    } catch (error) {
      console.error("Error removing professional:", error);
      alert("Erro ao remover profissional");
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatIcon) return;
    setCreatingCat(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: newCatName, icon: newCatIcon }])
        .select();

      if (error) throw error;
      if (data) setCategories([...categories, data[0]]);
      setNewCatName("");
      setNewCatIcon("");
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Erro ao criar categoria");
    } finally {
      setCreatingCat(false);
    }
  };

  const filteredProfessionals = professionals.filter(p => p.status === filter);

  return (
    <div className="screen fade-in" style={{ background: "var(--background)", overflowY: "auto" }}>
      <div className="profile-header" style={{ paddingBottom: "24px", background: "var(--dark2)" }}>
        <div className="back-header" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          <ArrowLeft size={18} /> Voltar
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "20px" }}>
          <ShieldCheck size={32} color="#3b82f6" />
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--text)" }}>Admin Dashboard</div>
            <div style={{ fontSize: "0.85rem", color: "var(--tx2)", marginTop: "2px" }}>Gerenciador Mobile</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", overflowX: "auto", gap: "8px", padding: "16px 20px", borderBottom: "1px solid var(--card-border)", background: "var(--dark3)" }} className="hide-scroll">
        <button 
          onClick={() => setFilter("pending")}
          style={{ whiteSpace: "nowrap", padding: "8px 16px", borderRadius: "100px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s", background: filter === "pending" ? "var(--orange-glow)" : "var(--dark2)", color: filter === "pending" ? "var(--orange)" : "var(--tx2)" }}
        >
          <Users size={14} /> Pendentes
        </button>
        <button 
          onClick={() => setFilter("approved")}
          style={{ whiteSpace: "nowrap", padding: "8px 16px", borderRadius: "100px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s", background: filter === "approved" ? "rgba(16, 185, 129, 0.15)" : "var(--dark2)", color: filter === "approved" ? "var(--green)" : "var(--tx2)" }}
        >
          <UserCheck size={14} /> Aprovados
        </button>
        <button 
          onClick={() => setFilter("categories")}
          style={{ whiteSpace: "nowrap", padding: "8px 16px", borderRadius: "100px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s", background: filter === "categories" ? "rgba(59, 130, 246, 0.15)" : "var(--dark2)", color: filter === "categories" ? "#3b82f6" : "var(--tx2)" }}
        >
          <Grid size={14} /> Categorias
        </button>
      </div>

      <div style={{ padding: "24px 20px 100px" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <Loader2 className="animate-spin" color="#3b82f6" size={32} />
          </div>
        ) : filter === "categories" ? (
          <div>
            <div style={{ background: "var(--dark3)", borderRadius: "16px", border: "1px solid var(--card-border)", padding: "20px", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "16px" }}>Nova Categoria</h3>
              <form onSubmit={handleCreateCategory} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} required placeholder="Ex: Professor particular" style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid var(--card-border)", background: "var(--dark)", color: "var(--text)", outline: "none", fontSize: "0.95rem" }} />
                </div>
                <div>
                  <input type="text" value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} required placeholder="Ex: 📚" style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid var(--card-border)", background: "var(--dark)", color: "var(--text)", outline: "none", fontSize: "0.95rem" }} />
                </div>
                <button type="submit" disabled={creatingCat} style={{ width: "100%", background: "#3b82f6", color: "#fff", border: "none", padding: "14px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  {creatingCat ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Adicionar
                </button>
              </form>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ background: "var(--dark3)", borderRadius: "12px", border: "1px solid var(--card-border)", padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{ fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {cat.icon}
                  </div>
                  <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.85rem", textAlign: "center" }}>{cat.name}</div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredProfessionals.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--tx3)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px", opacity: 0.5 }}>{filter === "pending" ? "⏱️" : "✅"}</div>
            <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
              Nenhum profissional {filter === "pending" ? "pendente" : "aprovado"} encontrado.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filteredProfessionals.map(pro => (
              <div key={pro.id} style={{ background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "16px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: pro.bg_gradient || "var(--dark)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                    {pro.icon || "👨‍🔧"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>{pro.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--tx2)" }}>{pro.specialty}</div>
                  </div>
                </div>
                
                <div style={{ background: "var(--dark2)", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "0.85rem", color: "var(--tx2)", display: "flex", flexDirection: "column", gap: "6px", border: "1px solid var(--card-border)" }}>
                  <div><strong style={{ color: "var(--tx3)" }}>Email:</strong> {pro.profile?.email}</div>
                  <div><strong style={{ color: "var(--tx3)" }}>CPF:</strong> {pro.profile?.cpf || "Não informado"}</div>
                  <div style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}><strong style={{ color: "var(--tx3)" }}>Bio:</strong> {pro.bio}</div>
                </div>

                {filter === "pending" ? (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleStatusChange(pro.id, pro.user_id, "rejected")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.3)", background: "transparent", color: "var(--red)", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer" }}>
                      <XCircle size={18} /> Recusar
                    </button>
                    <button onClick={() => handleStatusChange(pro.id, pro.user_id, "approved")} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "var(--green)", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)", cursor: "pointer" }}>
                      <CheckCircle size={18} /> Aprovar
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                     <span style={{ fontSize: "0.85rem", color: "var(--green)", fontWeight: 700, padding: "6px 12px", background: "rgba(16,185,129,0.1)", borderRadius: "100px" }}>Ativo na Plataforma</span>
                     <button onClick={() => handleRemoveProfessional(pro.id, pro.user_id)} style={{ padding: "8px 16px", borderRadius: "100px", border: "1px solid rgba(239, 68, 68, 0.3)", background: "transparent", color: "var(--red)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "0.85rem" }}>
                       <UserX size={14} /> Remover
                     </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
