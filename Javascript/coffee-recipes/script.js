document.addEventListener('DOMContentLoaded', function() {
    const coffeeList = document.getElementById('coffee-list');
    const modal = document.getElementById('myModal');
    const recipePreview = document.getElementById('recipe-preview');

    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Coffee / Tea')
    .then(response => response.json())
    .then(data => {
        displayCoffeeList(data.drinks);
    });

    function displayCoffeeList(coffees) {
        coffees.forEach(coffee => {
            const coffeeItem = document.createElement('div');
            coffeeItem.className = 'coffee-item';
            coffeeItem.innerHTML = `
                <img src="${coffee.strDrinkThumb}" alt="${coffee.strDrink}">
                <p>${coffee.strDrink}</p>
            `;
            coffeeItem.onclick = () => fetchRecipe(coffee.idDrink);
            coffeeList.appendChild(coffeeItem);
        });
    }

    function fetchRecipe(coffeeId) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${coffeeId}`)
        .then(response => response.json())
        .then(data => {
            displayRecipe(data.drinks[0]);
        });
    }

    function displayRecipe(recipe) {
        modal.style.display = 'block';
        recipePreview.innerHTML = `
            <h2>${recipe.strDrink}</h2>
            <img src="${recipe.strDrinkThumb}" alt="${recipe.strDrink}">
            <h3>Ingredients:</h3>
            <ul>
                ${getIngredients(recipe).map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h3>Instructions:</h3>
            <p>${recipe.strInstructions}</p>
        `;
        document.querySelector('.close').onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if(event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    function getIngredients(recipe) {
        let ingredients = [];
        for(let i = 1; i <= 15; i++) {
            let ingredient = recipe[`strIngredient${i}`];
            let measure = recipe[`strMeasure${i}`];
            if(ingredient) {
                ingredients.push(`${measure ? measure + ' of ' : ''}${ingredient}`);
            }
        }
        return ingredients;
    }
});