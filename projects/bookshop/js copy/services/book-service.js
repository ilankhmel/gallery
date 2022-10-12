'use strict'
const STORAGE_KEY = 'bookDB'
var gBooks
var gFilterBy = { minPrice: 0, minRate: 0 }
var id = loadFromStorage('ID')
var gIsCardMode = loadFromStorage('viewMode')

const PAGE_SIZE = 6
var gPageIdx = 0


_createBooks()

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('Learning Karavel'), _createBook('Beginning with Karavel'), _createBook('Java for developers'))
    }
    gBooks = books
    _saveBooksToStorage()
}

function _createBook(title, price = getRandomIntInclusive(5, 100)) {
    saveToStorage('ID', id + 1)
    return {
        id: (id++).toString(),
        title,
        price,
        desc: makeLorem(),
        rate: 0,
    }
}


function getBooks() {

    //Filtering:
    var books = gBooks.filter((book) => (book.price >= gFilterBy.minPrice) && book.rate >= gFilterBy.minRate)

    // Paging:
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)

    return books
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex((book) => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    id--
    saveToStorage('ID', id)
    _saveBooksToStorage()
}

function addBook(name, price) {
    var newBook = _createBook(name, price)
    gBooks.push(newBook)
    _saveBooksToStorage()
}

function getBookById(bookId) {
    var book = gBooks.find((book) => book.id.toString() === bookId)
    return book
}

function updateBook(bookId, price) {
    var book = getBookById(bookId)
    console.log(book);
    book.price = price
    _saveBooksToStorage()
}

// function showModal(bookId){
//     var elModal = document.querySelector('.modal')
//     var book = getBookById(bookId)
//     console.log(book);
//     elModal.classList.add('open')
//     elModal.querySelector('.read').innerText = book.desc

// }

function lowerRate(bookId) {
    var book = getBookById(bookId)

    if (!book.rate) return
    else {
        // book.rate--
        _saveBooksToStorage()
    }
}


function increaseRate(bookId) {
    var book = getBookById(bookId)
    // console.log(typeof bookId);
    // console.log(bookId);
    // console.log(book);
    if (book.rate === 10) return
    else {
        book.rate++
        _saveBooksToStorage()
    }
}

function setFilter(obj = {}) {
    if (obj.minPrice !== undefined) gFilterBy.minPrice = obj.minPrice
    if (obj.minRate !== undefined) gFilterBy.minRate = obj.minRate
    return gFilterBy
}


function nextPage() {
    // const startIdx = gPageIdx * PAGE_SIZE
    // if (gBooks.length - 1 === startIdx + PAGE_SIZE || gPageIdx * PAGE_SIZE >= gBooks.length || gBooks.slice(startIdx, startIdx + PAGE_SIZE).length < PAGE_SIZE) {
    //     console.log('returned');
    //     return

    if (gPageIdx === Math.floor(gBooks.length / PAGE_SIZE)) {
        console.log('returned');
        return
    } else {
        gPageIdx++
    }

}


function previousPage() {
    // const startIdx = gPageIdx * PAGE_SIZE
    if (!gPageIdx) {
        console.log('returned');
        return
    } else {
        gPageIdx--
    }

}

function isCardMode(){
    return gIsCardMode
}

function changePresentation(){
    gIsCardMode = !gIsCardMode
    saveToStorage('viewMode', gIsCardMode)
}