'use strict';

var tournySize = 8;
var bannedQuestions = []; //Array for questions that have already been asked.
var quizQuestions = [];
var lineUp = []; //This is the array for 12 characters that we will choose random 8 from.
var holder = document.getElementById('form');
var quizLength = 0;
var questionRepeats = 0;
var health = 2;
var remaining = []; //Currently not in use, DELETE IF NOT NEEDED BY THURS
var roundCounter = 0;
var score = 0;
var contestents = [];
var roundOneWinners = [];
var roundTwoWinners = [];
var winner = [];
var tableElOne = document.getElementById('roundOne');
var tableElTwo = document.getElementById('roundTwo');
var tableElThree = document.getElementById('roundThree');
var tableWinner = document.getElementById('winner');
var twoPlayers = document.getElementById('p1p2');

function createElement(tagType, tagIdentifier, tagIdentifiername, elementContent, sectionId){
  var element = document.createElement(tagType);
  element.setAttribute(tagIdentifier, tagIdentifiername);
  element.textContent = elementContent;
//  console.log(element);
  sectionId.appendChild(element);
  //this element creation function created by Benjamin Ayzenberg.
}

//===============================Constructor Functions============================//

function generateCharacters(){
  for (var i = 0; i < characters.length; i++){
    var person = new Character(characters[i]);
    person.makeQuestions(person.questions);
    lineUp.push(person);
  }
}

function Character(character){
  this.name = character[0];
  this.src = character[1];
  this.isPlayer = false;
  this.questions = [];
  for (var i = 2; i < character.length; i++) {
    this.questions.push(new Question(character[i]));
  }
}

Character.prototype.createImage = function(i) {
  var imageEl = document.createElement('img');
  imageEl.setAttribute('src', this.src);
  imageEl.setAttribute('id', this.name);
  imageEl.dataset.index = i;
  this.views++;
  return imageEl;
};

Character.prototype.makeQuestions = function(questions){
  for (var i = 0; i < questions.length; i++) {
    new Question(questions[i]);
  }
};

function Question(questions){
  this.ask = questions[0];
  this.correct = questions[1];
  this.answers = [questions[1], questions[2], questions[3], questions[4]];
}

generateCharacters();

function setUpMatches(){
  var chosen = [];
  var player = JSON.parse(localStorage.playerChoice);
  for(var i = 0; i < lineUp.length; i++){
    if(lineUp[i].src === player){
      contestents.push(lineUp[i]);
      contestents[0].isPlayer = true;
    }
  }
  while (contestents.length < tournySize){
    var selected = Math.floor(Math.random() * lineUp.length);
    if (!contestents.includes(lineUp[selected])){
      contestents.push(lineUp[selected]);
    }
  }
  for (var i = 0; i < chosen.length; i++) {
    contestents.push(lineUp[chosen[i]]);
  }
  return contestents;
}
////------------------------------------------
// This runs if niether character is the player.
///--------------------------------------------
function npcFight(fighterA, fighterB){
  var winSelect = Math.floor(Math.random() * 2);
  if (winSelect === 0){
    return fighterA;
  } else if (winSelect === 1){
    return fighterB;
  }
}

var contestents = setUpMatches();

//----------------------------------------------
// This is what runs the player quiz the first function sets the quiz up and calls upon quiz question select to select 5 questions then initiates the askAQuestion function which displays the question and its answers in a form. Recieves input from the player processes correct and incorect answers and loops back itself up to 5 times or until the player has run out of chances
//------------------------------------
function quiz(fighterA, fighterB){
  quizQuestions = quizQuestionSelect(fighterA, fighterB);
  holder = document.getElementById('form');
  quizLength = quizQuestions.length;
  console.log(quizQuestions);
  questionRepeats = 0;
  if (document.getElementById('answerHolder')){
    document.getElementById('answerHolder').parentNode.removeChild(document.getElementById('answerHolder'));
  }
  createElement('div', 'id', 'answerHolder', '', document.getElementById('holderParent'));
  askAQuestion(quizQuestions,holder,quizLength,questionRepeats);
}

function askAQuestion(quizQuestions, holder, quizLength, questionRepeats){
  if (questionRepeats < quizLength){
    if (document.getElementById('fieldSet')){
      document.getElementById('fieldSet').parentNode.removeChild(document.getElementById('fieldSet'));
    }
    createElement('fieldset', 'id', 'fieldSet', '', holder);
    var nextQuestion = quizQuestions.shift(0);
    createElement('legend', 'id', 'ask', nextQuestion.ask, document.getElementById('fieldSet'));
    var answersLength = nextQuestion.answers.length;
    console.log(nextQuestion.ask);
    console.log('proceeding into loop...');
    console.log(nextQuestion.answers[0]);
    console.log(nextQuestion.answers[1]);
    console.log(nextQuestion.answers[2]);
    console.log(nextQuestion.answers[3]);
    for (var j = 0; j < answersLength; j++) {
      var number = Math.floor(Math.random() * (answersLength - j));
      var nextAnswer = nextQuestion.answers.splice(number, 1);
      createElement('div', 'id', 'answer' + j, nextAnswer, document.getElementById('fieldSet'));
      document.getElementById('answer' + j).addEventListener('click', handleSubmit);
      document.getElementById('answer' + j).setAttribute('class','answerButton');
      if(nextAnswer.includes(nextQuestion.correct)){
        document.getElementById('answer' + j).setAttribute('id','correct');
      }
    }
    console.log(nextQuestion.correct);
  } else {
    alert('YOU HAVE WON!');
  }
}
function quizQuestionSelect(fighterA, fighterB) {
  while(quizQuestions.length < 2){
    var choiceA = Math.floor(Math.random() * (fighterA.questions.length));
    if(quizQuestions.indexOf(fighterA.questions[choiceA]) !== -1 || bannedQuestions.indexOf(fighterA.questions[choiceA]) !== -1){
    }else{
      quizQuestions.push(fighterA.questions[choiceA]);
      bannedQuestions.push(fighterA.questions[choiceA]);
    }
  }
  while(quizQuestions.length < 4){
    var choiceB = Math.floor(Math.random() * (fighterB.questions.length));
    if(quizQuestions.indexOf(fighterB.questions[choiceB]) !== -1 || bannedQuestions.indexOf(fighterB.questions[choiceB]) !== -1){
    }else{
      quizQuestions.push(fighterB.questions[choiceB]);
      bannedQuestions.push(fighterB.questions[choiceB]);
    }
  }
  return quizQuestions;
}

//------------------------------FORM--------------------------------------------

function handleSubmit(event){
  event.preventDefault();
  event.stopPropagation();

  if(event.target.id === 'correct'){
    createElement('div', 'class', 'result', 'Correct!', document.getElementById('answerHolder'));
    score += 1;
    if (score === 3 && health >= 1) {
      roundOneWinners.unshift(contestents[0]);
      console.log(roundOneWinners);
      roundTwoSetup();
      roundTwoNpcFight();
      roundTwoP1P2();

    }
    if (score === 6 && health >= 1) {
      roundTwoWinners.unshift(roundOneWinners[0]);
      console.log(roundTwoWinners);
      roundThreeSetup();
      roundThreeNpcFight();
      roundThreeP1P2();
    }
    if (score === 9 && health >= 1) {
      alert('YOU HAVE WON!');
    }
  } else {
    createElement('div', 'class', 'result', 'Wrong!', document.getElementById('answerHolder'));
    health -= 1;
    console.log('health remaining: ' + health);
    if (health === 0){
      // alert('game over');
      gameOver();
    }
  }
  questionRepeats += 1;
  askAQuestion(quizQuestions,holder,quizLength,questionRepeats);
};

function roundOneSetup(){
  for( var i = 0; i < contestents.length; i++){
    var fieldEl = document.createElement('td');
    fieldEl.appendChild(contestents[i].createImage());
    tableElOne.appendChild(fieldEl);
  }
  contestents[0].isPlayer = true;
  return contestents;
}

function roundTwoSetup(){
  for( var i = 0; i < roundOneWinners.length; i++){
    var fieldEl = document.createElement('td');
    fieldEl.appendChild(roundOneWinners[i].createImage());
    tableElTwo.appendChild(fieldEl);
  }

}

function roundThreeSetup(){
  for( var i = 0; i < roundTwoWinners.length; i++){
    var fieldEl = document.createElement('td');
    fieldEl.appendChild(roundTwoWinners[i].createImage());
    tableElThree.appendChild(fieldEl);
  }
}

function winnerSetup(){
  for( var i = 0; i < winner.length; i++){
    var fieldEl = document.createElement('td');
    fieldEl.appendChild(winner[i].createImage());
    tableWinner.appendChild(fieldEl);
  }
}

function roundOneP1P2(){
  for( var i = 0; i < 2; i++){
    var fieldEl = document.createElement('td');
    fieldEl.appendChild(contestents[i].createImage());
    twoPlayers.appendChild(fieldEl);
  }
}

function roundTwoP1P2(){
  twoPlayers.innerHTML = '';
  for (var i = 0; i < 2; i++) {
    var fieldEl = document.createElement('td');
    fieldEl.appendChild(roundOneWinners[i].createImage());
    twoPlayers.appendChild(fieldEl);
  }
}

function roundThreeP1P2(){
  twoPlayers.innerHTML = '';
  for (var i = 0; i < 2; i++) {
    var fieldEl = document.createElement('td');
    fieldEl.appendChild(roundTwoWinners[i].createImage());
    twoPlayers.appendChild(fieldEl);
  }
}

function roundOneNpcFight(){
  console.log(contestents);
  quiz(contestents[0], contestents[1]);
  roundOneWinners.push(npcFight(contestents[2], contestents[3]));
  roundOneWinners.push(npcFight(contestents[4], contestents[5]));
  roundOneWinners.push(npcFight(contestents[6], contestents[7]));
}

function roundTwoNpcFight(){
  health = 2;
  quiz(roundOneWinners[0], roundOneWinners[1]);
  roundTwoWinners.push(npcFight(roundOneWinners[2], roundOneWinners[3]));
}

function roundThreeNpcFight(){
  health = 2;
  quiz(roundTwoWinners[0], roundTwoWinners[1]);
}

function gameOver(){
  window.location = 'lose.html';
};

roundOneSetup();
roundOneNpcFight();
roundOneP1P2();
