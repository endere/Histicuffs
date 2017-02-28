'use strict';
var tournySize = 8;
var bannedQuestions = [];
<<<<<<< HEAD
var quizQuestions = [];
var lineUp = [];
var pos = 0;



=======
var lineUp = [];

function createElement(tagType, tagIdentifier, tagIdentifiername, elementContent, sectionId, tagIdentifierTwo, tagIdentifiernameTwo){
  var element = document.createElement(tagType);
  element.setAttribute(tagIdentifier, tagIdentifiername);
  element.setAttribute(tagIdentifierTwo, tagIdentifiernameTwo);
  element.textContent = elementContent;
//  console.log(element);
  sectionId.appendChild(element);
  //this element creation function created by Benjamin Ayzenberg.
}
>>>>>>> ad4e6b74f0e792c1f1573dd761c6b44b39894aea
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

function Question(questions){
  this.ask = questions[0];
  this.correct = questions[1];
  this.answers = [questions[1], questions[2], questions[3], questions[4]];
};



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
function npcFight(fighterA, fighterB){
  var winSelect = Math.floor(Math.random() * 2);
  if (winSelect === 0){
    console.log('Fighter A wins!');
    return fighterA;
  } else if (winSelect === 1){
    console.log('Fighter B wins!');
    return fighterB;
  }
}

function tournamentRound(contestents){
  var winners = [];
  var roundLength = contestents.length / 2;
  for (var i = 0; i < roundLength; i++){
    var nextFight = [];
    while (nextFight.length < 2){
      nextFight.push(contestents.shift());
    }
<<<<<<< HEAD
    console.log('this is next fight: ' + nextFight[0].name + ' ' + nextFight[1].name);
    console.log(nextFight[0]);
    console.log(nextFight[0].isPlayer);
    if (nextFight[0].isPlayer === true || nextFight[1].isPlayer === false){
      //if this si true
      console.log('next fight ' + nextFight[0].name + nextFight[1].name);
=======
    console.log('this is next fight: ' + nextFight[0].name + ' and ' + nextFight[1].name);
    if (nextFight[0].isPlayer === true || nextFight[1].isPlayer === true){
>>>>>>> ad4e6b74f0e792c1f1573dd761c6b44b39894aea
      quiz(nextFight[0],nextFight[1]);
    } else {
      var winner = npcFight(nextFight[0], nextFight[1]);
      winners.push(winner);
    }
  }
  for (var i = 0; i < winners.length; i++) {
    console.log('winners: ' + winners[i].name);
  }
  return winners;
}
function tournament(){
  var contestents = setUpMatches();
  console.log('beginning tourny');
  if (tournySize === 2){
    var finalWinner = tournamentRound(contestents);
    console.log('The final victor is: ' + finalWinner[0].name);
  }
  if (tournySize === 4){
    var roundOneWinners = tournamentRound(contestents);
    var finalWinner = tournamentRound(roundOneWinners);
    console.log('The final victor is: ' + finalWinner[0].name);
  }
  if (tournySize === 8){
    var roundOneWinners = tournamentRound(contestents);
    var roundTwoWinners = tournamentRound(roundOneWinners);
    var finalWinner = tournamentRound(roundTwoWinners);
    // console.log('The final victor is: ' + finalWinner[0].name);
  } else if (tournySize === 16){
    var roundOneWinners = tournamentRound(contestents);
    var roundTwoWinners = tournamentRound(roundOneWinners);
    var roudThreeWinners = tournamentRound(roundTwoWinners);
    var finalWinner = tournamentRound(roundThreeWinners);
    console.log('The final victor is: ' + finalWinner[0].name);
  }
}
function quiz(fighterA, fighterB){
  var quizQuestions = quizQuestionSelect(fighterA, fighterB);
  console.log(quizQuestions);
  var holder = document.getElementById('form');
  var quizLength = quizQuestions.length;
  var questionRepeats = 0;
  askAQuestion(quizQuestions,holder,quizLength,questionRepeats);
}

function askAQuestion(quizQuestions,holder,quizLength,questionRepeats){
  if (questionRepeats < quizLength){
    if (document.getElementById('fieldSet')){
      document.getElementById('fieldSet').parentNode.removeChild(document.getElementById('fieldSet'));
    }
    createElement('fieldset', 'id', 'fieldSet', '', holder, 'class', 'quiz');
    var nextQuestion = quizQuestions.shift(0);
    createElement('legend', 'id', 'ask', nextQuestion.ask, document.getElementById('fieldSet'), 'class', 'quiz');
    var answersLength = nextQuestion.answers.length;
    for (var j = 0; j < answersLength; j++) {
      var number = Math.floor(Math.random() * (answersLength - j));
      var nextAnswer = nextQuestion.answers.splice(number, 1);
      console.log(nextAnswer);
      createElement('input', 'type', 'radio', '', document.getElementById('fieldSet'), 'id', j);
      createElement('label', 'for', j, nextAnswer, document.getElementById('fieldSet'), 'class', 'quiz');
    }
    createElement('input', 'type', 'submit', 'Answer', document.getElementById('fieldSet'), 'value', 'submit');
    questionRepeats += 1;
  }
}
function quizQuestionSelect(fighterA, fighterB) {
  console.log('fighterA is ' + fighterA.name );
<<<<<<< HEAD
  console.log('fighter b is ' + fighterB.name);

=======
  console.log('fighterB is ' + fighterB.name);
  var quizQuestions = [];
>>>>>>> ad4e6b74f0e792c1f1573dd761c6b44b39894aea
  while(quizQuestions.length < 2){
    var choiceA = Math.floor(Math.random() * (fighterA.questions.length));
    if(quizQuestions.indexOf(fighterA.questions[choiceA]) !== -1 || bannedQuestions.indexOf(fighterA.questions[choiceA]) !== -1){
      console.log('rerolling');
    }else{
      quizQuestions.push(fighterA.questions[choiceA]);
    }
  }
  while(quizQuestions.length < 4){
    var choiceB = Math.floor(Math.random() * (fighterB.questions.length));
    if(quizQuestions.indexOf(fighterB.questions[choiceB]) !== -1 || bannedQuestions.indexOf(fighterB.questions[choiceB]) !== -1){
      console.log('rerolling');
    }else{
      quizQuestions.push(fighterB.questions[choiceB]);
      bannedQuestions.push(quizQuestions);
      return quizQuestions;
    }
  }
  // while(quizQuestions.length < 5){
  //   var choiceC = Math.floor(Math.random() * generalQuestions.length);
  //   if(quizQuestions.includes(choiceC) || bannedQuestions.includes(choiceC)){
  //     console.log('rerolling');
  //   }else{
  //     quizQuestions.push(generalQuestions[choiceC]);
    // }
<<<<<<< HEAD
  console.log(quizQuestions[0].ask);
  // return quizQuestions;
=======
  bannedQuestions.push(quizQuestions);
  return quizQuestions;
>>>>>>> ad4e6b74f0e792c1f1573dd761c6b44b39894aea
}


//------------------------------FORM--------------------------------------------

// function handleSubmit(){
//   var questionForm = document.getElementById('questionWindow');
//   var i = 0, len = radios.length;
//   var checked = false;
//   var userInput;
//
//   for (; i < len.length; i++) {
//     if (radios[i].checked) {
//       checked = true;
//       userInput = radios[i].value;
//     }
//   }
//   if (!checked) {//if none selected
//     alert('You MUST Select an Answer to Continue.');
//     return;
//   }
//   if (userInput === Character.[]){
//     alert('CORRECT');
//   }
//   else {
//     alert('WRONG.');
//   }
// };
<<<<<<< HEAD
generateCharacters();
tournament();
console.log('quizQuestions: ', quizQuestions[0].ask);
var tableEl = document.getElementById('pic-table');
var rowEl = document.createElement('tr');
tableEl.appendChild(rowEl);
var fieldEl = document.createElement('td');
function runCreateTable(){
    var fieldEl = document.createElement('td');
    fieldEl.appendChild(quizQuestions[0].ask);
    rowEl.appendChild(fieldEl);

};

runCreateTable();
=======

//tournament();
quiz(lineUp[10], lineUp[7]);
>>>>>>> ad4e6b74f0e792c1f1573dd761c6b44b39894aea
