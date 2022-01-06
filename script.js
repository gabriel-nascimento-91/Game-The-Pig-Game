'use strict';

// Dice Image
const diceEl = document.querySelector('.dice');

// Players Sections
const secPlayer1El = document.querySelector(`.player--0`);
const secPlayer2El = document.querySelector(`.player--1`);

// Scores DOM
const scorePlayer1El = document.getElementById('score--0');
const scorePlayer2El = document.getElementById('score--1');
const currentScore1El = document.getElementById('current--0');
const currentScore2El = document.getElementById('current--1');
// Buttons
const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Scores VAR
let currentScore = 0;
let scores = [0, 0];

// Indicar de jogador atual
let activePlayer = 0;

// Setup Inicial do Jogo
scorePlayer1El.textContent = '0';
scorePlayer2El.textContent = '0';
diceEl.classList.add('hidden');

// Mudar de jogador
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  secPlayer1El.classList.toggle('player--active');
  secPlayer2El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Gerar número do dado
btnRollDice.addEventListener('click', function () {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;

  diceEl.src = `dice-${randomNumber}.png`;
  diceEl.classList.remove('hidden');

  if (randomNumber !== 1) {
    currentScore += randomNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 50) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
    btnHold.classList.toggle('hidden');
    btnRollDice.classList.toggle('hidden');
    diceEl.classList.add('hidden');
    document.getElementById(`name--${activePlayer}`).textContent = 'Winner!!';
  } else {
    switchPlayer();
  }
});

// Começar jogo novo
btnNewGame.addEventListener('click', function () {
  scorePlayer1El.textContent = '0';
  scorePlayer2El.textContent = '0';
  currentScore1El.textContent = '0';
  currentScore2El.textContent = '0';
  document.getElementById(`name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;
  secPlayer1El.classList.add('player--active');
  secPlayer2El.classList.remove('player--active');
  secPlayer1El.classList.remove('player--winner');
  secPlayer2El.classList.remove('player--winner');
  btnHold.classList.remove('hidden');
  btnRollDice.classList.remove('hidden');
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
});
