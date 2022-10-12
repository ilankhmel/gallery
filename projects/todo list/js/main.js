'use strict'



function onInit() {
    renderTodos()
}


function renderTodos() {

    const todos = getTodosForDisplay()

    const strHTMLs = todos.map(todo => `
        <li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
            <span onclick="onImportance(event, '${todo.id}')">(importance: ${todo.importance})</span>
        </li>
    `)

    document.querySelector('ul').innerHTML = strHTMLs.join('')
    document.querySelector('span.total').innerText = getTotalCount()
    document.querySelector('span.active').innerText = getActiveCount()

    if(!todos.length){
        var filterStatus = getFilterStatus()
        document.querySelector('ul').innerHTML = `No ${filterStatus} Todos!`
    }

    if(!isFilterOn()){
        renderArrows()
    }
}


function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    console.log('Removing:', todoId)
    var isSure = confirm('Are you sure?')
    if(!isSure) return

    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    console.log('Toggling:', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=txt]')
    const txt = elTxt.value
    if (!txt.length) return

        addTodo(txt)
        renderTodos()
        elTxt.value = ''
}

function onSetFilter(filterBy) {
    console.log('filterBy:', filterBy)
    setFilter(filterBy)
    renderTodos()
}


function onSetFilterByTxt(txt) {
    console.log('Filtering by txt', txt)
    setFilterByTxt(txt)
    renderTodos()
}

function onImportance(ev, todoId) {
    ev.stopPropagation()
    console.log(todoId);
    var newImportance = -1

    while (newImportance <= 0 || newImportance > 3) {
        newImportance = +prompt('Enter Importance level between 1 - 3')
    }
    setImportance(newImportance, todoId)
    renderTodos()
}

    
function renderArrows(){
    var index = 0
    document.querySelectorAll('li').forEach((el)=>{
        if(index === 0 ){
            el.innerHTML += `<button onclick="onMoveDown(event, ${index})">↓</button>`
        }else if(index === gTodos.length - 1){
            el.innerHTML += `<button onclick="onMoveUp(event, ${index})">↑</button>`
        }else{
        el.innerHTML += `<button onclick="onMoveUp(event, ${index})">↑</button><button onclick="onMoveDown(event, ${index})">↓</button>`
        }
        index++
    })
    index = 0
}

