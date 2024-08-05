document.addEventListener('DOMContentLoaded', () => {
    const planetContainer = document.getElementById('planet-container');
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modal-body');
    const span = document.getElementsByClassName('close')[0];
    const planets = [
        { name: 'Mercury', image: 'https://cdn-icons-png.flaticon.com/512/1795/1795220.png', size: 0.383, mass: '3.3011 x 10^23 kg', gravity: 3.7, meanRadius: 2439.7, discoveryDate: 'N/A', orbitalPeriod: '88 days', numberOfMoons: 0, lengthOfDay: '58.6 days' },
        { name: 'Venus', image: 'https://cdn-icons-png.flaticon.com/512/360/360752.png', size: 0.949, mass: '4.8675 x 10^24 kg', gravity: 8.87, meanRadius: 6051.8, discoveryDate: 'N/A', orbitalPeriod: '225 days', numberOfMoons: 0, lengthOfDay: '116.75 days' },
        { name: 'Earth', image: 'https://cdn-icons-png.flaticon.com/512/9985/9985721.png', size: 1, mass: '5.97237 x 10^24 kg', gravity: 9.8, meanRadius: 6371, discoveryDate: 'N/A', orbitalPeriod: '365.25 days', numberOfMoons: 1, lengthOfDay: '24 hours' },
        { name: 'Mars', image: 'https://cdn-icons-png.flaticon.com/512/124/124582.png', size: 0.532, mass: '6.4171 x 10^23 kg', gravity: 3.71, meanRadius: 3389.5, discoveryDate: 'N/A', orbitalPeriod: '687 days', numberOfMoons: 2, lengthOfDay: '24.6 hours' },
        { name: 'Jupiter', image: 'https://cdn-icons-png.flaticon.com/512/360/360754.png', size: 11.21, mass: '1.8982 x 10^27 kg', gravity: 24.79, meanRadius: 69911, discoveryDate: 'N/A', orbitalPeriod: '12 years', numberOfMoons: 79, lengthOfDay: '9.9 hours' },
        { name: 'Saturn', image: 'https://cdn-icons-png.flaticon.com/512/3336/3336008.png', size: 9.45, mass: '5.6834 x 10^26 kg', gravity: 10.44, meanRadius: 58232, discoveryDate: 'N/A', orbitalPeriod: '29 years', numberOfMoons: 82, lengthOfDay: '10.7 hours' },
        { name: 'Uranus', image: 'https://cdn-icons-png.flaticon.com/512/6989/6989438.png', size: 4.01, mass: '8.6810 x 10^25 kg', gravity: 8.69, meanRadius: 25362, discoveryDate: 'N/A', orbitalPeriod: '84 years', numberOfMoons: 27, lengthOfDay: '17.2 hours' },
        { name: 'Neptune', image: 'https://cdn-icons-png.flaticon.com/512/360/360708.png', size: 3.88, mass: '1.02413 x 10^26 kg', gravity: 11.15, meanRadius: 24622, discoveryDate: 'N/A', orbitalPeriod: '165 years', numberOfMoons: 14, lengthOfDay: '16.1 hours' }
    ];
    function displayPlanets() {
        planets.forEach(planet => {
            const planetCard = document.createElement('div');
            planetCard.classList.add('planet-card');
            planetCard.innerHTML = `
                <img src="${planet.image}" alt="${planet.name}" style="width:${planet.size * 32}px;">
            `;
            planetCard.addEventListener('click', () => {
                modalContent.innerHTML = `
                    <img src="${planet.image}" />
                    <h2>${planet.name}</h2>
                    <p><strong>Mass:</strong> ${planet.mass}</p>
                    <p><strong>Gravity:</strong> ${planet.gravity} m/s²</p>
                    <p><strong>Mean Radius:</strong> ${planet.meanRadius} km</p>
                    <p><strong>Discovery Date:</strong> ${planet.discoveryDate}</p>
                    <p><strong>Orbital Period:</strong> ${planet.orbitalPeriod}</p>
                    <p><strong>Number of Moons:</strong> ${planet.numberOfMoons}</p>
                    <p><strong>Length of Day:</strong> ${planet.lengthOfDay}</p>
                `;
                modal.style.display = "block";
            });
            planetContainer.appendChild(planetCard);
        });
    }
    displayPlanets();
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if(event.target == modal) {
            modal.style.display = "none";
        }
    }
});