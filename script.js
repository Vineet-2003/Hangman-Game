'use strict';
// declaring variable 
const letterDiv = document.querySelector('.letter-div');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');

// keeping letters using javascript
// so untill we put html content into letter-div,

let lives;
var select_word;

async function getPosts() {
  var myPosts = await fetch("https://random-word-api.herokuapp.com/word");
  var response = await myPosts.json();
  console.log(response);
  select_word = response[0];
}
getPosts().then( async function(){
  // console.log(select_word);
  init('start');
  // console.log(select_word.length);
});
let letters = document.querySelectorAll('.alpha');

function init(state) {
  wordDiv.innerHTML = '';
  if (state === 'start') {
    // putting all letters into html
    for (const i of 'abcdefghijklmnopqrstuvwxyz') {
      const html = `<button class="alpha" onclick="letterPress(this)">${i.toUpperCase()}</button>`;
      letterDiv.insertAdjacentHTML('beforeend', html);
    }
  } else if (state === 'reset') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notif.classList.add('hidden');
    });
  }
  lives = 5;

  // capturing letters div
  liveSpan.textContent = lives;

  // putting selected word
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML('beforeend', html);
  }
}
// initializing the page


// show notification
const showNotif = function (msg) {
  alert("you " + msg + " and word was " + select_word);
  location.reload();
};

// decrease life
const decreaseLife = function () {
  lives--;
    console.log(lives);
  liveSpan.textContent = lives;
  let bodyParts = ["rope","head", "body", "arms", "legs"];
//   console.log(document.getElementById("figure-" + bodyParts[3 - lives]));
  if (lives === 0) {
    document.getElementsByClassName("figure-" + bodyParts[4 - lives])[0].setAttribute("style", "display : block") ;
    document.getElementsByClassName("figure-" + bodyParts[4 - lives])[1].setAttribute("style", "display : block") ;
    showNotif('lost');
  } 
  else if(lives === 1){
    document.getElementsByClassName("figure-" + bodyParts[4 - lives])[0].setAttribute("style", "display : block") ;
    document.getElementsByClassName("figure-" + bodyParts[4 - lives])[1].setAttribute("style", "display : block") ;
  }
  else {
      document.getElementsByClassName("figure-" + bodyParts[4 - lives])[0].setAttribute("style", "display : block") ;
  }  
};

// get multiple matching indexes of pressed letter
// to the selected word
const getindexes = function (letter) {
  let indexes = [];
  [...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  });
    console.log(indexes);
  return indexes;
};

// check if we get complete word
const checkWord = function () {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false;
    }
  }
  return val;
};

// letters event listener function
function letterPress (t) {
  const letter = t.textContent.toLowerCase();
  if (select_word.includes(letter)) {
    const indexes_list = getindexes(letter);
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = t.textContent;
    });
    if (checkWord()) showNotif('won');
  } else {
    decreaseLife();
  }
  t.classList.add('disabled');
};