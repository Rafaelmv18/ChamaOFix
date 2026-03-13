import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2, User, Lock, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      navigate("/app");
    } catch (err: any) {
      console.error("Login error:", err);
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen fade-in" style={{ background: "white" }}>
      <div className="profile-header" style={{ background: "transparent" }}>
        <div className="back-header" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <ArrowLeft size={18} /> Sair
        </div>
      </div>

      <div style={{ padding: "40px 32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "8px" }}>Bem-vindo de volta! 👋</h1>
        <p style={{ color: "var(--tx3)", fontSize: "0.9rem", marginBottom: "32px" }}>
          Entre com seu e-mail para continuar.
        </p>

        {error && (
          <div style={{ background: "rgba(220, 38, 38, 0.08)", border: "1px solid rgba(220, 38, 38, 0.2)", borderRadius: "12px", padding: "12px", display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px", color: "#b91c1c", fontSize: "0.85rem" }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "block" }}>E-mail</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "14px 18px" }}>
              <User size={18} color="var(--orange)" />
              <input
                type="email"
                placeholder="seu@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: "0.95rem" }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "32px" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "block" }}>Senha</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "14px 18px" }}>
              <Lock size={18} color="var(--orange)" />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: "0.95rem" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", background: "var(--orange)", color: "white", padding: "16px", borderRadius: "16px", border: "none", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(255, 92, 26, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Entrar"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "0.9rem", color: "var(--tx3)" }}>
          Ainda não tem conta? <Link to="/app/register" style={{ color: "var(--orange)", fontWeight: 700, textDecoration: "none" }}>Criar Agora</Link>
        </p>
      </div>
    </div>
  );
}
