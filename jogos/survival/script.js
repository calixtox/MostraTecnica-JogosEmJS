// Seleção dos elementos principais do jogo
const botoes = document.querySelectorAll("#button1, #button2"); // Botões do cenário 1
const textoResultado = document.getElementById("result");      // Texto de vitória/derrota
const botaoTrocar = document.getElementById("switchBtn");      // Botão para trocar o cenário
const jogadorDiv = document.getElementById("player");          // Área do jogador (imagem de fundo)
const telaFade = document.getElementById("fadeOverlay");       // Overlay de fade para transição

// Variáveis de controle
let imagemAtual = 1;  // Qual cenário está ativo (1 ou 2)
let botao3 = null;    // Botão que só aparece no cenário 2
let podeClicar = true; // Evita que o jogador clique repetidamente antes do reset

// Faz com que o texto de resultado não apareça assim que abrir a pagina
textoResultado.style.display = "none";

// Função que ativa/desativa todos os botões do jogo
function definirBotoesDesativados(estado) {
  document.querySelectorAll(".game-button, #button3").forEach(btn => {
    if (btn) btn.disabled = estado;
  });
}

// Função que mostra o resultado da escolha
function mostrarResultado(sobreviveu) {
  textoResultado.textContent = sobreviveu
    ? "Você sobreviveu ao ataque!"
    : "Você perdeu! O inimigo atacou o mesmo local.";
  textoResultado.style.display = "block";   // Mostra a mensagem
  definirBotoesDesativados(true);           // Desativa os botões
  podeClicar = false;                       // Impede de apertar os botões até resetar ao clicar em qualquer local da tela
}

// Função que cria o botão 3 no cenário 2
function criarBotao3() {
  botao3 = document.createElement("button");
  botao3.id = "button3";

  // Estilização inline do botão 3
  Object.assign(botao3.style, {
    position: "absolute",
    left: "210px",
    top: "325px",
    width: "60px",
    height: "60px",
    backgroundImage: 'url("https://i.imgur.com/fg5ZnpI.jpeg")',
    backgroundSize: "cover",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    boxShadow: "#a09e9e 0.25px 1.2px 5px"
  });

  // Evento de clique no botão 3
  botao3.addEventListener("click", (e) => {
    e.stopPropagation();        // Impede que o click feche a mensagem
    if (!podeClicar) return;    // Só funciona se permitido

    // 50% de chance de ganhar ou perder
    mostrarResultado(Math.random() < 0.5);
  });

  jogadorDiv.appendChild(botao3);
}

/* --- Eventos dos Botões 1 e 2 --- */
botoes.forEach(botao => {
  botao.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!podeClicar) return;

    const escolhaJogador = parseInt(botao.dataset.pos);            // Pega posição escolhida
    const escolhaInimigo = Math.floor(Math.random() * 3) + 1;      // Inimigo escolhe aleatório
    mostrarResultado(escolhaJogador !== escolhaInimigo);           // Compara escolha
  });
});

/* --- Clique fora da área reseta o jogo --- */
document.addEventListener("click", () => {
  if (textoResultado.style.display === "block") {
    textoResultado.style.display = "none"; // Esconde mensagem
    definirBotoesDesativados(false);       // Reativa botões
    podeClicar = true;                     // Permite jogar de novo
  }
});

/* --- Botão de trocar cenário --- */
botaoTrocar.addEventListener("click", (e) => {
  e.stopPropagation();
  if (botaoTrocar.disabled) return;

  botaoTrocar.disabled = true;  // Evita spam de click
  telaFade.style.opacity = "1"; // Inicia efeito de fade

  setTimeout(() => {
    imagemAtual = imagemAtual === 1 ? 2 : 1; // Alterna entre cenário 1 e 2

    if (imagemAtual === 2) {
      // Segundo cenário
      jogadorDiv.style.backgroundImage = 'url("https://i.imgur.com/NrZ7AIq.jpeg")';
      document.getElementById("button1").style.display = "none";
      document.getElementById("button2").style.display = "none";

      if (!botao3) criarBotao3(); // Cria o botão 3 caso ainda não exista

    } else {
      // Volta para o primeiro cenário
      jogadorDiv.style.backgroundImage = 'url("https://i.imgur.com/dgB4BEX.jpeg")';
      document.getElementById("button1").style.display = "block";
      document.getElementById("button2").style.display = "block";

      if (botao3) {
        botao3.remove(); // Remove o botão 3
        botao3 = null;
      }
    }

    // Finaliza o fade e reativa o botão de troca
    telaFade.style.opacity = "0";
    setTimeout(() => botaoTrocar.disabled = false, 1000);
  }, 1000);
});
