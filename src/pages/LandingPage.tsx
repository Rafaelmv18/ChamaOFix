import LandingNav from "../components/LandingNav";
import "../styles/landing.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      {/* HERO */}
      <section
        className="hero"
        style={{ paddingTop: "140px", maxWidth: "100%" }}
      >
        <div className="hero-bg-glow"></div>
        <div className="hero-badge">Marketplace hiperlocal de serviços</div>
        <h1>
          O profissional <em>certo</em>,<br />
          no seu bairro, agora.
        </h1>
        <p className="hero-sub">
          Encanador, eletricista, pintor e muito mais. Com avaliações reais,
          preço transparente e agendamento direto — sem precisar ligar pra
          ninguém.
        </p>
        <div className="hero-actions">
          <Link to="/app" className="btn-primary">
            🔍 Encontrar profissional
          </Link>
          <a href="#prestadores" className="btn-secondary">
            Sou prestador de serviço →
          </a>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar reveal">
        <div className="stat">
          <div className="stat-num">12k+</div>
          <div className="stat-label">Profissionais cadastrados</div>
        </div>
        <div className="stat">
          <div className="stat-num">47k+</div>
          <div className="stat-label">Serviços realizados</div>
        </div>
        <div className="stat">
          <div className="stat-num">4.9★</div>
          <div className="stat-label">Avaliação média</div>
        </div>
        <div className="stat">
          <div className="stat-num">320+</div>
          <div className="stat-label">Bairros atendidos</div>
        </div>
      </div>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="landing-section">
        <div className="reveal">
          <div className="section-label">Como funciona</div>
          <h2>Simples como deve ser</h2>
          <p className="section-desc">
            Em menos de 2 minutos você encontra, escolhe e agenda um
            profissional de confiança.
          </p>
        </div>
        <div className="steps reveal">
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-icon">🔍</div>
            <h3>Descreva o que precisa</h3>
            <p>
              Diga qual serviço você precisa e em qual bairro. Nossa busca
              encontra os profissionais mais próximos e bem avaliados.
            </p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-icon">⭐</div>
            <h3>Escolha com confiança</h3>
            <p>
              Veja avaliações reais de clientes, faixa de preço e
              disponibilidade de cada profissional antes de decidir.
            </p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-icon">📅</div>
            <h3>Agende sem ligar</h3>
            <p>
              Escolha o horário, descreva o problema e confirme. O profissional
              chega no horário combinado. Simples assim.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section
        id="servicos"
        className="landing-section"
        style={{ paddingTop: "0" }}
      >
        <div className="reveal">
          <div className="section-label">Categorias</div>
          <h2>
            Qualquer serviço, <span>um lugar só</span>
          </h2>
          <p className="section-desc">
            De emergências a reformas, temos o profissional certo para cada
            necessidade.
          </p>
        </div>
        <div className="categories-grid reveal">
          <a href="#" className="cat-card">
            <div className="cat-icon">🔧</div>
            <div>
              <div className="cat-name">Encanamento</div>
              <div className="cat-desc">
                Vazamentos, entupimentos, instalações
              </div>
            </div>
          </a>
          <a href="#" className="cat-card">
            <div className="cat-icon">⚡</div>
            <div>
              <div className="cat-name">Elétrica</div>
              <div className="cat-desc">Instalações, reparos, quadros</div>
            </div>
          </a>
          <a href="#" className="cat-card">
            <div className="cat-icon">🎨</div>
            <div>
              <div className="cat-name">Pintura</div>
              <div className="cat-desc">Paredes, fachadas, acabamentos</div>
            </div>
          </a>
          <a href="#" className="cat-card">
            <div className="cat-icon">🪚</div>
            <div>
              <div className="cat-name">Marcenaria</div>
              <div className="cat-desc">Móveis, portas, montagem</div>
            </div>
          </a>
          <a href="#" className="cat-card">
            <div className="cat-icon">🧹</div>
            <div>
              <div className="cat-name">Limpeza</div>
              <div className="cat-desc">Fachadas, pós-obra, diárias</div>
            </div>
          </a>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section
        id="depoimentos"
        className="landing-section"
        style={{ background: "var(--dark2)", marginTop: "40px" }}
      >
        <div className="reveal">
          <div className="section-label">Depoimentos</div>
          <h2>
            O que nossos clientes <span>dizem</span>
          </h2>
          <p className="section-desc">
            Pessoas reais encontrando soluções rápidas e eficientes no seu
            bairro.
          </p>
        </div>
        <div
          className="testimonials-grid reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "40px",
            padding: "0 20px",
          }}
        >
          <div
            className="testimonial-card"
            style={{
              background: "var(--dark3)",
              border: "1px solid var(--card-border)",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <div
              className="test-stars"
              style={{ color: "var(--orange)", marginBottom: "12px" }}
            >
              ★★★★★
            </div>
            <p
              className="test-text"
              style={{
                fontSize: "0.95rem",
                color: "var(--text)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              "Achei um encanador excelente em 5 minutos. Ele chegou no horário
              e resolveu o vazamento sem enrolação. Muito prático!"
            </p>
            <div
              className="test-author"
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div
                className="test-avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1a2a1a, #0d1a0d)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                👩
              </div>
              <div>
                <div
                  className="test-name"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  Fernanda M.
                </div>
                <div
                  className="test-loc"
                  style={{ fontSize: "0.75rem", color: "var(--tx3)" }}
                >
                  Vila Mariana
                </div>
              </div>
            </div>
          </div>

          <div
            className="testimonial-card"
            style={{
              background: "var(--dark3)",
              border: "1px solid var(--card-border)",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <div
              className="test-stars"
              style={{ color: "var(--orange)", marginBottom: "12px" }}
            >
              ★★★★★
            </div>
            <p
              className="test-text"
              style={{
                fontSize: "0.95rem",
                color: "var(--text)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              "Precisava de uma instalação elétrica urgente e foi super fácil
              agendar. O preço já estava claro, sem sustos no final."
            </p>
            <div
              className="test-author"
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div
                className="test-avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1a1a2a, #0d0d1a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                👨
              </div>
              <div>
                <div
                  className="test-name"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  Ricardo S.
                </div>
                <div
                  className="test-loc"
                  style={{ fontSize: "0.75rem", color: "var(--tx3)" }}
                >
                  Pinheiros
                </div>
              </div>
            </div>
          </div>

          <div
            className="testimonial-card"
            style={{
              background: "var(--dark3)",
              border: "1px solid var(--card-border)",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <div
              className="test-stars"
              style={{ color: "var(--orange)", marginBottom: "12px" }}
            >
              ★★★★★
            </div>
            <p
              className="test-text"
              style={{
                fontSize: "0.95rem",
                color: "var(--text)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              "Gostei muito da experiência de ver as avaliações do profissional
              antes de fechar. Tive zero dor de cabeça com a limpeza pós-obra."
            </p>
            <div
              className="test-author"
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div
                className="test-avatar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2a1a1a, #1a0d0d)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                🧑
              </div>
              <div>
                <div
                  className="test-name"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  Juliana T.
                </div>
                <div
                  className="test-loc"
                  style={{ fontSize: "0.75rem", color: "var(--tx3)" }}
                >
                  Moema
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-logo">
          Chama<span>OFix</span>
        </div>
        <ul className="footer-links">
          <li>
            <a href="#">Termos de Uso</a>
          </li>
          <li>
            <a href="#">Privacidade</a>
          </li>
          <li>
            <a href="#">Contato</a>
          </li>
        </ul>
        <div className="footer-copy">
          © 2026 ChamaOFix. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
