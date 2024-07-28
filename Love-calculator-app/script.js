document.getElementById('loveCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;

    if(name1 && name2) {
        fetch(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${name1}&sname=${name2}`, {
            method: 'GET',
            headers:{
                'X-RapidAPI-Host':'love-calculator.p.rapidapi.com',
                'X-RapidAPI-Key': '63ac57d48emsh508ea42ef650f4fp18cd14jsna8076e2d2ba8'
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = `${data.fname} and ${data.sname} have a ${data.percentage}% chance of love. ${data.result}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'An error occurred.please try again later.';
        });
    }
});