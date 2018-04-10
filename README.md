# Memory Game Project

## Table of Contents

* [Overview](#overview)
* [Rules](#rules)
* [Rating](#rating)


## Overview

This is my view on the classic memory board game.
The game board consists of sixteen cards arranged in a grid (4x4).
The deck is made up of eight different pairs of cards, each with different symbols on one side. 
The cards are shuffled randomly each time on the grid with the symbol face down. 
The goal is simple - locate all matching cards!

## Rules:

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.
* The game ends once all cards have been correctly matched.

## Rating:

The game counts how many moves has the player made.

The player starts with a complete 3-star rating, which gradually decreases throughout the game with the incrementation of the player's moves.

* 0-15 moves - 3 stars
* 16-31 moves - 2 stars
* 32+ moves - 1 star

The player's time to finish the game is also measured with the timer starting on first card opening.
