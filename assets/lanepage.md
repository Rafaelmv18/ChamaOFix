<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ChamaOFix — O profissional certo, no seu bairro, agora.</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --orange: #FF5C1A;
      --orange-light: #FF7A3D;
      --orange-glow: rgba(255, 92, 26, 0.25);
      --dark: #0E0E0E;
      --dark2: #161616;
      --dark3: #1F1F1F;
      --dark4: #2A2A2A;
      --text: #F0EDE8;
      --muted: #888;
      --card-bg: rgba(255,255,255,0.04);
      --card-border: rgba(255,255,255,0.08);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--dark);
      color: var(--text);
      overflow-x: hidden;
    }

    /* NOISE OVERLAY */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.5;
    }

    /* NAV */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 60px;
      background: rgba(14,14,14,0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--card-border);
    }

    .logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.5rem;
      letter-spacing: -0.03em;
    }

    .logo span { color: var(--orange); }

    .nav-links {
      display: flex;
      gap: 36px;
      list-style: none;
    }

    .nav-links a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.2s;
    }

    .nav-links a:hover { color: var(--text); }

    .nav-cta {
      background: var(--orange);
      color: white !important;
      padding: 10px 22px;
      border-radius: 100px;
      font-weight: 600 !important;
      transition: background 0.2s, transform 0.2s !important;
    }

    .nav-cta:hover {
      background: var(--orange-light) !important;
      transform: translateY(-1px);
      color: white !important;
    }

    /* HERO */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 120px 40px 80px;
      position: relative;
      overflow: hidden;
    }

    .hero-bg-glow {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, rgba(255,92,26,0.15) 0%, transparent 70%);
      pointer-events: none;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,92,26,0.12);
      border: 1px solid rgba(255,92,26,0.3);
      color: var(--orange-light);
      padding: 8px 18px;
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 32px;
      animation: fadeUp 0.8s ease both;
    }

    .hero-badge::before {
      content: '';
      width: 6px; height: 6px;
      background: var(--orange);
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.4); }
    }

    h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(3rem, 7vw, 6.5rem);
      font-weight: 800;
      line-height: 1.0;
      letter-spacing: -0.04em;
      max-width: 900px;
      animation: fadeUp 0.8s 0.1s ease both;
    }

    h1 em {
      font-style: normal;
      color: var(--orange);
      position: relative;
    }

    .hero-sub {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--muted);
      max-width: 520px;
      line-height: 1.7;
      margin-top: 24px;
      font-weight: 300;
      animation: fadeUp 0.8s 0.2s ease both;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      margin-top: 40px;
      flex-wrap: wrap;
      justify-content: center;
      animation: fadeUp 0.8s 0.3s ease both;
    }

    .btn-primary {
      background: var(--orange);
      color: white;
      padding: 16px 36px;
      border-radius: 100px;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.25s;
      box-shadow: 0 0 40px rgba(255,92,26,0.3);
    }

    .btn-primary:hover {
      background: var(--orange-light);
      transform: translateY(-2px);
      box-shadow: 0 0 60px rgba(255,92,26,0.5);
    }

    .btn-secondary {
      background: var(--card-bg);
      color: var(--text);
      padding: 16px 36px;
      border-radius: 100px;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      border: 1px solid var(--card-border);
      transition: all 0.25s;
    }

    .btn-secondary:hover {
      border-color: rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.07);
      transform: translateY(-2px);
    }

    /* STATS BAR */
    .stats-bar {
      display: flex;
      justify-content: center;
      gap: 60px;
      padding: 40px 60px;
      border-top: 1px solid var(--card-border);
      border-bottom: 1px solid var(--card-border);
      flex-wrap: wrap;
      animation: fadeUp 0.8s 0.4s ease both;
    }

    .stat {
      text-align: center;
    }

    .stat-num {
      font-family: 'Syne', sans-serif;
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--orange);
      letter-spacing: -0.03em;
    }

    .stat-label {
      font-size: 0.8rem;
      color: var(--muted);
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* SECTIONS */
    section {
      padding: 100px 60px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--orange);
      margin-bottom: 16px;
    }

    h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.1;
      max-width: 600px;
    }

    h2 span { color: var(--orange); }

    .section-desc {
      color: var(--muted);
      font-size: 1.05rem;
      line-height: 1.7;
      max-width: 480px;
      margin-top: 16px;
      font-weight: 300;
    }

    /* HOW IT WORKS */
    .steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
      margin-top: 60px;
      background: var(--card-border);
      border-radius: 24px;
      overflow: hidden;
    }

    .step {
      background: var(--dark2);
      padding: 48px 40px;
      position: relative;
      transition: background 0.3s;
    }

    .step:hover { background: var(--dark3); }

    .step-num {
      font-family: 'Syne', sans-serif;
      font-size: 4rem;
      font-weight: 800;
      color: rgba(255,92,26,0.15);
      line-height: 1;
      margin-bottom: 24px;
    }

    .step-icon {
      font-size: 2rem;
      margin-bottom: 16px;
    }

    .step h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .step p {
      color: var(--muted);
      font-size: 0.9rem;
      line-height: 1.6;
      font-weight: 300;
    }

    /* CATEGORIES */
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 60px;
    }

    .cat-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 32px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: all 0.3s;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }

    .cat-card:hover {
      border-color: var(--orange);
      background: rgba(255,92,26,0.06);
      transform: translateY(-4px);
    }

    .cat-icon {
      width: 56px; height: 56px;
      background: rgba(255,92,26,0.12);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      flex-shrink: 0;
      transition: background 0.3s;
    }

    .cat-card:hover .cat-icon {
      background: rgba(255,92,26,0.25);
    }

    .cat-name {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1rem;
    }

    .cat-desc {
      color: var(--muted);
      font-size: 0.8rem;
      margin-top: 4px;
    }

    /* DIFERENCIAIS */
    .diff-section {
      background: var(--dark2);
      border-radius: 32px;
      padding: 80px 80px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto 0;
    }

    .diff-list {
      list-style: none;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .diff-item {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .diff-dot {
      width: 8px; height: 8px;
      background: var(--orange);
      border-radius: 50%;
      margin-top: 7px;
      flex-shrink: 0;
    }

    .diff-item h4 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 4px;
    }

    .diff-item p {
      color: var(--muted);
      font-size: 0.875rem;
      line-height: 1.6;
      font-weight: 300;
    }

    .diff-visual {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .diff-card {
      background: var(--dark3);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 28px 24px;
      transition: all 0.3s;
    }

    .diff-card:hover {
      border-color: rgba(255,92,26,0.4);
      transform: translateY(-3px);
    }

    .diff-card-icon {
      font-size: 1.8rem;
      margin-bottom: 12px;
    }

    .diff-card h4 {
      font-family: 'Syne', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .diff-card p {
      color: var(--muted);
      font-size: 0.78rem;
      line-height: 1.5;
    }

    /* TESTIMONIALS */
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 60px;
    }

    .testi-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 32px;
      transition: all 0.3s;
    }

    .testi-card:hover {
      border-color: rgba(255,92,26,0.3);
      transform: translateY(-4px);
    }

    .stars {
      color: var(--orange);
      font-size: 1rem;
      margin-bottom: 16px;
      letter-spacing: 2px;
    }

    .testi-text {
      color: var(--text);
      font-size: 0.9rem;
      line-height: 1.7;
      font-style: italic;
      font-weight: 300;
      margin-bottom: 24px;
    }

    .testi-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .testi-avatar {
      width: 42px; height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1rem;
      color: white;
    }

    .testi-name {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.9rem;
    }

    .testi-role {
      color: var(--muted);
      font-size: 0.75rem;
    }

    /* CTA PRESTADOR */
    .cta-prestador {
      background: linear-gradient(135deg, #1a0a00 0%, #2d1200 50%, #1a0a00 100%);
      border: 1px solid rgba(255,92,26,0.3);
      border-radius: 32px;
      padding: 80px;
      text-align: center;
      position: relative;
      overflow: hidden;
      max-width: 1200px;
      margin: 0 auto;
    }

    .cta-prestador::before {
      content: '';
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 400px;
      background: radial-gradient(circle, rgba(255,92,26,0.2) 0%, transparent 70%);
      pointer-events: none;
    }

    .cta-prestador h2 {
      max-width: 100%;
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0 auto;
      text-align: center;
    }

    .cta-prestador .section-desc {
      max-width: 500px;
      margin: 16px auto 0;
      text-align: center;
    }

    .cta-form {
      display: flex;
      gap: 12px;
      max-width: 500px;
      margin: 40px auto 0;
    }

    .cta-form input {
      flex: 1;
      background: rgba(255,255,255,0.07);
      border: 1px solid var(--card-border);
      border-radius: 100px;
      padding: 14px 24px;
      color: var(--text);
      font-size: 0.95rem;
      font-family: 'DM Sans', sans-serif;
      outline: none;
      transition: border-color 0.2s;
    }

    .cta-form input:focus {
      border-color: var(--orange);
    }

    .cta-form input::placeholder { color: var(--muted); }

    /* FOOTER */
    footer {
      border-top: 1px solid var(--card-border);
      padding: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 24px;
    }

    .footer-logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.3rem;
    }

    .footer-logo span { color: var(--orange); }

    .footer-links {
      display: flex;
      gap: 28px;
      list-style: none;
      flex-wrap: wrap;
    }

    .footer-links a {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s;
    }

    .footer-links a:hover { color: var(--text); }

    .footer-copy {
      color: var(--muted);
      font-size: 0.8rem;
    }

    /* ANIMATIONS */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* RESPONSIVE */
    @media (max-width: 900px) {
      nav { padding: 16px 24px; }
      .nav-links { display: none; }
      section { padding: 60px 24px; }
      .steps { grid-template-columns: 1fr; }
      .categories-grid { grid-template-columns: 1fr 1fr; }
      .diff-section { grid-template-columns: 1fr; padding: 48px 32px; gap: 40px; }
      .testimonials-grid { grid-template-columns: 1fr; }
      .cta-prestador { padding: 48px 32px; }
      .cta-form { flex-direction: column; }
      footer { flex-direction: column; align-items: flex-start; padding: 40px 24px; }
      .stats-bar { gap: 32px; padding: 32px 24px; }
      .diff-visual { grid-template-columns: 1fr 1fr; }
    }

  </style>
</head>
<body>

  <!-- NAV -->
  <nav>
    <div class="logo">Chama<span>OFix</span></div>
    <ul class="nav-links">
      <li><a href="#como-funciona">Como funciona</a></li>
      <li><a href="#servicos">Serviços</a></li>
      <li><a href="#depoimentos">Depoimentos</a></li>
      <li><a href="#prestadores" class="nav-cta">Sou prestador</a></li>
    </ul>
    <a href="#buscar" class="btn-primary" style="font-size:0.9rem; padding:10px 22px; display:none;" id="nav-action">Encontrar profissional</a>
  </nav>

  <!-- HERO -->
  <section class="hero" style="padding-top:140px; max-width:100%;">
    <div class="hero-bg-glow"></div>
    <div class="hero-badge">Marketplace hiperlocal de serviços</div>
    <h1>O profissional <em>certo</em>,<br/>no seu bairro, agora.</h1>
    <p class="hero-sub">Encanador, eletricista, pintor e muito mais. Com avaliações reais, preço transparente e agendamento direto — sem precisar ligar pra ninguém.</p>
    <div class="hero-actions">
      <a href="#servicos" class="btn-primary">🔍 Encontrar profissional</a>
      <a href="#prestadores" class="btn-secondary">Sou prestador de serviço →</a>
    </div>
  </section>

  <!-- STATS BAR -->
  <div class="stats-bar reveal">
    <div class="stat">
      <div class="stat-num">12k+</div>
      <div class="stat-label">Profissionais cadastrados</div>
    </div>
    <div class="stat">
      <div class="stat-num">47k+</div>
      <div class="stat-label">Serviços realizados</div>
    </div>
    <div class="stat">
      <div class="stat-num">4.9★</div>
      <div class="stat-label">Avaliação média</div>
    </div>
    <div class="stat">
      <div class="stat-num">320+</div>
      <div class="stat-label">Bairros atendidos</div>
    </div>
  </div>

  <!-- COMO FUNCIONA -->
  <section id="como-funciona">
    <div class="reveal">
      <div class="section-label">Como funciona</div>
      <h2>Simples como deve ser</h2>
      <p class="section-desc">Em menos de 2 minutos você encontra, escolhe e agenda um profissional de confiança.</p>
    </div>
    <div class="steps reveal">
      <div class="step">
        <div class="step-num">01</div>
        <div class="step-icon">🔍</div>
        <h3>Descreva o que precisa</h3>
        <p>Diga qual serviço você precisa e em qual bairro. Nossa busca encontra os profissionais mais próximos e bem avaliados.</p>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <div class="step-icon">⭐</div>
        <h3>Escolha com confiança</h3>
        <p>Veja avaliações reais de clientes, faixa de preço e disponibilidade de cada profissional antes de decidir.</p>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <div class="step-icon">📅</div>
        <h3>Agende sem ligar</h3>
        <p>Escolha o horário, descreva o problema e confirme. O profissional chega no horário combinado. Simples assim.</p>
      </div>
    </div>
  </section>

  <!-- CATEGORIAS -->
  <section id="servicos" style="padding-top:0;">
    <div class="reveal">
      <div class="section-label">Categorias</div>
      <h2>Qualquer serviço, <span>um lugar só</span></h2>
      <p class="section-desc">De emergências a reformas, temos o profissional certo para cada necessidade.</p>
    </div>
    <div class="categories-grid reveal">
      <a href="#" class="cat-card">
        <div class="cat-icon">🔧</div>
        <div>
          <div class="cat-name">Encanamento</div>
          <div class="cat-desc">Vazamentos, entupimentos, instalações</div>
        </div>
      </a>
      <a href="#" class="cat-card">
        <div class="cat-icon">⚡</div>
        <div>
          <div class="cat-name">Elétrica</div>
          <div class="cat-desc">Instalações, reparos, quadros</div>
        </div>
      </a>
      <a href="#" class="cat-card">
        <div class="cat-icon">🎨</div>
        <div>
          <div class="cat-name">Pintura</div>
          <div class="cat-desc">Paredes, fachadas, acabamentos</div>
        </div>
      </a>
      <a href="#" class="cat-card">
        <div class="cat-icon">🪚</div>
        <div>
          <div class="cat-name">Marcenaria</div>
          <div class="cat-desc">Móveis, portas, montagem</div>
        </div>
      </a>
      <a href="#" class="cat-card">
        <div class="cat-icon">🧹</div>
        <div>
          <div class="cat-name">Limpeza</div>
          <div class="cat-desc">Residencial, pós-obra, escritório</div>
        </div>
      </a>
      <a href="#" class="cat-card">
        <div class="cat-icon">🚚</div>
        <div>
          <div class="cat-name">Mudança</div>
          <div class="cat-desc">Transporte, embalagem, montagem</div>
        </div>
      </a>
    </div>
  </section>

  <!-- DIFERENCIAIS -->
  <div style="padding: 0 60px 100px; max-width:1320px; margin:0 auto;">
    <div class="diff-section reveal">
      <div>
        <div class="section-label">Por que o ChamaOFix?</div>
        <h2>Confiança que você não encontra em lista de WhatsApp</h2>
        <ul class="diff-list">
          <li class="diff-item">
            <div class="diff-dot"></div>
            <div>
              <h4>Preço transparente antes de contratar</h4>
              <p>Você vê a faixa de preço de cada profissional antes mesmo de entrar em contato. Sem surpresas na hora do pagamento.</p>
            </div>
          </li>
          <li class="diff-item">
            <div class="diff-dot"></div>
            <div>
              <h4>Profissionais verificados</h4>
              <p>Todos os prestadores passam por verificação de documento e histórico antes de aparecer na plataforma.</p>
            </div>
          </li>
          <li class="diff-item">
            <div class="diff-dot"></div>
            <div>
              <h4>Avaliações 100% reais</h4>
              <p>Só quem contratou pode avaliar. Sem compra de nota, sem avaliação falsa.</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="diff-visual">
        <div class="diff-card">
          <div class="diff-card-icon">📍</div>
          <h4>Hiperlocal</h4>
          <p>Resultados por bairro, não por cidade inteira</p>
        </div>
        <div class="diff-card">
          <div class="diff-card-icon">⚡</div>
          <h4>Resposta rápida</h4>
          <p>Profissionais respondem em até 15 minutos</p>
        </div>
        <div class="diff-card">
          <div class="diff-card-icon">🛡️</div>
          <h4>Garantia</h4>
          <p>Problema não resolvido? A gente resolve</p>
        </div>
        <div class="diff-card">
          <div class="diff-card-icon">💳</div>
          <h4>Pague no app</h4>
          <p>Pix, cartão ou boleto com total segurança</p>
        </div>
      </div>
    </div>
  </div>

  <!-- DEPOIMENTOS -->
  <section id="depoimentos" style="padding-top:0;">
    <div class="reveal">
      <div class="section-label">Depoimentos</div>
      <h2>Quem usou, <span>aprovou</span></h2>
    </div>
    <div class="testimonials-grid reveal">
      <div class="testi-card">
        <div class="stars">★★★★★</div>
        <p class="testi-text">"Cano estourou às 23h e em 40 minutos tinha um encanador na minha porta. Nunca mais fico sem o ChamaOFix no celular."</p>
        <div class="testi-author">
          <div class="testi-avatar" style="background:#C0392B;">M</div>
          <div>
            <div class="testi-name">Mariana Costa</div>
            <div class="testi-role">São Paulo, SP</div>
          </div>
        </div>
      </div>
      <div class="testi-card">
        <div class="stars">★★★★★</div>
        <p class="testi-text">"Ver a faixa de preço antes de contratar fez toda diferença. Sem esse negócio de receber orçamento surpresa na hora de pagar."</p>
        <div class="testi-author">
          <div class="testi-avatar" style="background:#1A6B3C;">R</div>
          <div>
            <div class="testi-name">Ricardo Alves</div>
            <div class="testi-role">Belo Horizonte, MG</div>
          </div>
        </div>
      </div>
      <div class="testi-card">
        <div class="stars">★★★★★</div>
        <p class="testi-text">"Como pintora autônoma, tripling minha agenda em 2 meses. A plataforma me conecta com clientes sérios que já sabem meu preço."</p>
        <div class="testi-author">
          <div class="testi-avatar" style="background:#7B2D8B;">A</div>
          <div>
            <div class="testi-name">Ana Ferreira</div>
            <div class="testi-role">Prestadora — Pintura</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA PRESTADOR -->
  <div style="padding: 0 60px 100px; max-width:1320px; margin:0 auto;" id="prestadores">
    <div class="cta-prestador reveal">
      <div class="section-label" style="text-align:center;">Para prestadores</div>
      <h2>Você tem o talento.<br/><span>A gente traz o cliente.</span></h2>
      <p class="section-desc">Cadastre-se gratuitamente, receba solicitações do seu bairro e cresça com avaliações que constroem sua reputação.</p>
      <div class="cta-form">
        <input type="text" placeholder="Seu WhatsApp ou e-mail" />
        <a href="#" class="btn-primary" style="white-space:nowrap;">Quero me cadastrar</a>
      </div>
      <p style="color:var(--muted); font-size:0.8rem; margin-top:16px;">Gratuito para começar. Sem taxa de cadastro.</p>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="footer-logo">Chama<span>OFix</span></div>
    <ul class="footer-links">
      <li><a href="#">Como funciona</a></li>
      <li><a href="#">Para prestadores</a></li>
      <li><a href="#">Sobre nós</a></li>
      <li><a href="#">Termos de uso</a></li>
      <li><a href="#">Privacidade</a></li>
    </ul>
    <div class="footer-copy">© 2025 ChamaOFix. Todos os direitos reservados.</div>
  </footer>

  <script>
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Nav action button show on scroll
    const navAction = document.getElementById('nav-action');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        navAction.style.display = 'block';
      } else {
        navAction.style.display = 'none';
      }
    });

    // Counter animation
    function animateCounter(el, target, suffix = '') {
      let start = 0;
      const duration = 1500;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('pt-BR') + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const nums = e.target.querySelectorAll('.stat-num');
          const data = [
            { target: 12000, suffix: 'k+', divisor: 1000 },
            { target: 47000, suffix: 'k+', divisor: 1000 },
            { target: 4.9, suffix: '★', isFloat: true },
            { target: 320, suffix: '+' }
          ];
          nums.forEach((num, i) => {
            const d = data[i];
            if (d.isFloat) {
              num.textContent = '4.9★';
            } else if (d.divisor) {
              let start = 0;
              const duration = 1500;
              const step = (ts) => {
                if (!start) start = ts;
                const progress = Math.min((ts - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                num.textContent = Math.floor(eased * d.target / d.divisor) + d.suffix;
                if (progress < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            } else {
              animateCounter(num, d.target, d.suffix);
            }
          });
          statsObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) statsObs.observe(statsBar);
  </script>
</body>
</html>
