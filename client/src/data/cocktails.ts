// Precios de botellas en ARS (Mayo 2026) - Fuentes: Carrefour.com.ar y Gobar.com.ar
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
};

// Función para calcular el costo de un cocktail
function calculateCocktailCost(ingredients: string[]): { prices: { [key: string]: number }, total: number } {
  const prices: { [key: string]: number } = {};
  let total = 0;

  ingredients.forEach(ingredient => {
    // Extraer la cantidad (en ml o unidades)
    const mlMatch = ingredient.match(/(\d+)\s*ml/);
    const dashMatch = ingredient.match(/(dash|dashes)/);
    
    let amount = 0;
    let ingredientName = ingredient;

    if (mlMatch) {
      amount = parseInt(mlMatch[1]);
    } else if (dashMatch) {
      amount = 2; // 2ml por dash
    }

    // Buscar el precio de la botella
    let basePrice = 0;
    for (const [key, price] of Object.entries(BOTTLE_PRICES)) {
      if (ingredient.toLowerCase().includes(key.toLowerCase())) {
        basePrice = price;
        ingredientName = key;
        break;
      }
    }

    // Calcular costo proporcional
    if (basePrice > 0 && amount > 0) {
      const costPerMl = basePrice / 700; // Asumiendo botellas de 700ml
      const ingredientCost = costPerMl * amount;
      prices[ingredient] = Math.round(ingredientCost);
      total += ingredientCost;
    } else if (basePrice > 0) {
      // Para ingredientes sin cantidad específica
      prices[ingredient] = Math.round(basePrice * 0.1); // 10% del precio de la botella
      total += basePrice * 0.1;
    } else {
      // Ingredientes frescos y otros (estimado)
      prices[ingredient] = 500;
      total += 500;
    }
  });

  return { prices, total: Math.round(total) };
}

export interface Cocktail {
  id: string;
  name: string;
  badge: string;
  image: string;
  description: string;
  tags: string[];
  ingredients: string[];
  preparation: string[];
  flavor: 'Amargo' | 'Dulce' | 'Refrescante' | 'Intenso' | 'Suave' | 'Herbáceo' | 'Afrutado';
  type: 'Clásico' | 'Moderno' | 'Caribeño' | 'Tropical' | 'Vintage' | 'Contemporáneo' | 'Sin Alcohol';
  alcohol: 'Gin' | 'Ron' | 'Whisky' | 'Vodka' | 'Tequila' | 'Brandy' | 'Licor' | 'Sin Alcohol';
  ingredientPrices?: { [key: string]: number }; // Precios en ARS
  preparationCost?: number; // Costo total de preparación en ARS
}

export const cocktails: Cocktail[] = [
  (() => {
    const negroniIngredients = ['30 ml Gin', '30 ml Campari', '30 ml Vermouth Rosso', 'Piel de naranja'];
    const negroniCost = calculateCocktailCost(negroniIngredients);
    return {
      id: 'negroni',
      name: 'Negroni',
      badge: 'Clásico Italiano',
      image: '/manus-storage/negroni_a1b2c3d4.png',
      description: 'Nacido en Florencia alrededor de 1919, el Negroni se convirtió en uno de los cocktails más icónicos de la coctelería italiana.',
      tags: ['Gin', 'Amargo', 'Clásico'],
      ingredients: negroniIngredients,
      preparation: ['Agregar hielo grande al vaso.', 'Verter ingredientes y mezclar suavemente.', 'Perfumar con piel de naranja.'],
      flavor: 'Amargo',
      type: 'Clásico',
      alcohol: 'Gin',
      ingredientPrices: negroniCost.prices,
      preparationCost: negroniCost.total,
    };
  })(),
  (() => {
    const mojitoIngredients = ['50 ml Ron blanco', 'Hierbabuena fresca', 'Azúcar', 'Jugo de lima', 'Soda'];
    const mojitoCost = calculateCocktailCost(mojitoIngredients);
    return {
      id: 'mojito',
      name: 'Mojito',
      badge: 'Caribeño',
      image: '/manus-storage/mojito_a1b2c3d4.png',
      description: 'Originario de Cuba, el Mojito evolucionó desde mezclas medicinales del siglo XVI hasta convertirse en símbolo del Caribe.',
      tags: ['Ron', 'Refrescante', 'Caribeño'],
      ingredients: mojitoIngredients,
      preparation: ['Macerar suavemente la hierbabuena.', 'Agregar hielo triturado.', 'Completar con soda y decorar.'],
      flavor: 'Refrescante',
      type: 'Caribeño',
      alcohol: 'Ron',
      ingredientPrices: mojitoCost.prices,
      preparationCost: mojitoCost.total,
    };
  })(),
  (() => {
    const oldFashionedIngredients = ['60 ml Bourbon', 'Azúcar', 'Angostura bitters', 'Piel de naranja'];
    const oldFashionedCost = calculateCocktailCost(oldFashionedIngredients);
    return {
      id: 'old-fashioned',
      name: 'Old Fashioned',
      badge: 'Vintage',
      image: '/manus-storage/old-fashioned_a1b2c3d4.png',
      description: 'Considerado uno de los primeros cocktails modernos documentados en Estados Unidos durante el siglo XIX.',
      tags: ['Whisky', 'Intenso', 'Vintage'],
      ingredients: oldFashionedIngredients,
      preparation: ['Disolver azúcar y bitters.', 'Agregar hielo grande.', 'Incorporar bourbon y mezclar.'],
      flavor: 'Intenso',
      type: 'Vintage',
      alcohol: 'Whisky',
      ingredientPrices: oldFashionedCost.prices,
      preparationCost: oldFashionedCost.total,
    };
  })(),
  (() => {
    const margaritaIngredients = ['50 ml Tequila', '25 ml Cointreau', '25 ml Jugo de lima fresco', 'Sal para el borde'];
    const margaritaCost = calculateCocktailCost(margaritaIngredients);
    return {
      id: 'margarita',
      name: 'Margarita',
      badge: 'Mexicano Clásico',
      image: '/manus-storage/negroni_a1b2c3d4.png',
      description: 'El cocktail mexicano por excelencia, perfecto para cualquier ocasión. Refrescante y con un equilibrio perfecto entre dulce y ácido.',
      tags: ['Tequila', 'Afrutado', 'Refrescante'],
      ingredients: margaritaIngredients,
      preparation: ['Humedecer el borde con lima.', 'Pasar por sal.', 'Verter en vaso con hielo.', 'Decorar con rodaja de lima.'],
      flavor: 'Afrutado',
      type: 'Clásico',
      alcohol: 'Tequila',
      ingredientPrices: margaritaCost.prices,
      preparationCost: margaritaCost.total,
    };
  })(),
  (() => {
    const daiquiriIngredients = ['50 ml Ron blanco', '25 ml Jugo de lima fresco', '15 ml Jarabe simple'];
    const daiquiriCost = calculateCocktailCost(daiquiriIngredients);
    return {
      id: 'daiquiri',
      name: 'Daiquiri',
      badge: 'Cubano Refrescante',
      image: '/manus-storage/mojito_a1b2c3d4.png',
      description: 'Bebida cubana simple pero elegante, con un balance perfecto entre ron, limón y azúcar.',
      tags: ['Ron', 'Refrescante', 'Clásico'],
      ingredients: daiquiriIngredients,
      preparation: ['Verter todos los ingredientes en coctelera.', 'Agitar vigorosamente con hielo.', 'Colar en copa de coctel.'],
      flavor: 'Refrescante',
      type: 'Clásico',
      alcohol: 'Ron',
      ingredientPrices: daiquiriCost.prices,
      preparationCost: daiquiriCost.total,
    };
  })(),
  (() => {
    const manhattanIngredients = ['50 ml Whisky', '20 ml Vermouth Rosso', '2 dashes Angostura bitters', 'Cereza'];
    const manhattanCost = calculateCocktailCost(manhattanIngredients);
    return {
      id: 'manhattan',
      name: 'Manhattan',
      badge: 'Clásico Americano',
      image: '/manus-storage/old-fashioned_a1b2c3d4.png',
      description: 'Uno de los cocktails más sofisticados, con un sabor profundo y elegante que ha perdurado desde el siglo XIX.',
      tags: ['Whisky', 'Intenso', 'Sofisticado'],
      ingredients: manhattanIngredients,
      preparation: ['Verter en vaso mezclador con hielo.', 'Mezclar hasta enfriar.', 'Colar en copa de coctel.', 'Decorar con cereza.'],
      flavor: 'Intenso',
      type: 'Vintage',
      alcohol: 'Whisky',
      ingredientPrices: manhattanCost.prices,
      preparationCost: manhattanCost.total,
    };
  })(),
  (() => {
    const pinaColadaIngredients = ['50 ml Ron blanco', '100 ml Crema de coco', '100 ml Jugo de piña fresco', 'Piña para decorar'];
    const pinaColadaCost = calculateCocktailCost(pinaColadaIngredients);
    return {
      id: 'pina-colada',
      name: 'Piña Colada',
      badge: 'Tropical Caribeño',
      image: '/manus-storage/mojito_a1b2c3d4.png',
      description: 'Bebida tropical por excelencia, suave y cremosa con sabores de piña y coco que transportan al Caribe.',
      tags: ['Ron', 'Tropical', 'Cremoso'],
      ingredients: pinaColadaIngredients,
      preparation: ['Verter ron, crema de coco y jugo de piña en licuadora.', 'Agregar hielo.', 'Licuar hasta obtener consistencia cremosa.', 'Servir en vaso tropical.'],
      flavor: 'Dulce',
      type: 'Tropical',
      alcohol: 'Ron',
      ingredientPrices: pinaColadaCost.prices,
      preparationCost: pinaColadaCost.total,
    };
  })(),
  (() => {
    const gimletIngredients = ['50 ml Gin', '25 ml Jugo de lima fresco', '15 ml Jarabe de lima'];
    const gimletCost = calculateCocktailCost(gimletIngredients);
    return {
      id: 'gimlet',
      name: 'Gimlet',
      badge: 'Clásico Británico',
      image: '/manus-storage/negroni_a1b2c3d4.png',
      description: 'Cocktail británico simple pero efectivo, con un sabor cítrico y herbáceo muy refrescante.',
      tags: ['Gin', 'Refrescante', 'Cítrico'],
      ingredients: gimletIngredients,
      preparation: ['Verter gin y jugo de lima en coctelera.', 'Agitar con hielo.', 'Colar en copa de coctel.', 'Decorar con rodaja de lima.'],
      flavor: 'Refrescante',
      type: 'Clásico',
      alcohol: 'Gin',
      ingredientPrices: gimletCost.prices,
      preparationCost: gimletCost.total,
    };
  })(),
  (() => {
    const cosmopolitanIngredients = ['40 ml Vodka', '15 ml Licor de naranja', '25 ml Jugo de arándano', '10 ml Jugo de lima'];
    const cosmopolitanCost = calculateCocktailCost(cosmopolitanIngredients);
    return {
      id: 'cosmopolitan',
      name: 'Cosmopolitan',
      badge: 'Moderno Sofisticado',
      image: '/manus-storage/negroni_a1b2c3d4.png',
      description: 'Cocktail moderno y elegante, popular desde los años 80, con un color rojo vibrante y sabor afrutado.',
      tags: ['Vodka', 'Afrutado', 'Moderno'],
      ingredients: cosmopolitanIngredients,
      preparation: ['Verter todos los ingredientes en coctelera.', 'Agitar con hielo.', 'Colar en copa de coctel.', 'Decorar con rodaja de naranja.'],
      flavor: 'Afrutado',
      type: 'Moderno',
      alcohol: 'Vodka',
      ingredientPrices: cosmopolitanCost.prices,
      preparationCost: cosmopolitanCost.total,
    };
  })(),
  (() => {
    const margaritaFrozenIngredients = ['50 ml Tequila', '25 ml Cointreau', '25 ml Jugo de lima', 'Hielo picado'];
    const margaritaFrozenCost = calculateCocktailCost(margaritaFrozenIngredients);
    return {
      id: 'margarita-frozen',
      name: 'Margarita Frozen',
      badge: 'Tropical Moderno',
      image: '/manus-storage/mojito_a1b2c3d4.png',
      description: 'Versión helada y refrescante de la margarita clásica, perfecta para días calurosos.',
      tags: ['Tequila', 'Tropical', 'Refrescante'],
      ingredients: margaritaFrozenIngredients,
      preparation: ['Licuar tequila, cointreau y jugo de lima con hielo.', 'Servir en vaso con borde de sal.', 'Decorar con rodaja de lima.'],
      flavor: 'Refrescante',
      type: 'Moderno',
      alcohol: 'Tequila',
      ingredientPrices: margaritaFrozenCost.prices,
      preparationCost: margaritaFrozenCost.total,
    };
  })(),
  (() => {
    const sazeracIngredients = ['60 ml Rye Whisky', '1 dash Angostura bitters', '1 dash Peychaud\'s bitters', 'Piel de limón'];
    const sazeracCost = calculateCocktailCost(sazeracIngredients);
    return {
      id: 'sazerac',
      name: 'Sazerac',
      badge: 'Clásico de Nueva Orleans',
      image: '/manus-storage/old-fashioned_a1b2c3d4.png',
      description: 'Cocktail histórico de Nueva Orleans, con sabor intenso y herbáceo gracias al anís.',
      tags: ['Whisky', 'Intenso', 'Herbáceo'],
      ingredients: sazeracIngredients,
      preparation: ['Enfriar vaso con hielo.', 'Verter bitters.', 'Agregar whisky.', 'Decorar con piel de limón.'],
      flavor: 'Intenso',
      type: 'Vintage',
      alcohol: 'Whisky',
      ingredientPrices: sazeracCost.prices,
      preparationCost: sazeracCost.total,
    };
  })(),
  (() => {
    const mojitoFresaIngredients = ['50 ml Ron blanco', 'Fresas frescas', 'Hierbabuena', 'Azúcar', 'Jugo de lima', 'Soda'];
    const mojitoFresaCost = calculateCocktailCost(mojitoFresaIngredients);
    return {
      id: 'mojito-fresa',
      name: 'Mojito de Fresa',
      badge: 'Tropical Moderno',
      image: '/manus-storage/mojito_a1b2c3d4.png',
      description: 'Variación moderna del mojito clásico con fresas frescas para un sabor más afrutado.',
      tags: ['Ron', 'Afrutado', 'Refrescante'],
      ingredients: mojitoFresaIngredients,
      preparation: ['Macerar fresas y hierbabuena.', 'Agregar ron y azúcar.', 'Llenar de hielo.', 'Completar con soda.'],
      flavor: 'Afrutado',
      type: 'Moderno',
      alcohol: 'Ron',
      ingredientPrices: mojitoFresaCost.prices,
      preparationCost: mojitoFresaCost.total,
    };
  })(),
  (() => {
    const virginMojitoIngredients = ['Hierbabuena fresca', 'Azúcar', 'Jugo de lima fresco', 'Soda', 'Hielo'];
    const virginMojitoCost = calculateCocktailCost(virginMojitoIngredients);
    return {
      id: 'virgin-mojito',
      name: 'Virgin Mojito',
      badge: 'Sin Alcohol',
      image: '/manus-storage/mojito_a1b2c3d4.png',
      description: 'Versión sin alcohol del mojito clásico, refrescante y perfecta para cualquier ocasión.',
      tags: ['Sin Alcohol', 'Refrescante', 'Saludable'],
      ingredients: virginMojitoIngredients,
      preparation: ['Macerar hierbabuena y azúcar.', 'Agregar jugo de lima.', 'Llenar de hielo.', 'Completar con soda.'],
      flavor: 'Refrescante',
      type: 'Sin Alcohol',
      alcohol: 'Sin Alcohol',
      ingredientPrices: virginMojitoCost.prices,
      preparationCost: virginMojitoCost.total,
    };
  })(),
  (() => {
    const virginColadaIngredients = ['100 ml Crema de coco', '100 ml Jugo de piña fresco', 'Hielo', 'Piña para decorar'];
    const virginColadaCost = calculateCocktailCost(virginColadaIngredients);
    return {
      id: 'virgin-colada',
      name: 'Virgin Colada',
      badge: 'Sin Alcohol Tropical',
      image: '/manus-storage/mojito_a1b2c3d4.png',
      description: 'Piña colada sin alcohol, igualmente cremosa y deliciosa para disfrutar sin culpa.',
      tags: ['Sin Alcohol', 'Tropical', 'Cremoso'],
      ingredients: virginColadaIngredients,
      preparation: ['Licuar crema de coco y jugo de piña con hielo.', 'Servir en vaso tropical.', 'Decorar con piña.'],
      flavor: 'Dulce',
      type: 'Sin Alcohol',
      alcohol: 'Sin Alcohol',
      ingredientPrices: virginColadaCost.prices,
      preparationCost: virginColadaCost.total,
    };
  })(),
  (() => {
    const espressoMartiniIngredients = ['50 ml Vodka', '25 ml Licor de café', '30 ml Espresso fresco', 'Granos de café'];
    const espressoMartiniCost = calculateCocktailCost(espressoMartiniIngredients);
    return {
      id: 'espresso-martini',
      name: 'Espresso Martini',
      badge: 'Moderno Contemporáneo',
      image: '/manus-storage/negroni_a1b2c3d4.png',
      description: 'Cocktail moderno que combina vodka con espresso fresco, perfecto para después de cenar.',
      tags: ['Vodka', 'Intenso', 'Contemporáneo'],
      ingredients: espressoMartiniIngredients,
      preparation: ['Verter vodka y licor de café en coctelera.', 'Agregar espresso caliente.', 'Agitar vigorosamente.', 'Colar en copa de coctel.'],
      flavor: 'Intenso',
      type: 'Contemporáneo',
      alcohol: 'Vodka',
      ingredientPrices: espressoMartiniCost.prices,
      preparationCost: espressoMartiniCost.total,
    };
  })(),
  (() => {
    const aperolSpritzIngredients = ['60 ml Prosecco', '40 ml Aperol', '20 ml Soda', 'Rodaja de naranja'];
    const aperolSpritzCost = calculateCocktailCost(aperolSpritzIngredients);
    return {
      id: 'aperol-spritz',
      name: 'Aperol Spritz',
      badge: 'Italiano Refrescante',
      image: '/manus-storage/negroni_a1b2c3d4.png',
      description: 'Cocktail italiano ligero y refrescante, perfecto para aperitivos con su color naranja vibrante.',
      tags: ['Licor', 'Refrescante', 'Ligero'],
      ingredients: aperolSpritzIngredients,
      preparation: ['Verter Aperol en vaso con hielo.', 'Completar con Prosecco.', 'Agregar soda.', 'Decorar con rodaja de naranja.'],
      flavor: 'Refrescante',
      type: 'Moderno',
      alcohol: 'Licor',
      ingredientPrices: aperolSpritzCost.prices,
      preparationCost: aperolSpritzCost.total,
    };
  })(),
  (() => {
    const bloodyMaryIngredients = ['50 ml Vodka', '120 ml Jugo de tomate', '15 ml Jugo de lima', 'Salsa Worcestershire', 'Tabasco', 'Apio'];
    const bloodyMaryCost = calculateCocktailCost(bloodyMaryIngredients);
    return {
      id: 'bloody-mary',
      name: 'Bloody Mary',
      badge: 'Clásico Americano',
      image: '/manus-storage/negroni_a1b2c3d4.png',
      description: 'Cocktail icónico para el brunch, con un sabor sabroso y especiado muy particular.',
      tags: ['Vodka', 'Sabroso', 'Especiado'],
      ingredients: bloodyMaryIngredients,
      preparation: ['Verter vodka y jugo de tomate en vaso con hielo.', 'Agregar salsa Worcestershire y Tabasco.', 'Mezclar.', 'Decorar con apio.'],
      flavor: 'Intenso',
      type: 'Clásico',
      alcohol: 'Vodka',
      ingredientPrices: bloodyMaryCost.prices,
      preparationCost: bloodyMaryCost.total,
    };
  })(),
];
