import LandingNav from "../components/LandingNav";
import "../styles/landing.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      {/* HERO */}
      <section className="hero">
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
          <Link to="/app/register-provider" className="btn-secondary">
            Sou prestador de serviço →
          </Link>
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
      <section id="depoimentos" className="landing-section testimonials-section">
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
        <div className="testimonials-grid reveal">
          <div className="testimonial-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-text">
              "Achei um encanador excelente em 5 minutos. Ele chegou no horário
              e resolveu o vazamento sem enrolação. Muito prático!"
            </p>
            <div className="test-author">
              <div className="test-avatar">👩</div>
              <div>
                <div className="test-name">Fernanda M.</div>
                <div className="test-loc">Vila Mariana</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-text">
              "Precisava de uma instalação elétrica urgente e foi super fácil
              agendar. O preço já estava claro, sem sustos no final."
            </p>
            <div className="test-author">
              <div className="test-avatar">👨</div>
              <div>
                <div className="test-name">Ricardo S.</div>
                <div className="test-loc">Pinheiros</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-text">
              "Gostei muito da experiência de ver as avaliações do profissional
              antes de fechar. Tive zero dor de cabeça com a limpeza pós-obra."
            </p>
            <div className="test-author">
              <div className="test-avatar">🧑</div>
              <div>
                <div className="test-name">Juliana T.</div>
                <div className="test-loc">Moema</div>
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
