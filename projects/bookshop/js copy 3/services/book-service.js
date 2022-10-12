'use strict'
const STORAGE_KEY = 'bookDB'
var gBooks
var gFilterBy = { minPrice: 0, minRate: 0, txt: "", th: '' }
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
    var books = gBooks.filter((book) => (book.price >= gFilterBy.minPrice) && (book.rate >= gFilterBy.minRate) && (book.title.toLowerCase().includes(gFilterBy.txt.toLowerCase())))


    //sorting:

    if (gFilterBy.th) {
        books = gBooks.sort((a, b) => {

            switch (gFilterBy.th) {
                case 'title':
                    console.log('title');
                    var bookNameA = a.title
                    var bookNameB = b.title
                    //return bookNameA.localCompare(bookNameB)
                    if (bookNameA < bookNameB) {
                        return -1;
                    }
                    if (bookNameB > bookNameA) {
                        return 1;
                    }

                    // names must be equal
                    return 0;


                case 'price':
                    var bookPriceA = a.price
                    var bookPriceB = b.price
                    //return bookPriceA.localCompare(bookPriceB)
                    if (bookPriceA < bookPriceB) {
                        return -1;
                    }
                    if (bookPriceB > bookPriceA) {
                        return 1;
                    }

                    // names must be equal
                    return 0;


                case 'rate':
                    var bookRateA = a.rate
                    var bookRateB = b.rate
                    //return bookRateA.localCompare(bookRateB)

                    if (bookRateA < bookRateB) {
                        return -1;
                    }
                    if (bookRateB > bookRateA) {
                        return 1;
                    }

                    // names must be equal
                    return 0;


                default:
                    break;
            }
        })
    }
    console.log(books);

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
    console.log(obj);
    if (obj.minPrice !== undefined) gFilterBy.minPrice = obj.minPrice
    if (obj.minRate !== undefined) gFilterBy.minRate = obj.minRate
    if (obj.txt) {
        gFilterBy.txt = obj.txt
    } else {
        gFilterBy.txt = ''
    }

    if (obj.th) {
        gFilterBy.th = obj.th
    } else {
        gFilterBy.th = ''
    }

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

function isCardMode() {
    return gIsCardMode
}

function changePresentation() {
    gIsCardMode = !gIsCardMode
    saveToStorage('viewMode', gIsCardMode)
}


function sortByName() {
    var books = gBooks.sort((a, b) => {
        var bookNameA = a.title
        var bookNameB = b.title
        return bookNameA.localCompare(bookNameB)
    })

}