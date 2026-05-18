import { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Cocktail, cocktails } from '@/data/cocktails';

interface CocktailSearchProps {
  onCocktailsChange?: (cocktails: Cocktail[]) => void;
}

export default function CocktailSearch({ onCocktailsChange }: CocktailSearchProps) {
  const [searchName, setSearchName] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAlcohols, setSelectedAlcohols] = useState<string[]>([]);

  // Get unique values for filters
  const uniqueFlavors = Array.from(new Set(cocktails.map(c => c.flavor)));
  const uniqueTypes = Array.from(new Set(cocktails.map(c => c.type)));
  const uniqueAlcohols = Array.from(new Set(cocktails.map(c => c.alcohol)));
  
  // Extract all unique ingredients
  const allIngredients = Array.from(
    new Set(cocktails.flatMap(c => c.ingredients.map(ing => ing.split(' ').slice(1).join(' ').toLowerCase())))
  ).sort();

  // Filter cocktails based on search and filters
  const filteredCocktails = useMemo(() => {
    return cocktails.filter(cocktail => {
      // Search by name
      const matchesName = cocktail.name.toLowerCase().includes(searchName.toLowerCase());

      // Filter by ingredients (all selected ingredients must be in the cocktail)
      const matchesIngredients = selectedIngredients.length === 0 || 
        selectedIngredients.every(ingredient =>
          cocktail.ingredients.some(ing => ing.toLowerCase().includes(ingredient.toLowerCase()))
        );

      // Filter by flavor
      const matchesFlavor = selectedFlavors.length === 0 || selectedFlavors.includes(cocktail.flavor);

      // Filter by type
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(cocktail.type);

      // Filter by alcohol
      const matchesAlcohol = selectedAlcohols.length === 0 || selectedAlcohols.includes(cocktail.alcohol);

      return matchesName && matchesIngredients && matchesFlavor && matchesType && matchesAlcohol;
    });
  }, [searchName, selectedIngredients, selectedFlavors, selectedTypes, selectedAlcohols]);

  // Notify parent of filtered results using useEffect to avoid setState during render
  useEffect(() => {
    onCocktailsChange?.(filteredCocktails);
  }, [filteredCocktails, onCocktailsChange]);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleFlavor = (flavor: string) => {
    setSelectedFlavors(prev =>
      prev.includes(flavor)
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleAlcohol = (alcohol: string) => {
    setSelectedAlcohols(prev =>
      prev.includes(alcohol)
        ? prev.filter(a => a !== alcohol)
        : [...prev, alcohol]
    );
  };

  const clearAllFilters = () => {
    setSearchName('');
    setSelectedIngredients([]);
    setSelectedFlavors([]);
    setSelectedTypes([]);
    setSelectedAlcohols([]);
  };

  const hasActiveFilters = searchName || selectedIngredients.length > 0 || selectedFlavors.length > 0 || selectedTypes.length > 0 || selectedAlcohols.length > 0;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-[rgba(125,31,42,0.06)]">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#7d1f2a]" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre de cocktail..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-[#e8c98a] rounded-xl focus:outline-none focus:border-[#7d1f2a] transition-colors text-[#2c1d1d] placeholder-[#6d5c5c]"
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="space-y-6">
        {/* Flavor Filter */}
        <div>
          <h3 className="text-lg font-bold text-[#52131b] mb-3">Sabor</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueFlavors.map(flavor => (
              <button
                key={flavor}
                onClick={() => toggleFlavor(flavor)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFlavors.includes(flavor)
                    ? 'bg-[#7d1f2a] text-white'
                    : 'bg-[#f5e7d3] text-[#52131b] hover:bg-[#e8c98a]'
                }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <h3 className="text-lg font-bold text-[#52131b] mb-3">Tipo</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTypes.includes(type)
                    ? 'bg-[#7d1f2a] text-white'
                    : 'bg-[#f5e7d3] text-[#52131b] hover:bg-[#e8c98a]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Alcohol Filter */}
        <div>
          <h3 className="text-lg font-bold text-[#52131b] mb-3">Base Alcohólica</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueAlcohols.map(alcohol => (
              <button
                key={alcohol}
                onClick={() => toggleAlcohol(alcohol)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedAlcohols.includes(alcohol)
                    ? 'bg-[#7d1f2a] text-white'
                    : 'bg-[#f5e7d3] text-[#52131b] hover:bg-[#e8c98a]'
                }`}
              >
                {alcohol}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients Filter */}
        <div>
          <h3 className="text-lg font-bold text-[#52131b] mb-3">Ingredientes</h3>
          <div className="flex flex-wrap gap-2">
            {allIngredients.slice(0, 12).map(ingredient => (
              <button
                key={ingredient}
                onClick={() => toggleIngredient(ingredient)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedIngredients.includes(ingredient)
                    ? 'bg-[#c9a86a] text-white'
                    : 'bg-[#f5e7d3] text-[#52131b] hover:bg-[#e8c98a]'
                }`}
              >
                {ingredient}
              </button>
            ))}
          </div>
          {allIngredients.length > 12 && (
            <p className="text-xs text-[#6d5c5c] mt-2">
              +{allIngredients.length - 12} ingredientes más disponibles
            </p>
          )}
        </div>
      </div>

      {/* Results and Clear Button */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#e8c98a]">
        <div className="text-sm text-[#6d5c5c]">
          <span className="font-bold text-[#52131b]">{filteredCocktails.length}</span> cocktails encontrados
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7d1f2a] hover:bg-[#f5e7d3] rounded-lg transition-colors"
          >
            <X size={16} />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
