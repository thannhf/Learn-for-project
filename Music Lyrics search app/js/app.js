const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const songsContainer = document.querySelector('#songs-container');
const prevAndNextContainer = document.querySelector('#prev-and-next-container');

const handleMoreSongs = async(url) => {
    const data = await getMoreSongs(url);
    insertSongsIntoPage(data);
}

const insertNextAndPrevButtons = ({prev, next}) => {
    prevAndNextContainer.innerHTML = `
        ${prev ? `<button class="btn" onclick="handleMoreSongs('${prev}')">Previous</button>` : ''}
        ${next ? `<button class="btn" onclick="handleMoreSongs('${next}')">Next</button>` : ''};
    `;
}

const insertSongsIntoPage = ({data, prev, next}) => {
    songsContainer.innerHTML = data.map(({artist:{name}, title}) => `
        <li class="song">
            <span class="song-artist"><strong>${name}</strong> - ${title}</span>
            <button class="btn" data-artist="${name}" data-song-title="${title}"> see lyrics</button>
        </li>
    `).join('');

    if(prev || next) {
        insertNextAndPrevButtons({prev, next});
        return;
    }
    prevAndNextContainer.innerHTML = '';
}

const insertWarningMessage = message => {
    songsContainer.innerHTML = `<li class="warning-message">${message}</li>`;
}

const handleSongs = async(term) => {
    const data = await fetchSongs(term);

    if(data.total === 0) {
        insertWarningMessage('pop favor, digite um termo vaslido.');
        prevAndNextContainer.innerHTML = '';
        return;
    }
    insertSongsIntoPage(data);
}

const handleFormSubmit = event => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    searchInput.value = '';
    searchInput.focus();

    if(!searchTerm) {
        insertWarningMessage('please enter a valid term');
        prevAndNextContainer.innerHTML = '';
        return;
    }
    handleSongs(searchTerm);
}

form.addEventListener('submit', handleFormSubmit);

const insertLyricsIntoPage = ({lyrics, artist, songTitle}) => {
    songsContainer.innerHTML = `
        <li class="lyrics-container">
            <h2><strong>${songTitle}</strong>-${artist}</h2>
            <p class="lyrics">${lyrics}</p>
        </li>
    `;
}

const handleLyrics = async(artist, songTitle) => {
    const data = await fetchLyrics(artist, songTitle);

    if(!data.lyrics) {
        insertWarningMessage('lyrics unaavailable!:(');
        return;
    }
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    insertLyricsIntoPage({lyrics, artist, songTitle});
}

const handleSongsContainerClick = event => {
    const clickedElement = event.target;

    if(clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-song-title');
        prevAndNextContainer.innerHTML = '';
        handleLyrics(artist, songTitle);
    }
}
songsContainer.addEventListener('click', handleSongsContainerClick);