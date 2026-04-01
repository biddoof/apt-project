const fs = require('fs');
const path = require('path');

const gbDark = '#0f380f';
const gbLight = '#9bbc0f';

// 1. Update CSS
const cssPath = path.join(__dirname, 'src/app/globals.css');
let css = `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: ${gbLight};
  --foreground: ${gbDark};
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  min-height: 100vh;
}

/* Game Boy Dot Matrix Overlay */
body::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  background:
    repeating-linear-gradient(0deg, rgba(15, 56, 15, 0.05) 0, rgba(15, 56, 15, 0.05) 1px, transparent 1px, transparent 3px),
    repeating-linear-gradient(90deg, rgba(15, 56, 15, 0.05) 0, rgba(15, 56, 15, 0.05) 1px, transparent 1px, transparent 3px);
  z-index: 999;
  pointer-events: none;
}

::selection {
  background: ${gbDark};
  color: ${gbLight};
}

a {
  color: inherit;
  text-decoration: none;
}

input {
  background: transparent;
  border: 1px solid ${gbDark};
  color: ${gbDark};
  outline: none;
}
input:focus {
  box-shadow: 4px 4px 0px rgba(15, 56, 15, 0.2);
}

.protocol-card:hover {
  background-color: ${gbDark};
  color: ${gbLight} !important;
}
.protocol-card:hover h3,
.protocol-card:hover p {
  color: ${gbLight} !important;
}

.terminal-btn:hover {
  background-color: ${gbDark} !important;
  color: ${gbLight} !important;
}
.terminal-btn:hover * {
  color: ${gbLight} !important;
}
`;
fs.writeFileSync(cssPath, css);

// 2. Update TSX files
function replaceColors(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace borders and text colors
  content = content.replace(/#33ff00/g, '#0f380f');
  
  // Replace background colors from black to transparent so the body gbLight shows through, 
  // or explicitly to gbLight
  content = content.replace(/bg-black/g, 'bg-transparent');
  content = content.replace(/#000/g, '#9bbc0f');
  content = content.replace(/#000000/g, '#9bbc0f');
  
  // Fix shadow to look retro (solid drop shadow instead of blur)
  content = content.replace(/shadow-\[0_0_10px_rgba\(51,255,0,0\.2\)\]/g, 'shadow-[4px_4px_0px_rgba(15,56,15,0.3)]');
  content = content.replace(/shadow-\[0_0_15px_rgba\(51,255,0,0\.3\)\]/g, 'shadow-[6px_6px_0px_rgba(15,56,15,0.3)]');
  
  fs.writeFileSync(filePath, content);
}

replaceColors(path.join(__dirname, 'src/app/page.tsx'));
replaceColors(path.join(__dirname, 'src/app/login/page.tsx'));
replaceColors(path.join(__dirname, 'src/app/dashboard/DashboardClient.tsx'));

