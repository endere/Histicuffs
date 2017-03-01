'use strict';

var tournySize = 8;
var bannedQuestions = [];
var quizQuestions = [];
var lineUp = [];
var holder = document.getElementById('form');
var quizLength = 0;
var questionRepeats = 0;
var health = 5;
var remaining = [];
var roundCounter = 0;
var score = 0;

function createElement(tagType, tagIdentifier, tagIdentifiername, elementContent, sectionId){
  var element = document.createElement(tagType);
  element.setAttribute(tagIdentifier, tagIdentifiername);
  element.textContent = elementContent;
//  console.log(element);
  sectionId.appendChild(element);
  //this element creation function created by Benjamin Ayzenberg.
}
// Constructor Functions//
//--------------------------------------------
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

Character.prototype.makeQuestions = function(questions){
  for (var i = 0; i < questions.length; i++) {
    new Question(questions[i]);
  }
};
function Question(questions){
  this.ask = questions[0];
  this.correct = questions[1];
  this.answers = [questions[1], questions[2], questions[3], questions[4]];
};

// function Question(questions){
//   this.ask = questions[0];
//   this.correct = questions[1];
//   this.answers = [questions[1], questions[2], questions[3], questions[4]];
// };

generateCharacters();
////-----------------------------------------------
/// This gets the tournament set up
///-----------------------------------------

function setUpMatches(){
  var chosen = [];
  var contestents = [];
  while (chosen.length < tournySize){
    var selected = Math.floor(Math.random() * lineUp.length);
    if (chosen.includes(selected)){
    } else {
      chosen.push(selected);
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
//---------------------------------------
// This function pits two characters against each other and hold the framework for the tournment round. Also checks if either character is the player in which case it initiates a quiz otherwise it calls upon the npc fight.
//----------------------------------------------
function tournamentRound(contestents){
  remaining = [];
  var roundLength = contestents.length / 2;
  var playerFight = [];
  for (var i = 0; i < roundLength; i++){
    var nextFight = [];
    while (nextFight.length < 2){
      nextFight.push(contestents.shift());
    }
    if (nextFight[0].isPlayer === true){
      // quiz(nextFight[0],nextFight[1]);
      playerFight.push(nextFight[0]);
      playerFight.push(nextFight[1]);
      remaining.push(nextFight[0]);
    } else if (nextFight[1].isPlayer === true){
      // quiz(nextFight[0],nextFight[1]);
      playerFight.push(nextFight[0]);
      playerFight.push(nextFight[1]);
      remaining.push(nextFight[1]);
    } else {
      var winner = npcFight(nextFight[0], nextFight[1]);
      remaining.push(winner);
    }
  }
  quiz(playerFight[0],playerFight[1]);
}
//---------------------------------------------
//This calls upon the set up and then run a different size tourney based upon how many characters are selected to participate. 2-4-8-16
//-----------------------------------------------

function setUp(){
  var contestents = setUpMatches();
  chooseCharacter(contestents);
}
function chooseCharacter(contestents){
  contestents[2].isPlayer = true;
  tournamentRound(contestents);
}
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
    tournamentRound(remaining);
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
  // while(quizQuestions.length < 5){
  //   var choiceC = Math.floor(Math.random() * generalQuestions.length);
  //   if(quizQuestions.includes(choiceC) || bannedQuestions.includes(choiceC)){
  //     console.log('rerolling');
  //   }else{
  //     quizQuestions.push(generalQuestions[choiceC]);
    // }
  // return quizQuestions;
  return quizQuestions;
}

//------------------------------FORM--------------------------------------------

function handleSubmit(event){
  event.preventDefault();
  event.stopPropagation();

  if(event.target.id === 'correct'){
    createElement('div', 'class', 'result', 'Correct!', document.getElementById('answerHolder'));
    score += 1;
  } else {
    createElement('div', 'class', 'result', 'Wrong!', document.getElementById('answerHolder'));
    health -= 1;
    console.log('health remaining: ' + health);
    if (health === 0){
      alert('game over');
    }
  }
  questionRepeats += 1;
  askAQuestion(quizQuestions,holder,quizLength,questionRepeats);
  // var questionForm = document.getElementById('fieldSet');
  // var len = radios.length;
  // var checked = false;
  // var userInput;
  // console.log(len);
  // for(var i = 0; i < len.length; i++){
  //   if(radios[i].checked){
  //     checked = true;
  //     userInput = radios[i].value;
  //   }
  // }
  // if (!checked) {//if none selected
  //   alert('You MUST Select an Answer to Continue.');
  //   return;
  // }

};

setUp();
