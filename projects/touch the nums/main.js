var numsArr = makeNums(16)
// console.log(numsArr);
var shuffled = shuffleNums(numsArr, 16)
console.log(shuffled);
var gButtons = modelButtons(16)

console.log(gButtons);
renderBoard(gButtons)

var timeInterval
var count = 0
var heading = document.querySelector('h1')
var timer = document.querySelector('div')
var isRunning = false
//console.log(stopWatch());


function reset(){
    document.querySelector('tbody').innerHTML = ''
    numsArr = makeNums(16)
    // console.log(numsArr);
    shuffled = shuffleNums(numsArr, 16)
    //console.log(shuffled);
    gButtons = modelButtons(16)
    
    //console.log(gButtons);
    renderBoard(gButtons)
    
    
    count = 0
    heading.innerText = ''
    timer.innerText = ''
    isRunning = false
    clearInterval(timeInterval)
    //document.querySelector('button').style.display = 'none'
}

function stopWatch() {
    var stopper = 0
    
         timeInterval = setInterval(() => {
            stopper += 0.01
            //stopper.toString().slice(0, 6)
            if (stopper < 10) {
                timer.innerText = stopper.toString().slice(0, 5)
            } else {
                timer.innerText = stopper.toString().slice(0, 6)
            }
        }, 10)
     
    
}


function cellClicked(elBtn) {
    var clickedNum = elBtn.innerText
    //console.log(Number(clickedNum));
    
    if (Number(clickedNum) === 1) {
        isRunning = true
        stopWatch()
    }
    if (Number(clickedNum) - 1 === count) {
        isRunning = true
        count++
        heading.innerText = clickedNum
        gButtons[elBtn.classList[0]].clicked = true
        elBtn.classList.add('clicked')
        //console.log(gButtons);

        if (Number(clickedNum) === gButtons.length) {
            isRunning = 0
            clearInterval(timeInterval)
            //stopWatch()
            heading.innerText = 'Your time is : '
            heading.innerText += timer.innerText
            document.querySelector('button').style.display = 'inline'
        }
    }


}


function renderBoard(model) {
    var rowColCount = Math.floor(model.length ** 0.5)
    var counter = 0
    console.log(rowColCount);
    var table = document.querySelector('tbody')
    for (let i = 0; i < rowColCount; i++) {
        // creating new <tr>
        var currRow = `<tr class="row${i}">`
        table.innerHTML += currRow

        for (let j = 0; j < rowColCount; j++) {
            //addding <td>'s to the <tr>
            table.querySelector(`.row${i}`).innerHTML += `<td class="${counter} "onclick="cellClicked(this)">${model[counter].num}</td>`
            counter++
        }
        table.innerHTML += '</tr>'
    }
}

function modelButtons(btnAmount) {
    var buttons = []
    for (let i = 0; i < btnAmount; i++) {
        buttons[i] = modelButton(shuffled[i])
    }
    return buttons
}

function modelButton(num) {
    return {
        num: num,
        clicked: false,
    }
}


function makeNums(numCount) {
    var nums = []
    for (let i = 0; i < numCount; i++) {
        nums[i] = i + 1

    }
    return nums
}

function shuffleNums(arr, numCount) {
    var shuffledArr = []
    for (let i = 0; i < numCount; i++) {
        var num = arr.splice([getRandomInt(0, arr.length)], 1)
        shuffledArr.push(num[0])
    }
    return shuffledArr
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}