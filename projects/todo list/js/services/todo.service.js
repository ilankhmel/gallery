'use strict'

const STORAGE_KEY = 'todoDB'
var gFilterBy = {
    txt: '',
    status: ''
}
var gTodos

_createTodos()

function getFilterStatus(){
    return gFilterBy.status
}

function getTodosForDisplay() {
    var todos = gTodos

    if (gFilterBy.status) {
        if (gFilterBy.status === 'done' || gFilterBy.status === 'active') {
            todos = todos.filter(todo =>
                (todo.isDone && gFilterBy.status === 'done') ||
                (!todo.isDone && gFilterBy.status === 'active')
            )
        }


        if (gFilterBy.status === 'txt') todos = todos.sort((a, b) => {
            const nameA = a.txt.toUpperCase(); // ignore upper and lowercase
            const nameB = b.txt.toUpperCase(); // ignore upper and lowercase
            return nameA.localeCompare(nameB)
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });


        if (gFilterBy.status === 'importance') todos = todos.sort((a, b) => b.importance - a.importance);

        if (gFilterBy.status === 'createdAt') todos = todos.sort((a, b) => {
            const createdA = a.createdAt; // ignore upper and lowercase
            const createdB = b.createdAt; // ignore upper and lowercase
            
            if (createdA < createdB) {
                return 1;
            }
            if (createdA > createdB) {
                return -1;
            }

            // names must be equal
            return 0;
        });
    }

    console.log(todos);
    todos = todos.filter(todo => todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase()))
    return todos
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt) {
    // const todo = {
    //     id: _makeId(),
    //     txt,
    //     isDone: false
    // }
    // THE SAME
    const todo = _createTodo(txt)
    gTodos.push(todo)
    _saveTodosToStorage()
}

function setFilter(status) {
    gFilterBy.status = status
}

function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    return gTodos.filter(todo => !todo.isDone).length
}


function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)
    //var dateTime = makeDateTime()
    if (!todos || !todos.length) {
        todos = [
            {
                id: 't101',
                txt: 'Learn HTML',
                isDone: true,
                createdAt: Date.now(),
                importance: 1,
            },
            {
                id: 't102',
                txt: 'Master JS',
                isDone: false,
                createdAt: Date.now(),
                importance: 1,
            },
            {
                id: 't103',
                txt: 'Study CSS',
                isDone: false,
                createdAt: Date.now(),
                importance: 1,
            },
        ]
    }

    gTodos = todos
    _saveTodosToStorage()
}


function _createTodo(txt) {
    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        createdAt: Date.now(),
        importance: 1,
    }
    return todo
}


function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}

function makeDateTime() {
    var date = new Date();
    var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var date_time = current_date + " " + current_time;
    return date_time
}

function setImportance(newImportance, todoId) {
    gTodos.find(todo => todo.id === todoId).importance = newImportance
}

function isFilterOn(){
    if(gFilterBy.status) return true
    return false
}

function onMoveUp(ev, idx){
    ev.stopPropagation()
    var obj = gTodos.splice(idx, 1)
    console.log(obj);
    gTodos.splice((idx - 1), 0, obj[0])
    renderTodos()
}

function onMoveDown(ev, idx){
    ev.stopPropagation()
    var obj = gTodos.splice(idx, 1)
    console.log(obj);
    gTodos.splice((idx + 1), 0, obj[0])
    renderTodos()
}