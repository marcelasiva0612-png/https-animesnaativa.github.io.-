import React, { useState } from 'react';

// Animes na Ativa - Single-file React landing page
// Tailwind CSS is used for styling (install Tailwind in your project).
// Usage:
// 1) Create a React app (Vite / Create React App) and install Tailwind.
// 2) Place this file in src/ as `AnimesNaAtiva.jsx` and import it in index.js: `import App from './AnimesNaAtiva';` then render <App />.
// 3) Add images to /public/images: naruto.jpg, dragonball.jpg, onepiece.jpg (or update the `image` fields below with your URLs).

export default function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const posts = [
    {
      id: 1,
      anime: 'Naruto',
      title: 'Shinobi: a origem do chakra',
      image: '/images/naruto.jpg',
      excerpt:
        'Curiosidade: o chakra em Naruto foi inspirado por mitologias japonesas e rituais ninjas — e o mangá mudou conceitos do shonen.',
      link: '#',
    },
    {
      id: 2,
      anime: 'Dragon Ball',
      title: 'O significado do Super Saiyajin',
      image: '/images/dragonball.jpg',
      excerpt:
        'Curiosidade: o Super Saiyajin teve suas raízes em lendas e no desejo de Toriyama por batalhas cada vez mais épicas — saiba mais sobre as transformações.',
      link: '#',
    },
    {
      id: 3,
      anime: 'One Piece',
      title: 'O mistério do "D" e a vontade do autor',
      image: '/images/onepiece.jpg',
      excerpt:
        'Curiosidade: Eiichiro Oda planejou muitos detalhes do mundo de One Piece desde cedo — o "D" carrega segredos importantes na trama.',
      link: '#',
    },
    {
      id: 4,
      anime: 'Naruto',
      title: 'Jutsus que mudaram batalhas',
      image: '/images/naruto2.jpg',
      excerpt:
        'Curiosidade: alguns jutsus têm inspiração em técnicas históricas e simbolismos do folclore japonês.',
      link: '#',
    },
  ];

  const filtered = posts.filter((p) => (filter === 'all' ? true : p.anime === filter));
  const visible = filtered.filter(
    (p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 text-slate-800">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <Hero />

        <section className="mt-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>Todos</FilterButton>
              <FilterButton active={filter === 'Naruto'} onClick={() => setFilter('Naruto')}>Naruto</FilterButton>
              <FilterButton active={filter === 'Dragon Ball'} onClick={() => setFilter('Dragon Ball')}>Dragon Ball</FilterButton>
              <FilterButton active={filter === 'One Piece'} onClick={() => setFilter('One Piece')}>One Piece</FilterButton>
            </div>

            <div className="flex items-center gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquisar curiosidades..."
                className="p-2 rounded-lg border w-full md:w-72"
              />
              <a href="#contact" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Contato</a>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((post) => (
              <CuriosityCard key={post.id} post={post} />
            ))}

            {visible.length === 0 && (
              <div className="col-span-full p-6 bg-white rounded-lg shadow text-center">Nenhuma curiosidade encontrada.</div>
            )}
          </div>
        </section>

        <Gallery />

        <About />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white/60 backdrop-blur sticky top-0 z-40 border-b">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-extrabold">A</div>
          <div>
            <div className="font-bold">Animes na Ativa</div>
            <div className="text-xs text-slate-500">Curiosidades, imagens e paixão por animes</div>
          </div>
        </a>

        <nav className="hidden md:flex gap-6 text-sm items-center">
          <a href="#curiosidades" className="hover:underline">Curiosidades</a>
          <a href="#gallery" className="hover:underline">Galeria</a>
          <a href="#about" className="hover:underline">Sobre</a>
          <a href="#contact" className="px-3 py-1 rounded-md bg-indigo-600 text-white">Contato</a>
        </nav>

        <div className="md:hidden">
          <a href="#contact" className="px-3 py-1 rounded-md bg-indigo-600 text-white">Contato</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="rounded-2xl p-8 bg-gradient-to-br from-purple-100 to-pink-100 shadow-md">
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">Animes na Ativa</h1>
          <p className="mt-2 text-slate-700">Curiosidades, imagens e fatos sobre os seus animes favoritos — Naruto, Dragon Ball, One Piece e muito mais.</p>

          <div className="mt-4 flex gap-3">
            <a href="#curiosidades" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Ver curiosidades</a>
            <a href="#gallery" className="px-4 py-2 rounded-lg border">Galeria</a>
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <div className="w-56 h-36 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center text-slate-400">Logo / Banner</div>
        </div>
      </div>
    </section>
  );
}

function FilterButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm ${
        active ? 'bg-indigo-600 text-white' : 'bg-white border'
      }`}
    >
      {children}
    </button>
  );
}

function CuriosityCard({ post }) {
  return (
    <article className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-40 bg-slate-100 overflow-hidden">
        {/* Replace images in /public/images or use absolute URLs */}
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="text-xs text-slate-500">{post.anime}</div>
        <h3 className="font-semibold mt-1">{post.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <a href={post.link} className="text-sm text-indigo-600">Leia mais</a>
          <div className="text-xs text-slate-400">#curiosidade</div>
        </div>
      </div>
    </article>
  );
}

function Gallery() {
  const items = [
    { id: 'n', title: 'Naruto', img: '/images/naruto.jpg' },
    { id: 'd', title: 'Dragon Ball', img: '/images/dragonball.jpg' },
    { id: 'o', title: 'One Piece', img: '/images/onepiece.jpg' },
  ];

  return (
    <section id="gallery" className="mt-12">
      <h2 className="text-2xl font-bold">Galeria em destaque</h2>
      <p className="text-slate-600 mt-1">Imagens dos principais animes que inspiram o site.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.id} className="rounded-lg overflow-hidden shadow bg-white">
            <div className="h-44 bg-slate-100">
              <img src={it.img} alt={it.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-slate-500">Clique para ver curiosidades relacionadas.</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mt-12 bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-bold">Sobre o Animes na Ativa</h2>
      <p className="mt-2 text-slate-600">Um espaço feito por fãs para fãs: aqui reunimos curiosidades, imagens e fatos interessantes sobre animes clássicos e lançamentos. Se você tem uma curiosidade legal, envie pra gente!</p>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mt-8">
      <h2 className="text-xl font-bold">Contato</h2>
      <p className="text-slate-600 mt-1">Quer colaborar? Envie um e-mail ou nos siga nas redes.</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Formulário enviado. Integre com backend ou use mailto para envio real.');
          }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <input required placeholder="Nome" className="w-full p-2 rounded border mb-2" />
          <input required placeholder="Email" type="email" className="w-full p-2 rounded border mb-2" />
          <textarea required placeholder="Mensagem" className="w-full p-2 rounded border mb-2" rows={4} />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Enviar</button>
        </form>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">Redes sociais</h3>
          <ul className="mt-2 text-slate-600">
            <li>Instagram: @animesnaativa</li>
            <li>YouTube: Animes na Ativa</li>
            <li>TikTok: @animesnaativa</li>
          </ul>

          <div className="mt-4">
            <a href="#" className="inline-block px-3 py-2 border rounded">Instagram</a>
            <a href="#" className="inline-block px-3 py-2 border rounded ml-2">YouTube</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-12 py-6">
      <div className="max-w-6xl mx-auto px-6 text-sm text-slate-500">© {new Date().getFullYear()} Animes na Ativa — feito com ❤️ para fãs de anime.</div>
    </footer>
  );
}
