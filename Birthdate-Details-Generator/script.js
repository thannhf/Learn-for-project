function generateDetails() {
    const birthdate = document.getElementById('birthdate').value;
    if(!birthdate) {
        alert("please enter a birthdate");
        return;
    }

    const date = new Date(birthdate);
    const dayOfWeek = getDayOfWeek(date);
    const zodiacSign = getZodiacSign(date);
    const age = getAge(date);

    document.getElementById('dayOfWeek').textContent = `Day of the Week:${dayOfWeek}`;
    document.getElementById('zodiacSign').textContent = `Zodiac Sign:${zodiacSign}`;
    document.getElementById('age').textContent = `Age:${age}`;
}

function getDayOfWeek(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

function getZodiacSign(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
}

function getAge(date) {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDifference = today.getMonth() - date.getMonth();
    if(monthDifference < 0 || (monthDifference === 0 && today.getDate() < date.getDate())) {
        age--;
    }
    return age;
}