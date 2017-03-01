'use strict';

var usernameEl = document.getElementById('usernameForm');
var userChoices = document.getElementById('userChoices');
var playerChoice = '';

usernameEl = addEventListener('submit', storeUsername);
userChoices = addEventListener('click', setUserChoice);

function storeUsername(event){
  event.preventDefault();
  event.stopPropagation();

  var username = event.target.username.value;
  localStorage.username = JSON.stringify(username);
  console.log(localStorage.username);
}

function setUserChoice(event){
  event.preventDefault();
  event.stopPropagation();
  console.log(event);

  if(event.target.className !== 'rosterImgs'){
    alert('Please click on an image.');
  } else {
    playerChoice = event.target.id;
    localStorage.playerChoice = JSON.stringify(playerChoice);
    console.log(localStorage.playerChoice);
  }
}
