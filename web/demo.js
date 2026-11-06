(function () {
  "use strict";
  const restart = document.querySelector("#demo-restart");
  const fullscreen = document.querySelector("#demo-fullscreen");
  const status = document.querySelector("#demo-status");
  function ready() {
    const enabled = Boolean(window.demoUnityInstance);
    restart.disabled = !enabled;
    fullscreen.disabled = !enabled;
  }
  window.addEventListener("unity-demo-ready", ready);
  ready();
  restart.addEventListener("click", () => {
    if (!window.demoUnityInstance) return;
    try {
      // Existing GameObject in SampleScene: "GameOver".
      window.demoUnityInstance.SendMessage("GameOver", "ReiniciarPartida");
      status.textContent = "Partida reiniciada.";
    } catch (err) {
      status.textContent = "No se ha podido reiniciar la partida.";
      console.error(err);
    }
  });
  fullscreen.addEventListener("click", () => {
    if (window.demoUnityInstance) window.demoUnityInstance.SetFullscreen(1);
  });
})();
