// 0 = ROCK        0 BEATS 2 (2nd combination)
// 1 = PAPER       1 BEATS 0 (1st combination)
// 2 = SWORD    2 BEATS 1 (3rd combination)

// Warn a user that the project is WIP
console.warn('This project is currently a WIP. As of now, it already works as a CLI game and a final product will contain a fully-fledged GUI.');
console.warn('You can start a game by typing setGame(). You can specify number of rounds you want to play inside the parentheses.');
console.warn('You play each round by using playRound() function. An example would be: playRound(getUserChoice())');

// VARIABLES PART

let round = 0;
let rounds = 0;
let oneWins = 0;
let twoWins = 0;

// FUNCTIONS PART

// Convert 012 to RPS (emoji or text)
function convertToRps(value, type) {
    if (type === 'emoji') {
        switch (value) {
            case 0:
                return '🪨';
            case 1:
                return '🧻';
            case 2:
                return '🗡️';
        }
    } else if (type === 'text') {
        switch (value) {
            case 0:
                return 'Rock! 🪨';
            case 1:
                return 'Paper! 🧻';
            case 2:
                return 'Sword! 🗡️';
        }
    }
}

// Generate and return AI's choice (012 as RPS)
function getAiChoice() {
    return Math.floor(Math.random() * 3);
}

// Get a user's choice and return it converted (RPS to 012)
function getUserChoice(message = 'Please, choose Rock, Paper or Sword!', placeholder = convertToRps(getAiChoice(), 'text')) {
    const PATTERNS = [/rock/i, /paper/i, /sword/i];

    let choice = prompt(message, placeholder);

    // Return null on prompt cancellation
    if (choice === null) {
        return choice;
    }

    // Look for text
    for (const PATTERN of PATTERNS) {
        if (PATTERN.exec(choice)) {
            choice = PATTERN.exec(choice)[0].toLowerCase();
            break;
        }
    }

    // Determine the choice
    const toolName = {
        rock: ['rock', 'r', '🪨'],
        paper: ['paper', 'p', '🧻'],
        sword: ['sword', 's', '🗡️']
    };

    switch (true) {
        case toolName.rock.includes(choice):
            return 0;
        case toolName.paper.includes(choice):
            return 1;
        case toolName.sword.includes(choice):
            return 2;
        default:
            return getUserChoice('You haven\'t chosen anything! Please, try again.');
    }
}

// Prepare a game of n rounds
function setGame(n = 3) {
    rounds = n;
}

// Evaluate the winner of a round (0 for P1, 1 for AI, 2 for Draw)
function playRound(pOne, pTwo = getAiChoice()) {
    // Next round!
    round++;

    // Log round header with players choices
    console.group(`%cRound ${round}`,
    'font-size: 18px; background-color: #1B2430;');
    console.log(`%cYour ${convertToRps(pOne, 'emoji')} %cVS %cAI's ${convertToRps(pTwo, 'emoji')}`,
    'font-size: 16px;',
    'font-size: 24px;',
    'font-size: 16px;'
    );

    // Update DOM too
    roundInfo.textContent = `${round}`;
    poneInfo.textContent = `${convertToRps(pOne, 'emoji')}`;
    ptwoInfo.textContent = `${convertToRps(pTwo, 'emoji')}`;

    // Check if it is a draw
    if (pOne === pTwo) {
        console.log('%cIt\'s a draw!',
        'font-size: 14px;');
    } else {
        // Determine which combination it is, add a point to winner
        switch (pOne + pTwo) {
            case 1:
                if (pOne === 1) {
                    oneWins++;
                    console.log('%cYou won this one!',
                    'font-size: 14px;');
                    break;
                } else {
                    twoWins++;
                    console.log('%cAI beats you.',
                    'font-size: 14px;');
                    break;
                }
            case 2:
                if (pOne === 0) {
                    oneWins++;
                    console.log('%cYou won this one!',
                    'font-size: 14px;');
                    break;
                } else {
                    twoWins++;
                    console.log('%cAI beats you.',
                    'font-size: 14px;');
                    break;
                }
            case 3:
                if (pOne === 2) {
                    oneWins++;
                    console.log('%cYou won this one!',
                    'font-size: 14px;');
                    break;
                } else {
                    twoWins++;
                    console.log('%cAI beats you.',
                    'font-size: 14px;');
                    break;
                }
        }
    }

    // Log round footer with current scores and update DOM too
    console.log(`%cYour score: ${oneWins}`,
    'font-size: 12px;');
    console.log(`%cAI\'s score: ${twoWins}`,
    'font-size: 12px;');
    console.groupEnd();

    onewinsInfo.textContent = `${oneWins}`;
    twowinsInfo.textContent = `${twoWins}`;

    // Check if the game is over (early win or all rounds played)
    if (oneWins * 2 > rounds || twoWins * 2 > rounds) {
        endGame();
    } else if (round === rounds) {
        endGame();
    }
}

function endGame() {
    console.log('%cEnd of the game',
    'font-size: 18px;');

    if (oneWins > twoWins) {
        console.log('%cYou are the winner!',
        'font-size: 16px;');
    } else if (twoWins > oneWins) {
        console.log('%cAI is the winner!',
        'font-size: 16px;');
    } else {
        console.log('%cIt\'s a draw!',
        'font-size: 16px;');
    }

    round = 0;
    rounds = 0;
    oneWins = 0;
    twoWins = 0;
}

// DOM PART

const introDiv = document.querySelector('.intro');
const mainDiv = document.querySelector('.main');
const infoDivs = document.querySelectorAll('.info');

const choiceButtons = document.querySelectorAll('.main .button');
const roundButtons = document.querySelectorAll('.intro .button');

const roundInfo = document.querySelector('[data-type="round"]');
const poneInfo = document.querySelector('[data-type="pOne"]');
const ptwoInfo = document.querySelector('[data-type="pTwo"]');
const onewinsInfo = document.querySelector('[data-type="oneWins"]');
const twowinsInfo = document.querySelector('[data-type="twoWins"]');

// Make round buttons set amount of rounds for a game
roundButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        setGame(Number(e.target.getAttribute('data-rounds')));
        introDiv.style.display = 'none';
        mainDiv.style.display = 'flex';

        infoDivs.forEach((infoDiv) => {
            infoDiv.style.display = 'flex';
        })
    });
})

// Make choice buttons run a round
choiceButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        playRound(Number(e.target.getAttribute('data-choice')));
    });
})