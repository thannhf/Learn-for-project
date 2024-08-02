const markers = [
    {
        location: [10.6713, 122.9511],
        title: "Project Title 1",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis facere fugiat sequi nisi eum blanditiis, earum totam natus voluptatum cumque corrupti. Obcaecati nemo quae officia et neque consequuntur, nihil nobis! Inventore cumque ut iusto minus culpa natus expedita eos veritatis quae quibusdam odit beatae similique laudantium officia, aspernatur asperiores earum omnis a mollitia. Inventore cumque ut iusto minus culpa natus expedita eos veritatis quae quibusdam odit beatae similique laudantium officia, aspernatur asperiores earum omnis a mollitia.  Ullam numquam nihil nemo inventore sint deserunt Vitae et dicta rerum quae cupiditate ullam tenetur dolores ex consectetur esse? Quibusdam, cumque libero. Dignissimos, voluptatem debitis similique ipsam nostrum dolores quia nam, quibusdam, est quod quidem obcaecati quae.",
        images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"],
        link: "./index.html"
    },
    {
        location: [10.663, 122.9511],
        title: "Project Title 2",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis facere fugiat sequi nisi eum blanditiis, earum totam natus voluptatum cumque corrupti. Obcaecati nemo quae officia et neque consequuntur, nihil nobis! Inventore cumque ut iusto minus culpa natus expedita eos veritatis quae quibusdam odit beatae similique laudantium officia, aspernatur asperiores earum omnis a mollitia. Ullam numquam nihil nemo inventore sint deserunt Vitae et dicta rerum quae cupiditate ullam tenetur dolores ex consectetur esse? Quibusdam, cumque libero. Dignissimos, voluptatem debitis similique ipsam nostrum dolores quia nam, quibusdam, est quod quidem obcaecati quae.",
        images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"],
        link: "./index.html"
    },
    // Add more markers as needed
];

// initialize the map
const map = L.map('map').setView([10.6713, 122.9511], 13);

// add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// add markers to the map
markers.forEach(markerData => {
    const marker = L.marker(markerData.location).addTo(map);
    marker.on('click', () => {
        document.getElementById('modal-title').textContent = markerData.title;
        document.getElementById('modal-description').textContent = markerData.description;
        document.getElementById('modal-link').href = markerData.link;

        const imagesContainer = document.getElementById('modal-images');
        imagesContainer.innerHTML = ''; // clear previous images
        markerData.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            imagesContainer.appendChild(img);
        });
        document.getElementById('myModal').style.display = 'block';
    });
});

// modal functionality
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}