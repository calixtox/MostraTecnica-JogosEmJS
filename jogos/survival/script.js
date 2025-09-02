const buttons = document.querySelectorAll("#button1, #button2");
const resultText = document.getElementById("result");
const switchBtn = document.getElementById("switchBtn");
const playerDiv = document.getElementById("player");
const fadeOverlay = document.getElementById("fadeOverlay");

let currentImage = 1;
let button3 = null;
let canClick = true;

resultText.style.display = "none";

function setButtonsDisabled(state) {
  document.querySelectorAll(".game-button, #button3").forEach(button => {
    if (button) button.disabled = state;
  });
}


buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.stopPropagation(); 
    if (!canClick) return;

    const playerChoice = parseInt(button.dataset.pos);
    const enemyChoice = Math.floor(Math.random() * 3) + 1;

    resultText.textContent = 
      (playerChoice === enemyChoice)
        ? "Você perdeu! O inimigo atacou o mesmo local."
        : "Você sobreviveu ao ataque!";

    resultText.style.display = "block"; 
    setButtonsDisabled(true); 
    canClick = false;
  });
});

document.addEventListener("click", () => {
  if (resultText.style.display === "block") {
    resultText.style.display = "none";
    setButtonsDisabled(false); 
    canClick = true; 
  }
});

switchBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if (switchBtn.disabled) return;

  switchBtn.disabled = true;
  fadeOverlay.style.opacity = "1";

  setTimeout(() => {
    currentImage = currentImage === 1 ? 2 : 1;

    if (currentImage === 2) {
      playerDiv.style.backgroundImage = 'url("https://i.imgur.com/NrZ7AIq.jpeg")';
      document.getElementById("button1").style.display = "none";
      document.getElementById("button2").style.display = "none";

    
      if (!button3) {
        button3 = document.createElement("button");
        button3.id = "button3";
        button3.style.position = "absolute";
        button3.style.left = "210px"; 
        button3.style.top = "325px";  
        button3.style.width = "60px";
        button3.style.height = "60px";
        button3.style.backgroundImage = 'url("https://i.imgur.com/fg5ZnpI.jpeg")';
        button3.style.backgroundSize = "cover";
        button3.style.border = "none";
        button3.style.cursor = "pointer";
        button3.style.borderRadius = "8px";
        button3.style.boxShadow = "#a09e9e 0.25px 1.2px 5px";

        button3.addEventListener("click", (event) => {
          event.stopPropagation();
          if (!canClick) return;

          const enemyChoice = Math.floor(Math.random() * 2) + 1;
          resultText.textContent =
            enemyChoice === 1
              ? "Você perdeu! O inimigo atacou o mesmo local."
              : "Você sobreviveu ao ataque!";

          resultText.style.display = "block";
          setButtonsDisabled(true);
          canClick = false;
        });

        playerDiv.appendChild(button3);
      }

    } else {
      playerDiv.style.backgroundImage = 'url("https://i.imgur.com/dgB4BEX.jpeg")';
      document.getElementById("button1").style.display = "block";
      document.getElementById("button2").style.display = "block";
      if (button3) {
        button3.remove();
        button3 = null;
      }
    }

    fadeOverlay.style.opacity = "0";

    setTimeout(() => {
      switchBtn.disabled = false;
    }, 1000);

  }, 1000);
});