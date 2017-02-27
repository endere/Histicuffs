'use strict';
var tournySize = 8;
var lineUp = [];
function generateCharacters(){
  for (var i = 0; i < characters.length; i++){
    console.log(characters[i]);
    var person = new Character(characters[i]);
    person.makeQuestions(person.questions);
    lineUp.push(person);
  }
}
function Character(character){
  this.name = character[0];
  this.src = character[1];
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

generateCharacters();
console.log(lineUp);
console.log(lineUp[0].name);

function setUpMatches(){
  var chosen = [];
  while (chosen.length < tournySize){
    var selected = Math.floor(Math.random() * characters.length);
    if (chosen.includes(selected)){
      console.log('Already selected, rerolling...');
    } else {
      chosen.push(selected);
    }
    console.log(chosen);
  }
  return chosen;
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
    console.log('next fight is ' + nextFight);
    var winner = npcFight(nextFight[0], nextFight[1]);
    winners.push(winner);
  }
  console.log(winners);
  return winners;
}

function tournament(){
  var contestents = setUpMatches();
  if (tournySize === 8){
    var roundOneWinners = tournamentRound(contestents);
    var roundTwoWinners = tournamentRound(roundOneWinners);
    var finalWinner = tournamentRound(roundTwoWinners);
  } else if (tournySize === 16){
    var roundOneWinners = tournamentRound(contestents);
    var roundTwoWinners = tournamentRound(roundOneWinners);
    var roudThreeWinners = tournamentRound(roundTwoWinners);
    var finalWinner = tournamentRound(roundThreeWinners);
  }
  console.log('The final victor is: ' + finalWinner);
}
