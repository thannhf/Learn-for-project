function isAnagram(a, b) {
    const sortedA = a.toLowerCase().split('').sort().join('');
    const sortedB = b.toLowerCase().split('').sort().join('');
    return sortedA === sortedB;
}

function checkAnagram() {
    const firstInput = document.getElementById('firstInput').value;
    const secondInput = document.getElementById('secondInput').value;
    const resultContainer = document.getElementById('result');

    if(isAnagram(firstInput, secondInput)) {
        resultContainer.textContent = `"${firstInput}" and "${secondInput}" are anagram!`;
    } else {
        resultContainer.textContent = `"${firstInput}" and "${secondInput}" are not anagrams.`;
    }
};