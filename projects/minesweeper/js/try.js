'use strict'

var gLevel
var gGame
var gBoard
var hintMode = false

var time
var gTimerInterval

function init() {

    gLevel = {
        SIZE: 4,
        MINES: 2,
        HINTS: 3,
    }

    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lives: 2,
    }

    gBoard = buildBoard(gLevel.SIZE, gLevel.MINES)
    renderBoard(gBoard)
}



function buildBoard(size, mines) {
    var board = []
    for (let i = 0; i < size; i++) {
        board[i] = []
        for (let j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false

            }
        }

    }

    for (let i = 0; i < mines; i++) {
        getRandomMines(board, size)
        
    }
    // board[3][3] = { isShown: false, isMine: true, isMarked: false }
    // board[1][1] = { isShown: false, isMine: true, isMarked: false }
    return board
}



function setMinesNegsCount(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            countBombsAround(board, i, j)

        }

    }
    return board
}



function countBombsAround(board, rowIdx, colIdx) {
    var checkedCell = board[rowIdx][colIdx]
    if (checkedCell.isMine) return
    for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        var currRow = board[i]
        for (let j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === rowIdx && j === colIdx) continue

            var currCell = currRow[j]
            if (currCell.isMine) checkedCell.minesAroundCount++

        }

    }

}

function renderBoard(board) {
    var strHTML = ''
    for (let i = 0; i < board.length; i++) {
        strHTML += `\n<tr class="board-row" >`
        for (let j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var className = `cell cell-${i}-${j}` // ${(currCell.isMine) ? 'mine' : ''
            strHTML += `\n\t<td class="${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})"></td>\n`

        }
        strHTML += `\n</tr>`

    }
    //console.log(strHTML);
    document.querySelector('tbody').innerHTML = strHTML
}

function cellClicked(el, i, j) {
    gGame.isOn = true

    var elCell = el
    var cell = gBoard[i][j]
    
    if(cell.isShown) return

    if (hintMode && gGame.isOn) {
        showHint(gBoard, i, j)
        return
    }


    if (cell.isMine) {
        elCell.innerText = 'Mine'
        elCell.classList.add('open-mine')
        cell.isShown = true
        gGame.shownMinesCount++
        gGame.lives--
    }

    if (cell.minesAroundCount === 0) {
        //console.log(el.classList);
        elCell.classList.add('open-cell')
        cell.isShown = true
        gGame.shownCount++
        //expandShown()
    }

    if (cell.minesAroundCount) {
        elCell.innerText = gBoard[i][j].minesAroundCount
        elCell.classList.add('open-cell')
        cell.isShown = true
        gGame.shownCount++
    }

    checkGameOver()
}

function cellMarked(el, i, j) {
    var elCell = el
    var cell = gBoard[i][j]

    if (cell.isMarked) {
        elCell.innerText = ''
        //elCell.classList.remove('flagged')
        cell.isMarked = false
        gGame.markedCount--

    } else if (!cell.isMarked && !cell.isShown) {
        elCell.innerText = 'Flag'
        //elCell.classList.add('flagged')
        cell.isMarked = true
        gGame.markedCount++

    }

}

function checkGameOver() {

    var resetBtn = document.querySelector('.reset-btn')
    ///gGame.markedCount === gLevel.MINES &&
    if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES) {
        console.log('You Win!');
        gGame.isOn = false
        resetBtn.innerText = '😎'


    }

    if(!gGame.lives){
        console.log('You Lose'); 
        gGame.isOn = false
        resetBtn.innerText = '🤯'

    } 
}


function getRandomMines(board, size){
    
    var randNum1 = getRandomInt(0, size)
    var randNum2 = getRandomInt(0, size)
    
    if (randNum1 === randNum2) getRandomMines(board, size)

    return board[randNum1][randNum2] = { isShown: false, isMine: true, isMarked: false }
    
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }


  function hintBtnClick() {
    var elHintBtn = document.querySelector('.hint')
    if (!hintMode) {
        hintMode = true
        elHintBtn.classList.add('selected')
    } else {
        hintMode = false
        elHintBtn.classList.remove('selected')
    }
}

function showHint(board, rowIdx, colIdx) {
    if (!gLevel.HINTS) return

    //MODEL
    gLevel.HINTS--

    //DOM
    document.querySelector('.hint').innerText = gLevel.HINTS + '💡'

    for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        var currRow = board[i]
        for (let j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            var currCell = currRow[j]

            var className = `cell-${i}-${j}`
            var elCell = document.querySelector(`.${className}`)
            elCell.innerText = (currCell.isMine) ? '💣' : currCell.minesAroundCount
            elCell.classList.add('showingHint')

        }

    }
    var hintedEls = document.querySelectorAll('.showingHint')
    console.log(hintedEls);

    setTimeout(() => {
        var hintedEls = document.querySelectorAll('.showingHint')
        console.log(hintedEls);
        for (let i = 0; i < hintedEls.length; i++) {
            hintedEls[i].classList.remove('showingHint')
            hintedEls[i].innerText = ''
            hintMode = false
            document.querySelector('.hint').classList.remove('selected')

        }
    }, 1000)


}


