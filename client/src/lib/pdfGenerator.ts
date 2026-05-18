import { Cocktail } from '@/data/cocktails';

export function generateCocktailPDF(cocktail: Cocktail) {
  // Crear elemento canvas para generar el PDF
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;

  // Configurar dimensiones (A4: 210mm x 297mm a 96 DPI = 794 x 1123 px)
  canvas.width = 794;
  canvas.height = 1123;

  // Colores del tema BarThunders
  const colors = {
    wine: '#7d1f2a',
    gold: '#c9a86a',
    cream: '#f5e7d3',
    beige: '#f5e7d3',
    darkText: '#2c1d1d',
    lightText: '#fff8f0',
  };

  // Fondo
  ctx.fillStyle = colors.wine;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gradiente decorativo
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(255, 248, 240, 0.05)');
  gradient.addColorStop(1, 'rgba(201, 168, 106, 0.1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let y = 60;

  // Logo/Título
  ctx.fillStyle = colors.gold;
  ctx.font = 'bold 48px "Cormorant Garamond", serif';
  ctx.textAlign = 'left';
  ctx.fillText('BarThunders', 60, y);
  
  y += 60;

  // Nombre del cocktail
  ctx.fillStyle = colors.lightText;
  ctx.font = 'bold 56px "Cormorant Garamond", serif';
  ctx.fillText(cocktail.name, 60, y);
  
  y += 80;

  // Descripción
  ctx.fillStyle = 'rgba(255, 248, 240, 0.85)';
  ctx.font = '16px "Inter", sans-serif';
  ctx.textAlign = 'left';
  
  const maxWidth = canvas.width - 120;
  const words = cocktail.description.split(' ');
  let line = '';
  let lineY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, 60, lineY);
      line = words[i] + ' ';
      lineY += 24;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 60, lineY);
  
  y = lineY + 50;

  // Sección de metadatos
  ctx.fillStyle = colors.gold;
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText('INFORMACIÓN', 60, y);
  
  y += 30;

  // Grid de información
  const infoItems = [
    { label: 'Sabor', value: cocktail.flavor },
    { label: 'Tipo', value: cocktail.type },
    { label: 'Base Alcohólica', value: cocktail.alcohol },
  ];

  infoItems.forEach((item, idx) => {
    ctx.fillStyle = colors.gold;
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.fillText(item.label + ':', 60, y);
    
    ctx.fillStyle = 'rgba(255, 248, 240, 0.9)';
    ctx.font = '12px "Inter", sans-serif';
    ctx.fillText(item.value, 200, y);
    
    y += 25;
  });

  y += 20;

  // Precios
  ctx.fillStyle = colors.gold;
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText('PRECIOS', 60, y);
  
  y += 30;

  ctx.fillStyle = 'rgba(255, 248, 240, 0.85)';
  ctx.font = 'bold 32px "Cormorant Garamond", serif';
  ctx.fillText(`$${cocktail.salePrice?.toLocaleString('es-AR')}`, 60, y);
  
  ctx.fillStyle = colors.gold;
  ctx.font = '12px "Inter", sans-serif';
  ctx.fillText('Precio de venta sugerido', 60, y + 25);
  
  ctx.fillStyle = 'rgba(255, 248, 240, 0.7)';
  ctx.fillText(`Margen: ${cocktail.margin}% | Costo: $${cocktail.preparationCost?.toLocaleString('es-AR')}`, 60, y + 45);

  y += 80;

  // Ingredientes
  ctx.fillStyle = colors.gold;
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText('INGREDIENTES', 60, y);
  
  y += 25;

  ctx.fillStyle = 'rgba(255, 248, 240, 0.85)';
  ctx.font = '12px "Inter", sans-serif';
  
  cocktail.ingredients.forEach((ingredient) => {
    ctx.fillText('• ' + ingredient, 80, y);
    y += 20;
  });

  y += 20;

  // Preparación
  ctx.fillStyle = colors.gold;
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText('PREPARACIÓN', 60, y);
  
  y += 25;

  ctx.fillStyle = 'rgba(255, 248, 240, 0.85)';
  ctx.font = '12px "Inter", sans-serif';
  
  cocktail.preparation.forEach((step, idx) => {
    ctx.fillText(`${idx + 1}. ${step}`, 80, y);
    y += 20;
  });

  // Convertir canvas a blob y descargar
  canvas.toBlob((blob) => {
    if (!blob) return;
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cocktail.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}
