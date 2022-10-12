var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = loadFromStorage('Quests')
  console.log(gQuestsTree);
  if(!gQuestsTree || gQuestsTree.length === 0){
    console.log('in');
  gQuestsTree = createQuest('Male?')
  gQuestsTree.yes = createQuest('Gandhi')
  gQuestsTree.no = createQuest('Rita')
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}
gCurrQuest = gQuestsTree
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest =  gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  
  // First Option
  // var elseAns
  // if(lastRes === 'yes'){
  //    elseAns = gPrevQuest.yes.txt
  // }else{
  //   elseAns = gPrevQuest.no.txt
  // }
  // console.log('quest', newQuestTxt, 'guess', newGuessTxt);
  // gCurrQuest.txt = newGuessTxt
  // gCurrQuest.yes = {txt: newQuestTxt, no: null, yes: null}
  // gCurrQuest.no = {txt: gPrevQuest[lastRes].txt, no: null, yes: null}


  
  // Second Option
  const newQuest = createQuest(newGuessTxt)
  newQuest.yes = createQuest(newQuestTxt)
  newQuest.no = gCurrQuest

  gPrevQuest[lastRes] = newQuest
  _saveQusetsToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}

function restartQuestTree(){
  gCurrQuest = gQuestsTree
}

function _saveQusetsToStorage(){

  saveToStorage('Quests', gQuestsTree)
}