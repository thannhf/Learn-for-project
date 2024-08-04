function calculateDays() {
    const date1 = document.getElementById('date1').value;
    const date2 = document.getElementById('date2').value;

    if(date1 === '' || date2 === '') {
        document.getElementById('result').innerText = 'please select both dates.';
        return;
    }

    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const timeDifference = Math.abs(secondDate - firstDate);
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    document.getElementById('result').innerText = `there are ${daysDifference} days between ${date1} and ${date2}.`;
}