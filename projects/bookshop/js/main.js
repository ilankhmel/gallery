'use strict'

function onInit(){
    renderPageByQueryStringParams()
    renderBooks()
}

function renderBooks(){
    //Get filtered books
    var filteredBooks = getBooks()

    //Sort by table head
    var books = sortBooks(filteredBooks)
    
    //First clear Exsiting view
    document.querySelector(`.book-table`).innerHTML = ''
    document.querySelector(`.cards-container`).innerHTML = ''

    if(!isCardMode()){


    //Rendering Table
    var strHTMLs = books.map((book)=>
        `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td><button class="read" onclick="onShowModal('${book.id}')">Read</button></td>
        <td><button class="update" onclick="onUpdateBook('${book.id}')">Update Price</button></td>
        <td><button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        <td><button class="minus" onclick="onMinusRate('${book.id}')">-</button><span class"rate-screen">${book.rate}</span><button class="plus" onclick="onPlusRate('${book.id}')">+</button></td>
        </tr>`
    )

        strHTMLs.unshift(`<tr><th>Id</th>
                     <th class="clickable-th" onclick="onSetFilterBy({th: 'title'})">Title</th>
                     <th class="clickable-th"onclick="onSetFilterBy({th: 'price'})">Price</th>
                     <th colspan="3">Actions</th>
                     <th class="clickable-th"onclick="onSetFilterBy({th: 'rate'})">Rate</th>
                     </tr>`)


    document.querySelector(`.book-table`).innerHTML = strHTMLs.join("")


    }else{

    //Rendering Cards
    var strHTMLs = books.map((book)=>
    `<div class="card">
        <img class="book-img" onerror="this.src='images/0.jpg'" src="images/${book.id}.jpg" alt="">
        <div class="book-details">
        <h2>${book.title}</h2>
        <div class="actions">
        <button class="read" onclick="onShowModal('${book.id}')">Read</button>
        <button class="update" onclick="onUpdateBook('${book.id}')">Update Price</button>
        <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </div>
        <div>Rating: ${'★'.repeat(book.rate)}</div>
        <div class="rate">
        Rate: <button class="minus" onclick="onMinusRate('${book.id}')">-</button><span class"rate-screen"><b>${book.rate}</b></span><button class="plus" onclick="onPlusRate('${book.id}')">+</button>
        </div>
        <div class="price">To buy: <b>$${book.price}</b></div>
        </div>
    </div>`)

    document.querySelector(`.cards-container`).innerHTML = strHTMLs.join("")
    }

    renderPagesBtns()
}


function onRemoveBook(bookId){
    removeBook(bookId)
    renderBooks()
}

function onCreateBookBtnClick(){
    renderAddBookInputs()
}


function onAddBook(){
    // var name = prompt('Enter book name:')
    // var price = +prompt('Enter book price:')
    // console.log(name, price);
    const elNewBookNameInput = document.querySelector('.book-name')
    const elNewBookPriceInput = document.querySelector('.book-price')

    var newName = elNewBookNameInput.value
    var newPrice = elNewBookPriceInput.value

    addBook(newName, Number(newPrice))
    renderCreateBookBtn()
    renderBooks()
}
function onUpdateBook(bookId, bookTitle){
    console.log(bookId, bookTitle);
    renderUpdateBookInputs(bookId)
  
}


function renderUpdateBookInputs(bookId){
    var strHTML = `<br><label>New price: </label><input placeholder="Between 1 - 100" class="updated-price"></input> <button onclick="onUpdateBtn('${bookId}')">Update</button>`
    document.querySelector('.update-container').innerHTML = strHTML
}


function onUpdateBtn(bookId){
    const elNewBookPriceInput = document.querySelector('.updated-price')
    var updatedPrice = elNewBookPriceInput.value
    if(updatedPrice > 0 && updatedPrice <= 100){
    updateBook(bookId, updatedPrice)

    document.querySelector('.update-container').innerHTML = ''
    renderCreateBookBtn()
    renderBooks()}
}


function onShowModal(bookId){
    var elModal = document.querySelector('.modal')
    //console.log(bookId);
    var book = getBookById(bookId)
    console.log(book);
    elModal.classList.add('open')
    elModal.querySelector('.read').innerText = book.desc
    
    
    const queryStringParams = `?minPrice=${gFilterBy.minPrice}&minRate=${gFilterBy.minRate}&openModal=${book.id}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onCloseModal(bookId){
    var elModal = document.querySelector('.modal')
    var book = getBookById(bookId)
    console.log(book);
    elModal.classList.remove('open')
    elModal.querySelector('.read').innerText = ''

    const queryStringParams = `?minPrice=${gFilterBy.minPrice}&minRate=${gFilterBy.minRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onMinusRate(bookId){
    lowerRate(bookId)
    renderBooks()
}

function onPlusRate(bookId){
    increaseRate(bookId)
    renderBooks()
}

function onSetFilterBy(obj){
    setFilter(obj)
    renderBooks()

    
    const queryStringParams = `?minPrice=${gFilterBy.minPrice}&minRate=${gFilterBy.minRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onBookMarkBtnClick(){
    var btn = document.querySelector(".bookmark")
    if(btn.classList.contains('marked')){
        btn.classList.remove('marked') 
        return
        
    } else btn.classList.add('marked')
    
}


function renderPageByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)

    //URL params obj
    const filterBy = {
        minPrice: +queryStringParams.get('minPrice') || 0,
        minRate: +queryStringParams.get('minRate') || 0,
        openModal: queryStringParams.get('openModal') || ''
    }
    console.log(filterBy);

    if (!filterBy.minPrice && !filterBy.minSpeed && filterBy.openModal === undefined) return

    //Setting HTML Filters
    document.querySelector('.filter-price-range').value = filterBy.minPrice
    document.querySelector('.filter-rate-range').value = filterBy.minRate

    //Setting gFilterBy
    setFilter(filterBy)

    //Setting open modal
    if(!filterBy.openModal) return
    else onShowModal(filterBy.openModal)
}


function onNextPage() {
    nextPage()
    renderBooks()
}

function onPreviousPage(){
    previousPage()
    renderBooks()
}

function onChangePresentation(){
    changePresentation()
    renderBooks()
}

function renderAddBookInputs(){
   var strHTML = `<label>Book Name: </label><input class="book-name"></input> <label>Book Price: </label><input class="book-price"></input> <button type="submit" class="add-book-btn" onclick="onAddBook()">Create</button>`
   document.querySelector('.add-book').innerHTML = strHTML
}

function renderCreateBookBtn(){
    var strHTML = `<button class="create-btn" onclick="onCreateBookBtnClick()">Create new book</button>`
    document.querySelector('.add-book').innerHTML = strHTML

}

function renderPagesBtns(){
    document.querySelector('.pages').innerHTML = ''
    var pageNum = 1
    var numOfPages = getNumOfPages()
    for (let i = 0; i < numOfPages; i++) {
        document.querySelector('.pages').innerHTML += `<button onclick="onNumberPageBtn(${pageNum - 1})" class"page-${pageNum}">${pageNum}</button>`
        pageNum++
    }
}

function onNumberPageBtn(id){
    goToPage(id)
    renderBooks()
}