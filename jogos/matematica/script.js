window.addEventListener("load", () => {
  const player = document.getElementById("player");
  setTimeout(() => { // Aplica o zoom
    player.classList.add("zoom");
  }, 1500); // Tempo em milissegundos
});

// Faz com que a intro só apareça depois do zoom
    setTimeout(() => {
      intro.style.display = "flex";
    }, 4000);

  // Jogo começa assim que o jogador apertar uma tecla ou o mouse
  function startGame() {
    intro.style.display = "none";
  }

  document.addEventListener("keydown", startGame);
  document.addEventListener("mousedown", startGame);