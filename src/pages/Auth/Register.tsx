import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2, User, Lock, AlertCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up user with metadata for the trigger
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username.toLowerCase(),
            full_name: formData.fullName,
          }
        }
      });

      if (authError) throw authError;

      // If session is null, it means email confirmation is ON
      if (authData.user && !authData.session) {
        setError("Conta criada! Por favor, verifique seu e-mail para ativar a conta. (Nota: Se você é o administrador, desative 'Confirm Email' no Supabase para login instantâneo)");
      } else if (authData.user) {
        navigate("/app");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.message?.includes("rate limit")) {
        setError("Muitas tentativas seguidas. Por favor, aguarde alguns minutos antes de tentar novamente.");
      } else {
        setError(err.message || "Erro ao criar conta. Verifique se o e-mail ou nome de usuário já existe.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen fade-in" style={{ background: "white" }}>
      <div className="profile-header" style={{ background: "transparent" }}>
        <div className="back-header" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
          <ArrowLeft size={18} /> Voltar
        </div>
      </div>

      <div style={{ padding: "20px 32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "8px" }}>Criar Conta 🚀</h1>
        <p style={{ color: "var(--tx3)", fontSize: "0.9rem", marginBottom: "32px" }}>
          Cadastre-se rapidamente para começar a agendar serviços.
        </p>

        {error && (
          <div style={{ background: "rgba(220, 38, 38, 0.08)", border: "1px solid rgba(220, 38, 38, 0.2)", borderRadius: "12px", padding: "12px", display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px", color: "#b91c1c", fontSize: "0.85rem" }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "block" }}>Nome de Usuário</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "14px 18px" }}>
              <User size={18} color="var(--orange)" />
              <input
                type="text"
                placeholder="ex: rafael18"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value.replace(/\s+/g, '') })}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: "0.95rem" }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "block" }}>E-mail</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "14px 18px" }}>
              <AlertCircle size={18} color="var(--orange)" />
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

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "block" }}>Nome Completo</label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--dark3)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "14px 18px" }}>
              <User size={18} color="var(--orange)" />
              <input
                type="text"
                placeholder="Seu nome completo"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Criar Minha Conta"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "0.9rem", color: "var(--tx3)" }}>
          Já tem uma conta? <Link to="/app/login" style={{ color: "var(--orange)", fontWeight: 700, textDecoration: "none" }}>Entrar Agora</Link>
        </p>
      </div>
    </div>
  );
}
