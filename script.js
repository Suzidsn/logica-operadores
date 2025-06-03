let player = document.getElementById("player");
let jogo = document.getElementById("jogo");
let pontuacao = 0;
let recorde = localStorage.getItem("recorde") || 0;
let dificuldade = 300; // Velocidade inicial dos blocos
let posicao = 135;
let jogoAtivo = false;

document.getElementById("recorde").innerText = recorde;

// Captura o evento de teclado para mover o jogador
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && posicao > 0) {
        posicao -= 20; // Movendo mais rápido
    } else if (event.key === "ArrowRight" && posicao < 270) {
        posicao += 20;
    }
    player.style.left = posicao + "px";
});

function iniciarJogo() {
    document.getElementById("gameOverScreen").classList.add("hidden");
    pontuacao = 0;
    dificuldade = 300;
    jogoAtivo = true;
    document.getElementById("pontuacao").innerText = pontuacao;
    jogo.innerHTML = `<div id="player"></div>`; // Reset do jogo
    player = document.getElementById("player"); // Reatribuir o jogador
    player.style.left = posicao + "px"; // Garantir que ele começa na posição correta
    gerarObstaculos();
}

function gerarObstaculos() {
    if (!jogoAtivo) return;

    for (let i = 0; i < 3; i++) { // Gera até 3 blocos simultaneamente
        let obstaculo = document.createElement("div");
        obstaculo.classList.add("obstaculo");
        obstaculo.style.left = Math.floor(Math.random() * 270) + "px"; // Posição aleatória
        obstaculo.style.top = "0px";
        jogo.appendChild(obstaculo);

        let intervalo = setInterval(() => {
            let topo = parseInt(obstaculo.style.top) + 10; // Movimenta os blocos corretamente
            obstaculo.style.top = topo + "px";

            // Verifica colisão com o jogador
            if (topo >= 370 && Math.abs(parseInt(obstaculo.style.left) - posicao) < 30) {
                clearInterval(intervalo);
                jogoAtivo = false;
                gameOver();
                return;
            }

            // Remove obstáculos após saírem da tela e continua gerando novos
            if (topo >= 400) {
                clearInterval(intervalo);
                jogo.removeChild(obstaculo);
                pontuacao++;
                document.getElementById("pontuacao").innerText = pontuacao;

                if (pontuacao % 5 === 0) {
                    dificuldade = Math.max(50, dificuldade - 50); // Aumenta a dificuldade sem zerar
                }

                gerarObstaculos();
            }
        }, dificuldade);
    }
}

function gameOver() {
    document.getElementById("finalScore").innerText = pontuacao;
    document.getElementById("gameOverScreen").classList.remove("hidden");
    atualizarRecorde();
}

function reiniciarJogo() {
    iniciarJogo();
}

function atualizarRecorde() {
    if (pontuacao > recorde) {
        recorde = pontuacao;
        localStorage.setItem("recorde", recorde);
        document.getElementById("recorde").innerText = recorde;
    }
}
