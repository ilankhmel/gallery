'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '○'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var foodCount

//console.log(foodCount);

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.score = 0
    gGame.isOn = true
    //foodCount = getFoodCount()
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }

        }
    }
    board[1][1] = POWER_FOOD
    board[1][8] = POWER_FOOD
    board[8][1] = POWER_FOOD
    board[8][8] = POWER_FOOD
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

// function getFoodCount() {
//     var count = 0

//     for (let i = 0; i < gBoard.length; i++) {
//         for (let j = 0; j < gBoard[0].length; j++) {

//             if (gBoard[i][j] === FOOD) count++
//         }
        
//     }
//     return count
// }

function victorious(){
    console.log('Victorious!')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryIntervalID)
    document.querySelector('button').style.display = 'inline'
}


function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryIntervalID)
    document.querySelector('button').style.display = 'inline'
}

function restart(){
    // removeGhosts()
    //clearInterval(gIntervalGhosts)
    document.querySelector('button').style.display = 'none'
    //document.querySelector('span').innerHTML = 'Score : 0'
    init()


}