const textInput = document.getElementById('text');
const voiceSelect = document.getElementById('voiceSelect');
const speakButton = document.getElementById('speakButton');
const downloadButton = document.getElementById('downloadButton');

function speak() {
    if(textInput.value !== '') {
        const text = encodeURIComponent(textInput.value);
        const lang = voiceSelect.value;
        const audioUrl = `https://api.voicerss.org/?key=f42e287e60e148cb87f686f31aa4f1ad&src=${text}&hl=${lang}&r=-3&c=wav`;
        const audio = new Audio(audioUrl);
        audio.play();
    }
}

function download() {
    if(textInput.value !== '') {
        const text = encodeURIComponent(textInput.value);
        const lang = voiceSelect.value;
        const audioUrl = `https://api.voicerss.org/?key=f42e287e60e148cb87f686f31aa4f1ad&src=${text}&hl=${lang}&r=-3&c=wav`;
        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = 'speech.wav';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
speakButton.addEventListener('click', speak);
downloadButton.addEventListener('click', download);