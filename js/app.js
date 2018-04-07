/*
 * Create a list that holds all of your cards
 */
var deck = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

var openCards = [];
var matchingCards = [];

var moveCountPanel = document.querySelector('.moves');
var counter = 0;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var shuffledDeck = shuffle(deck);

var cards = document.querySelectorAll('.deck li');

for (i = 0; i < cards.length; i++) {
    cards[i].firstElementChild.className = shuffledDeck[i];
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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
var deckContainer = document.querySelector('.deck');
deckContainer.addEventListener('click', function (event) {
    if (!(event.target.className === 'deck')) {
        displaySymbol(event);
        addToOpen(event);
        countMoves();
    }
})

function displaySymbol(event) {
    event.target.classList.add('open', 'show');
}

function addToOpen(event) {
    openCards.push(event.target.firstElementChild);
    checkPositiveMatch(openCards);
    checkNegativeMatch(openCards);
}

function checkPositiveMatch(array) {
    if (array.length === 2 && array[0].className === array[1].className) {
        array[0].parentNode.className = 'card match show';
        array[1].parentNode.className = 'card match show';
        matchingCards.push(array[0]);
        clearList(array);
    }
}

function checkNegativeMatch(array) {
    if (array.length === 2 && array[0].className !== array[1].className) {
        setTimeout(function () {
            array[0].parentNode.className = 'card';
            array[1].parentNode.className = 'card';
            clearList(array);
        }, 200);
    }
}

function clearList(array) {
    while (array.length !== 0) {
        array.pop();
    }
    return array;;
}

function countMoves() {
    counter++;
    moveCountPanel.innerHTML = counter;
}
