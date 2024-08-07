let testSlide = document.querySelectorAll(".testItem");
let dots = document.querySelectorAll(".dot");
var counter = 0;
function switchTest(currentTest) {
    currentTest.classList.add('active');
    var testId = currentTest.getAttribute('attr');
    if(testId > counter) {
        testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
        counter = testId;
        testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
    } else if(testId == counter) {
        return;
    } else {
        testSlide[counter].style.animation = 'prev1 0.5s ease-in forwards';
        counter = testId;
        testSlide[counter].style.animation = 'prev2 0.5s ease-in forwards';
    }
    indicators();
}
function indicators() {
    for(i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    dots[counter].className += ' active';
}
function slideNext() {
    testSlide[counter].style.animation = 'next1 0.8s ease-in forwards';
    if(counter >= testSlide.length - 1) {
        counter = 0;
    } else {
        counter++;
    }
    testSlide[counter].style.animation = 'next2 0.8s ease-in forwards';
    indicators();
}
function autoSliding() {
    deleteInterval = setInterval(timer, 3000);
    function timer() {
        slideNext();
        indicators();
    }
}
autoSliding();
const container = document.querySelector('.indicators');
container.addEventListener("mouseover", pause);
function pause() {
    clearInterval(deleteInterval);
}
container.addEventListener("mouseout", autoSliding);