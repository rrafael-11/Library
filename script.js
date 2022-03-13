let form = document.querySelector('form')
let addBookBtn = document.querySelector('.btn-add-book')
let booksContainer = document.querySelector('.books-container')
let bookName = () => { return document.querySelector('#name').value }
let bookAuthor = () => { return document.querySelector('#author').value }
let bookPages = () => { return document.querySelector('#pages').value }
let bookStatus = () => { return document.querySelector('#read').checked }

let myLibrary = []

function book(name, author, pages, status) {
    this.name = name
    this.author = author
    this.pages = pages
    if (status) {
        this.status = 'Read'
    } else {
        this.status = 'Not read'
    }
}

function resetGrid() {
    while (booksContainer.hasChildNodes()) {
        booksContainer.removeChild(booksContainer.lastChild)
    }
}

function displayBooks() {
    resetGrid()
    for (var i = 0; i < myLibrary.length; i++) {
        let newCard = document.createElement('div')
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        let span3 = document.createElement('span')
        let buttonRemove = document.createElement('button')
        let buttonStatus = document.createElement('button')
        buttonRemove.innerHTML = 'X'
        span1.innerHTML = myLibrary[i].name
        span2.innerHTML = myLibrary[i].author
        span3.innerHTML = myLibrary[i].pages + ' pages'
        buttonStatus.innerHTML = myLibrary[i].status
        booksContainer.appendChild(newCard)
        newCard.appendChild(buttonRemove)
        newCard.appendChild(span1)
        newCard.appendChild(span2)
        newCard.appendChild(span3)
        newCard.appendChild(buttonStatus)
        newCard.classList.add('card')
        buttonRemove.classList.add('btn', 'btn-remove')
        buttonStatus.classList.add('btn', 'btn-status', myLibrary[i].status == 'Read' ? 'btn-success' : 'btn-warning')
        newCard.setAttribute('data-index', i)
    }
}

function addBookToLibrary() {
    let newBook = new book(bookName(), bookAuthor(), bookPages(), bookStatus())
    myLibrary.push(newBook)
}


addBookBtn.addEventListener('mousedown', () => {
    addBookToLibrary()
    displayBooks()
    form.reset()
})

document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('btn-remove')) {
        booksContainer.removeChild(e.target.parentElement)
        if (e.target.parentElement.getAttribute('data-index') > myLibrary.length) {
            let indexDifference = e.target.parentElement.getAttribute('data-index') - myLibrary.length
            myLibrary.splice(indexDifference - e.target.parentElemenet.getAttribute('data-index'), 1)
        } else {
            myLibrary.splice(e.target.parentElement.getAttribute('data-index'), 1)
        }
        displayBooks()
    } else if (e.target.classList.contains('btn-status')) {
        if (e.target.classList.contains('btn-success')) {
            myLibrary[e.target.parentElement.getAttribute('data-index')].status = 'Not read'
        } else {
            myLibrary[e.target.parentElement.getAttribute('data-index')].status = 'Read'
        }
        displayBooks()
    }
})