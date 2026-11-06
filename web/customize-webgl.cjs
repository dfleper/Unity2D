// Customize the Unity-generated WebGL page after every GameCI build.
const fs = require("node:fs");
const path = require("node:path");

function customize(html) {
  if (html.includes('id="demo-page"')) return html;
  function replaceOne(needle, replacement, label) {
    let parts=html.split(needle);
    if (parts.length!==2) throw new Error("No se encontro la marca "+label+" ("+(parts.length-1)+")");
    html=parts.join(replacement);
  }
  html=html.replace('<html lang="en-us">','<html lang="es">');
  html=html.replace(/<title>[^<]*<\/title>/, '<title>Vikingo 2D | Demo jugable</title>');
  replaceOne('<link rel="stylesheet" href="TemplateData/style.css">', '<link rel="stylesheet" href="TemplateData/style.css">\n    <link rel="stylesheet" href="demo.css">\n    <script src="demo.js" defer></script>', 'CSS');
  replaceOne('  <body>', `  <body>
    <div class="demo-page" id="demo-page">
      <header class="demo-header">
        <div class="demo-tag">DEMO JUGABLE · UNITY 2D</div>
        <h1>Vikingo <span>2D</span></h1>
        <p>Prototipo interactivo para jugar directamente en el navegador.</p>
      </header>
      <main class="demo-frame">
        <div class="demo-above"><span>Zona de juego</span><small>VERSIÓN DEMO</small></div>`, 'body');
  replaceOne('    </div>\n    <script>', `    </div>
        <div class="demo-controls">
          <div class="demo-help"><strong>Moverse:</strong><kbd class="demo-key">←</kbd><kbd class="demo-key">→</kbd><span class="demo-hint">Después de perder: tecla R o «Volver a jugar».</span></div>
          <div class="demo-buttons">
            <button type="button" class="demo-btn primary" id="demo-restart" disabled>↻ Volver a jugar</button>
            <button type="button" class="demo-btn" id="demo-fullscreen" disabled>⛶ Pantalla completa</button>
          </div>
        </div>
        <p id="demo-status" role="status" aria-live="polite"></p>
      </main>
      <footer class="demo-footer">Proyecto experimental · Versión de demostración</footer>
    </div>
    <script>`, 'unity wrapper');
  html=html.replace(/<div id="unity-build-title">[^<]*<\/div>/,'<div id="unity-build-title"></div>');
  html=html.replace(/productName:\s*"[^"]*"/,'productName: "Vikingo 2D Demo"');
  replaceOne('loadingBar.style.display = "none";','loadingBar.style.display = "none";\n                window.demoUnityInstance = unityInstance;\n                window.dispatchEvent(new Event("unity-demo-ready"));','Unity init');
  return html;
}

const htmlPath = process.argv[2] || "site/index.html";
fs.writeFileSync(htmlPath, customize(fs.readFileSync(htmlPath, "utf8")), "utf8");
for (const file of ["demo.css", "demo.js"])
  fs.copyFileSync(path.join(__dirname, file), path.join(path.dirname(htmlPath), file));
console.log("Demo WebGL personalizada: " + htmlPath);
