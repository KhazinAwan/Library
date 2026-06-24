const myLibrary = [];
const container = document.querySelector("#container");

addBookToLibrary("Dune", "Frank Herbert", 412, true);
addBookToLibrary("The Hobbit", "Tolkien", 295, false);

displayBooks();

function Book(id, title, author, pages, read) {

    this.id = id
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

Book.prototype.toggleRead = function() {

    this.read = !this.read;
}


function addBookToLibrary(title, author, pages, read = true) {

    const id = crypto.randomUUID();

    const newBook = new Book(id, title, author, pages, read);

    myLibrary.push(newBook);

}

function handleBookBtns() {

    const removeBtn = document.createElement("button");
    const readBtn = document.createElement("button");

    removeBtn.textContent = "Remove";
    readBtn.textContent = "Change read status";

    removeBtn.addEventListener("click" , (event)=> {

        const card = event.target.closest(".bookCard");

        const bookId = card.dataset.id;

        const index = myLibrary.findIndex(

            book => book.id === bookId
        );

        myLibrary.splice(index, 1);

        displayBooks();

    })

    readBtn.addEventListener("click" , (event)=>{

        const card = event.target.closest(".bookCard");

        const bookId = card.dataset.id;

        const index = myLibrary.findIndex(

            book => book.id === bookId
        );

        myLibrary[index].toggleRead();

        displayBooks();

    })

    return { removeBtn, readBtn };

}


function displayBooks() {

    container.textContent = "";

    for (const book of myLibrary) {

        const title = document.createElement("div");
        const author = document.createElement("div");
        const pages = document.createElement("div");
        const read = document.createElement("div");


        title.textContent = "Title: " + book.title;
        author.textContent = "Author: " + book.author;
        pages.textContent = "Pages: " + book.pages;
        if(book.read) { read.textContent = "Read: yes"; } else { read.textContent = "Read: no"; }

        const {removeBtn, readBtn} = handleBookBtns();
        
        const card = document.createElement("div");

        card.dataset.id = book.id;

        card.classList.add("bookCard");

        card.append(title, author, pages, read, removeBtn, readBtn);

        container.append(card);

    }
}

const newBookBtn = document.querySelector("#newBookBtn");
const cancelBtn = document.querySelector("#bookForm button[type='button']");

const bookForm = document.querySelector("#bookForm");

newBookBtn.addEventListener("click", ()=> {

    bookForm.reset();
    bookForm.classList.remove("hidden");

})

cancelBtn.addEventListener("click" , ()=> {

    bookForm.classList.add("hidden");
})

bookForm.addEventListener("submit" , (event) => {

    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;


    addBookToLibrary(title, author, pages, read);

    bookForm.classList.add("hidden");

    displayBooks();

})

