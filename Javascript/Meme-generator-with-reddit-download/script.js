const memeGeneratorBtn = document.getElementById('meme-generator');
const memeTitle = document.getElementById('meme-title');
const memeImg = document.getElementById('meme-img');
const memeAuthor = document.getElementById('meme-author');
const downloadLink = document.getElementById('download-link');
const MEME_API_URL = "https://meme-api.com/gimme/wholesomememes";

const updateData = (title, imgURL, author) => {
    memeTitle.innerHTML = title;
    memeImg.style.display = '';
    memeImg.setAttribute("src", imgURL);
    memeAuthor.innerHTML = `Author:${author}`;
    downloadLink.setAttribute('href', imgURL);
}

const generateMeme = () => {
    fetch(MEME_API_URL)
        .then((res) => res.json())
        .then(data => {
            updateData(data.title, data.url, data.author);
        });
}
memeGeneratorBtn.addEventListener("click", generateMeme);