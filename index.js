const booksContainer = document.querySelector(".section__books__items");
const searchForm = document.querySelector("#searchForm");
const noResultsMessage = document.querySelector(".no-results");
let books = [];

function displayBooks(books) {
  booksContainer.innerHTML = "";

  books.sort((a, b) => a.author.localeCompare(b.author));

  if (books.length === 0) {
    noResultsMessage.style.display = "block";
  } else {
    noResultsMessage.style.display = "none";
  }

  books.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const title = document.createElement("h2");
    title.innerText = book.title;

    const author = document.createElement("p");
    author.innerText = `Author: ${book.author}`;

    const genre = document.createElement("p");
    genre.innerText = `Genre: ${book.genre}`;

    bookDiv.append(title, author, genre);

    booksContainer.appendChild(bookDiv);
  });
}

function searchBooks(query) {
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.genre.toLowerCase().includes(query.toLowerCase())
  );
  displayBooks(filteredBooks);
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#searchInput");
  const query = searchInput.value.trim();
  searchBooks(query);
  searchInput.value = "";
});

fetch("./data/listofbooks.json")
  .then((response) => response.json())
  .then((data) => {
    books = data;
    displayBooks(books);
  });
