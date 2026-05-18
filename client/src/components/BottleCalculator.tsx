import { useState, useMemo } from 'react';
import { Cocktail } from '@/data/cocktails';
import { ChevronDown, Trash2 } from 'lucide-react';

interface BottleCalculatorProps {
  cocktails: Cocktail[];
}

interface SelectedCocktail {
  id: string;
  name: string;
  ingredients: string[];
  quantity: number;
}

interface BottleRequirement {
  name: string;
  totalMl: number;
  bottleSize: number;
  bottlesNeeded: number;
  cost: number;
}

const BOTTLE_PRICES: { [key: string]: number } = {
  'Gin': 28525,
  'Ron blanco': 20149,
  'Whisky': 92900,
  'Bourbon': 92900,
  'Rye Whisky': 92900,
  'Tequila': 35000,
  'Vodka': 23237,
  'Campari': 25000,
  'Vermouth Rosso': 15000,
  'Cointreau': 30000,
  'Crema de coco': 8000,
  'Angostura bitters': 5000,
  "Peychaud's bitters": 5000,
  'Licor de naranja': 30000,
  'Licor de café': 20000,
  'Prosecco': 18000,
  'Aperol': 22000,
  'Pisco': 40000,
  'Cachaça': 35000,
  'Cognac': 85000,
  'Cerveza': 3000,
  'Crema': 5000,
  'Triple Sec': 25000,
};

export default function BottleCalculator({ cocktails }: BottleCalculatorProps) {
  const [guests, setGuests] = useState<number>(10);
  const [selectedCocktails, setSelectedCocktails] = useState<SelectedCocktail[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const COCKTAILS_PER_PERSON = 4;

  // Calcular botellas necesarias
  const bottleRequirements = useMemo(() => {
    if (selectedCocktails.length === 0 || guests === 0) return [];

    const totalCocktails = guests * COCKTAILS_PER_PERSON;
    const ingredientTotals: { [key: string]: number } = {};

    selectedCocktails.forEach(selected => {
      const cocktail = cocktails.find(c => c.id === selected.id);
      if (!cocktail) return;

      const cocktailsOfThisType = Math.ceil((selected.quantity / 100) * totalCocktails);

      cocktail.ingredients.forEach(ingredient => {
        const mlMatch = ingredient.match(/(\d+)\s*ml/);
        const dashMatch = ingredient.match(/(dash|dashes)/);

        let amount = 0;
        let ingredientName = ingredient;

        if (mlMatch) {
          amount = parseInt(mlMatch[1]);
        } else if (dashMatch) {
          amount = 2; // 2ml por dash
        }

        // Buscar el nombre del ingrediente
        for (const [key] of Object.entries(BOTTLE_PRICES)) {
          if (ingredient.toLowerCase().includes(key.toLowerCase())) {
            ingredientName = key;
            break;
          }
        }

        if (amount > 0) {
          ingredientTotals[ingredientName] = (ingredientTotals[ingredientName] || 0) + (amount * cocktailsOfThisType);
        }
      });
    });

    // Convertir a requerimientos de botellas
    const requirements: BottleRequirement[] = Object.entries(ingredientTotals)
      .map(([name, totalMl]) => {
        const bottleSize = 700; // 700ml estándar
        const bottlesNeeded = Math.ceil(totalMl / bottleSize);
        const price = BOTTLE_PRICES[name] || 0;

        return {
          name,
          totalMl: Math.round(totalMl),
          bottleSize,
          bottlesNeeded,
          cost: price * bottlesNeeded,
        };
      })
      .sort((a, b) => b.bottlesNeeded - a.bottlesNeeded);

    return requirements;
  }, [selectedCocktails, guests, cocktails]);

  const totalCost = useMemo(() => {
    return bottleRequirements.reduce((sum, req) => sum + req.cost, 0);
  }, [bottleRequirements]);

  const totalBottles = useMemo(() => {
    return bottleRequirements.reduce((sum, req) => sum + req.bottlesNeeded, 0);
  }, [bottleRequirements]);

  const handleAddCocktail = (cocktail: Cocktail) => {
    const existing = selectedCocktails.find(c => c.id === cocktail.id);
    if (existing) {
      setSelectedCocktails(
        selectedCocktails.map(c =>
          c.id === cocktail.id ? { ...c, quantity: c.quantity + 10 } : c
        )
      );
    } else {
      setSelectedCocktails([
        ...selectedCocktails,
        {
          id: cocktail.id,
          name: cocktail.name,
          ingredients: cocktail.ingredients,
          quantity: 20, // 20% por defecto
        },
      ]);
    }
  };

  const handleRemoveCocktail = (id: string) => {
    setSelectedCocktails(selectedCocktails.filter(c => c.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCocktail(id);
    } else {
      setSelectedCocktails(
        selectedCocktails.map(c =>
          c.id === id ? { ...c, quantity: Math.min(100, quantity) } : c
        )
      );
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-[rgba(30,5,8,0.5)] to-[rgba(30,5,8,0.2)] rounded-3xl border border-[rgba(201,168,106,0.2)] p-8 mb-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-[#f5e7d3] mb-2">🍾 Calculadora de Botellas</h2>
        <p className="text-[rgba(255,255,255,0.6)]">Planifica tu fiesta: selecciona cocktails e ingresa invitados para calcular botellas necesarias</p>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Guests Input */}
        <div>
          <label className="block text-[#c9a86a] font-bold mb-2 text-sm">Número de Invitados</label>
          <input
            type="number"
            min="1"
            max="500"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.08)] border border-[rgba(201,168,106,0.2)] rounded-lg text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[rgba(201,168,106,0.5)] transition-colors"
          />
          <p className="text-xs text-[rgba(255,255,255,0.5)] mt-2">
            Total de cocktails: <span className="text-[#c9a86a] font-bold">{guests * COCKTAILS_PER_PERSON}</span> ({COCKTAILS_PER_PERSON} por persona)
          </p>
        </div>

        {/* Total Summary */}
        <div className="bg-[rgba(201,168,106,0.1)] border border-[rgba(201,168,106,0.2)] rounded-lg p-4 flex flex-col justify-center">
          <p className="text-[rgba(255,255,255,0.6)] text-sm mb-1">Resumen</p>
          <p className="text-2xl font-bold text-[#c9a86a] mb-1">{totalBottles} botellas</p>
          <p className="text-sm text-[rgba(255,255,255,0.5)]">Costo total: <span className="text-[#c9a86a] font-bold">${totalCost.toLocaleString('es-AR')}</span></p>
        </div>
      </div>

      {/* Cocktail Selection */}
      <div className="mb-8">
        <h3 className="text-[#c9a86a] font-bold mb-4 text-sm uppercase tracking-widest">Selecciona Cocktails</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
          {cocktails.map(cocktail => (
            <button
              key={cocktail.id}
              onClick={() => handleAddCocktail(cocktail)}
              className="px-3 py-2 bg-[rgba(201,168,106,0.1)] border border-[rgba(201,168,106,0.2)] text-[#c9a86a] text-xs font-medium rounded-lg hover:bg-[rgba(201,168,106,0.2)] hover:border-[rgba(201,168,106,0.4)] transition-all"
            >
              + {cocktail.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Cocktails */}
      {selectedCocktails.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[#c9a86a] font-bold mb-4 text-sm uppercase tracking-widest">Cocktails Seleccionados</h3>
          <div className="space-y-3">
            {selectedCocktails.map(selected => (
              <div key={selected.id} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(201,168,106,0.1)] rounded-lg p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-[#f5e7d3] font-semibold">{selected.name}</p>
                  <p className="text-xs text-[rgba(255,255,255,0.5)]">{selected.quantity}% de los cocktails</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={selected.quantity}
                    onChange={(e) => handleUpdateQuantity(selected.id, parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 bg-[rgba(255,255,255,0.08)] border border-[rgba(201,168,106,0.2)] rounded text-white text-sm text-center focus:outline-none focus:border-[rgba(201,168,106,0.5)]"
                  />
                  <button
                    onClick={() => handleRemoveCocktail(selected.id)}
                    className="p-2 hover:bg-[rgba(255,0,0,0.1)] rounded-lg transition-colors text-[rgba(255,255,255,0.5)] hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[rgba(255,255,255,0.5)] mt-3">
            Total distribuido: <span className="text-[#c9a86a] font-bold">{selectedCocktails.reduce((sum, c) => sum + c.quantity, 0)}%</span>
          </p>
        </div>
      )}

      {/* Bottle Requirements */}
      {bottleRequirements.length > 0 && (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 bg-[rgba(201,168,106,0.1)] border border-[rgba(201,168,106,0.2)] rounded-lg hover:bg-[rgba(201,168,106,0.15)] transition-colors mb-4"
          >
            <span className="text-[#c9a86a] font-bold">📋 Detalles de Botellas Necesarias</span>
            <ChevronDown size={20} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded && (
            <div className="space-y-3">
              {bottleRequirements.map((req, idx) => (
                <div key={idx} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(201,168,106,0.1)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#f5e7d3] font-semibold">{req.name}</h4>
                    <span className="px-3 py-1 bg-[rgba(201,168,106,0.2)] text-[#c9a86a] text-sm font-bold rounded-full">
                      {req.bottlesNeeded} botellas
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-[rgba(255,255,255,0.6)]">
                    <div>
                      <p className="text-[rgba(255,255,255,0.4)] mb-1">Total ml necesarios</p>
                      <p className="text-[#c9a86a] font-bold">{req.totalMl} ml</p>
                    </div>
                    <div>
                      <p className="text-[rgba(255,255,255,0.4)] mb-1">Tamaño botella</p>
                      <p className="text-[#c9a86a] font-bold">{req.bottleSize} ml</p>
                    </div>
                    <div>
                      <p className="text-[rgba(255,255,255,0.4)] mb-1">Costo total</p>
                      <p className="text-[#c9a86a] font-bold">${req.cost.toLocaleString('es-AR')}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Total Summary */}
              <div className="bg-gradient-to-r from-[rgba(201,168,106,0.2)] to-[rgba(201,168,106,0.1)] border border-[rgba(201,168,106,0.3)] rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[rgba(255,255,255,0.6)] text-sm mb-1">Costo Total de Botellas</p>
                    <p className="text-3xl font-bold text-[#c9a86a]">${totalCost.toLocaleString('es-AR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[rgba(255,255,255,0.6)] text-sm mb-1">Botellas Totales</p>
                    <p className="text-3xl font-bold text-[#c9a86a]">{totalBottles}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedCocktails.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[rgba(255,255,255,0.5)]">Selecciona al menos un cocktail para ver el cálculo de botellas</p>
        </div>
      )}
    </div>
  );
}
