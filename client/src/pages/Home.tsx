import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import CocktailSearch from '@/components/CocktailSearch';
import CocktailCard from '@/components/CocktailCard';
import BottleCalculator from '@/components/BottleCalculator';
import { Cocktail, cocktails as allCocktails } from '@/data/cocktails';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [filteredCocktails, setFilteredCocktails] = useState<Cocktail[]>(allCocktails);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      
      // Update active section
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = (e.currentTarget as HTMLElement).closest('.faq-item');
    if (item) {
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!item.classList.contains('open')) {
        item.classList.add('open');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f0]">
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[rgba(82,19,27,0.92)] backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="container flex justify-between items-center py-4 md:py-5">
          <a href="#" className="text-2xl font-bold text-[#f5e7d3]">
            Bar<span className="text-[#c9a86a]">Thunders</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#catalogo" className={`nav-link transition-colors ${activeSection === 'catalogo' ? 'text-[#c9a86a]' : 'text-[rgba(245,231,211,0.85)] hover:text-[#c9a86a]'}`}>
              Cocktails
            </a>
            <a href="#historia" className={`nav-link transition-colors ${activeSection === 'historia' ? 'text-[#c9a86a]' : 'text-[rgba(245,231,211,0.85)] hover:text-[#c9a86a]'}`}>
              Historia
            </a>
            <a href="#recetas" className={`nav-link transition-colors ${activeSection === 'recetas' ? 'text-[#c9a86a]' : 'text-[rgba(245,231,211,0.85)] hover:text-[#c9a86a]'}`}>
              Recetas
            </a>
            <a href="#calculadora" className={`nav-link transition-colors ${activeSection === 'calculadora' ? 'text-[#c9a86a]' : 'text-[rgba(245,231,211,0.85)] hover:text-[#c9a86a]'}`}>
              Calculadora
            </a>
            <a href="#descargas" className={`nav-link transition-colors ${activeSection === 'descargas' ? 'text-[#c9a86a]' : 'text-[rgba(245,231,211,0.85)] hover:text-[#c9a86a]'}`}>
              Cartas
            </a>
            <a href="#faq" className={`nav-link transition-colors ${activeSection === 'faq' ? 'text-[#c9a86a]' : 'text-[rgba(245,231,211,0.85)] hover:text-[#c9a86a]'}`}>
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a href="#descargas" className="btn-wine hidden md:inline-flex">
              📥 Descargar Cartas
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#f5e7d3] p-2 border border-[rgba(255,255,255,0.3)] rounded-lg"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#52131b] border-t border-white/10 p-4">
            <div className="flex flex-col gap-3">
              <a href="#catalogo" className="text-[#f5e7d3] hover:text-[#c9a86a]" onClick={() => setMobileMenuOpen(false)}>
                Cocktails
              </a>
              <a href="#historia" className="text-[#f5e7d3] hover:text-[#c9a86a]" onClick={() => setMobileMenuOpen(false)}>
                Historia
              </a>
              <a href="#recetas" className="text-[#f5e7d3] hover:text-[#c9a86a]" onClick={() => setMobileMenuOpen(false)}>
                Recetas
              </a>
              <a href="#descargas" className="text-[#f5e7d3] hover:text-[#c9a86a]" onClick={() => setMobileMenuOpen(false)}>
                Cartas
              </a>
              <a href="#faq" className="text-[#f5e7d3] hover:text-[#c9a86a]" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <a href="#descargas" className="btn-wine mt-2" onClick={() => setMobileMenuOpen(false)}>
                📥 Descargar Cartas
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="inicio" className="min-h-screen flex items-center relative pt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/manus-storage/hero-bar_a1b2c3d4.png)',
            transform: 'scale(1.05)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(30,5,8,0.82)] via-[rgba(52,13,19,0.72)] to-[rgba(20,5,8,0.78)]" />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[rgba(201,168,106,0.15)] border border-[rgba(201,168,106,0.35)] px-5 py-2 rounded-full mb-7 text-[#e8c98a] text-sm">
              ✨ Mixología interactiva · Recetas profesionales · Historia real
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Descubrí cocktails<br />
              con <em className="text-[#c9a86a] italic">historia,</em><br />
              técnica y personalidad.
            </h1>

            <p className="text-lg text-[rgba(255,255,255,0.82)] mb-10 max-w-xl leading-relaxed">
              Explorá recetas profesionales, ingredientes detallados, preparación paso a paso y el origen cultural detrás de cada cocktail clásico y moderno.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <a href="#catalogo" className="btn-wine">
                📚 Ver Catálogo
              </a>
              <a href="#descargas" className="px-7 py-3 rounded-full border-2 border-white/35 text-white font-medium inline-flex items-center gap-2 hover:bg-white/10 transition-all">
                📥 Descargar Cartas
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { number: `${allCocktails.length}+`, label: 'Cocktails documentados' },
                { number: '40+', label: 'Historias originales' },
                { number: '100%', label: 'Recetas profesionales' },
                { number: '⭐', label: 'Experiencia interactiva' },
              ].map((stat, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] p-6 rounded-2xl backdrop-blur-xl text-center hover:bg-[rgba(255,255,255,0.1)] transition-all">
                  <div className="text-2xl md:text-3xl font-bold text-[#c9a86a] mb-1">{stat.number}</div>
                  <div className="text-xs md:text-sm text-[rgba(255,255,255,0.7)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </section>

      {/* Features */}
      <section className="section-pad bg-[#fff8f0]">
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-label">¿Por qué BarThunders?</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#52131b] mb-4">¿Qué hace diferente a BarThunders?</h2>
            <p className="text-lg text-[#6d5c5c] max-w-2xl mx-auto">
              La mayoría de las páginas solo muestran nombres y fotos. BarThunders combina mixología educativa, storytelling, técnicas profesionales y experiencia visual premium.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🍸', title: 'Recetas Profesionales', desc: 'Preparaciones detalladas utilizadas por bartenders profesionales, explicadas paso a paso para principiantes y expertos.' },
              { icon: '📖', title: 'Historia Real', desc: 'Descubrí el origen cultural detrás de cada cocktail: épocas, personajes, ciudades y evolución histórica.' },
              { icon: '🧊', title: 'Técnicas & Preparación', desc: 'Tipos de hielo, garnish, cristalería, perfiles sensoriales y métodos de preparación explicados visualmente.' },
              { icon: '🔎', title: 'Búsqueda Inteligente', desc: 'Filtrá cocktails por sabor, tipo de alcohol, intensidad, ingredientes o estilo de preparación.' },
              { icon: '🎥', title: 'Experiencia Educativa', desc: 'Videos, explicaciones y contenido visual pensado para aprender mixología de manera entretenida.' },
              { icon: '📂', title: 'Cartas Descargables', desc: 'Descargá cartas premium para bares, eventos, inspiración o formación personal.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-[rgba(125,31,42,0.06)] hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-[#52131b] mb-3">{feature.title}</h3>
                <p className="text-[#6d5c5c] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cocktails Showcase with Search */}
      <section id="catalogo" className="section-pad bg-gradient-to-br from-[#2a0b0f] via-[#52131b] to-[#1a0508] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[rgba(201,168,106,0.08)] rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          <div className="text-center mb-12">
            <div className="section-label text-[#c9a86a]">Catálogo completo</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5e7d3] mb-4">Explorá nuestros cocktails</h2>
            <p className="text-lg text-[rgba(255,255,255,0.65)] max-w-2xl mx-auto">
              Busca por nombre, filtra por ingredientes, sabor y tipo. Descubre {allCocktails.length}+ cocktails profesionales.
            </p>
          </div>

          {/* Search and Filters */}
          <CocktailSearch onCocktailsChange={setFilteredCocktails} />

          {/* Cocktails Grid */}
          <div className="mt-12">
            {filteredCocktails.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                {filteredCocktails.map((cocktail) => (
                  <CocktailCard key={cocktail.id} cocktail={cocktail} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-[rgba(255,255,255,0.65)] mb-4">No se encontraron cocktails con esos criterios.</p>
                <button
                  onClick={() => setFilteredCocktails(allCocktails)}
                  className="px-6 py-2 bg-[#c9a86a] text-[#52131b] rounded-full font-medium hover:bg-[#e8c98a] transition-colors"
                >
                  Mostrar todos
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottle Calculator */}
      <section id="calculadora" className="section-pad bg-gradient-to-br from-[#52131b] via-[#2a0b0f] to-[#1a0508] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[rgba(201,168,106,0.08)] rounded-full blur-3xl pointer-events-none" />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <div className="section-label text-[#c9a86a]">Planificación de eventos</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f5e7d3] mb-4">Calcula botellas para tu fiesta</h2>
            <p className="text-lg text-[rgba(255,255,255,0.65)] max-w-2xl mx-auto">
              Selecciona los cocktails que deseas servir, ingresa la cantidad de invitados y obtén un cálculo exacto de botellas necesarias.
            </p>
          </div>
          <BottleCalculator cocktails={allCocktails} />
        </div>
      </section>

      {/* Timeline */}
      <section id="historia" className="section-pad bg-[#fff8f0]">
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-label">Línea del tiempo</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#52131b] mb-4">Explorá la evolución de la coctelería</h2>
            <p className="text-lg text-[#6d5c5c] max-w-2xl mx-auto">
              Una experiencia educativa diseñada para amantes de la mixología, bartenders y curiosos.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              { year: '1806', title: 'Primer uso del término Cocktail', desc: 'El término "cocktail" aparece documentado en periódicos estadounidenses describiendo bebidas alcohólicas mezcladas.' },
              { year: '1920', title: 'Era Speakeasy', desc: 'La prohibición en Estados Unidos impulsa bares clandestinos y nuevas técnicas para mejorar destilados de baja calidad.' },
              { year: '1980', title: 'Coctelería Moderna', desc: 'Surgen reinterpretaciones de clásicos y una nueva cultura premium alrededor de la mixología.' },
              { year: 'Actualidad', title: 'Experiencias Interactivas', desc: 'La mixología combina diseño, narrativa, tecnología y educación para crear experiencias inmersivas.' },
            ].map((item, i) => (
              <div key={i} className={`flex gap-6 mb-10 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-[#c9a86a] rounded-full border-4 border-[#fff8f0] shadow-lg" />
                  {i < 3 && <div className="w-1 h-20 bg-gradient-to-b from-[#7d1f2a] to-transparent mt-2" />}
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-[rgba(125,31,42,0.06)] flex-1">
                  <div className="text-[#7d1f2a] text-xs font-bold tracking-widest mb-2">{item.year}</div>
                  <h3 className="text-2xl font-bold text-[#52131b] mb-2">{item.title}</h3>
                  <p className="text-[#6d5c5c]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section id="recetas" className="section-pad bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-label">Contenido educativo</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#52131b] mb-4">Contenido diseñado para aprender y descubrir</h2>
            <p className="text-lg text-[#6d5c5c] max-w-2xl mx-auto">
              BarThunders está optimizado para búsquedas reales relacionadas con cocktails, recetas y cultura de bar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🍹', title: 'Cómo preparar Negroni', desc: 'Técnicas, hielo recomendado y proporciones exactas explicadas paso a paso.' },
              { icon: '📚', title: 'Historia del Mojito', desc: 'El recorrido histórico del cocktail más famoso del Caribe.' },
              { icon: '💧', title: 'Tipos de Gin', desc: 'Diferencias entre London Dry, Old Tom, Navy Strength y estilos modernos.' },
              { icon: '📄', title: 'Cartas Premium', desc: 'Descargá menús digitales con diseño elegante para inspiración o uso profesional.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#fff8f0] border border-[rgba(125,31,42,0.08)] p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#52131b] mb-2">{item.title}</h3>
                <p className="text-[#6d5c5c] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="descargas" className="section-pad bg-[#f5e7d3]">
        <div className="container">
          <div className="bg-white p-12 md:p-16 rounded-4xl shadow-lg text-center">
            <div className="section-label">Cartas digitales</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#52131b] mb-4">Descargá cartas premium</h2>
            <p className="text-lg text-[#6d5c5c] max-w-2xl mx-auto mb-12">
              Accedé a cartas digitales listas para explorar, compartir o utilizar como inspiración profesional.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '📚', title: 'Classic Collection', desc: 'Los cocktails clásicos más importantes de la historia con recetas y contexto histórico.' },
                { icon: '✨', title: 'Signature Cocktails', desc: 'Cocktails modernos y reinterpretaciones premium con técnicas contemporáneas.' },
                { icon: '🌿', title: 'Mocktails Collection', desc: 'Opciones sin alcohol con recetas creativas y visuales para toda ocasión.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#fff8f0] border border-[rgba(125,31,42,0.1)] p-6 rounded-2xl text-left hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-[#52131b] mb-2">{item.title}</h3>
                  <p className="text-[#6d5c5c] mb-6">{item.desc}</p>
                  <a href="#" className="btn-wine">
                    📥 Descargar PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad bg-[#fff8f0]">
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-label">Preguntas frecuentes</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#52131b] mb-4">Todo lo que necesitás saber</h2>
            <p className="text-lg text-[#6d5c5c] max-w-2xl mx-auto">
              Respuestas a las consultas más comunes sobre BarThunders.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {[
              { q: '¿Las recetas son aptas para principiantes?', a: 'Sí. Cada cocktail incluye explicaciones paso a paso, ingredientes y técnicas detalladas pensadas tanto para quienes se inician como para bartenders con experiencia.' },
              { q: '¿Puedo descargar cartas digitales?', a: 'Sí. BarThunders ofrece cartas premium descargables en formato digital, disponibles en tres colecciones: Classic, Signature y Mocktails.' },
              { q: '¿Incluyen cocktails sin alcohol?', a: 'Sí. También contamos con una colección completa de mocktails modernos con recetas creativas y visualmente atractivas.' },
              { q: '¿Las recetas son profesionales?', a: 'Sí. Las preparaciones están basadas en estándares de coctelería profesional y técnicas modernas utilizadas en bares de todo el mundo.' },
            ].map((item, i) => (
              <div key={i} className="faq-item bg-white border border-[rgba(125,31,42,0.06)] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                <div
                  className="faq-question p-6 cursor-pointer flex justify-between items-start gap-4"
                  onClick={toggleFaq}
                >
                  <h3 className="text-lg font-bold text-[#52131b]">{item.q}</h3>
                  <div className="faq-icon w-8 h-8 bg-[rgba(125,31,42,0.08)] rounded-full flex items-center justify-center text-[#7d1f2a] flex-shrink-0 transition-all">
                    +
                  </div>
                </div>
                <div className="faq-answer max-h-0 overflow-hidden transition-all duration-300">
                  <div className="px-6 pb-6 text-[#6d5c5c]">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1a0508] to-[#52131b] text-[#f5e7d3] py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[rgba(201,168,106,0.06)] rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-4">
            Bar<span className="text-[#c9a86a]">Thunders</span>
          </h2>
          <p className="text-lg text-[rgba(255,255,255,0.65)] max-w-xl mx-auto mb-8">
            Una experiencia interactiva para descubrir cocktails, historia, creatividad y cultura de bar.
          </p>
          <a href="#catalogo" className="btn-gold mb-12">
            🍹 Explorar Cocktails
          </a>

          <div className="border-t border-[rgba(255,255,255,0.1)] pt-8 mb-8">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a href="#catalogo" className="text-[rgba(255,255,255,0.55)] hover:text-[#c9a86a] transition-colors">
                Cocktails
              </a>
              <a href="#historia" className="text-[rgba(255,255,255,0.55)] hover:text-[#c9a86a] transition-colors">
                Historia
              </a>
              <a href="#recetas" className="text-[rgba(255,255,255,0.55)] hover:text-[#c9a86a] transition-colors">
                Recetas
              </a>
              <a href="#descargas" className="text-[rgba(255,255,255,0.55)] hover:text-[#c9a86a] transition-colors">
                Cartas
              </a>
              <a href="#faq" className="text-[rgba(255,255,255,0.55)] hover:text-[#c9a86a] transition-colors">
                FAQ
              </a>
            </div>
          </div>

          <p className="text-[rgba(255,255,255,0.35)] text-sm">
            © 2025 BarThunders. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#7d1f2a] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#52131b] hover:-translate-y-1 transition-all opacity-0 pointer-events-none"
        id="backToTop"
        style={{
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
        }}
      >
        ↑
      </button>

      {/* Add CSS for FAQ accordion */}
      <style>{`
        .faq-item.open .faq-answer {
          max-height: 500px;
        }
        .faq-item.open .faq-icon {
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  );
}
