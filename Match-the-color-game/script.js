document.getElementById('start-game').addEventListener('click', function() {
    document.querySelector('.landing-container').style.display = 'none';
    document.querySelector('.game-container').style.display = 'flex';
    generateRandomColor();
});

const rRange = document.getElementById('r-range');
const gRange = document.getElementById('g-range');
const bRange = document.getElementById('b-range');

rRange.addEventListener('input', updateGuess);
gRange.addEventListener('input', updateGuess);
bRange.addEventListener('input', updateGuess);

function updateGuess() {
    document.getElementById('r-value').textContent = rRange.value;
    document.getElementById('g-value').textContent = gRange.value;
    document.getElementById('b-value').textContent = bRange.value;
    updateGuessColor();
}

function updateGuessColor() {
    const r = rRange.value;
    const g = gRange.value;
    const b = bRange.value;
    document.getElementById('guess-color').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    document.getElementById('random-color').dataset.color = `rgb(${r}, ${g}, ${b})`;
    document.getElementById('random-color').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function calculatePercentage(targetColor, userColor) {
    const targetRGB = targetColor.match(/\d+/g).map(Number);
    const userRGB = userColor.match(/\d+/g).map(Number);
    const diffR = Math.abs(targetRGB[0] - userRGB[0]);
    const diffG = Math.abs(targetRGB[1] - userRGB[1]);
    const diffB = Math.abs(targetRGB[2] - userRGB[2]);
    const totalDiff = diffR + diffG + diffB;
    const percentage = ((765 - totalDiff) / 765) * 100;
    return percentage.toFixed(2);
}

document.getElementById('submit-guess').addEventListener('click', function() {
    const targetColor = document.getElementById('random-color').dataset.color;
    const userColor = `rgb(${rRange.value}, ${gRange.value}, ${bRange.value})`;
    const matchPercentage = calculatePercentage(targetColor, userColor);

    alert(`Generated Color:${targetColor}\nGuessed Color:${userColor}\nMatch Percentage:${matchPercentage}%`);

    // update result colors
    document.getElementById('result-random-color').style.backgroundColor = targetColor;
    document.getElementById('result-guess-color').style.backgroundColor = userColor;

    // generate new random color
    generateRandomColor();
});