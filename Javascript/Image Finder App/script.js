const form = document.querySelector("form");
const input = document.querySelector("input");
const imagesSection = document.querySelector('.images');

form.addEventListener('submit', formSubmitted);

function formSubmitted() {
    event.preventDefault();
    const searchTerm = input.value;
    search(searchTerm).then(displayImages);
}

function search(searchTerm) {
    imagesSection.innerHTML = '';
    return fetch(`https://pixabay.com/api/?key=11493426-2cdb0244bb87550715119519b&q=${searchTerm}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(result => {
        return result.hits;
    });
}

function displayImages(pics) {
    pics.forEach(pic => {
        const img = new Image();
        const imageElement = document.createElement('img');
        imageElement.src = pic.webformatURL;
        imagesSection.appendChild(imageElement);
    });
}