'use strict';
var tournySize = 8;
var teddyQOne = ['Roosevelt\'s Rough riders famously fought in: ','Cuba','Texas','Panama','Mexico'];
var teddyQtwo = ['Which of the following was the name of one of Teddy Roosevelt\’s sons?','Kermit','Hubert','Adolf','Percivall'];
var teddy = ['Teddy Roosevelt', teddyQOne, teddyQtwo];
var characters = [teddy];
var lineUp = [];
function generateCharacters(){
  for (var i = 0; i < characters.length; i++){
    console.log(characters[i]);
    new Character(characters[i]);
  }
}
function Character(character){
  this.name = character[0];
  this.QOne = character[1];
  this.QTwo = character[2];
  this.Questions = [this.QOne,this.QTwo];
  lineUp.push(this);
}
generateCharacters();
Character.prototype.Question = function(Questions){
};

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
