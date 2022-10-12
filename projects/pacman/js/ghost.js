'use strict'

const GHOST = '&#9781;'

var gGhosts = []
var gDeadGhosts = []
var gIntervalGhosts

function createGhost(board) {
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}


function colorGhosts(colors) {

    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        if (typeof colors === 'string') {
            ghost.color = colors
            console.log('1');
        } else {
            ghost.color = colors[i]
            console.log('<1');
        }
    }

}

function saveGhostsColors() {
    var colors = []
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        colors[i] = ghost.color
    } return colors
}
var deadGhosts
function killGhost(position) {
    //gBoard[position.i][position.j] = EMPTY
    // find the ghost index in gGhosts and then splice use: findIndex

    console.log(position.i, position.j);
    var currGhost = gGhosts.findIndex((ghost) => {
        if (ghost.location.i === position.i && ghost.location.j === position.j)
            return ghost
    })
    console.log(currGhost);
    //var killedGhost = gGhosts.splice(currGhost, 1)[0]
    var deadGhost = gGhosts.splice(currGhost, 1)[0]
    gDeadGhosts.push(deadGhost)
    // console.log(killedGhost);
    //     setTimeout(()=>{
    //         gGhosts.push(killedGhost)
    //         renderCell(killedGhost[0].location, getGhostHTML(gGhosts[0]))
    //         //debugger
    //         //renderGhosts()
    //     }, 5000)
}

function reviveGhosts() {
    // write 
    gGhosts = [...gGhosts, ...gDeadGhosts]
    gDeadGhosts = []
}
// killghost
// setInterval
// revive


function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === PACMAN) {
        gameOver()
        return
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="background-color:${gPacman.isSuper ? 'blue' : ghost.color}">${GHOST}</span>`
    //style="background-color: ${getRandomColor()}"
}

function removeGhosts() {
    var deadGhosts = []
    for (let i = 0; i < gGhosts.length; i++) {
        deadGhosts[i] = gGhosts.splice(gGhosts[i], 1)

    }
    return deadGhosts
}

function renderGhosts() {
    for (let i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
}