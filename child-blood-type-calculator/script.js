function calculateBloodType() {
    const motherBloodType = document.getElementById('mother-blood-type').value;
    const motherRh = document.getElementById('mother-rh').value;
    const fatherBloodType = document.getElementById('father-blood-type').value;
    const fatherRh = document.getElementById('father-rh').value;

    const bloodTypeCombinations = {
        'A,A': { 'A': 75, 'O': 25 },
        'A,B': { 'A': 25, 'B': 25, 'AB': 25, 'O': 25 },
        'A,AB': { 'A': 50, 'B': 25, 'AB': 25 },
        'A,O': { 'A': 50, 'O': 50 },
        'B,A': { 'A': 25, 'B': 25, 'AB': 25, 'O': 25 },
        'B,B': { 'B': 75, 'O': 25 },
        'B,AB': { 'A': 25, 'B': 50, 'AB': 25 },
        'B,O': { 'B': 50, 'O': 50 },
        'AB,A': { 'A': 50, 'B': 25, 'AB': 25 },
        'AB,B': { 'A': 25, 'B': 50, 'AB': 25 },
        'AB,AB': { 'A': 25, 'B': 25, 'AB': 50 },
        'O,A': { 'A': 50, 'O': 50 },
        'O,B': { 'B': 50, 'O': 50 },
        'O,AB': { 'A': 50, 'B': 50 },
        'O,O': { 'O': 100 },
    };

    const rhFactorCombinations = {
        '+,+': { '+': 94, '-': 6 },
        '+,-': { '+': 50, '-': 50 },
        '-,+': { '+': 50, '-': 50 },
        '-,-': { '-': 100 },
    };

    const bloodTypeKey = `${motherBloodType}, ${fatherBloodType}`;
    const rhFactorKey = `${motherRh}, ${fatherRh}`;
    const possibleBloodTypes = bloodTypeCombinations[bloodTypeKey];
    const possibleRhFactors = rhFactorCombinations[rhFactorKey];
    const results = document.getElementById('results');

    results.innerHTML = `
        <h3>possible blood types and percentages:</h3>
        ${Object.entries(possibleBloodTypes).map(([type, percentage]) => `${type}:${percentage}%</p>`).join('')}
        <h3>possible Rh Fators and percentages:</h3>
        ${Object.entries(possibleRhFactors).map(([factor, percentage]) => `<p>${factor}:${percentage}%</p>`).join('')}
    `;
}