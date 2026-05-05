const fs = require('fs');

const files = [
  { name: 'white', path: './docs/stitch/assets/white_heaven_light_desktop.html', themeName: 'light' },
  { name: 'celestial', path: './docs/stitch/assets/celestial_intelligence_desktop.html', themeName: 'dark' },
  { name: 'inferno', path: './docs/stitch/assets/inferno_engine_unified.html', themeName: 'red' },
];

let css = `@theme {\n`;

const allColors = new Set();
const themes = {};

for (const file of files) {
  const content = fs.readFileSync(file.path, 'utf8');
  const match = content.match(/"colors":\s*(\{[\s\S]*?\})\s*,\s*"borderRadius"/);
  if (match) {
    const colors = JSON.parse(match[1]);
    themes[file.themeName] = colors;
    for (const key in colors) {
      allColors.add(key);
    }
  }
}

// In Tailwind v4, we use @theme to map utility names to CSS variables
for (const color of allColors) {
  css += `  --color-${color}: var(--theme-${color});\n`;
}

css += `\n  --font-display: Inter, sans-serif;\n`;
css += `  --font-body-lg: Inter, sans-serif;\n`;
css += `  --font-body-md: Inter, sans-serif;\n`;
css += `  --font-h1: Inter, sans-serif;\n`;
css += `  --font-h2: Inter, sans-serif;\n`;
css += `  --font-h3: Inter, sans-serif;\n`;
css += `  --font-label-caps: Inter, sans-serif;\n`;

css += `}\n\n`;

// Generate the data-theme blocks
for (const [theme, colors] of Object.entries(themes)) {
  if (theme === 'light') {
    css += `:root,\n[data-theme="${theme}"] {\n`;
  } else {
    css += `[data-theme="${theme}"] {\n`;
  }
  for (const [key, value] of Object.entries(colors)) {
    css += `  --theme-${key}: ${value};\n`;
  }
  css += `}\n\n`;
}

fs.writeFileSync('./generated_theme.css', css);
console.log('Done generating generated_theme.css');
