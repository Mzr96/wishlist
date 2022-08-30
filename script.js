"use strict";

const add = document.querySelector(".add");
const body = document.querySelector("body");
const books = document.querySelector(".books");
const inputForm = document.querySelector("form");
const addNewBook = document.querySelector(".add-new-book");
let myLibrary = [];

function Book(title, author, pages, Isread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = Isread;
  this.info = function () {
    return `${title} by ${author}, ${this.pages} pages, ${
      this.Isread ? "read" : "not read yet"
    }.`;
  };
}

// Change read-status Btn
Book.prototype.changeReadeStatus = function () {
  this.isRead ? (this.isRead = false) : (this.isRead = true);
  displayMyLibrary();
};

function addBookToLibrary(...bookDetails) {
  myLibrary.push(new Book(...bookDetails));
}

addBookToLibrary("Skyfall", "Sam Mendes ", 143, true);
addBookToLibrary("Parasite", "Bong Joon-ho", 132, false);
addBookToLibrary("Green Book", "Peter Farrelly", 130, true);
addBookToLibrary("Top Gun: Maverick", "Joseph Kosinski", 131, true);
displayMyLibrary();

function displayMyLibrary() {
  books.textContent = "";
  for (let book of myLibrary) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.setAttribute("data-index", `${myLibrary.indexOf(book)}`);
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = book.title;
    bookElement.appendChild(title);

    const authorElement = document.createElement("div");
    const authorIcon = document.createElement("img");
    const author = document.createElement("p");
    authorIcon.src = "movie-open-outline.svg";
    authorElement.appendChild(authorIcon);
    author.textContent = book.author;
    authorElement.appendChild(author);
    author.classList.add("author");
    bookElement.appendChild(authorElement);

    const pagesElement = document.createElement("div");
    const pages = document.createElement("p");
    const pagesIcon = document.createElement("img");
    pagesIcon.src = "clock-time-two-outline.svg";
    pagesElement.appendChild(pagesIcon);
    pages.classList.add("pages");
    pages.textContent = book.pages + " '";
    pagesElement.appendChild(pages);
    bookElement.appendChild(pagesElement);

    // read button
    const toggleRead = document.createElement("button");
    toggleRead.classList.add("read-status");
    book.isRead
      ? (toggleRead.textContent = "Watched")
      : (toggleRead.textContent = "Not Yet");
    book.isRead
      ? toggleRead.classList.add("read")
      : toggleRead.classList.add("unread");
    bookElement.appendChild(toggleRead);

    // remove button
    // Create Element
    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.textContent = "Remove";
    bookElement.appendChild(remove);

    books.appendChild(bookElement);
  }
  execute();
}

function execute() {
  // Remove
  const removeBtns = document.querySelectorAll(".remove");
  for (let btn of removeBtns) {
    btn.addEventListener("click", function (e) {
      const btnParent = e.target.parentElement;
      console.log(Number(btnParent.dataset.index));
      const index = Number(btnParent.dataset.index);
      myLibrary.splice(index, 1);
      console.log(myLibrary);
      displayMyLibrary();
    });
  }

  // Change Read Status
  const toggleReadBtns = document.querySelectorAll(".read-status");
  console.log(toggleReadBtns);
  for (let btn of toggleReadBtns) {
    btn.addEventListener("click", function (e) {
      const btnParent = e.target.parentElement;
      console.log(Number(btnParent.dataset.index));
      const index = Number(btnParent.dataset.index);
      myLibrary[index].changeReadeStatus();
      displayMyLibrary();
    });
  }
}

addNewBook.addEventListener("click", function () {
  console.log("hi");
  inputForm.classList.toggle("hide");
});

add.addEventListener("click", function (e) {
  e.preventDefault();
  inputForm.checkValidity();
  inputForm.reportValidity();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isread").checked;

  if (title !== "" && author !== "" && pages !== "") {
    addBookToLibrary(title, author, pages, isRead);
    inputForm.reset();
    inputForm.classList.toggle("hide");
    displayMyLibrary();
  }
});

document.addEventListener("click", function (e) {
  console.log(`e.target is: ${e.target}`);
  console.log(e.target.closest("form"));
  if (
    !inputForm.classList.contains("hide") &&
    !e.target.closest("form") &&
    !e.target.closest(".add-new-book")
  ) {
    console.log("here we go again");
    inputForm.classList.add("hide");
  }
});
