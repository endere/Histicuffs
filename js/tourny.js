'use strict';
var tournySize = 8;
var chosen = [];
var characters = [0,1,2,3,4,5,6,7,8,9,10,11,12];

function setUpMatches(){
  while (chosen.length < tournySize){
    var selected = Math.floor(Math.random() * characters.length);
    if (chosen.includes(selected)){
      console.log('Already selected, rerolling...');
    } else {
      chosen.push(selected);
    }
    console.log(chosen);
  }
}
setUpMatches();
