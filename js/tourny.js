'use strict';
var tournySize = 8;
var bannedQuestions = [];

var lineUp = [];
function generateCharacters(){
  for (var i = 0; i < characters.length; i++){
    var person = new Character(characters[i]);
    person.makeQuestions(person.questions);
    lineUp.push(person);
    console.log('lineup' + lineUp.length);
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

generateCharacters();

function setUpMatches(){
  var chosen = [];
  var contestents = [];
  console.log('the length is ' + lineUp.length);
  while (chosen.length < tournySize){
    var selected = Math.floor(Math.random() * lineUp.length);
    console.log(selected);
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
    console.log('this is next fight: ' + nextFight[0].name + ' ' + nextFight[1].name);
    console.log(nextFight[0]);
    console.log(nextFight[0].isPlayer);
    if (nextFight[0].isPlayer === true || nextFight[1].isPlayer === true){
      console.log('next fight ' + nextFight[0].name + nextFight[1].name);
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
    console.log('The final victor is: ' + finalWinner[0].name);
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

}
function quizQuestionSelect(fighterA, fighterB) {
  console.log('fighterA is ' + fighterA.name );
  console.log('fighter b is ' + fighterB.name);
  var quizQuestions = [];
  while(quizQuestions.length < 2){
    console.log('loooog' + fighterA.questions);
    var choiceA = Math.floor(Math.random() * (fighterA.questions.length));
    if(quizQuestions.indexOf(fighterA.questions[choiceA]) !== -1 || bannedQuestions.indexOf(fighterA.questions[choiceA]) !== -1){
      console.log('rerolling');
    }else{
      quizQuestions.push(fighterA.questions[choiceA]);
      console.log(choiceA, fighterA.questions[choiceA]);
    }
  }
  while(quizQuestions.length < 4){
    var choiceB = Math.floor(Math.random() * (fighterB.questions.length));
    if(quizQuestions.indexOf(fighterB.questions[choiceB]) !== -1 || bannedQuestions.indexOf(fighterB.questions[choiceB]) !== -1){
      console.log('rerolling');
    }else{
      quizQuestions.push(fighterB.questions[choiceB]);
    }
  }
  // while(quizQuestions.length < 5){
  //   var choiceC = Math.floor(Math.random() * generalQuestions.length);
  //   if(quizQuestions.includes(choiceC) || bannedQuestions.includes(choiceC)){
  //     console.log('rerolling');
  //   }else{
  //     quizQuestions.push(generalQuestions[choiceC]);
    // }
  console.log(quizQuestions);
  return quizQuestions;
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

tournament();
