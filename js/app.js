/*
 * Create a list that holds all of your cards
 */
var deck = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

var openCards = [];
var matchingCards = [];
var cards = document.querySelectorAll('.deck li');

var moveCountPanel = document.querySelector('.moves');
var counter = 0;

var timerPanel = document.querySelector('.timer');
var minutes = 0;
var seconds = 0;
var timerOn = true;
var starsPanel = document.querySelector('.stars');
var stars = starsPanel.querySelectorAll('li');
var starCount = 3;

var restartButton = document.querySelector('.restart');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffleDeck() {
    var shuffledDeck = shuffle(deck);
    for (i = 0; i < cards.length; i++) {
        cards[i].firstElementChild.className = shuffledDeck[i];
    }
}
shuffleDeck();

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
    if (!(event.target.className === 'deck') && !(event.target.localName === "i") && (event.target.classList.contains('open') === false) && (event.target.classList.contains("match") === false)) {
        displaySymbol(event);
        addToOpen(event);
        countMoves();
        starsScore();
        if (timerOn === false) {
            timerOn = true;
        }
        endGame();
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
    if (counter == 1 && timerOn == true) {
        timerStart();
    }
}

function resetMoves() {
    counter = 0;
    moveCountPanel.textContent = counter;
}

function timer() {
    if (timerOn) {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
    } else {
        seconds = 0;
        minutes = 0;
    }
    timerPanel.innerHTML = 'Time ' + minutes + ' min' + ' : ' + seconds + ' sec';
}

function timerStart() {
    setInterval('timer()', 1000);
}

function starsScore() {
    if (counter === 16) {
        starsPanel.lastElementChild.style.visibility = "hidden";
        starCount--;
    }
    if (counter === 32) {
        starsPanel.lastElementChild.previousElementSibling.style.visibility = 'hidden';
        starCount--;
    }
}

restartButton.addEventListener('click', restartGame)

function restartGame() {
    timerOn = false;
    timer();
    for (card of cards) {
        card.className = 'card';
    }
    for (star of stars) {
        star.style.visibility = 'visible'
    }
    openCards = [];
    matchingCards = [];
    resetMoves();
    shuffleDeck();
}

function showModal() {
    $('#congratsModal').modal('show');
}

function endGame() {
    if (matchingCards.length === 8) {
        showModal();
        document.querySelector('.modal-body').textContent = "You managed to match all cards for " + minutes + " minutes and " + seconds + " seconds with a star score of " + starCount + " !";
    }
    document.getElementById('restartGame').addEventListener('click', function () {
        $('#congratsModal').modal('hide');
        restartGame();
    });
}
