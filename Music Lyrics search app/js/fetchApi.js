const apiURL = `https://api.lyrics.ovh`;

const fetchData = async(url) => {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw 'Naxo conseguimos encontrar!';
        }
        return await response.json();
    } catch(error) {
        return error;
    }
}

const getMoreSongs = async(url) => {
    return await fetchData(`https://cors-anywhere.herokuapp.com/${url}`);
}
const fetchSongs = async(term) => {
    return await fetchData(`${apiURL}/suggest/${term}`);
}
const fetchLyrics = async(artist, songTitle) => {
    return await fetchData(`${apiURL}/v1/${artist}/${songTitle}`);
}