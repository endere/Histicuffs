'use strict';

var user = JSON.parse(localStorage.username);

var player = JSON.parse(localStorage.playerChoice);
var playerIMG = [];
var playerName = [];
var lineUp = [];
playerIMG.push(player);

var photoHolder = document.getElementById('photoHolder');
var photo = document.createElement('img');

photo.setAttribute( 'src', playerIMG);
photoHolder.appendChild(photo);

var text = document.getElementById('text');
var winMessage = document.createElement('p');
winMessage.textContent = 'Congratulations ' + user + ' you have won using: ';
text.appendChild(winMessage);
