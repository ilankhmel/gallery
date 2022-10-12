'use strict'

const PACMAN = '😷';
var gPacman;
var pacmanImg = `<img src="images/pacman.png" height="25px" width="23px">`

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    //debugger
    //changePacmanAngel(ev)

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    //if nextCell is powerfood
    if (nextCell === POWER_FOOD && gPacman.isSuper) return
    if (nextCell === POWER_FOOD) {
        gPacman.isSuper = true
        renderGhosts()
        console.log('hi');
        // var ghostsPreColors = saveGhostsColors()
        // colorGhosts("#0000FF")

        setTimeout(() => {
            gPacman.isSuper = false
        /  reviveGhosts()
           // renderGhosts()
            // colorGhosts(ghostsPreColors)

        }, 5000)
    }

    if (nextCell === CHERRY) {
        updateScore(15)
        console.log('YAY');
    }

    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return


    if (nextCell === FOOD) {
        updateScore(1)
        if (gGame.score === 60) victorious()
    }

    if (nextCell === GHOST) {
      
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            gameOver()
            return
            //renderCell(gPacman.location, EMPTY)
        }
     


    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, pacmanImg)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    var elPacmanImg = document.querySelector(`.cell-${gPacman.location.i}-${gPacman.location.j} img`)

    switch (eventKeyboard.code) {
        case 'ArrowUp':

            var className = 'rotateminus90'
            elPacmanImg.classList.add(className)
            addClassToPacStr(className)

            nextLocation.i--;
            break;
        case 'ArrowDown':

            var className = 'rotate90'
            elPacmanImg.classList.add(className)
            addClassToPacStr(className)

            nextLocation.i++;
            break;
        case 'ArrowLeft':

            var className = 'rotate180'
            elPacmanImg.classList.add(className)
            addClassToPacStr(className)

            nextLocation.j--;
            break;
        case 'ArrowRight':

            var className = 'rotate0'
            elPacmanImg.classList.add(className)
            addClassToPacStr(className)

            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

// function changePacmanAngel(ev){


//     var elPacmanImg = document.querySelector(`.cell-${gPacman.location.i}-${gPacman.location.j} img`)
//     switch (ev.code) {
//         case 'ArrowUp':
//             //elPacmanImg.classList.remove(elPacmanImg.classList[0])
//             elPacmanImg.classList.add('rotate90') 
//             pacmanImg[pacmanImg.length - 2] += `class="rotate90"`

//             break;
//         case 'ArrowDown':

//             break;
//         case 'ArrowLeft':

//             break;
//         case 'ArrowRight':

//             break;
//         default:
//             return null;
//     }

// }

function addClassToPacStr(className) {

    pacmanImg = `<img src="images/pacman.png" height="25px" width="23px" class="${className}">`
    return pacmanImg
}