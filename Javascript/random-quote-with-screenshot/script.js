const randomquote = document.getElementById('randomquote');
const quoteAuthor = document.getElementById('quoteAuthor');
const generatequoteButton = document.getElementById('generatequote');
const screenshotButton = document.getElementById('screenshotButton');
const quoteContainer = document.getElementById('quoteContainer');

// function to generate a new quote
function generateQuote() {
    fetch("https://type.fit/api/quotes")
        .then(res => res.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            const quote = data[randomIndex];
            randomquote.textContent = quote.text;
            quoteAuthor.textContent = quote.author || 'Unknown';
        })
        .catch(error => {
            console.error('error fetching the quote:', error);
            randomquote.textContent = "error fetching quote";
            quoteAuthor.textContent = "";
        });
}

// event listener for the new quote button
generatequoteButton.addEventListener("click", generateQuote);

// event listener for the screenshot button
screenshotButton.addEventListener("click", function() {
    html2canvas(quoteContainer).then(canvas => {
        canvas.toBlob(blob => {
            const item = new ClipboardItem({'image/png' : blob});
            navigator.clipboard.write([item]);
            alert('Quote has been screenshot');
        }).catch(error => {
            console.error('error copying screenshot to clipboard: ', error);
        });
    });
});

// generate an initial quote when the page loads
generateQuote();