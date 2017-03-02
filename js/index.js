'use strict';

var usernameEl = document.getElementById('usernameForm');
var userChoices = document.getElementById('userChoices');
var playerChoice = '';
var imgElements = document.getElementsByClassName('rosterImgs');
usernameEl = addEventListener('submit', storeUsername);
//userChoices = addEventListener('click', setUserChoice);

for (var i = 0; i < imgElements.length; i++) {
  imgElements[i].addEventListener('click', setUserChoice);
}
function storeUsername(event){
  event.preventDefault();
  event.stopPropagation();

  var username = document.getElementById('inputName').value;
  localStorage.username = JSON.stringify(username);
  console.log(localStorage.username);
}

function setUserChoice(event){
  event.preventDefault();
  event.stopPropagation();
  if (event.target.className == 'formSubmit'){
    storeUsername(event);
  } else if(event.target.className == 'rosterImgs'){
    playerChoice = event.target.id;
    localStorage.playerChoice = JSON.stringify(playerChoice);
    console.log(localStorage.playerChoice);
  }
  window.location = 'tourny.html';
}
