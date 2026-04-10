export function generateCSS(tokens: any) {
  const { palette, semanticTokens, spacing, radius } = tokens;

  let css = `:root {\n`;
  
  // Palette
  Object.entries(palette).forEach(([key, colors]: [string, any]) => {
    colors.forEach((hex: string, i: number) => {
      const step = i === 0 ? 50 : i === 9 ? 950 : (i * 100);
      css += `  --color-${key}-${step}: ${hex};\n`;
    });
  });

  css += `\n  /* Semantic Tokens */\n`;
  Object.entries(semanticTokens).forEach(([key, val]) => {
     css += `  --color-${key}: ${val};\n`;
  });

  css += `\n  /* Spacing */\n`;
  spacing.scale.forEach((val: number) => {
     css += `  --space-${val / spacing.base}: ${val}px;\n`;
  });

  css += `\n  /* Radius */\n`;
  Object.entries(radius).forEach(([key, val]) => {
     css += `  --radius-${key}: ${val};\n`;
  });

  css += `}`;
  return css;
}

export function generateTailwind(tokens: any) {
  const { palette, semanticTokens } = tokens;

  const config = {
    theme: {
      extend: {
        colors: {
           brand: {
              DEFAULT: semanticTokens.brandDefault,
              subtle: semanticTokens.brandSubtle,
              ...palette.brand.reduce((acc: any, hex: string, i: number) => {
                 const step = i === 0 ? 50 : i === 9 ? 950 : (i * 100);
                 acc[step] = hex;
                 return acc;
              }, {})
           },
           neutral: palette.neutral.reduce((acc: any, hex: string, i: number) => {
              const step = i === 0 ? 50 : i === 9 ? 950 : (i * 100);
              acc[step] = hex;
              return acc;
           }, {})
        }
      }
    }
  };

  return `module.exports = ${JSON.stringify(config, null, 2)};`;
}
