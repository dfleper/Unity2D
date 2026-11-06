(function () {
  "use strict";

  const restartButton = document.getElementById("demo-restart");
  const fullscreenButton = document.getElementById("demo-fullscreen");
  const status = document.getElementById("demo-status");
  let restarting = false;

  function updateControls() {
    const ready = Boolean(window.demoUnityInstance) && !restarting;
    restartButton.disabled = !ready;
    fullscreenButton.disabled = !ready;
  }

  async function restartGame() {
    const previous = window.demoUnityInstance;
    if (!previous || restarting) return;

    restarting = true;
    updateControls();
    status.textContent = "Reiniciando la partida…";

    const loadingBar = document.getElementById("unity-loading-bar");
    const progressBar = document.getElementById("unity-progress-bar-full");

    try {
      if (typeof previous.Quit !== "function") {
        throw new Error("La instancia WebGL no admite Quit().");
      }

      // Quit the old runtime, then create a fresh Unity instance on a new
      // canvas. This works even when the compiled game has no restart method.
      await previous.Quit();
      window.demoUnityInstance = null;

      const oldCanvas = document.getElementById("unity-canvas");
      if (!oldCanvas) throw new Error("No se encuentra el canvas de Unity.");
      const canvas = oldCanvas.cloneNode(false);
      oldCanvas.replaceWith(canvas);
      window.canvas = canvas;

      if (typeof window.createUnityInstance !== "function" || !window.config) {
        throw new Error("No está disponible el cargador WebGL de Unity.");
      }

      if (loadingBar) loadingBar.style.display = "block";
      if (progressBar) progressBar.style.width = "0%";

      const next = await window.createUnityInstance(canvas, window.config, (progress) => {
        if (progressBar) progressBar.style.width = (progress * 100) + "%";
      });

      window.demoUnityInstance = next;
      if (loadingBar) loadingBar.style.display = "none";
      if (typeof canvas.focus === "function") canvas.focus();
      status.textContent = "¡Partida nueva!";
      window.dispatchEvent(new Event("unity-demo-ready"));
    } catch (error) {
      console.error("Error reiniciando WebGL:", error);
      if (loadingBar) loadingBar.style.display = "none";
      status.textContent = "No se pudo reiniciar automáticamente. Actualiza la página para recuperar el juego.";
    } finally {
      restarting = false;
      updateControls();
    }
  }

  restartButton.addEventListener("click", restartGame);

  // Capture key presses at page level, even if the Unity canvas has focus or
  // the Unity game itself is paused (Time.timeScale == 0).
  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "r" || event.repeat || event.isComposing ||
        event.ctrlKey || event.altKey || event.metaKey) return;

    const target = event.target;
    if (target && (target.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName || ""))) return;
    if (!window.demoUnityInstance || restarting) return;

    event.preventDefault();
    restartGame();
  }, true);

  fullscreenButton.addEventListener("click", () => {
    if (window.demoUnityInstance && !restarting) {
      window.demoUnityInstance.SetFullscreen(1);
    }
  });

  window.addEventListener("unity-demo-ready", updateControls);
  updateControls();
})();
