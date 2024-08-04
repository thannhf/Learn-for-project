let btn = document.getElementById('btn');
let outputs = document.getElementById('outputs');
let php = document.getElementById('output1');
let dollars = document.getElementById('output2');
let yen = document.getElementById('output3');
let rupees = document.getElementById('output4');

btn.addEventListener('click', () => {
    let amount = document.getElementById('amount').value;

    let formatter1 = new Intl.NumberFormat('en-PH', {style:'currency', currency:'PHP'});
    let formatter2 = new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'});
    let formatter3 = new Intl.NumberFormat('ja-JP', {style:'currency', currency:'JPY'});
    let formatter4 = new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR'});

    outputs.style.display = '';
    php.innerHTML = `<span>Philippine Peso:</span> ${formatter1.format(amount)}`;
    dollars.innerHTML = `<span>US Dollars:</span> ${formatter2.format(amount)}`;
    yen.innerHTML = `<span>Japanese Yen:</span> ${formatter3.format(amount)}`;
    rupees.innerHTML = `<span>Indian Rupees:</span> ${formatter4.format(amount)}`;
})