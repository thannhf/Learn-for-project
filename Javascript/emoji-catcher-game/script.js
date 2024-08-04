const startScreen = document.querySelector('.start-screen');
const gameScreen = document.querySelector('.game-screen');
const gameOverScreen = document.querySelector('.game-over-screen');
const startGameButton = document.querySelector('#start-game');
const restartGameButton = document.querySelector('#restart-game');
const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const finalScore = document.querySelector("#final-score");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare() {
    squares.forEach((square) => {
        square.classList.remove("emoji");
    });

    let randomSquare = squares[Math.floor(Math.random() * squares.length)];
    randomSquare.classList.add("emoji");
    hitPosition = randomSquare.id;
}

squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
        if(square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function moveEmoji() {
    timerId = setInterval(randomSquare, 500);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        finalScore.textContent = result;
        gameScreen.style.display = 'none';
        gameOverScreen.style.display = '';
    }
}

let countDownTimerId;

startGameButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = '';
    result = 0;
    currentTime = 60;
    score.textContent = result;
    timeLeft.textContent = currentTime;
    moveEmoji();
    countDownTimerId = setInterval(countDown, 1000);
});

restartGameButton.addEventListener('click', () => {
    gameOverScreen.style.display = 'none';
    gameScreen.style.display = '';
    result = 0;
    currentTime = 60;
    score.textContent = currentTime;
    moveEmoji();
    countDownTimerId = setInterval(countDown, 1000);
});