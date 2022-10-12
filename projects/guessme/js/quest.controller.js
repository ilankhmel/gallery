'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ans: 'yes'}, onUserResponse)
$('.btn-no').click({ans: 'no'}, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.btn-restart').click(onRestartGame)
function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()

  renderQuest()
  // TODO: show the quest section
  $('.quest').show()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  var currQuest = getCurrQuest()
  console.log(currQuest);
  var txt = currQuest.txt
  $('.quest').children('h2').text(txt)
} 

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  console.log(res);
  var $h2 = $('.quest').children('h2')
  var currQuest = getCurrQuest()
  // If this node has no children
  if (isChildless(getCurrQuest())) {
  
    if (res === 'yes') {
      //alert('Yes, I knew it!')
      // TODO: improve UX
      console.log('here');
      $('.btn-restart').show()
      $h2.text('Yes, I knew it!')
    } else {
      // TODO: hide and show new-quest section
      console.log('here');
      $h2.text('I dont know...teach me!')
      // alert('I dont know...teach me!')
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newGuess, newQuest, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  restartQuestTree()
  $('.quest').hide()
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
}
