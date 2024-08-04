document.addEventListener('DOMContentLoaded', function() {
    const decimalInput = document.getElementById('decimal');
    const binaryInput = document.getElementById('binary');

    function decimalToBinary(decimal) {
        return (decimal >>> 0).toString(2);
    }

    function binaryToDecimal(binary) {
        return parseInt(binary, 2);
    }

    decimalInput.addEventListener('input', function() {
        const decimalValue = parseInt(decimalInput.value, 10);
        if(!isNaN(decimalValue)) {
            binaryInput.value = decimalToBinary(decimalValue);
        } else {
            binaryInput.value = '';
        }
    });

    binaryInput.addEventListener('input', function() {
        let binaryValue = binaryInput.value.trim();
        binaryValue = binaryValue.replace(/[^01]/g, '');
        binaryInput.value = binaryValue;

        if(/^[01]+$/.test(binaryValue)) {
            decimalInput.value = binaryToDecimal(binaryValue);
        } else {
            decimalInput.value = '';
        }
    });
});