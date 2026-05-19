import { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { Cocktail } from '@/data/cocktails';

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard = memo(function CocktailCard({ cocktail }: CocktailCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-3xl overflow-hidden hover:scale-105 hover:border-[rgba(201,168,106,0.3)] transition-all cursor-pointer flex flex-col h-full"
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
      aria-expanded={isExpanded}
    >
      {/* Image Section - Lazy loaded */}
      <div className="relative h-64 bg-cover bg-center flex-shrink-0 bg-[rgba(0,0,0,0.2)]">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,5,8,0.8)] to-transparent" />
        <span className="absolute top-4 right-4 bg-[rgba(201,168,106,0.9)] text-[#52131b] text-xs font-bold px-3 py-1 rounded-full">
          {cocktail.badge}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-6 bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-[rgba(30,5,8,0.3)] flex flex-col flex-grow">
        <h3 className="text-3xl font-bold text-[#f5e7d3] mb-2">{cocktail.name}</h3>
        <p className="text-[rgba(255,255,255,0.65)] mb-4 text-sm leading-relaxed flex-grow">
          {cocktail.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cocktail.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-[rgba(201,168,106,0.12)] border border-[rgba(201,168,106,0.2)] text-[#e8c98a] text-xs font-medium rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metadata Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-[rgba(201,168,106,0.08)] text-[#c9a86a] text-xs font-bold rounded-full whitespace-nowrap">
            🍷 {cocktail.flavor}
          </span>
          <span className="px-3 py-1 bg-[rgba(201,168,106,0.08)] text-[#c9a86a] text-xs font-bold rounded-full whitespace-nowrap">
            🎯 {cocktail.type}
          </span>
          <span className="px-3 py-1 bg-[rgba(201,168,106,0.08)] text-[#c9a86a] text-xs font-bold rounded-full whitespace-nowrap">
            🥃 {cocktail.alcohol}
          </span>
        </div>

        {/* Expandable Content */}
        <div
          className={`border-t border-[rgba(255,255,255,0.08)] pt-4 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-[800px]' : 'max-h-0'
          }`}
        >
          {/* Precios */}
          {cocktail.preparationCost && cocktail.salePrice && (
            <div className="mb-4 space-y-3">
              {/* Precio de Venta Destacado */}
              <div className="p-4 bg-gradient-to-r from-[rgba(201,168,106,0.2)] to-[rgba(201,168,106,0.1)] border border-[rgba(201,168,106,0.3)] rounded-lg">
                <p className="text-[#c9a86a] text-xs font-bold tracking-widest uppercase mb-1">
                  Precio de Venta Sugerido
                </p>
                <p className="text-white text-2xl font-bold">
                  ${cocktail.salePrice.toLocaleString('es-AR')}
                </p>
                <p className="text-[rgba(255,255,255,0.6)] text-xs mt-1">Margen: {cocktail.margin}%</p>
              </div>

              {/* Costo de Preparación */}
              <div className="p-3 bg-[rgba(201,168,106,0.1)] border border-[rgba(201,168,106,0.2)] rounded-lg">
                <p className="text-[#c9a86a] text-sm font-bold mb-2">
                  💰 Costo de preparación: ${cocktail.preparationCost.toLocaleString('es-AR')}
                </p>
                {cocktail.ingredientPrices && (
                  <div className="text-xs text-[rgba(255,255,255,0.6)] space-y-1">
                    <p className="font-semibold text-[#c9a86a] mb-2">Desglose:</p>
                    {Object.entries(cocktail.ingredientPrices).map(([ingredient, price]) => (
                      <div key={ingredient} className="flex justify-between">
                        <span>{ingredient}</span>
                        <span className="font-semibold text-[#c9a86a]">
                          ${price.toLocaleString('es-AR')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <h4 className="text-[#c9a86a] text-xs font-bold tracking-widest mb-3 uppercase">
            Ingredientes
          </h4>
          <ul className="text-[rgba(255,255,255,0.7)] text-sm mb-4 space-y-1">
            {cocktail.ingredients.map((ing, j) => (
              <li key={j}>— {ing}</li>
            ))}
          </ul>
          <h4 className="text-[#c9a86a] text-xs font-bold tracking-widest mb-3 uppercase">
            Preparación
          </h4>
          <ol className="text-[rgba(255,255,255,0.7)] text-sm space-y-2">
            {cocktail.preparation.map((step, j) => (
              <li key={j} className="flex gap-2">
                <span className="text-[#c9a86a] font-bold flex-shrink-0">{j + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-[#c9a86a] hover:bg-[rgba(201,168,106,0.1)] rounded-lg transition-colors text-sm font-medium"
            aria-label={isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
          >
            {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
            <ChevronDown
              size={16}
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
});

export default CocktailCard;
