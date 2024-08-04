let draggableObjects;
let dropPoints;
const result = document.getElementById('result');
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector('.draggable-objects');
const dropContainer = document.querySelector('.drop-points');
const data = [
    "belgium",
   "bhutan",
   "brazil",
   "china",
   "cuba",
   "ecuador",
   "georgia",
   "germany",
   "hong-kong",
   "india",
   "iran",
   "myanmar",
   "norway",
   "spain",
   "sri-lanka",
   "sweden",
   "switzerland",
   "united-states",
   "uruguay",
   "wales",
];
let deviceType = "";
let initialX = 0,
    initialY = 0;
let currentElement = "";
let moveElement = false;

const isTouchDevice = () => {
    try{
        document.createEvent("TouchEvent");
        deviceType = 'touch';
        return true;
    } catch(e) {
        deviceType = "mouse";
        return false;
    }
};
let count = 0;
const randomValueGenerator = () => {
    return data[Math.floor(Math.random() * data.length)];
};

const stopGame = () => {
    setTimeout(() => {
        location.reload();
    }, 2000);
};

function dragStart(e) {
    if(isTouchDevice()) {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
        moveElement = true;
        currentElement = e.target;
    } else {
        e.dataTransfer.setData("text", e.target.id);
    }
}

function dragOver(e) {
    e.preventDefault();
}

const touchMove = (e) => {
    if(moveElement){
        e.preventDefault();
        let newX = e.touches[0].clientX;
        let newY = e.touches[0].clientY;
        let currentSelectedElement = document.getElementById(e.target.id);
        currentSelectedElement.parentElement.style.top = currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
        currentSelectedElement.parentElement.style.left = currentSelectedElement.parentElement.offsetLeft - (initialX - newX) + "px";
        initialX = newX;
        initialY = newY;
    }
};

const drop = (e) => {
    e.preventDefault();
    if(isTouchDevice()) {
        moveElement = false;
        const currentDrop = document.querySelector(
            `div[data-id='${e.target.dataset.id}']`
        );
        const currentDropBound = currentDrop.getBoundingClientRect();
        if(
            initialX >= currentDropBound.left &&
            initialX <= currentDropBound.right &&
            initialY >= currentDropBound.top &&
            initialY <= currentDropBound.bottom
        ) {
            currentDrop.classList.add('dropped');
            currentElement.classList.add('hide');
            currentDrop.innerHTML = ``;
            currentDrop.insertAdjacentHTML("afterbegin", `<img src="flags/${currentElement.id}.png"`);
            if(currentElement.id === currentDrop.dataset.id) {
                currentDrop.classList.add("correct");
            } else {
                currentDrop.classList.add("incorrect");
            }
            count += 1;
        }
    } else {
        const draggedElementData = e.dataTransfer.getData("text");
        const droppableElementData = e.target.getAttribute("data-id");
        if(draggedElementData === droppableElementData) {
            const draggedElement = document.getElementById(draggedElementData);
            e.target.classList.add("dropped");
            dragContainer.classList.add("hide");
            draggedElement.classList.add("hide");
            draggedElement.setAttribute("draggable", "false");
            e.target.innerHTML = ``;
            e.target.insertAdjacentHTML("afterbegin", `<img src="flags/${draggedElementData}.png">`);
            e.target.classList.add("correct");
            count += 1;
        } else {
            e.target.classList.add("incorrect");
        }
    }
    if(count === 1) {
        result.classList.remove("hide");
        result.innerText = `Correct!`;
        stopGame();
    }
};
const creator = () => {
    dragContainer.innerHTML = "";
    dropContainer.innerHTML = "";
    let randomData = [];
    let correctAnswer = randomValueGenerator();
    randomData.push(correctAnswer);

    while(randomData.length < 3) {
        let randomCountry = randomValueGenerator();
        if(!randomData.includes(randomCountry)) {
            randomData.push(randomCountry);
        }
    }

    randomData.sort(() => 0.5 - Math.random());

    const flagDiv = document.createElement("div");
    flagDiv.classList.add("draggable-image");
    flagDiv.setAttribute("draggable", true);
    if(isTouchDevice()) {
        flagDiv.style.position = "absolute";
    }
    flagDiv.innerHTML = `<img src="flags/${correctAnswer}.png" id="${correctAnswer}">`;
    dragContainer.appendChild(flagDiv);

    randomData.forEach((country) => {
        const countryDiv = document.createElement("div");
        countryDiv.innerHTML = `<div class="countries" data-id="${country}">
            ${country.charAt(0).toUpperCase() + country.slice(1).replace("-", " ")}
        </div>`;
        dropContainer.appendChild(countryDiv);
    });

    dropPoints = document.querySelectorAll(".countries");
    draggableObjects = document.querySelectorAll(".draggable-image");

    draggableObjects.forEach((element) => {
        element.addEventListener("dragstart", dragStart);
        element.addEventListener("touchstart", dragStart);
        element.addEventListener("touchend", drop);
        element.addEventListener("touchmove", touchMove);
    });
    dropPoints.forEach((element) => {
        element.addEventListener("dragover", dragOver);
        element.addEventListener("drop", drop);
    });
};
creator();