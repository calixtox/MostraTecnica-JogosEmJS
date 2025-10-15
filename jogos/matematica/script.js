window.addEventListener("load", () => {
    const player = document.getElementById("player");
    const intro = document.getElementById("intro");
    const gameContent = document.querySelector(".game-content");

    // Troca o fundo após 3 segundos
    setTimeout(() => {
        player.style.backgroundImage = 'url("https://i.imgur.com/I70vcli.png")'; // imagem nova
    }, 3000);

    // Mostra a intro após a troca do fundo
    setTimeout(() => {
        intro.style.display = "flex";
    }, 3500);

    // Inicia o jogo ao clicar ou apertar tecla
    function startGame() {
        intro.style.display = "none";

        setTimeout(() => {
            gameContent.classList.add("show");
            iniciarPerguntas(); // Inicia o jogo
        }, 2000);

        document.removeEventListener("keydown", startGame);
        document.removeEventListener("mousedown", startGame);
    }

    document.addEventListener("keydown", startGame);
    document.addEventListener("mousedown", startGame);
});

// Função do jogo
function iniciarPerguntas() {
    const perguntas = [ // Lista de perguntas
        {
            pergunta: "12 x 2 = ?",
            resposta: 24
        },
        {
            pergunta: "128 – 64 = ?",
            resposta: 64
        },
        {
            pergunta: "3 × 9 = ?",
            resposta: 27
        },
        {
            pergunta: "450 - 200 = ?",
            resposta: 250
        },
        {
            pergunta: "36 + 44 = ?",
            resposta: 80
        },
        {
            pergunta: "81 ÷ 9 = ?",
            resposta: 9
        },
        {
            pergunta: "15 × 14 = ?",
            resposta: 210
        },
        {
            pergunta: "320 – 145 = ?",
            resposta: 175
        },
        {
            pergunta: "72 + 39 = ?",
            resposta: 111
        },
        {
            pergunta: "9 × 18 = ?",
            resposta: 162
        },
        {
            pergunta: "625 – 478 = ?",
            resposta: 147
        },
        {
            pergunta: "144 ÷ 12 = ?",
            resposta: 12
        },
        {
            pergunta: "56 + 67 = ?",
            resposta: 123
        },
        {
            pergunta: "12 × 16 = ?",
            resposta: 192
        },
        {
            pergunta: "1000 – 375 = ?",
            resposta: 625
        },
        {
            pergunta: "95 + 68 = ?",
            resposta: 163
        },
        {
            pergunta: "(25 + 15) × 2 = ?",
            resposta: 80
        },
        {
            pergunta: "84 – 46 = ?",
            resposta: 38
        },
        {
            pergunta: "22 × 9 = ?",
            resposta: 198
        },
        {
            pergunta: "450 + 375 = ?",
            resposta: 825
        },
        {
            pergunta: "(120 – 45) ÷ 5 = ?",
            resposta: 15
        },
        {
            pergunta: "19 × 14 = ?",
            resposta: 266
        },
        {
            pergunta: "250 – 137 = ?",
            resposta: 113
        },
        {
            pergunta: "63 + 129 = ?",
            resposta: 192
        },
        {
            pergunta: "75 × 8 = ?",
            resposta: 600
        },
        {
            pergunta: "900 – 468 = ?",
            resposta: 432
        },
        {
            pergunta: "(36 ÷ 6) × 9 = ?",
            resposta: 54
        },
        {
            pergunta: "135 + 289 = ?",
            resposta: 424
        },
        {
            pergunta: "54 × 11 = ?",
            resposta: 594
        },
        {
            pergunta: "700 – 245 = ?",
            resposta: 455
        },
        {
            pergunta: "210 ÷ 15 = ?",
            resposta: 14
        },
        {
            pergunta: "48 × 13 = ?",
            resposta: 624
        },
        {
            pergunta: "825 – 496 = ?",
            resposta: 329
        },
        {
            pergunta: "250 + 375 = ?",
            resposta: 625
        },
        {
            pergunta: "96 ÷ 8 = ?",
            resposta: 12
        },
        {
            pergunta: "(18 + 12) × 5 = ?",
            resposta: 150
        },
        {
            pergunta: "77 × 6 = ?",
            resposta: 462
        },
        {
            pergunta: "540 – 268 = ?",
            resposta: 272
        },
        {
            pergunta: "123 + 456 = ?",
            resposta: 579
        },
        {
            pergunta: "64 × 9 = ?",
            resposta: 576
        },
    ];

    const questionEl = document.getElementById("question");
    const inputEl = document.getElementById("answer");
    const submitEl = document.getElementById("submit");
    const livesEl = document.getElementById("lives");
    const scoreEl = document.getElementById("score");

    questionEl.classList.add("question");
    inputEl.classList.add("input-answer");
    submitEl.classList.add("button-submit");
    livesEl.classList.add("lives");
    scoreEl.classList.add("score");

    let vidas = 4;
    let pontos = 0;
    let indice = 0;

    function mostrarPergunta() {
        // Deixa os elementos invisíveis 
        questionEl.style.visibility = 'hidden';
        inputEl.style.visibility = 'hidden';
        submitEl.style.visibility = 'hidden';

        // Espera 1 segundo antes de mostrar a pergunta
        setTimeout(() => {
            if (indice >= perguntas.length) indice = 0; // Reinicia caso chegue ao fim
            const p = perguntas[indice];
            questionEl.textContent = p.pergunta;

            // mostra os elementos novamente
            questionEl.style.visibility = 'visible';
            inputEl.style.visibility = 'visible';
            submitEl.style.visibility = 'visible';

            inputEl.value = '';
            inputEl.focus();
        }, 1000);
    }

    submitEl.onclick = () => {
        const resposta = parseInt(inputEl.value);
        const correta = perguntas[indice].resposta;

        if (resposta === correta) {
            pontos++;
            if (vidas < 4 && Math.random() < 0.15) vidas++; // Verifica se o jogador está com menos de 4 vidas e se resultado de math.random é menor que 0.15, caso ambas condições estiverem corretas, dá uma vida extra ao jogador.
        } else {
            vidas--;
        }

        scoreEl.textContent = "Pontuação: " + pontos;
        livesEl.textContent = "Vidas: " + vidas;

        if (vidas <= 0) {
            questionEl.textContent = "Game Over!";
            submitEl.disabled = true;
            inputEl.disabled = true;
            inputEl.style.visibility = 'hidden';
            submitEl.style.visibility = 'hidden';
            return;
        }

        // Passar para a próxima pergunta
        indice++;
        mostrarPergunta();
    };
mostrarPergunta();
}