const countValue = document.getElementById("clickCount");
const colorPart = document.querySelectorAll(".color-part");
const container = document.querySelector(".container");
const startButton = document.querySelector("#start");
const result = document.querySelector("#title");
const wrapper = document.querySelector(".wrapper");

const colors = {
    color1: {
        current: "#068e06",
        new: "#11e711",
    },
    color2: {
        current: "#950303",
        new: "#fd2a2a",
    },
    color3: {
        current: "#01018a",
        new: "#2062fc",
    },
    color4: {
        current: "#919102",
        new: "#fafa18",
    },
};
let randomColors = [];
let pathGeneratorBool = false;
let count, clickCount = 0;

startButton.addEventListener("click", () => {
    count = 0;
    clickCount = 0;
    randomColors = [];
    pathGeneratorBool = false;
    wrapper.classList.remove("hide");
    container.classList.add("hide");
    pathGenerate();
});
const pathGenerate = () => {
    randomColors.push(generateRandomValue(colors));
    count = randomColors.length;
    pathGeneratorBool = true;
    pathDecide(count);
};
const generateRandomValue = (obj) => {
    let arr = Object.keys(obj);
    return arr[Math.floor(Math.random() * arr.length)];
};
const pathDecide = async(count) => {
    countValue.innerText = count;
    for(let i of randomColors) {
        let currentColor = document.querySelector(`${i}`);
        await delay(500);
        currentColor.style.backgroundColor = `${colors[i]["new"]}`;
        await delay(600);
        currentColor.style.backgroundColor = `${colors[i]["current"]}`;
        await delay(600);
    }
    pathGeneratorBool = false;
};
async function delay(time) {
    return await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
colorPart.forEach((element) => {
    element.addEventListener("click", async(e) => {
        if(pathGeneratorBool) {
            return false;
        }
        if(e.target.classList[0] == randomColors[clickCount]) {
            e.target.style.backgroundColor = `${
                colors[randomColors[clickCount]]["new"]
            }`;
            await delay(500);

            e.target.style.backgroundColor = `${
                colors[randomColors[clickCount]]["current"]
            }`;
            clickCount += 1;

            if(clickCount == count) {
                clickCount = 0;
                pathGenerate();
            }
        } else {
            lose();
        }
    });
});
const lose = () => {
    result.innerHTML = `<span> Your Score: </span> ${count}`;
    result.classList.remove("hide");
    container.classList.remove("hide");
    wrapper.classList.add("hide");
    startButton.innerText = "Play Again";
    startButton.classList.remove("hide");
};