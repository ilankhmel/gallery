var gCherryIntervalID = setInterval(createRandCherry, 5000)

function findEmptyPos(){
    var emptyPos = []
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            if(gBoard[i][j] === ' ') {emptyPos.push({ i, j })
            console.log(i, j)
        }
    
        }
        
    }
    return emptyPos
}


function createRandCherry(){
    var emptySpots = findEmptyPos()
    var randIdx = getRandomIntInclusive(0, emptySpots.length - 1)

    var randCell = emptySpots[randIdx]
    console.log(randCell);
    //model
    gBoard[randCell.i][randCell.j] = CHERRY

    //DOM
    renderCell(randCell, CHERRY)

    //setTimeout(()=>{}, )
}