'use strict'

function onInit(){
    renderPageByQueryStringParams()
    renderBooks()
}

function renderBooks(){
    var books = getBooks()

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
        <td><button class="read" onclick="onShowModal('${book.id}')">Read</button><td>
        <td><button class="update" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        <td><button class="minus" onclick="onMinusRate('${book.id}')">-</button><span class"rate-screen">${book.rate}</span><button class="plus" onclick="onPlusRate('${book.id}')">+</button></td>
        </tr>`
    )

    strHTMLs.unshift(`<tr><th>Id</th>
                     <th>Title</th>
                     <th>Price</th>
                     <th colspan="2"><th>Actions<th>
                     <th>Rate</th>
                     </tr>`)
    document.querySelector(`.book-table`).innerHTML = strHTMLs.join("")

    }else{
        
    //Rendering Cards
    var strHTMLs = books.map((book)=>
    `<div class="card">
        <h2>${book.title}</h2>
        <div class="price">Price: ${book.price}</div>
        <div class="actions">
        <button class="read" onclick="onShowModal('${book.id}')">Read</button>
        <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </div>
        <div class="rate">
        Rate: <button class="minus" onclick="onMinusRate('${book.id}')">-</button><span class"rate-screen">${book.rate}</span><button class="plus" onclick="onPlusRate('${book.id}')">+</button>
        </div>
        <img onerror="this.src='images/0.jpg'" src="images/${book.id}.jpg" alt="">
    </div>`)

    document.querySelector(`.cards-container`).innerHTML = strHTMLs.join("")
    }
}


function onRemoveBook(bookId){
    removeBook(bookId)
    renderBooks()
}

function onAddBook(){
    var name = prompt('Enter book name:')
    var price = +prompt('Enter book price:')
    addBook(name, price)
    renderBooks()
}
function onUpdateBook(bookId){
    var newPrice = 0
    while(newPrice <= 0 || newPrice > 100){
    newPrice = +prompt('Enter new book price (Between 1 - 100):')
    }
    
    updateBook(bookId, newPrice)
    renderBooks()
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