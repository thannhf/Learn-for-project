function predictAge() {
    const name = document.getElementById('nameInput').value;
    const result = document.getElementById('result');

    if(name === ""){
        result.textContent = "please enter a name.";
        return;
    }
    const url = `https://api.agify.io?name=${name}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.age) {
                result.textContent = `the predicted age for the name "${name}" is ${data.age} years.`;
            } else {
                result.textContent = `Sorry, we couldn't predict the age for the name "${name}".`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            result.textContent = "an error occurred while predicting the age. please try again.";
        });
}