(function() {
    const form = document.getElementById('calc-form');
    const results = document.getElementById('results');
    const errors = document.getElementById('form-error');

    function errorMessage(msg) {
        errors.innerHTML = msg;
        errors.style.display = '';
        return false;
    }

    function showResults(calories){
        results.innerHTML = `<p>Your basal metabolic rate (BMR) is: <strong>${calories.toFixed(2)} </strong> calories a day.</p><a href="#" id="rs">Reset</a>`;
        results.style.display = '';
        form.style.display = 'none';
        errors.style.display = 'none';
    }

    function resetForm(e) {
        if(e.target.id = 'rs') {
            e.preventDefault();
            results.style.display = 'none';
            form.style.display = '';
            form.reset();
        }
    }

    function submitHandler(e) {
        e.preventDefault();
        
        let age = parseFloat(form.age.value);
        if(isNaN(age) || age < 0) {
            return errorMessage('please enter a valid age');
        }

        let heightCM = parseFloat(form.height_cm.value);
        if(isNaN(heightCM) || heightCM < 0) {
            let heightFeet = parseFloat(form.height_ft.value);
            if(isNaN(heightFeet) || heightFeet < 0) {
                return errorMessage('Please enter a valid height in feet or centimeters');
            }

            let heightInches = parseFloat(form.height_in.value);
            if(isNaN(heightInches) || heightInches < 0) {
                heightInches = 0;
            }
            heightCM = 2.54 * heightInches + 30.4 * heightFeet;
        }

        let weight = parseFloat(form.weight.value);
        if(isNaN(weight) || weight < 0) {
            return errorMessage('please enter a valid weight');
        }

        if(form.weight_unit.value == 'lb') {
            weight = 0.453592 * weight;
        }

        let calories = 0;
        if(form.gender.value == 'Female') {
            calories = 655.09 + 9.56 * weight + 1.84 * heightCM - 4.67 * age;
        } else {
            calories = 66.47 + 13.75 * weight + 5 * heightCM - 6.75 * age;
        }
        showResults(calories);
    }

    form.addEventListener('submit', submitHandler);
    results.addEventListener('click', resetForm, true);
})();