import React, { useEffect, useState } from 'react';

// Configuração única: troque aqui pelo link real da plataforma de pagamento.
const PAYMENT_URL = '{COLE_AQUI_O_LINK_DE_PAGAMENTO}';
// Confirme o prazo oferecido pela plataforma antes de publicar.
const GUARANTEE_DAYS = 7;
const OFFER_DURATION_HOURS = 24;

const adventures = [
  ['🌍', 'Deus cria o mundo'], ['🚢', 'Noé e a arca'], ['⭐', 'Abraão e as estrelas'], ['🌈', 'José e a túnica colorida'],
  ['🧺', 'Moisés no cestinho'], ['🌊', 'A travessia do Mar Vermelho'], ['🏰', 'As muralhas de Jericó'], ['🪨', 'Davi e Golias'],
  ['🦁', 'Daniel na cova dos leões'], ['🐋', 'Jonas e o grande peixe'], ['⭐', 'O nascimento de Jesus'], ['👧', 'Jesus abençoa as crianças'],
  ['⛵', 'Jesus acalma a tempestade'], ['🍞', 'Cinco pães e dois peixes'], ['🌳', 'Zaqueu na árvore'], ['🤝', 'O Bom Samaritano'],
  ['🐑', 'A ovelhinha perdida'], ['🌅', 'Jesus ressuscitou'], ['🛡️', 'A armadura de Deus'], ['🍇', 'O fruto do Espírito'],
];
const activities = ['Labirintos', 'Ligue os pontos', 'Jogo dos 7 erros', 'Contar', 'Verdadeiro ou falso', 'Completar palavras', 'Desenhar'];
const benefits = [
  ['📖', 'Aprender brincando', 'Histórias bíblicas em linguagem simples, com espaço para conversar e descobrir.'],
  ['📵', 'Mais momentos longe das telas', 'Uma atividade gostosa para ocupar as mãos e a imaginação.'],
  ['✏️', 'Coordenação e concentração', 'Colorir e completar atividades ajuda a praticar habilidades importantes.'],
  ['🙏', 'Um convite à oração', 'Cultive pequenos momentos de conversa, gratidão e fé no dia a dia.'],
  ['💛', 'Tempo especial em família', 'Leiam, conversem e criem uma lembrança juntos, no ritmo de vocês.'],
  ['👨‍👩‍👧', 'Vínculo entre pais e filhos', 'Uma ideia simples para tornar o culto doméstico mais participativo.'],
];
const audiences = [
  ['👩‍👧', 'Mães e pais'], ['👵', 'Avós'], ['🧑‍🏫', 'Professoras e professores de escola dominical'],
  ['⛪', 'Ministério infantil e igrejas'], ['🏫', 'Escolas e projetos cristãos'], ['🎁', 'Quem quer presentear uma criança'],
];
const bonuses = [
  ['🏅', 'Certificado de Pequeno Explorador da Bíblia', 'R$ 9,90'],
  ['🔎', 'Caça-palavras cristão', 'R$ 7,90'],
  ['💌', '6 cartões de versículos para recortar e colorir', 'R$ 9,90'],
  ['🙏', 'Página “Minha Oração” para colorir', 'R$ 5,90'],
];
const faq = [
  ['Como recebo o livro?', 'O produto é digital em PDF. Após a confirmação do pagamento, você recebe o acesso para baixar. Confira também as instruções enviadas pela plataforma de pagamento.'],
  ['Posso imprimir mais de uma vez?', 'Sim! Você pode imprimir em casa quantas vezes quiser para uso pessoal e familiar.'],
  ['Qual é a idade indicada?', 'O material foi pensado para crianças de 4 a 10 anos. Um adulto pode acompanhar os pequenos que ainda não leem sozinhos.'],
  ['Preciso de uma impressora especial?', 'Não. O PDF foi preparado em formato A4 vertical e pode ser impresso em uma impressora comum.'],
  ['Serve para escola dominical?', 'Sim. As histórias e atividades podem apoiar aulas, ministério infantil e momentos em grupo. O uso do arquivo deve respeitar os termos de licença.'],
  ['É seguro comprar?', 'O pagamento é processado pela plataforma indicada no checkout. Verifique os dados e as condições exibidas antes de concluir a compra.'],
  ['E se meu filho não gostar?', `A oferta prevê garantia de ${GUARANTEE_DAYS} dias, conforme as condições da plataforma. Se não ficar satisfeita(o), solicite o reembolso pelo canal indicado no checkout dentro do prazo.`],
];

function getOfferDeadline() {
  try {
    const stored = window.localStorage.getItem('colorindoJesusOfferDeadline');
    if (stored) return Number(stored);
    const deadline = Date.now() + OFFER_DURATION_HOURS * 60 * 60 * 1000;
    window.localStorage.setItem('colorindoJesusOfferDeadline', String(deadline));
    return deadline;
  } catch (_) {
    return Date.now() + OFFER_DURATION_HOURS * 60 * 60 * 1000;
  }
}
function useCountdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, getOfferDeadline() - Date.now()));
  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, getOfferDeadline() - Date.now()));
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const total = Math.floor(remaining / 1000);
  return `${String(Math.floor(total / 3600)).padStart(2, '0')}:${String(Math.floor((total % 3600) / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}
function Countdown({ compact = false }) {
  const time = useCountdown();
  return <span className={`countdown ${compact ? 'countdown-small' : ''}`} aria-label={`Tempo indicado: ${time}`}>⏳ {time}</span>;
}
function CTA({ children = 'QUERO O LIVRO AGORA 👉', className = '' }) {
  return <a className={`cta ${className}`} href={PAYMENT_URL} aria-label={children}>{children}</a>;
}
function SectionTitle({ eyebrow, children, light = false }) {
  return <div className={`section-title ${light ? 'light' : ''}`}>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{children}</h2></div>;
}
function BookMockup() {
  return <div className="book-scene" role="img" aria-label="Capa ilustrada do livro Colorindo com Jesus, com crianças, arco-íris, ovelhinha e histórias bíblicas">
    <div className="sparkle sparkle-one">✦</div><div className="sparkle sparkle-two">✧</div>
    <div className="book">
      <div className="book-cover">
        <div className="cover-rainbow">🌈</div>
        <div className="cover-label">20 AVENTURAS BÍBLICAS</div>
        <div className="cover-title">Colorindo<br /><span>com Jesus</span></div>
        <div className="cover-art"><span>👧🏻</span><span>🧒🏽</span><span>🐑</span></div>
        <div className="cover-subtitle">para pequenos corações 💛</div>
        <div className="cover-stars">⭐ ✨ ⭐</div>
      </div>
      <div className="book-pages" />
    </div>
    <div className="scene-cloud cloud-a">☁️</div><div className="scene-cloud cloud-b">☁️</div>
    <span className="scene-heart">💛</span>
  </div>;
}
function SamplePage({ emoji, title, activity }) {
  return <article className="sample-page" aria-label={`Exemplo ilustrativo: ${title}`}>
    <div className="sample-top"><span>COLORINDO COM JESUS</span><span>✦ ✦ ✦</span></div>
    <strong>{title}</strong>
    <div className="line-art"><span>{emoji}</span><i>♡</i><i>☼</i></div>
    <p>“A tua palavra é lâmpada para os meus pés.”</p>
    <div className="sample-task">✏️ {activity}</div>
  </article>;
}
function PriceCard({ final = false }) {
  return <div className={`price-card ${final ? 'price-card-final' : ''}`}>
    <div className="price-ribbon">🔥 OFERTA DE LANÇAMENTO</div>
    <p className="included-title">Você recebe hoje:</p>
    <ul className="included-list">
      <li>✅ Livro em PDF com aproximadamente 50 páginas</li><li>✅ 20 histórias e 20 desenhos grandes para colorir</li>
      <li>✅ Atividades de fixação + guia para pais e professores</li><li>✅ 4 bônus especiais para imprimir</li>
    </ul>
    <div className="price-line"><span>De <s>R$ 47,00</s> por</span></div>
    <div className="price">R$ 14,90</div>
    <p className="one-time">pagamento único, sem mensalidade</p>
    <p className="installments">ou 3x de <strong>R$ 5,43</strong></p>
    <p className="access-pill">⚡ Acesso imediato após a confirmação</p>
    <CTA className="price-cta">SIM! QUERO COMEÇAR HOJE 🙌</CTA>
    <p className="secure">🔒 Checkout seguro &nbsp; • &nbsp; Pix, cartão ou boleto*</p>
    <p className="payment-note">*Meios de pagamento sujeitos às opções disponíveis no checkout.</p>
    <div className="price-timer">Oferta de lançamento por tempo limitado <Countdown /></div>
    <p className="small-note">Menos que um lanche, para plantar a Palavra no coração do seu filho.</p>
  </div>;
}

export default function App() {
  const [activeFaq, setActiveFaq] = useState(null);
  return <div className="sales-page">
    <style>{styles}</style>
    <div className="urgency-bar">🔥 Oferta de lançamento: <strong>R$ 14,90</strong> por tempo limitado <Countdown compact /></div>
    <header className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-kicker">💛 Para mães e pais que querem criar filhos com Jesus no coração</span>
          <h1>Transforme o tempo de tela em <span>tempo de fé</span>: 20 aventuras bíblicas para seu filho colorir e aprender</h1>
          <p className="hero-description">O livro de colorir cristão com histórias, versículos, atividades e certificado, em PDF para imprimir hoje mesmo.</p>
          <div className="hero-badges"><span>✅ Acesso imediato</span><span>🖨️ Imprima quantas vezes quiser</span><span>👧 De 4 a 10 anos</span></div>
          <CTA />
          <p className="microcopy">Pagamento único • Compra pela plataforma de checkout • Receba após a confirmação</p>
          <p className="hero-verse">“Deixai vir a mim os meninos, e não os impeçais...” <b>Mateus 19:14 · ARC</b></p>
        </div>
        <BookMockup />
      </div>
      <div className="hero-bottom-wave" />
    </header>

    <main>
      <section className="section pain-section">
        <div className="container narrow"><SectionTitle eyebrow="VOCÊ NÃO ESTÁ SOZINHA NISSO">Você se identifica com isso?</SectionTitle>
          <div className="pain-list">
            {['Seu filho passa horas no celular ou tablet?', 'É difícil ensinar a Bíblia de um jeito que prenda a atenção?', 'Falta material cristão bonito, organizado e pronto para usar?', 'O culto doméstico às vezes fica “chato” para a criança?', 'A escola dominical precisa de atividades criativas e preparadas?', 'Você queria fazer algo especial, mas falta tempo para preparar tudo?'].map((item) => <div className="pain-item" key={item}><span>💭</span>{item}</div>)}
          </div>
          <p className="pain-closing">Se você disse sim a pelo menos uma delas, <strong>este livro foi feito para você.</strong> 💛</p>
          <CTA />
        </div>
      </section>

      <section className="section solution-section" id="produto">
        <div className="container"><SectionTitle eyebrow="DIVERSÃO COM PROPÓSITO">Conheça o Colorindo com Jesus</SectionTitle>
          <p className="section-lead">Um jeito carinhoso de unir <strong>imaginação, criatividade e ensino bíblico</strong>. A criança ouve a história, conversa sobre o versículo, colore e faz uma atividade — e vocês podem terminar com uma oração. 🙏</p>
          <div className="steps-grid">{[['1️⃣', 'Leia a história', 'Curtinha e fácil de entender.'], ['2️⃣', 'Conversem sobre o versículo', 'Uma oportunidade para ouvir e compartilhar.'], ['3️⃣', 'Colore com capricho', 'Desenhos grandes, fofos e com traço grosso.'], ['4️⃣', 'Faça a atividade e ore', 'Fixe o aprendizado de forma leve.']].map(([n, title, copy]) => <article className="step-card" key={title}><span className="step-number">{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <div className="quote-strip">“Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.” <b>Salmos 119:105 · ARC</b></div>
        </div>
      </section>

      <section className="section contents-section" id="conteudo">
        <div className="container"><SectionTitle eyebrow="UM MATERIAL COMPLETO PARA IMPRIMIR">O que você vai receber</SectionTitle>
          <div className="contents-grid">
            <div className="contents-copy"><ul className="check-list">
              <li><b>📖 20 aventuras bíblicas</b>, cada uma com uma história curta, versículo em destaque e “Você sabia?”.</li>
              <li><b>🖍️ 20 desenhos grandes para colorir</b>, com traço grosso, fofo e fácil de pintar.</li>
              <li><b>🎲 Atividades divertidas</b> de labirinto, ligue os pontos, 7 erros, contar, verdadeiro ou falso, completar palavras e desenhar.</li>
              <li><b>🎁 Bônus para imprimir:</b> caça-palavras cristão, página “Minha Oração”, 6 cartões de versículos, certificado de “Pequeno Explorador da Bíblia”, página “Este livro pertence a” e guia para pais e professores.</li>
              <li><b>📄 Aproximadamente 50 páginas</b> em PDF A4 vertical, para imprimir em casa.</li>
            </ul></div>
            <div className="samples-wrap"><div className="samples-heading"><span>✦</span> Espie algumas páginas <span>✦</span></div><div className="samples-grid">
              <SamplePage emoji="🌍" title="Deus cria o mundo" activity="Conte as estrelas no céu" />
              <SamplePage emoji="🚢" title="Noé e a arca" activity="Ajude Noé a chegar à arca" />
              <SamplePage emoji="🦁" title="Daniel e os leões" activity="Ligue os pontos" />
              <SamplePage emoji="🐑" title="A ovelhinha perdida" activity="Encontre o caminho de casa" />
            </div><p className="illustration-note">Prévia ilustrativa do estilo das páginas. O arquivo final contém o material completo.</p></div>
          </div>
          <CTA />
        </div>
      </section>

      <section className="section adventures-section">
        <div className="container"><SectionTitle eyebrow="HISTÓRIAS PARA DESCOBRIR JUNTOS">20 histórias que seu filho vai amar</SectionTitle>
          <div className="adventures-grid">{adventures.map(([emoji, title], index) => <article className="adventure-card" key={title}><span className="adventure-index">{String(index + 1).padStart(2, '0')}</span><span className="adventure-emoji">{emoji}</span><span>{title}</span></article>)}</div>
          <CTA />
        </div>
      </section>

      <section className="section benefits-section"><div className="container"><SectionTitle eyebrow="PEQUENOS MOMENTOS, GRANDES LEMBRANÇAS">Mais do que colorir: um tempo de conexão</SectionTitle>
        <div className="cards-grid">{benefits.map(([icon, title, copy]) => <article className="info-card" key={title}><span className="card-icon">{icon}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div></section>

      <section className="section forwho-section"><div className="container"><SectionTitle eyebrow="FEITO PARA COMPARTILHAR">Para quem é esse livro?</SectionTitle>
        <div className="audience-grid">{audiences.map(([icon, title]) => <div className="audience-card" key={title}><span>{icon}</span><b>{title}</b></div>)}</div>
      </div></section>

      <section className="section social-section"><div className="container"><SectionTitle eyebrow="HISTÓRIAS ILUSTRATIVAS">O que mães e professoras estão dizendo</SectionTitle>
        <div className="testimonials-grid">{[
          ['👩🏻', '“Meu filho pediu para fazer mais uma história antes de dormir. Foi um momento tão gostoso juntos!”', 'Camila, mãe'],
          ['👩🏽‍🏫', '“As atividades ajudam a deixar a aula participativa. Gosto de ter tudo organizado para imprimir.”', 'Renata, professora'],
          ['👵🏻', '“Imprimi para fazer com meus netos. Eles adoraram colorir e conversar sobre cada história.”', 'Lúcia, avó'],
          ['👩🏾', '“Uma ideia simples para trocar um tempinho de tela por uma atividade feita lado a lado.”', 'Patrícia, mãe'],
        ].map(([avatar, copy, name]) => <article className="testimonial" key={name}><span className="avatar">{avatar}</span><div className="stars">★★★★★</div><p>{copy}</p><b>{name}</b></article>)}</div>
        <p className="disclaimer">Depoimentos ilustrativos, criados como exemplos de uso. Não representam avaliações reais de clientes.</p>
        <div className="facts-row"><div><b>4–10</b><span>anos de idade</span></div><div><b>20</b><span>aventuras bíblicas</span></div><div><b>+50</b><span>páginas no PDF</span></div></div>
      </div></section>

      <section className="section bonus-section"><div className="container"><SectionTitle eyebrow="MAIS RECURSOS PARA SUA FAMÍLIA">E ainda tem bônus especiais 🎁</SectionTitle>
        <div className="bonus-grid">{bonuses.map(([icon, title, value]) => <article className="bonus-card" key={title}><span className="bonus-icon">{icon}</span><div><span className="free-tag">GRÁTIS hoje</span><h3>{title}</h3><p>Valor simbólico: <s>{value}</s></p></div></article>)}</div>
        <p className="bonus-extra">Também acompanham: página personalizável “Este livro pertence a” e guia de uso para pais e professores.</p>
        <div className="value-box"><span>VALOR DE REFERÊNCIA <s>R$ 47,00</s></span><b>Hoje, tudo por <strong>R$ 14,90</strong></b><small>PDF digital • pagamento único</small></div>
        <CTA />
      </div></section>

      <section className="section offer-section" id="oferta"><div className="container"><SectionTitle eyebrow="COMECE HOJE MESMO">Um material para viver a fé com leveza</SectionTitle>
        <PriceCard />
      </div></section>

      <section className="section guarantee-section"><div className="container guarantee-box"><div className="guarantee-seal"><span>🛡️</span><b>{GUARANTEE_DAYS}<small>DIAS</small></b></div><div><SectionTitle eyebrow="COMPRA COM TRANQUILIDADE">Garantia incondicional de {GUARANTEE_DAYS} dias</SectionTitle><p>Se por qualquer motivo você não gostar, devolvemos 100% do seu dinheiro, conforme as condições e o prazo informados pela plataforma de venda. Sem perguntas. Consulte as instruções de reembolso no checkout.</p></div></div></section>

      <section className="section faq-section" id="duvidas"><div className="container narrow"><SectionTitle eyebrow="TIRE SUAS DÚVIDAS">Perguntas frequentes</SectionTitle>
        <div className="faq-list">{faq.map(([question, answer], index) => <div className={`faq-item ${activeFaq === index ? 'open' : ''}`} key={question}><button type="button" className="faq-question" aria-expanded={activeFaq === index} onClick={() => setActiveFaq(activeFaq === index ? null : index)}><span>{question}</span><span className="faq-plus">{activeFaq === index ? '−' : '+'}</span></button>{activeFaq === index && <p className="faq-answer">{answer}</p>}</div>)}</div>
        <CTA />
      </div></section>

      <section className="final-section"><div className="container narrow"><span className="final-heart">💛</span><h2>Seu filho só tem essa infância.<br /><span>Plante a Palavra hoje.</span></h2><p>Crie um momento de carinho, conversa e criatividade em família. Baixe, imprima e comecem juntos a próxima aventura bíblica. 📖🌈</p><div className="final-offer">Oferta de lançamento por tempo limitado <Countdown /></div><CTA>QUERO O LIVRO POR R$ 14,90 🙌</CTA><p className="final-ps"><b>P.S.:</b> Você paga uma vez só, recebe o PDF após a confirmação e conta com garantia de {GUARANTEE_DAYS} dias, conforme as condições da plataforma.</p></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-brand">📖 Colorindo com Jesus</div><p>© 2026 – Produto digital em PDF</p><p className="footer-disclaimer">Depoimentos ilustrativos. Resultados e experiências podem variar.</p><div className="footer-links"><a href="#termos">Termos de uso</a><a href="#privacidade">Política de privacidade</a></div><p className="footer-legal">Material cristão infantil de caráter educativo. O conteúdo não substitui a orientação de pais, responsáveis ou líderes da comunidade.</p></div></footer>
    <div className="sticky-cta"><CTA>Quero o livro por R$ 14,90</CTA></div>
  </div>;
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Baloo+2:wght@600;700;800&display=swap');
:root{--sky:#38bdf8;--sky-pale:#e0f2fe;--yellow:#fbbf24;--orange:#f59e0b;--green:#22c55e;--ink:#243447;--muted:#586878;--cream:#fffdf7;--pink:#fff1e8;--shadow:0 12px 35px rgba(27,75,103,.12)}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:72px}body{margin:0}.sales-page{font-family:'Nunito',system-ui,sans-serif;color:var(--ink);font-size:17px;line-height:1.55;overflow:hidden}.sales-page h1,.sales-page h2,.sales-page h3,.cover-title{font-family:'Baloo 2','Nunito',sans-serif;line-height:1.1;margin-top:0}.sales-page p{margin-top:0}.container{width:min(1120px,calc(100% - 36px));margin:0 auto}.container.narrow{max-width:790px}.urgency-bar{position:sticky;top:0;z-index:20;min-height:44px;background:#fff2cd;color:#653d00;text-align:center;padding:8px 12px;font-size:14px;font-weight:800;box-shadow:0 2px 8px #00000012;display:flex;justify-content:center;align-items:center;gap:8px}.countdown{display:inline-flex;align-items:center;justify-content:center;border-radius:20px;background:#fff4d4;color:#8a4500;padding:5px 12px;font-weight:900;font-variant-numeric:tabular-nums;white-space:nowrap}.countdown-small{font-size:12px;padding:3px 8px;background:#fff;color:#8a4500}.hero{position:relative;background:linear-gradient(135deg,#e1f6ff 0%,#fffdf4 57%,#fff0d6 100%);padding:56px 0 74px}.hero-inner{width:min(1120px,calc(100% - 36px));margin:auto;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:30px}.hero-kicker{display:inline-block;background:#fff;padding:9px 14px;border-radius:30px;color:#11658a;font-size:15px;font-weight:800;box-shadow:0 4px 12px #27688c12}.hero h1{font-size:clamp(38px,5vw,62px);font-weight:800;margin:20px 0 14px;letter-spacing:-.7px}.hero h1 span{color:#ee8d00}.hero-description{font-size:20px;max-width:600px;color:#42596a}.hero-badges{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0}.hero-badges span{background:#fff;border:1px solid #d6edf6;border-radius:22px;padding:8px 11px;font-size:14px;font-weight:800}.cta{display:flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;background:linear-gradient(180deg,#ffd34f,#ffae13);color:#392500;font-weight:1000;font-size:19px;line-height:1.2;padding:19px 22px;min-height:62px;border-radius:18px;border:0;box-shadow:0 7px 0 #d68408,0 13px 22px #c4782530;transition:transform .18s,filter .18s;animation:softPulse 2.8s infinite;cursor:pointer}.cta:hover{transform:translateY(-2px);filter:saturate(1.1)}.hero-copy>.cta{max-width:475px}.microcopy{font-size:13px;color:#62727e;margin:13px 0 0}.hero-verse{font-size:14px;color:#436276;margin:18px 0 0;font-style:italic}.hero-verse b{display:block;font-style:normal;margin-top:4px}.book-scene{min-height:440px;display:grid;place-items:center;position:relative}.book{position:relative;display:flex;transform:rotate(3deg);filter:drop-shadow(18px 20px 12px #35546630);z-index:2}.book-cover{width:300px;height:388px;border-radius:11px 16px 16px 11px;background:linear-gradient(145deg,#69d0f4,#d6f5ff 49%,#ffe082);border:7px solid #fff;outline:1px solid #b2d8e7;display:flex;align-items:center;flex-direction:column;text-align:center;padding:19px 12px 12px;position:relative;overflow:hidden}.book-cover:before{content:'';position:absolute;inset:8px;border:2px dashed #ffffffbb;border-radius:8px;pointer-events:none}.book-pages{width:17px;height:370px;background:repeating-linear-gradient(90deg,#fff,#fff 2px,#e6edf0 3px,#fff 4px);border-radius:0 8px 8px 0;margin-top:8px}.cover-rainbow{font-size:46px;line-height:1}.cover-label{font-size:11px;font-weight:1000;letter-spacing:1.2px;color:#28637d;background:#ffffffb8;border-radius:20px;padding:4px 11px;margin-top:2px}.cover-title{font-size:39px;font-weight:900;color:#154e70;margin:8px 0 0;text-shadow:1px 2px #fff}.cover-title span{color:#ed8f00}.cover-art{font-size:53px;display:flex;gap:2px;margin-top:4px;filter:drop-shadow(0 3px 0 #fff)}.cover-art span:nth-child(2){font-size:58px}.cover-subtitle{font-family:'Baloo 2';font-size:17px;font-weight:800;color:#27607b;margin-top:-3px}.cover-stars{font-size:20px;margin-top:3px}.sparkle{position:absolute;color:#efa800;font-size:42px}.sparkle-one{top:43px;right:13%}.sparkle-two{bottom:53px;left:6%;color:#57bce8}.scene-cloud{position:absolute;font-size:55px;opacity:.8}.cloud-a{top:18%;left:0}.cloud-b{bottom:14%;right:0}.scene-heart{position:absolute;bottom:3%;right:16%;font-size:36px}.hero-bottom-wave{position:absolute;bottom:-1px;left:0;right:0;height:26px;background:radial-gradient(40px 18px at 50% 0,#fff 98%,transparent 100%) 0 0/80px 26px repeat-x}.section{padding:76px 0}.section-title{text-align:center;margin:0 auto 30px;max-width:780px}.section-title h2{font-size:clamp(31px,4vw,45px);font-weight:800;color:#213e52;margin:0}.eyebrow{display:block;text-transform:uppercase;letter-spacing:1.2px;font-size:13px;font-weight:1000;color:#1683ad;margin-bottom:10px}.pain-section{background:#fff}.pain-list{display:grid;grid-template-columns:1fr 1fr;gap:11px}.pain-item{display:flex;align-items:center;gap:12px;background:#fff8e9;border:1px solid #f6e8c8;border-radius:15px;padding:14px 16px;font-weight:700}.pain-item span{font-size:23px}.pain-closing{text-align:center;font-size:20px;margin:26px 0 20px}.pain-section .cta,.contents-section>.container>.cta,.adventures-section .cta,.bonus-section>.container>.cta,.faq-section .cta{max-width:480px;margin:0 auto}.solution-section{background:var(--sky-pale)}.section-lead{max-width:820px;text-align:center;font-size:19px;margin:0 auto 35px;color:#42596a}.steps-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px}.step-card{background:white;border-radius:20px;padding:23px 18px;text-align:center;box-shadow:var(--shadow);border-bottom:5px solid #7dd3fc}.step-number{font-size:29px}.step-card h3{font-size:20px;margin:10px 0 8px}.step-card p{color:var(--muted);font-size:15px;margin-bottom:0}.quote-strip{margin:28px auto 0;background:#ffffffb8;border-radius:15px;text-align:center;padding:17px;font-style:italic;color:#326177}.quote-strip b{display:block;font-style:normal;font-size:14px;margin-top:5px}.contents-section{background:#fffdf7}.contents-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:center}.check-list{list-style:none;padding:0;margin:0;display:grid;gap:17px}.check-list li{position:relative;padding-left:34px;color:#405565}.check-list li:before{content:'✓';position:absolute;left:0;top:0;color:#19a65b;font-weight:1000;font-size:21px}.samples-wrap{background:#e8f7ff;border-radius:24px;padding:22px}.samples-heading{text-align:center;font-weight:1000;color:#28627b;margin-bottom:15px}.samples-heading span{color:#f3ad00}.samples-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.sample-page{background:white;border:2px solid #38434a;border-radius:8px;min-height:190px;padding:10px;text-align:center;box-shadow:3px 4px 0 #b6d6e3}.sample-top{font-size:8px;font-weight:900;display:flex;justify-content:space-between;border-bottom:1px solid #333;padding-bottom:4px}.sample-page strong{display:block;font-family:'Baloo 2';font-size:14px;margin:5px 0}.line-art{height:72px;border:1.5px solid #343a40;border-radius:50% 45% 44% 48%;display:flex;align-items:center;justify-content:center;gap:5px;position:relative;color:#232b30}.line-art span{font-size:40px;filter:grayscale(1)}.line-art i{font-style:normal;font-size:16px}.sample-page p{font-size:8px;margin:5px 0}.sample-task{font-size:9px;font-weight:800;border-top:1px dashed #555;padding-top:4px}.illustration-note{text-align:center;font-size:12px;color:#596f7d;margin:13px 0 0}.contents-section>.container>.cta{margin-top:34px}.adventures-section{background:#fff4d7}.adventures-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:29px}.adventure-card{position:relative;background:white;border-radius:15px;padding:17px 12px 15px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:5px;font-weight:800;box-shadow:0 5px 14px #86601814;min-height:114px}.adventure-emoji{font-size:28px}.adventure-index{position:absolute;top:7px;right:9px;color:#b9c3c8;font-size:11px}.benefits-section{background:#f1fbff}.cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.info-card{background:#fff;border-radius:19px;padding:23px;box-shadow:var(--shadow)}.card-icon{font-size:32px}.info-card h3{font-size:20px;margin:11px 0 7px}.info-card p{color:var(--muted);font-size:15px;margin-bottom:0}.forwho-section{background:#fff}.audience-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.audience-card{background:#fff8e9;border:1px solid #f4e7ca;border-radius:18px;min-height:105px;display:flex;align-items:center;gap:13px;padding:18px;font-size:16px}.audience-card span{font-size:30px}.social-section{background:#e6f7ff}.testimonials-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}.testimonial{position:relative;background:white;border-radius:18px;padding:22px 22px 20px 75px;box-shadow:0 7px 20px #1c658114;min-height:155px}.avatar{position:absolute;left:18px;top:19px;width:43px;height:43px;border-radius:50%;background:#fff3d4;display:grid;place-items:center;font-size:25px}.stars{color:#f3ad12;letter-spacing:2px;font-size:14px}.testimonial p{font-size:15px;font-style:italic;margin:8px 0;color:#425563}.testimonial>b{font-size:13px;color:#24749a}.disclaimer{text-align:center;color:#687b86;font-size:12px;margin:17px 0 29px}.facts-row{display:flex;justify-content:center;gap:0;background:#fff;border-radius:20px;max-width:680px;margin:auto;padding:17px}.facts-row div{flex:1;text-align:center;display:flex;flex-direction:column;border-right:1px solid #e3edf0}.facts-row div:last-child{border:0}.facts-row b{font-family:'Baloo 2';font-size:30px;color:#117ba3}.facts-row span{font-size:13px;color:#586878}.bonus-section{background:#fffaf0}.bonus-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.bonus-card{background:#fff;border:1px solid #f1e4c9;border-radius:18px;padding:19px;display:flex;align-items:center;gap:15px;box-shadow:0 6px 16px #805a1510}.bonus-icon{font-size:34px}.free-tag{display:inline-block;background:#d9f9e3;color:#08733a;border-radius:20px;padding:3px 9px;font-size:11px;font-weight:1000}.bonus-card h3{font-size:17px;margin:6px 0}.bonus-card p{font-size:13px;color:#72808a;margin:0}.bonus-extra{text-align:center;color:#526773;font-size:14px;margin:18px auto}.value-box{display:flex;flex-direction:column;align-items:center;background:#fff0c1;border:2px dashed #efa900;border-radius:18px;padding:20px;margin:20px auto 26px;max-width:580px;text-align:center}.value-box>span{font-size:13px;font-weight:800;color:#815500}.value-box>span s{margin-left:7px}.value-box>b{font-size:22px;margin:7px}.value-box strong{color:#e77b00;font-size:30px}.value-box small{color:#596a75}.offer-section{background:linear-gradient(180deg,#e1f6ff,#f7fcff)}.price-card{max-width:610px;margin:0 auto;background:white;border:3px solid #f7bd33;border-radius:26px;padding:28px 34px 30px;box-shadow:0 18px 50px #27546b25;text-align:center;position:relative;overflow:hidden}.price-ribbon{display:inline-block;background:#fff0bd;color:#805000;font-weight:1000;border-radius:30px;padding:8px 16px;font-size:13px;letter-spacing:.5px}.included-title{text-align:left;font-weight:900;margin:22px 0 8px}.included-list{padding:0;list-style:none;text-align:left;display:grid;gap:9px;margin:0 0 21px;font-size:15px}.price-line{color:#566a76;font-size:17px}.price{font-family:'Baloo 2';font-weight:900;font-size:76px;line-height:1;color:#e98500;letter-spacing:-2px}.one-time{font-weight:900;margin:2px 0;color:#395463}.installments{margin:5px 0 15px;color:#526470}.access-pill{display:inline-block;background:#e4faeb;color:#08753a;border-radius:30px;padding:8px 14px;font-weight:900;font-size:14px}.price-cta{margin:13px auto 15px;width:100%}.secure{font-weight:800;font-size:14px;margin:0 0 2px}.payment-note{font-size:11px;color:#76858d;margin:0}.price-timer{margin:16px 0 0;font-size:13px;font-weight:800;color:#725000;display:flex;align-items:center;justify-content:center;gap:9px;flex-wrap:wrap}.small-note{font-weight:800;color:#596b74;font-size:14px;margin:16px 0 0}.guarantee-section{background:#fff}.guarantee-box{display:grid;grid-template-columns:130px 1fr;gap:25px;align-items:center;max-width:900px;background:#f0fff4;border:2px solid #b7edc7;border-radius:24px;padding:30px}.guarantee-seal{width:112px;height:112px;border-radius:50%;background:#22c55e;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 5px 0 #159044}.guarantee-seal span{font-size:28px}.guarantee-seal b{font-family:'Baloo 2';font-size:26px;line-height:1}.guarantee-seal small{font-family:'Nunito';font-size:10px;display:block}.guarantee-box .section-title{text-align:left;margin:0 0 12px}.guarantee-box .section-title h2{font-size:30px}.guarantee-box .eyebrow{color:#18894a}.guarantee-box p{margin:0;color:#43594e}.faq-section{background:#fff8e9}.faq-list{display:grid;gap:10px;margin-bottom:25px}.faq-item{background:white;border:1px solid #f0e2c6;border-radius:14px;overflow:hidden}.faq-question{width:100%;border:0;background:transparent;padding:17px 19px;font:800 17px 'Nunito',sans-serif;color:#314958;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:15px;cursor:pointer}.faq-plus{font-size:25px;color:#d98a00}.faq-answer{padding:0 19px 17px;margin:0!important;color:#566975;font-size:15px}.final-section{background:linear-gradient(145deg,#1085ae,#2bb9d5);color:white;text-align:center;padding:74px 0 78px}.final-heart{font-size:40px}.final-section h2{font-size:clamp(34px,5vw,51px);margin:14px 0;color:white}.final-section h2 span{color:#ffdc76}.final-section .container>p:not(.final-ps){font-size:19px;color:#eafaff;max-width:640px;margin:0 auto 20px}.final-offer{display:flex;justify-content:center;align-items:center;gap:10px;font-weight:900;margin:12px auto 15px}.final-offer .countdown{background:#e5f9ff;color:#11536e}.final-section .cta{max-width:520px;margin:0 auto}.final-ps{font-size:13px;color:#dbf8ff;margin:20px auto 0;max-width:650px}.footer{background:#173849;color:#e0f0f5;text-align:center;padding:31px 0 80px;font-size:13px}.footer-brand{font-family:'Baloo 2';font-size:20px;font-weight:800}.footer p{margin:7px 0}.footer-disclaimer{color:#b4cbd3}.footer-links{display:flex;justify-content:center;gap:20px;margin:12px}.footer-links a{color:#ffdc76}.footer-legal{max-width:750px;margin:12px auto!important;color:#aac0c8;font-size:12px}.sticky-cta{display:none}
@keyframes softPulse{0%,100%{box-shadow:0 7px 0 #d68408,0 13px 22px #c4782530}50%{box-shadow:0 7px 0 #d68408,0 13px 28px #ffae1385}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
@media(max-width:800px){.hero{padding:39px 0 60px}.hero-inner{grid-template-columns:1fr;gap:4px}.hero-copy{text-align:center}.hero-kicker{font-size:13px}.hero h1{font-size:clamp(36px,9vw,54px);margin-top:16px}.hero-description{font-size:18px;margin-left:auto;margin-right:auto}.hero-badges{justify-content:center}.hero-copy>.cta{margin:20px auto 0;width:100%}.hero-verse{max-width:390px;margin:17px auto 0}.book-scene{min-height:370px;margin-top:2px}.book-cover{width:250px;height:326px;padding-top:15px}.book-pages{height:309px}.cover-rainbow{font-size:38px}.cover-label{font-size:9px}.cover-title{font-size:33px}.cover-art{font-size:43px}.cover-art span:nth-child(2){font-size:48px}.cover-subtitle{font-size:15px}.section{padding:60px 0}.steps-grid{grid-template-columns:1fr 1fr}.contents-grid{grid-template-columns:1fr;gap:24px}.adventures-grid{grid-template-columns:repeat(2,1fr)}.cards-grid{grid-template-columns:1fr 1fr}.audience-grid{grid-template-columns:1fr 1fr}.sticky-cta{display:block;position:fixed;z-index:30;bottom:0;left:0;right:0;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:#ffffffed;box-shadow:0 -4px 20px #17384920}.sticky-cta .cta{min-height:54px;font-size:17px;padding:14px;border-radius:14px}.footer{padding-bottom:100px}}
@media(max-width:520px){.sales-page{font-size:17px}.container,.hero-inner{width:calc(100% - 28px)}.urgency-bar{font-size:11px;gap:5px;min-height:42px}.countdown-small{font-size:10px;padding:3px 6px}.hero{padding-top:30px}.hero-kicker{font-size:12px;padding:8px 10px}.hero h1{font-size:37px}.hero-description{font-size:17px}.hero-badges{gap:6px}.hero-badges span{font-size:12px;padding:7px 9px}.cta{font-size:17px;padding:17px 14px}.book-scene{min-height:340px}.section{padding:52px 0}.section-title{margin-bottom:23px}.section-title h2{font-size:33px}.eyebrow{font-size:11px}.pain-list{grid-template-columns:1fr;gap:9px}.pain-item{font-size:15px;padding:12px}.pain-closing{font-size:18px}.steps-grid{gap:10px}.step-card{padding:17px 11px}.step-card h3{font-size:18px}.step-card p{font-size:14px}.samples-wrap{padding:14px}.sample-page{min-height:178px;padding:8px}.sample-page strong{font-size:12px}.line-art{height:64px}.line-art span{font-size:34px}.adventure-card{font-size:14px;min-height:107px;padding:16px 8px 12px}.cards-grid{grid-template-columns:1fr}.info-card{padding:19px}.info-card p{font-size:15px}.audience-grid{grid-template-columns:1fr 1fr;gap:9px}.audience-card{padding:13px 10px;min-height:95px;gap:8px;font-size:14px}.audience-card span{font-size:25px}.testimonials-grid{grid-template-columns:1fr}.testimonial{padding-left:70px}.facts-row{padding:14px 8px}.facts-row b{font-size:25px}.facts-row span{font-size:11px}.bonus-grid{grid-template-columns:1fr}.bonus-card{padding:15px}.price-card{padding:23px 17px;border-radius:21px}.price{font-size:68px}.included-list{font-size:14px}.price-cta{font-size:16px}.guarantee-box{grid-template-columns:1fr;text-align:center;padding:24px 18px;gap:15px}.guarantee-seal{margin:auto}.guarantee-box .section-title{text-align:center}.guarantee-box .section-title h2{font-size:28px}.faq-question{font-size:16px;padding:15px}.final-section{padding:58px 0 60px}.final-section h2{font-size:36px}.final-section .container>p:not(.final-ps){font-size:17px}.final-offer{font-size:13px;flex-wrap:wrap}.footer-links{gap:14px}.footer-links a{font-size:12px}}
`;
