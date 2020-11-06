'use strict';

let secretNum = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;
let score = 20;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

const play = function () {
    const getValue = Number(document.querySelector('.guess').value);
    if (!getValue) {
        displayMessage('⛔️ No number!');
    } else if (score > 0) {
        if (getValue !== secretNum) {
            displayMessage(getValue > secretNum ? '📈 Too high!' : '📉 Too low!');
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('🎉 Correct Number!');

            document.querySelector('body').style.backgroundColor = '#60b347';
            document.querySelector('.number').style.width = '30rem';
            document.querySelector('.number').textContent = secretNum;
            if (score > highScore) {
                highScore = score;
                document.querySelector('.highscore').textContent = highScore;
            }
            removeHandler();
        }
    } else {
        displayMessage('💥 You lost the game!');
        document.querySelector('.number').textContent = secretNum;
        removeHandler();
    }
};

const keyEvent = function (event) {
    if (event.keyCode === 13) {
        play();
    }
};

const setupEventListeners = function() {
    document.querySelector('.check').addEventListener('click', play);
    document.addEventListener('keypress', keyEvent)
/*    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            play();
        }
    });*/
};

const removeHandler = function () {
    document.querySelector('.check').removeEventListener('click', play);
    document.removeEventListener('keypress', keyEvent);
};

const repeat = function () {
    setupEventListeners();
    score = 20;
    secretNum = Math.trunc(Math.random() * 20) + 1;
    displayMessage('Start guessing...');
    document.querySelector('.guess').value = '';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
};

document.querySelector('.again').addEventListener('click', repeat);

setupEventListeners();