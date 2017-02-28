'use strict';

var usernameEl = document.getElementById('usernameForm');

usernameEl = addEventListener('submit', storeUsername);

function storeUsername(event){
  event.preventDefault();
  event.stopPropagation();

  var username = event.target.username.value;
  localStorage.username = JSON.stringify(username);
  console.log(localStorage.username);
}
