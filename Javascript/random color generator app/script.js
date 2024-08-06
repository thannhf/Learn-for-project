const container = document.querySelector(".container");
const colorCode = document.querySelector("h2");
const button = document.querySelector("button");

function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    container.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    colorCode.textContent = `rgb(${red}, ${green}, ${blue})`;
}
button.addEventListener("click", generateRandomColor);