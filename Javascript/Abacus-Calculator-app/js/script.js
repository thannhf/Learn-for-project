var lines = document.getElementsByClassName('line'),
bones = document.getElementsByClassName('bone'),
    bonesArr = Array.prototype.slice.call(bones);

function findLine(i) {
    var subArr = [];
    if((i >= 0) && (i <= 9)) subArr = bonesArr.slice(0, 10);
    if((i >= 10) && (i <= 19)) subArr = bonesArr.slice(10, 20);
    if ((i>=20)&&(i<=29)) subArr = bonesArr.slice(20,30);
  if ((i>=30)&&(i<=39)) subArr = bonesArr.slice(30,40);
  if ((i>=40)&&(i<=49)) subArr = bonesArr.slice(40,50);
  if ((i>=50)&&(i<=59)) subArr = bonesArr.slice(50,60);
  if ((i>=60)&&(i<=69)) subArr = bonesArr.slice(60,70);
  if ((i>=70)&&(i<=79)) subArr = bonesArr.slice(70,80);
  if ((i>=80)&&(i<=83)) subArr = bonesArr.slice(80,84);
  if ((i>=84)&&(i<=93)) subArr = bonesArr.slice(84,94);
  if ((i>=94)&&(i<=103)) subArr = bonesArr.slice(94,104);
  if ((i>=104)&&(i<=113)) subArr = bonesArr.slice(104);
  return subArr;
}
function bindClick(i) {
    return function() {
        console.log("you clicked bone" + i);
        var line = findLine(i);
        var boneCount = line.filter(function(a) {
            return a.classList.contains('count');
        });

        var boneUnCount = line.filter(function(a) {
            return !a.classList.contains('count');
        });

        if(bones[i].classList.contains('count')) {
            boneCount[boneCount.length-1].classList.toggle('count');
        } else{
            boneUnCount[0].classList.toggle('count');
        }
    };
}

function addEvents(divs) {
    for(var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("click", bindClick(i));
    }
}
addEvents(bones);