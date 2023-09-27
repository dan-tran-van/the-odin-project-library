const yourBooks = [];

let yourBooksCounter = document.querySelector("#your-books-counter");

function Book(title, author, pages, frontCover, format, progress, addedTime) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.frontCover = frontCover;
  this.format = format;
  this.progress = progress;
  this.addedTime = addedTime;
}

function addBookToLibrary(title, author, pages, frontCover, format, progress) {
  const currentTime = new Date();
  const newBook = new Book(
    title,
    author,
    pages,
    frontCover,
    format,
    progress,
    currentTime
  );

  yourBooks.push(newBook);
}

addBookToLibrary(
  "86--EIGHTY-SIX, Vol. 1 (light novel)",
  "Asato Asato",
  256,
  "https://books.google.com/books/publisher/content/images/frontcover/NYeFDwAAQBAJ?w=300&usc=0",
  "Ebooks",
  "In progress"
);

addBookToLibrary(
  "86--EIGHTY-SIX, Vol. 2 (light novel)",
  "Asato Asato",
  192,
  "https://books.google.com/books/publisher/content/images/frontcover/16qXDwAAQBAJ?w=300&usc=0",
  "Ebooks",
  "Not started"
);

addBookToLibrary(
  "86--EIGHTY-SIX, Vol. 3 (light novel)",
  "Asato Asato",
  240,
  "https://books.google.com/books/publisher/content/images/frontcover/IXGxDwAAQBAJ?w=300&usc=0",
  "Ebooks",
  "Not started"
);

console.log(yourBooks);

const books = document.querySelector("#books");

function displayBooks() {
  books.textContent = "";

  yourBooks.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    const bookIndex = yourBooks.indexOf(book);

    const bookFrontCover = document.createElement("div");
    bookFrontCover.classList.add("book-front-cover");

    bookFrontCover.innerHTML = `<img src="${book.frontCover}" alt="${book.title}'s front cover">`;

    const bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");

    bookTitle.innerHTML = `<span>${book.title}</span><img src="icons/delete_FILL0_wght400_GRAD0_opsz24.svg" alt="More" class='remove-book' data-book-index='${bookIndex}'>`;

    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");

    bookAuthor.innerHTML = `<span>${book.author}</span>`;

    bookCard.appendChild(bookFrontCover);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);

    books.prepend(bookCard);
  });
}

const newBookButton = document.querySelector("#new-book-button");
const newBookDialog = document.querySelector("#new-book-dialog");
const dialogCancelButton = document.querySelector("#dialog-cancel-button");
const dialogConfirmButton = document.querySelector("#dialog-confirm-button");

newBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

dialogCancelButton.addEventListener("click", () => {
  newBookDialog.close();
});

dialogConfirmButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (document.forms["new-book-form"].reportValidity()) {
    const newBookTitle = document.querySelector("#new-book-title").value;
    const newBookAuthor = document.querySelector("#new-book-author").value;
    const newBookPages = document.querySelector("#new-book-pages").value;
    const newBookFrontCover = document.querySelector(
      "#new-book-front-cover"
    ).value;
    const newBookFormat = document.querySelector("#new-book-format").value;
    const newBookProgress = document.querySelector("#new-book-progress").value;

    addBookToLibrary(
      newBookTitle,
      newBookAuthor,
      newBookPages,
      newBookFrontCover,
      newBookFormat,
      newBookProgress
    );

    newBookDialog.close();
    displayBooks();
    yourBooksCounter.textContent = yourBooks.length;
    resetRemoveBookButtons();
  }
});

displayBooks();

yourBooksCounter.textContent = yourBooks.length;

let removeBookButtons = document.querySelectorAll(".remove-book");

function resetRemoveBookButtons() {
  let removeBookButtons = document.querySelectorAll(".remove-book");

  removeBookButtons.forEach((removeBookButton) => {
    removeBookButton.addEventListener("click", () => {
      const removeBookButtonIndex =
        removeBookButton.getAttribute("data-book-index");
      yourBooks.splice(removeBookButtonIndex, 1);

      displayBooks();
      yourBooksCounter.textContent = yourBooks.length;
      resetRemoveBookButtons();
    });
  });
}

console.log(removeBookButtons);

removeBookButtons.forEach((removeBookButton) => {
  removeBookButton.addEventListener("click", () => {
    const removeBookButtonIndex =
      removeBookButton.getAttribute("data-book-index");
    yourBooks.splice(removeBookButtonIndex, 1);

    displayBooks();
    yourBooksCounter.textContent = yourBooks.length;
    resetRemoveBookButtons();
  });
});
