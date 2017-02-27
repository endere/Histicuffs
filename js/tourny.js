'use strict';
var tournySize = 8;
var characters = [0,1,2,3,4,5,6,7,8,9,10,11,12];

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
  var roundOneWinners = tournamentRound(contestents);
  var roundTwoWinners = tournamentRound(roundOneWinners);
  var finalWinner = tournamentRound(roundTwoWinners);
  console.log('The final victor is: ' + finalWinner);
}

tournament();
