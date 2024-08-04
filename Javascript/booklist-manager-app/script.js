function addBook() {
    var authorInput = document.getElementById('author').value.trim();
    var titleInput = document.getElementById('title').value.trim();

    if(authorInput === '' || titleInput === '') {
        alert('please enter both author and title');
        return;
    }

    var currentDate = new Date().toLocaleDateString();

    // create a new row for the table
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${authorInput}</td>
        <td>${titleInput}</td>
        <td>${currentDate}</td>
    `;

    // append the new row to the table body
    var tableBody = document.getElementById('book-list-body');
    tableBody.appendChild(newRow);

    // save to local storage
    var book = {
        author:authorInput,
        title:titleInput,
        date:currentDate
    };

    // check if books are already in localStorage
    var books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);

    // save updated books array to localStorage
    localStorage.setItem('books', JSON.stringify(books));

    // clear input fields after adding book
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
}

// function to load books from local storage on page load
function loadBooks() {
    var books = JSON.parse(localStorage.getItem('books')) || [];
    var tableBody = document.getElementById('book-list-body');
    tableBody.innerHTML = '';

    // loop through books and add them to the table
    books.foreEach(function(book) {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${book.author}</td>
            <td>${book.title}</td>
            <td>${book.date}</td>
        `;
        tableBody.appendChild(newRow);
    });
}
// call loadBooks on page load to populate the table
loadBooks();