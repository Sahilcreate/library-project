
(function () {
const myLibrary = [];

function domCache () {
    const addBookDataBtn = document.getElementById('addBookDataBtn');
    const libraryContainer = document.querySelector('.libraryContainer');
    
    const bookForm = document.getElementById('bookForm');
    const showDialogBtn = document.getElementById('showDialogBtn');
    const dialog = document.getElementById('dialog');

    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    const pagesInput = document.getElementById('pagesInput');
    const statusInput = document.getElementById('statusInput');

    return {
        addBookDataBtn,
        libraryContainer,
        bookForm,
        showDialogBtn,
        dialog,
        titleInput,
        authorInput,
        pagesInput,
        statusInput
    }
}

class Book {
    constructor (title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    addBookToLibrary() {
        myLibrary.push(this);
    }
}

(function eventListeners() {
    const elements = domCache();

    elements.showDialogBtn.addEventListener('click', () => {
        elements.dialog.showModal();
    })

    elements.dialog.addEventListener('click', (event) => {
        if(event.target.id === 'dialog') {
            elements.dialog.close();
        }
    })

    elements.bookForm.addEventListener('submit', (event) => {
        const title = elements.titleInput.value;
        const author = elements.authorInput.value;
        const pages = elements.pagesInput.value;
        const status = elements.statusInput.value;

        const newBook = new Book(title, author, pages, status);

        newBook.addBookToLibrary();
        elements.bookForm.reset();

        showBooksInLibrary(elements);
    })

    document.body.addEventListener('click', (event) => {
        const btn = event.target;
        const index = Number(btn.getAttribute('data-attribute'));
    
        if(btn.classList.contains('card-remove')) {
            myLibrary.splice(index, 1);
        } else if (btn.classList.contains('card-status')) {
            if (btn.classList.contains('read')) {
                btn.classList.remove('read');
                btn.classList.add('not-read');
                myLibrary[index].status = "Not Read";
            } else if (btn.classList.contains('not-read')) {
                btn.classList.remove('not-read');
                btn.classList.add('read');
                myLibrary[index].status = "Read";
            }
        }
        
        showBooksInLibrary(elements);
    });

    document.addEventListener('DOMContentLoaded', () => {
        const initialBooks = [
            new Book("You Don't Know JS Yet: Get Started", "Kyle Simpson", "140", "Read"),
            new Book("The Subtle Art of Not Giving a F*ck", "Mark Manson", "212", "Not Read"),
            new Book("The Life-Changing Magic of Tidying Up", "Marie Kondo", "213", "Read"),
            new Book("How to Win Friends & Influence People", "Dale Carnegie", "304", "Read")
        ];

        initialBooks.forEach((book) => {
            book.addBookToLibrary();
        })

        showBooksInLibrary(elements);
    })

})();

function showBooksInLibrary(elements) {
    function deleteLibrary() {
        let child = elements.libraryContainer.lastElementChild;
        while(child) {
            elements.libraryContainer.removeChild(child);
            child = elements.libraryContainer.lastElementChild;
        }
    }
    deleteLibrary();

    for (let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement('div');
        const cardTitle = document.createElement('h3');
        const cardAuthor = document.createElement('div');
        const cardPages = document.createElement('div');
        const cardStatus = document.createElement('button');
        const cardRemove = document.createElement('button');
        const btnGroup = document.createElement('div');

        card.classList.add('card');
        cardTitle.classList.add('card-title');
        cardAuthor.classList.add('card-author');
        cardPages.classList.add('card-pages');
        cardStatus.classList.add('card-status');
        cardStatus.classList.add(`${myLibrary[i].status.toLowerCase().split(' ').join('-')}`);
        cardRemove.classList.add('card-remove');
        btnGroup.classList.add('btn-group');

        cardStatus.setAttribute('data-attribute', `${i}`);
        cardRemove.setAttribute('data-attribute', `${i}`);

        cardTitle.textContent = myLibrary[i].title;
        cardAuthor.textContent = `Author: ${myLibrary[i].author}`;
        cardPages.textContent = `Pages: ${myLibrary[i].pages}`;
        cardStatus.textContent = myLibrary[i].status;
        cardRemove.textContent = "Remove"

        btnGroup.appendChild(cardStatus);
        btnGroup.appendChild(cardRemove);
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        card.appendChild(btnGroup);

        elements.libraryContainer.appendChild(card);
    }
}

})();
