/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let counterOff = true;
let elapsedTime = 0;
const deck = document.querySelector('.deck');
let adjusterCards = [];
let counterId;
let clicks = 0;
let matched = 0;
const PAIR = 8;



deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if( isClickValid(clickTarget)) {
    if (counterOff) {
      startCounter();
      counterOff = false;
    }
    adjusterCard(clickTarget);
    addAdjusterCard(clickTarget);
    if(adjusterCards.length === 2) {
      machingCheck(clickTarget);
      moveOut();
      scoreCheck();
    }
  }
});

function addAdjusterCard(clickTarget) {
  adjusterCards.push(clickTarget);
  console.log(adjusterCards);
}

function adjusterCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

function machingCheck() {
  if(adjusterCards[0].firstElementChild.className ===
     adjusterCards[1].firstElementChild.className)
     {
      adjusterCards[0].classList.toggle('match!');
      adjusterCards[1].classList.toggle('match!');
      adjusterCards = [];
      matched++;
      if (matched === PAIR) {
        theEnd();
      }
     } else {
       setTimeout(() => {
         adjusterCard(adjusterCards[0]);
         adjusterCard(adjusterCards[1]);
         adjusterCards = [];
       }, 1000);
  }
}


function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    adjusterCards.length < 2 &&
    !adjusterCards.includes(clickTarget)
  );
}

function deckBeingShuffle() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle (cardsToShuffle);
  for(card of shuffledCards){
    deck.appendChild(card);
  }
}
deckBeingShuffle();

function moveOut() {
  clicks++;
  const clicksText = document.querySelector('.moves');
  clicksText.innerHTML = clicks;
}

function scoreCheck() {
  if (clicks === 16 || clicks === 24)
  {
    hideStar();
  }
}

function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if(star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

function startCounter() {
  counterId = setInterval(() => {
    elapsedTime++;
    showTime();
    console.log(elapsedTime);
  }, 1000);
}

function showTime() {
  const counter = document.querySelector('.counter');
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  console.log(counter);
  counter.innerHTML = elapsedTime;
  if (seconds < 10 ){
    counter.innerHTML = `${ minutes}:0${seconds}`;
  } else {
    counter.innerHTML = `${ minutes}:${seconds}`;
  }
}

function stopCounter() {
  clearInterval(counterId);
}

function adjusterNero() {
  const nero = document.querySelector('.nero__background');
  nero.classList.toggle('hide');
}
adjusterNero();
adjusterNero();

function writeModalStats() {
  const elapsedTimeStat = document.querySelector('.nero__elapsedTime');
  const counterTime = document.querySelector('.counter').innerHTML;
  const clicksStat = document.querySelector('.nero__clicks');
  const starsStat = document.querySelector('.nero__stars');
  const stars = getStars();

  elapsedTimeStat.innerHTML = `Time = ${counterTime}`;
  clicksStat.innerHTML = `Moves = ${clicks}`;
  starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}

document.querySelector('.nero__cancel').addEventListener('click', () => {
  adjusterNero();
});

document.querySelector('.nero__replay').addEventListener('click', replayGame);

function resetGame() {
  resetCounterAndTime();
  restetMoves();
  resetStars();
  deckBeingShuffle();
  document.querySelector('.restart').addEventListener('click', resetGame);
  document.querySelector('.nero__replay').addEventListener('click', resetGame);
}

function resetCounterAndTime() {
  stopCounter();
  counterOff = true;
  elapsedTime = 0;
  showTime();
}

function restetMoves() {
  clicks = 0;
  document.querySelector('.moves').innerHTML = clicks;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

function theEnd() {
  stopCounter();
  writeModalStats();
  adjusterNero();
}

function replayGame() {
  resetGame();
  adjusterNero();
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for(let card of cards) {
    card.className = 'card';
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
